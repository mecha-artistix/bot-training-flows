import { Handle, Position } from "reactflow";

function HandlePair({ isConnectable, data }) {
  const styleTarget = {
    borderRadius: 0,
    background: "transparent",
    border: "none",
  };
  const styleSource = {
    width: 10,
    height: 10,
    padding: 1,
    border: "1px solid #ddd",
    borderRadius: 5,
    // position: "absolute",
  };
  return (
    <>
      {/* RIGHT SOURCE HANDLES*/}

      <Handle
        id="b"
        style={{ ...styleSource, top: "30%", backgroundColor: "blue" }}
        type="source"
        position={Position.Right}
        isConnectable={isConnectable}
        data-type="neutral"
        data-data={data}
      />

      <Handle
        id="g"
        style={{ ...styleSource, top: "50%", backgroundColor: "green" }}
        type="source"
        position={Position.Right}
        isConnectable={isConnectable}
        data-type="positive"
        data-data={data}
      />
      <Handle
        id="r"
        style={{ ...styleSource, top: "70%", backgroundColor: "red" }}
        type="source"
        position={Position.Right}
        isConnectable={isConnectable}
        data-type="negative"
        data-data={data}
      />
      {/* Handles Type Accept */}
      <Handle
        type="target"
        position={Position.Top}
        style={{ ...styleTarget, width: "100%", height: "10px", top: "-5px" }}
      />
      <Handle type="target" position={Position.Left} style={{ opacity: 1 }} />
      <Handle type="target" position={Position.Bottom} style={{ opacity: 1 }} />
      <Handle type="target" position={Position.Right} style={{ opacity: 1 }} />
      {/* LEFT TARGET HANDLES*/}
    </>
  );
}

export default HandlePair;

function HandleSVG({ direction, color }) {
  let rotate = "";
  switch (direction) {
    case "up":
      return (rotate = "rotate(180deg)");
    case "right":
      return (rotate = "rotate(-90deg)");
    case "left":
      return (rotate = "rotate(90deg)");
    default:
      break;
  }
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      style={{ transform: rotate }}
      strokeWidth={1.5}
      stroke={color || "currentColor"}
      className="size-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m19.5 8.25-7.5 7.5-7.5-7.5"
      />
    </svg>
  );
}
