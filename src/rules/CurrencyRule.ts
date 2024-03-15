import { isArray, isObject, isString, reverse } from "lodash";
import { getDeconstructedValueFromAttribute } from "../helpers";
import type { LintMessage, ToolscriptTag } from "../types";

const REQUIRED_CURRENCY = "USD";
const REQUIRED_LOCALE = "en-US";

/** currency should always be .toLocaleString("en-US", { style: "currency", currency: "USD" }) */
export function CurrencyRule(tags: ToolscriptTag[]) {
  const messages: LintMessage[] = [];
  for (const tag of tags) {
    let tagId = tag.id;
    for (const ancestor of reverse(tag.ancestors)) {
      if (tagId) break;
      if (ancestor.id) tagId = ancestor.id;
    }

    for (const attribute of tag.attributes) {
      function checkCurrency(value: string, path = "") {
        for (const match of value.matchAll(/toLocaleString\(/g)) {
          // look for closing parens
          const callClosingParens = value.indexOf(")", match.index);

          // check currency is as expected
          const val = value.slice(match.index, callClosingParens);
          const firstComma = val.indexOf(",");
          const detailsRaw = val
            .slice(firstComma + 1, callClosingParens)
            .trim();
          let localeRaw = val.slice(15, firstComma).trim();
          localeRaw = localeRaw.slice(1, localeRaw.length - 1); // get rid of quotes
          if (localeRaw !== REQUIRED_LOCALE) {
            messages.push({
              rule: "CurrencyRule",
              message: `Invalid locale '${localeRaw}': ${val}`,
              severity: "warning",
              attribute: `${attribute.name}${path}`,
              pluginId: tagId,
            });
          }

          // biome-ignore lint/security/noGlobalEval:
          const details = eval(`(${detailsRaw})`);
          if (
            details.style === "currency" &&
            details.currency !== REQUIRED_CURRENCY
          ) {
            messages.push({
              rule: "CurrencyRule",
              message: `Invalid currency '${details.currency}': ${val}`,
              severity: "warning",
              attribute: `${attribute.name}${path}`,
              pluginId: tagId,
            });
          }
        }
      }

      const val = getDeconstructedValueFromAttribute(attribute.value);
      if (isString(val)) {
        checkCurrency(val);
      } else if (isObject(val)) {
        for (const [key, value] of Object.entries(val)) {
          checkCurrency(value, `.${key}`);
        }
      } else if (isArray(val)) {
        for (const [index, value] of val.entries()) {
          checkCurrency(value, `[${index}]`);
        }
      }
    }
  }
  return messages;
}
