import { useState, useCallback } from "react";
import {
  BaseEdge,
  EdgeLabelRenderer,
  getStraightPath,
  useReactFlow,
  Position,
  getSmoothStepPath,
  getSimpleBezierPath,
  useUpdateNodeInternals,
} from "reactflow";

const edgeStyles = {
  positive: { stroke: "green", strokeWidth: 2 },
  negative: { stroke: "red", strokeWidth: 2 },
  neutral: { stroke: "blue", strokeWidth: 2 },
};

function BezierPath({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style,
  markerEnd,
  data,
}) {
  const [label, setLabel] = useState(data.label || "");
  const [path, labelX, labelY, offsetX, offsetY] = getSimpleBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  const onChange = useCallback(
    (evt) => {
      setLabel(evt.target.value);
      data.label = evt.target.value;
    },
    [data]
  );
  return (
    <>
      <BaseEdge path={path} style={{ ...style, ...edgeStyles[data.type] }} />

      <EdgeLabelRenderer>
        <span
          style={{
            position: "absolute",
            transform: `translate(-50%, -50%) translate(${labelX}px, ${labelY}px)`,
            pointerEvents: "all",
          }}
          className="nodrag nopan bg-slate-50 border rounded-full px-1 text-xs"
        >
          <input
            value={label}
            onChange={onChange}
            className="text-xs outline-none w-fit"
            placeholder="enter text"
          />
        </span>
      </EdgeLabelRenderer>
    </>
  );
}

export default function EdgeLabelled({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  markerEnd,
  data,
}) {
  const { setEdges } = useReactFlow();
  const [edgePath, labelX, labelY] = getSmoothStepPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

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
        <span
          style={{
            position: "absolute",
            transform: `translate(-50%, -50%) translate(${labelX}px, ${labelY}px)`,
            pointerEvents: "all",
          }}
          className="nodrag nopan bg-slate-50 border rounded-full px-1 text-xs"
        >
          {data && data.label} {/* Render the custom data (label) */}
        </span>
      </EdgeLabelRenderer>
    </>
  );
}

function StraightPath({ id, sourceX, sourceY, targetX, targetY }) {
  const [edgePath] = getStraightPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
  });
  return (
    <>
      <BaseEdge id={id} path={edgePath} />
    </>
  );
}
function SmoothStepPath({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  markerEnd,
}) {
  const [edgePath] = getSmoothStepPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  return (
    <path
      id={id}
      style={style}
      className="react-flow__edge-path"
      d={edgePath}
      markerEnd={markerEnd}
    />
  );
}

export { StraightPath, SmoothStepPath, BezierPath, EdgeLabelled };
