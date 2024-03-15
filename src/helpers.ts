export const getDeconstructedValueFromAttribute = (node) => {
  let deconstructedContent = node;

  if (typeof node === "object" && node) {
    if ("ordered" in node) {
      // biome-ignore lint/performance/noAccumulatingSpread:
      deconstructedContent = node.ordered.reduce(
        (acc, item) => ({ ...acc, ...item }),
        {}
      );
    } else if ("set" in node) {
      deconstructedContent = node.set;
    } else if ("array" in node) {
      deconstructedContent = node.array;
    } else if ("object" in node) {
      deconstructedContent = node.object;
    }
  }

  if (Array.isArray(deconstructedContent)) {
    return deconstructedContent.map((item) =>
      getDeconstructedValueFromAttribute(item)
    );
  }

  if (deconstructedContent && typeof deconstructedContent === "object") {
    return Object.fromEntries(
      Object.entries(deconstructedContent).map(([key, value]) => [
        key,
        getDeconstructedValueFromAttribute(value),
      ])
    );
  }

  return deconstructedContent;
};
