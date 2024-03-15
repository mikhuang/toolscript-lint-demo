import { isObject } from "lodash";
import { getDeconstructedValueFromAttribute } from "../helpers";
import type { LintMessage, ToolscriptTag } from "../types";

/** check that there's no custom hex color directly applied to a style */
export function NoCustomHexRule(tags: ToolscriptTag[]) {
  const messages: LintMessage[] = [];
  for (const tag of tags) {
    for (const attribute of tag.attributes) {
      if (attribute.name === "style") {
        const val = getDeconstructedValueFromAttribute(attribute.value);
        if (isObject(val)) {
          for (const [key, value] of Object.entries(val)) {
            if (
              value.startsWith("rgb") &&
              value !== "rgba(255, 255, 255, 0)" // ignore transparent
            ) {
              messages.push({
                rule: "NoCustomHexRule",
                message: `Invalid hex color value: ${value}`,
                severity: "warning",
                attribute: `style.${key}`,
                pluginId: tag.id,
              });
            }
          }
        }
      }
    }
  }
  return messages;
}
