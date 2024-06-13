import { MarkerType } from "reactflow";
export const makeEdgeStyle = function (source) {
  const sourceHandle = source.sourceHandle;
  const defaultProps = {
    label: "",
    edgeStyle: {},
    arrowHead: { type: MarkerType.ArrowClosed, width: 20, height: 20 },
  };
  switch (sourceHandle) {
    case "b":
      return {
        ...defaultProps,
        label: "Neutral",
        edgeStyle: { stroke: "blue", strokeWidth: 2 },
        arrowHead: { ...defaultProps.arrowHead, color: "blue" },
      };
    case "g":
      return {
        ...defaultProps,
        label: "Positive",
        edgeStyle: { stroke: "green", strokeWidth: 2 },
        arrowHead: { ...defaultProps.arrowHead, color: "green" },
      };
    case "r":
      return {
        ...defaultProps,
        label: "Negative",
        edgeStyle: { stroke: "red", strokeWidth: 2 },
        arrowHead: { ...defaultProps.arrowHead, color: "red" },
      };
    default:
      console.log("hi");
      return defaultProps;
  }
};
