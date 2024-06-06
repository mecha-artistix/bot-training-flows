import { Handle, Position } from "reactflow";

function HandlePair({ isConnectable, data }) {
  const style = {
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
        style={{ ...style, top: "70%", backgroundColor: "blue" }}
        type="source"
        position={Position.Right}
        isConnectable={isConnectable}
        data-type="neutral"
        data-data={data}
      />
      <Handle
        id="g"
        style={{ ...style, top: "50%", backgroundColor: "green" }}
        type="source"
        position={Position.Right}
        isConnectable={isConnectable}
        data-type="positive"
        data-data={data}
      />
      <Handle
        id="r"
        style={{ ...style, top: "30%", backgroundColor: "red" }}
        type="source"
        position={Position.Right}
        isConnectable={isConnectable}
        data-type="negative"
        data-data={data}
      />
      {/* LEFT TARGET HANDLES*/}

      <Handle
        id="b"
        style={{ ...style, top: "60%", backgroundColor: "blue" }}
        type="target"
        position={Position.Left}
        data-type="neutral"
        isConnectable={isConnectable}
        data-data={data}
      />
      <Handle
        id="g"
        style={{ ...style, top: "50%", backgroundColor: "green" }}
        type="target"
        position={Position.Left}
        data-type="positive"
        isConnectable={isConnectable}
        data-data={data}
      />
      <Handle
        id="r"
        style={{ ...style, top: "40%", backgroundColor: "red" }}
        type="target"
        position={Position.Left}
        data-type="negative"
        isConnectable={isConnectable}
        data-data={data}
      />
      {/* </div> */}
    </>
  );
}

export default HandlePair;
