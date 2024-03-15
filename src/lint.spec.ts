import t from "tap";

import { lintFolder } from "./lint";

t.test("lint", async (t) => {
  const issues = lintFolder("./fixtures/app01");
  console.log(issues);

  function hasIssueOnce(message: string) {
    t.equal(issues.filter((i) => i.message === message).length, 1);
  }

  hasIssueOnce("Invalid hex color value: rgb(18, 52, 86)");
});
