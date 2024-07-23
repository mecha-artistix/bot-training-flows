import { useState, useRef, useEffect } from "react";
import HandlePair from "../handles/HandlePair";

export default function ResponseNode({ data }) {
  const [label, setLabel] = useState(data.label || data.id);
  const [textAreas, setTextAreas] = useState(data.texts || [""]);

  const handleLabelChange = (e) => {
    setLabel((label) => (label = e.target.value));
  };

  useEffect(() => {
    data.label = label;
  }, [data.label, label]);

  const addTextArea = (index) => {
    setTextAreas((prev) => {
      const newTextAreas = [...prev];
      newTextAreas.splice(index + 1, 0, "");
      return newTextAreas;
    });
  };
  const removeTextArea = (index) => {
    setTextAreas((prev) => {
      const newTextAreas = [...prev];
      newTextAreas.splice(index, 1);
      return newTextAreas;
    });
  };
  const handleDrop = (event) => {
    event.preventDefault();
    // Logic to handle drop event
    console.log("Dropped on node", data.id);
  };

  useEffect(() => {
    data.texts = textAreas; // Update the data prop with the latest textAreas
  }, [textAreas, data.texts]);

  return (
    <div
      className="bg-slate-300 p-1 border rounded-md shadow-sm"
      onDrop={handleDrop}
      onDragOver={(event) => event.preventDefault()}
    >
      <input
        value={label}
        onChange={(e) => handleLabelChange(e)}
        placeholder="Step Name/Number"
        className="text-xs"
      ></input>

      {textAreas.map((value, index) => (
        <div key={index} className="mt-2 relative w-full">
          <TextArea setTextAreas={setTextAreas} index={index} value={value} />
          <span className="absolute -top-1 right-2">
            <button onClick={() => addTextArea(index)}>+</button>
            <button onClick={() => removeTextArea(index)}>-</button>
          </span>
        </div>
      ))}
      <HandlePair />
    </div>
  );
}

function TextArea({ index, value, setTextAreas }) {
  const textAreaRef = useRef(null);

  const onTextAreaChange = (e, index) => {
    setTextAreas((prev) => {
      const newTextAreas = [...prev];
      newTextAreas[index] = e.target.value;
      return newTextAreas;
    });
    autoResize();
  };

  const autoResize = () => {
    const textArea = textAreaRef.current;
    if (textArea) {
      textArea.style.height = "auto";
      textArea.style.height = textArea.scrollHeight + "px";
    }
  };
  useEffect(() => {
    autoResize(); // Adjust height on initial render
  }, []);
  return (
    <div className="mt-2 relative w-full">
      <textarea
        ref={textAreaRef}
        value={value}
        onChange={(e) => onTextAreaChange(e, index)}
        className="nodrag border rounded-lg outline-none p-1 text-xs animate-popIn w-full overflow-hidden resize-none"
      ></textarea>
    </div>
  );
}
