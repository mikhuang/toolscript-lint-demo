import { isArray, isObject, isString, reverse } from "lodash";
import { getDeconstructedValueFromAttribute } from "../helpers";
import type { LintMessage, ToolscriptTag } from "../types";

const REQUIRED_TIMEZONE = "America/Los_Angeles";

/** check that there's no custom hex color directly applied to a style */
export function UndefinedMomentRule(tags: ToolscriptTag[]) {
  const messages: LintMessage[] = [];
  for (const tag of tags) {
    let tagId = tag.id;
    for (const ancestor of reverse(tag.ancestors)) {
      if (tagId) break;
      if (ancestor.id) tagId = ancestor.id;
    }

    for (const attribute of tag.attributes) {
      function checkMoment(value: string, path = "") {
        for (const match of value.matchAll(/moment\(/g)) {
          // look for closing parens
          const momentClosingParens = value.indexOf(")", match.index);

          // check for undefined check
          if (!value.slice(match.index, momentClosingParens).includes("??")) {
            messages.push({
              rule: "UndefinedMomentRule",
              message: `No ?? check: ${value.slice(
                match.index,
                momentClosingParens + 1
              )}`,
              severity: "warning",
              attribute: `${attribute.name}${path}`,
              pluginId: tagId,
            });
          }

          // check if there's a tz set
          const tzIndex = value.indexOf("tz(", momentClosingParens);
          const tzClosingParens = value.indexOf(")", tzIndex);
          if (tzIndex === -1) {
            messages.push({
              rule: "UndefinedMomentRule",
              message: "No timezone set",
              severity: "warning",
              attribute: `${attribute.name}${path}`,
              pluginId: tagId,
            });
          } else {
            let tz = value.slice(tzIndex + 3, tzClosingParens).trim();
            tz = tz.slice(1, tz.length - 1); // get rid of quotes
            if (tz !== REQUIRED_TIMEZONE) {
              messages.push({
                rule: "UndefinedMomentRule",
                message: `Invalid timezone: ${value.slice(
                  match.index,
                  tzClosingParens + 1
                )}`,
                severity: "warning",
                attribute: `${attribute.name}${path}`,
                pluginId: tagId,
              });
            }
          }
        }
      }

      const val = getDeconstructedValueFromAttribute(attribute.value);
      if (isString(val)) {
        checkMoment(val);
      } else if (isObject(val)) {
        for (const [key, value] of Object.entries(val)) {
          checkMoment(value, `.${key}`);
        }
      } else if (isArray(val)) {
        for (const [index, value] of val.entries()) {
          checkMoment(value, `[${index}]`);
        }
      }
    }
  }
  return messages;
}
