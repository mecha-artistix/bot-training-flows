import { MarkerType } from "reactflow";
export function makeEdgeStyle(source) {
  const sourceHandle = source.sourceHandle;
  const props = {
    label: "",
    edgeStyle: {},
    arrowHead: { type: MarkerType.ArrowClosed, width: 20, height: 20 },
  };
  switch (sourceHandle) {
    case "b":
      props.label = "Neutral";
      props.edgeStyle = { stroke: "blue", strokeWidth: 2 };
      props.arrowHead = { ...props.arrowHead, color: "blue" };
      break;
    case "g":
      props.label = "Positive";
      props.edgeStyle = { stroke: "green", strokeWidth: 2 };
      props.arrowHead = { ...props.arrowHead, color: "green" };
      break;
    case "r":
      props.label = "Negative";
      props.edgeStyle = { stroke: "red", strokeWidth: 2 };
      props.arrowHead = { ...props.arrowHead, color: "red" };
      break;

    default:
      break;
  }
  return props;
}
