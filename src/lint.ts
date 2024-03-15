import fs from "node:fs";
import path from "node:path";
import acorn from "acorn";
import acornJsx from "acorn-jsx";
import isString from "lodash/isString";

import { extend } from "acorn-jsx-walk";
import acornWalk from "acorn-walk";
import { NoCustomHexRule } from "./rules/NoCustomHexRule";
import { UndefinedMomentRule } from "./rules/UndefinedMomentRule";
import type { LintMessage, NodeRule, ToolscriptTag } from "./types";

extend(acornWalk.base);

const ACORN_WALK_VISITORS = {
  ...acornWalk.base,
  JSXElement: () => {},
};

const RULES: NodeRule[] = [NoCustomHexRule, UndefinedMomentRule];

function getId(a) {
  return a.openingElement.attributes.find((attr) => attr.name.name === "id")
    ?.value.value;
}

function transformExpression(expression) {
  if (expression.type === "Literal") {
    return expression.value;
  }
}

function lintFile(filepath: string): LintMessage[] {
  const fileContent = fs.readFileSync(filepath, "utf-8");
  const parsedJsx = acorn.Parser.extend(acornJsx()).parse(fileContent, {
    ecmaVersion: "latest",
  });
  const tags: ToolscriptTag[] = [];
  acornWalk.ancestor(parsedJsx, {
    // @ts-expect-error
    JSXElement: (node, _state, ancestors) => {
      const tagName = node.openingElement.name.name;
      const attributes = node.openingElement.attributes.map((attr) => {
        const name = attr.name.name;
        if (attr.value.type === "JSXExpressionContainer") {
          return {
            name,
            value: transformExpression(attr.value.expression),
          };
        }
        return {
          name,
          value: attr.value.value,
        };
      });

      tags.push({
        tagName,
        id: getId(node),
        attributes,
        ancestors: ancestors
          .filter((a) => a.type === "JSXElement" && a !== node)
          .map((a) => {
            const id = getId(a);
            return {
              id,
              tagName: a.openingElement.name.name,
            };
          }),
      });
    },
    ACORN_WALK_VISITORS,
  });

  console.log(JSON.stringify(tags, null, 2));
  const messages: LintMessage[] = [];

  for (const rule of RULES) {
    messages.push(...rule(tags));
  }

  return messages;
}

/**
 * Perform linting on a folder
 * @param dir to root of Toolscript folder
 * @returns lint issues
 */
export function lintFolder(dir: string): LintMessage[] {
  // read all files in folder
  const root = path.resolve(dir);

  const filePaths = fs
    .readdirSync(root, { recursive: true })
    .filter((file) => isString(file)) as string[];

  const messages: LintMessage[] = [];

  // loop RSX files
  for (const file of filePaths.filter((file) => file.endsWith(".rsx"))) {
    messages.push(...lintFile(path.join(root, file)));
  }

  return messages;
}
