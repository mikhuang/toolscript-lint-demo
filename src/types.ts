type JsonObject = { [key: string]: JsonValue };

type JsonValue = null | boolean | number | string | JsonValue[] | JsonObject;

export type ToolscriptTag = {
  tagName: string;
  id: string;
  attributes: {
    name: string;
    value: JsonValue;
  }[];
  ancestors: {
    tagName: string;
    id?: string;
  }[];
};

export type LintMessage = {
  /** Name of the rule that generated the message */
  rule: string;
  message: string;
  severity: "error" | "warning";
  /** May be path */
  attribute: string;
  pluginId: string;
};

export type NodeRule = (tags: ToolscriptTag[]) => LintMessage[];
