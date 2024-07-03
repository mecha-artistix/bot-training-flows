import { useState, useRef, useEffect } from "react";
import { Handle, Position } from "reactflow";

import HandlePair from "../handles/HandlePair";

function ActionNode({ data }) {
  const [text, setText] = useState(data.text || "Start");
  // const handleChange = (e) {
  //     setText(text => text = e.target.value)
  // }
  //   useEffect(() => {}, [text, data]);
  return (
    <div className="bg-cwu_brown text-cwu_dk_charcoal rounded-full px-10 py-1 ">
      <p className="text-cwu_dk_charcoal font-bold">{text}</p>
      <Handle
        id="g"
        // style={{ ...style, top: "70%", backgroundColor: "blue" }}
        type="source"
        position={Position.Right}
        data-type="neutral"
        // data-data={data}
      />
    </div>
  );
}

const startNode = [
  {
    id: "start_node",
    type: "actionnode",
    position: {
      x: 200,
      y: 250,
    },
    data: { text: "Start" },
  },
];

export { ActionNode, startNode };
