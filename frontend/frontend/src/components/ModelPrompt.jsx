import { useEffect, useState } from "react";
import { useNodesContext } from "../context/NodesContext";
import { makeConnectionsObj, LinkedNodes } from "../../data/sampleMake";
function ModelPrompt() {
  const { nodes, edges } = useNodesContext();
  const [modelPrompt, setModelPrompt] = useState("");
  const List = new LinkedNodes();

  useEffect(() => {
    makeConnectionsObj(List, nodes, edges);
    const connectionsList = List.getTree();

    const generateModel = (head) => {
      if (!head) return;
      let prompt = "";
      let queue = [{ node: head, parent: null }];
      while (queue.length > 0) {
        let { node: current, parent } = queue.shift();

        let parentId = parent && parent.id ? parent.id : "";
        let parentResLabel =
          parent && parent.data && parent.data.texts ? parent.data.texts : "";

        // Collect response labels and texts
        let responseLabel =
          current.response && current.response.label
            ? current.response.label
            : "";
        let responseTexts =
          current.response && current.response.inputs
            ? current.response.inputs
            : "";
        let botText =
          current.data && current.data.texts ? current.data.texts : "";

        // Add the collected texts to modelPrompt
        prompt +=
          (responseLabel.length > 0
            ? `Response to --> ${parentId}\n > ${responseLabel}\n`
            : "\n") +
          (responseTexts.length > 0
            ? `Response Examples --> ${responseTexts}\n`
            : "\n") +
          (botText.length > 0 ? `Bot Response --> ${botText}\n` : "\n");

        // Enqueue children nodes
        if (current.positive)
          queue.push({ node: current.positive, parent: current });
        if (current.negative)
          queue.push({ node: current.negative, parent: current });
        if (current.neutral)
          queue.push({ node: current.neutral, parent: current });
      }
      setModelPrompt(prompt);
    };

    generateModel(connectionsList);
  }, [nodes, edges]);

  return (
    <div style={{ whiteSpace: "pre-wrap" }} className="w-full">
      {modelPrompt}
    </div>
  );
}

export default ModelPrompt;
