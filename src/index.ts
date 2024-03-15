import { lintFolder } from "./lint";

// get file path from command args
const filePath = process.argv[2];
if (!filePath) {
  console.error("Please provide a file path");
  process.exit(1);
}
const issues = lintFolder(filePath);
for (const issue of issues) {
  console.log(issue);
}
