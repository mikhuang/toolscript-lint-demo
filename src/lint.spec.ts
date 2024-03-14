import t from "tap";

import { lintFolder } from "./lint";

t.test("lint", async (t) => {
  t.equal(lintFolder("../fixtures/app01"), true, "lint() should return true");
});
