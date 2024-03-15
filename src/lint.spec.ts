import t from "tap";

import { lintFolder } from "./lint";

t.test("lint", async (t) => {
  const issues = lintFolder("./fixtures/app01");
  console.log(issues);

  function hasIssue(pluginId: string, message: string, times = 1) {
    t.equal(
      issues.filter((i) => i.message === message && i.pluginId === pluginId)
        .length,
      times
    );
  }

  // NoCustomHexRule
  hasIssue("customHexButton", "Invalid hex color value: rgb(18, 52, 86)");

  // UndefinedMomentRule
  hasIssue("momentBadUse", "No ?? check: moment(dateToUndefined.value)", 2);
  hasIssue("momentBadUse", "No timezone set");
  hasIssue("button1", "No ?? check: moment(dateToUndefined.value)");
  hasIssue(
    "button1",
    "Invalid timezone: moment(dateToUndefined.value).tz('America/New_York')"
  );
  hasIssue("momentNoInvalid", "No ?? check: moment(dateToUndefined.value)");
  hasIssue(
    "momentNoInvalid",
    "Invalid timezone: moment(dateToUndefined.value).tz('America/New_York')"
  );
  hasIssue(
    "momentCatchInvalid",
    "Invalid timezone: moment(dateToUndefined.value ?? 'Invalid').tz('America/New_York')"
  );
});
