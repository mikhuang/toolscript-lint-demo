import fs from "node:fs";
import path from "node:path";
import isString from "lodash/isString";
import get from "lodash/get";
import acorn from "acorn";
import jsx from "acorn-jsx";

import walk from "acorn-walk";
import { extend } from "acorn-jsx-walk";

extend(walk.base);

async function lintFile(filepath: string) {
  console.log("linting", filepath);
  const fileContent = fs.readFileSync(filepath, "utf-8");
  const parsed = acorn.Parser.extend(jsx()).parse(fileContent, {
    ecmaVersion: "latest",
  });
  walk.simple(parsed, {
    // @ts-expect-error
    JSXElement: (node) => {
      console.log("@", node.openingElement.name.name);
    },
  });
}

/**
 * Perform linting on a folder
 * @param dir to root of Toolscript folder
 * @returns lint issues
 */
export async function lintFolder(dir: string) {
  // read all files in folder
  const root = path.resolve(dir);

  const filePaths = fs
    .readdirSync(root, { recursive: true })
    .filter((file) => isString(file)) as string[];

  // loop RSX files
  for (const file of filePaths.filter((file) => file.endsWith(".rsx"))) {
    await lintFile(path.join(root, file));
  }

  return true;
}
