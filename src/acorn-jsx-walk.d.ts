declare module "acorn-jsx-walk" {
  import type { RecursiveVisitors } from "acorn-walk";

  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  export function extend(base: RecursiveVisitors<any>): void;
}
