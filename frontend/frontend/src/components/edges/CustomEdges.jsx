import { useState, useCallback, useEffect } from "react";
import { EdgeLabelRenderer, getSmoothStepPath, useStore } from "reactflow";
import { getEdgeParams } from "../../utils/getNodeIntersections";
import adjustPath from "../../utils/adjustPath";

function Step_labelled_path({
  id,
  source,
  sourceX,
  sourceY,
  target,
  style,
  markerEnd,
  data,
}) {
  const [label, setLabel] = useState(data.label || "");
  const [inputs, setInputs] = useState(data.inputs || [""]);
  const [isExpanded, setIsExpanded] = useState(false);
  const sourceNode = useStore(
    useCallback((store) => store.nodeInternals.get(source), [source])
  );
  const targetNode = useStore(
    useCallback((store) => store.nodeInternals.get(target), [target])
  );

  const { sx, sy, tx, ty, sourcePos, targetPos } = getEdgeParams(
    sourceNode,
    targetNode
  );
  const [edgePath, labelX, labelY] = getSmoothStepPath({
    sourceX,
    sourceY,
    sourcePosition: sourcePos,
    targetX: tx,
    targetY: ty,
    targetPosition: targetPos,
  });

  const handleExpanded = () => {
    setIsExpanded((isExpanded) => !isExpanded);
  };
  const handleLabel = (e) => {
    setLabel(e.target.value);
  };

  const handleAdd = () => {
    data.inputs = inputs;
  };

  const removeInput = (index) => {
    setInputs((prev) => {
      const newInputs = [...prev];
      newInputs.splice(index, 1);
    });
  };
  useEffect(() => {
    data.label = label;
  }, [label, data]);
  useEffect(() => {
    data.inputs = inputs;
  }, [inputs, data]);

  return (
    <>
      <path
        id={`${id}-invisible`}
        style={{ ...style, stroke: "transparent", strokeWidth: 10 }}
        className="react-flow__edge-path"
        d={edgePath}
      />
      <path
        id={id}
        style={style}
        className="react-flow__edge-path"
        d={edgePath}
        markerEnd={markerEnd}
      />
      <EdgeLabelRenderer>
        <div
          style={{
            position: "absolute",
            transform: `translate(-50%, -50%) translate(${labelX}px, ${labelY}px)`,
            pointerEvents: "all",
          }}
          className="nodrag nopan bg-cwu_brown border p-2"
        >
          <input
            className="text-xs"
            value={label}
            onChange={(e) => handleLabel(e)}
          ></input>
          <div>
            <button
              className="text-pink bg-cwu_dk_charcoal text-white px-1 rounded-sm text-xs"
              onClick={handleExpanded}
            >
              Add More
            </button>
            {isExpanded && (
              <PathInputs
                inputs={inputs}
                setInputs={setInputs}
                setIsExpanded={setIsExpanded}
                handleAdd={handleAdd}
              />
            )}
          </div>
        </div>
      </EdgeLabelRenderer>
    </>
  );
}

function PathInputs({ setInputs, inputs, isExpanded, handleAdd }) {
  const handleAddInput = (index) => {
    setInputs((prevInputs) => [...prevInputs, ""]);
  };
  const handleRemoveInput = (index) => {
    setInputs((prev) => prev.slice(0, -1));
  };
  const onInputChange = (e, index) => {
    setInputs((prev) => {
      const newInputs = [...prev];
      newInputs[index] = e.target.value;
      return newInputs;
    });
  };

  return (
    <div
      className={`bg-white absolute border border-black p-2 rounded animate-slideDown z-40 ${
        isExpanded ? "animate-slideDown" : "animate-slideUp"
      }`}
    >
      <div>
        {inputs.map((value, index) => {
          return (
            <div key={index}>
              <input
                className="px-1 text-xs border rounded-sm border-cwu_dk_charcoal focus:outline-none"
                onChange={(e) => onInputChange(e, index)}
                value={value}
              ></input>
            </div>
          );
        })}
        <span className="flex justify-between">
          <button
            className="bg-slate-400 rounded-full text-xs"
            onClick={handleAddInput}
          >
            +
          </button>
          <button onClick={handleAdd} className="text-xs border border-black">
            Add
          </button>
          <button
            className="bg-slate-400 rounded-full text-xs"
            onClick={handleRemoveInput}
          >
            -
          </button>
        </span>
      </div>
    </div>
  );
}

// ------------------ Smooth Step Path -----------------------------//

function SmoothStepPath({
  id,
  source,
  sourceX,
  sourceY,
  target,
  style,
  markerEnd,
}) {
  const sourceNode = useStore(
    useCallback((store) => store.nodeInternals.get(source), [source])
  );
  const targetNode = useStore(
    useCallback((store) => store.nodeInternals.get(target), [target])
  );

  const { sx, sy, tx, ty, sourcePos, targetPos } = getEdgeParams(
    sourceNode,
    targetNode
  );
  let [edgePath] = getSmoothStepPath({
    sourceX,
    sourceY,
    targetX: tx,
    targetY: ty,
    sourcePosition: sourcePos,
    targetPosition: targetPos,
  });

  // edgePath = adjustPath(edgePath, sourceX, sourceY, 50);

  return (
    <>
      <path
        id={id}
        style={style}
        className="react-flow__edge-path"
        d={edgePath}
        markerEnd={markerEnd}
      />
    </>
  );
}

//--------------------- Utility function to add horizontal line before curving towards target node
function getAdjustedStepPath({
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  horizontalSpacing = 50,
}) {
  const path = [];

  // Start at the source position
  path.push(`M${sourceX},${sourceY}`);

  // Add initial horizontal line immediately after starting
  if (sourcePosition === "right") {
    path.push(`H${sourceX + horizontalSpacing}`);
    // Move vertically to align with target's y-coordinate
    path.push(`V${targetY}`);
  } else if (sourcePosition === "left") {
    path.push(`H${sourceX - horizontalSpacing}`);
    // Move vertically to align with target's y-coordinate
    path.push(`V${targetY}`);
  } else if (sourcePosition === "top" || sourcePosition === "bottom") {
    // For top and bottom, adjust horizontally first
    const midX = (sourceX + targetX) / 2;
    path.push(`H${midX}`);
    // Move vertically to align with target's y-coordinate
    path.push(`V${targetY}`);
  } else {
    // Default to moving directly horizontally if position is undefined
    path.push(`H${targetX}`);
  }

  // Final horizontal segment to the target x-coordinate
  if (targetPosition === "right" || targetPosition === "left") {
    path.push(`H${targetX}`);
  }

  // Join all path commands into a single string
  return path.join(" ");
}
//--------------------- Utility function to determine the closest point on a node's boundary

const getClosestBoundaryPoint = (x, y, node) => {
  const { width, height } = node.__rf;
  const nodeX = node.__rf.position.x + width / 2;
  const nodeY = node.__rf.position.y + height / 2;

  const dx = x - nodeX;
  const dy = y - nodeY;

  const angle = Math.atan2(dy, dx);

  return {
    x: nodeX + (width / 2) * Math.cos(angle),
    y: nodeY + (height / 2) * Math.sin(angle),
  };
};
export { Step_labelled_path, SmoothStepPath };
