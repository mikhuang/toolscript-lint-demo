import type { LintMessage, ToolscriptTag } from "../types";

/** A check on resource queries that run automatically when inputs change, they should alway have something in Disable query */
export function AutoQueryDisableRule(tags: ToolscriptTag[]) {
  const messages: LintMessage[] = [];
  for (const tag of tags) {
    if (!tag.tagName.endsWith("Query") || tag.tagName === "JavascriptQuery")
      continue;
    const autoRun =
      tag.attributes.find((attr) => attr.name === "runWhenModelUpdates")
        ?.value !== false;
    if (autoRun) {
      const disable = tag.attributes.find(
        (attr) => attr.name === "queryDisabled"
      );
      if (!disable) {
        messages.push({
          rule: "AutoQueryDisableRule",
          message: "Auto run queries should have a disable query",
          severity: "warning",
          attribute: "queryDisabled",
          pluginId: tag.id,
        });
      }
    }
  }
  return messages;
}
