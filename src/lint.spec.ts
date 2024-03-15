import t from "tap";

import { lintFolder } from "./lint";
import { partition } from "lodash";

t.test("lint", async (t) => {
  let issues = lintFolder("./fixtures/app01");

  const checkRule =
    (rule: string) =>
    (pluginId: string, message: string, times = 1) => {
      const [matching, notMatching] = partition(
        issues,
        (i) =>
          i.message === message && i.pluginId === pluginId && i.rule === rule
      );
      t.equal(matching.length, times);
      issues = notMatching;
    };

  const allChecks: {
    [key: string]: [string, string, number?][];
  } = {
    NoCustomHexRule: [
      ["customHexButton", "Invalid hex color value: rgb(18, 52, 86)"],
    ],
    UndefinedMomentRule: [
      ["momentBadUse", "No ?? check: moment(dateToUndefined.value)", 2],
      ["momentBadUse", "No timezone set"],
      ["button1", "No ?? check: moment(dateToUndefined.value)"],
      [
        "button1",
        "Invalid timezone: moment(dateToUndefined.value).tz('America/New_York')",
      ],
      ["momentNoInvalid", "No ?? check: moment(dateToUndefined.value)"],
      [
        "momentNoInvalid",
        "Invalid timezone: moment(dateToUndefined.value).tz('America/New_York')",
      ],
      [
        "momentCatchInvalid",
        "Invalid timezone: moment(dateToUndefined.value ?? 'Invalid').tz('America/New_York')",
      ],
    ],
    AutoQueryDisableRule: [
      ["queryNoDisable", "Auto run queries should have a disable query"],
    ],
    CurrencyRule: [
      [
        "html1",
        `Invalid currency 'CNY': toLocaleString("en-US", { style: "currency", currency: "CNY" }`,
      ],
      [
        "cny",
        `Invalid locale 'en-UK': toLocaleString("en-UK", { style: "currency", currency: "CNY" }`,
      ],

      [
        "cny",
        `Invalid currency 'CNY': toLocaleString("en-UK", { style: "currency", currency: "CNY" }`,
      ],
    ],
  };

  for (const [rule, checks] of Object.entries(allChecks)) {
    const check = checkRule(rule);
    for (const [pluginId, message, times] of checks) {
      check(pluginId, message, times);
    }
  }

  // expect no extra issues
  t.equal(issues.length, 0);
  if (issues.length) {
    console.log("unexpected issues", issues);
  }
});
