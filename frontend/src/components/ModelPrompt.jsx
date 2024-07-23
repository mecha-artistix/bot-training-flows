import { useEffect, useState } from "react";
import { useNodesContext } from "../context/NodesContext";
import { makeConnectionsObj, LinkedNodes } from "../utils/makeConnectionsObj";
function ModelPrompt() {
  // const { nodes, edges } = useNodesContext();
  // const [prompt, setPrompt] = useState("");
  // const List = new LinkedNodes();
  // const connectionsList = List.getTree();

  // useEffect(() => {
  //   let modelPrompt = "";
  //   const enqueueChildren = (queue, children, parent) => {
  //     makeConnectionsObj(List, nodes, edges);
  //     const connectionsList = List.getTree();
  //     children.forEach((child) => {
  //       queue.push({ node: child, parent: parent });
  //     });
  //   };
  //   makeConnectionsObj(List, nodes, edges);
  //   const connectionsList = List.getTree();
  //   const generateModel = (heads) => {
  //     if (!heads || heads.length === 0) return "";
  //     let queue = heads.map((head) => ({ node: head, parent: null }));
  //     // let prompt = "";

  //     // let queue = [{ node: head, parent: null }];
  //     while (queue.length > 0) {
  //       let { node: current, parent } = queue.shift();

  //       let parentId = parent && parent.id ? parent.id : "";
  //       let parentResLabel =
  //         parent && parent.data && parent.data.texts ? parent.data.texts : "";
  //       let intention = current.intention ? current.intention : "";
  //       // Collect response labels and texts
  //       let responseLabel =
  //         current.response && current.response.label
  //           ? current.response.label
  //           : "";
  //       let responseTexts =
  //         current.response && current.response.inputs
  //           ? current.response.inputs
  //           : "";
  //       let botText =
  //         current.data && current.data.texts ? current.data.texts : "";
  //       let botId = current.id ? current.id : "";
  //       // Add the collected texts to modelPrompt
  //       modelPrompt +=
  //         (responseLabel.length > 0
  //           ? `IF Respond ${intention}ly to ${parentId} for example ${responseLabel}\n`
  //           : "\n") +
  //         (responseTexts.length > 0
  //           ? `Other Examples --> ${responseTexts}\n`
  //           : "\n") +
  //         (botText.length > 0 ? `Then ${botId} --> ${botText}\n` : "\n");

  //       // Enqueue children nodes
  //       if (current.positive && current.positive.length > 0)
  //         enqueueChildren(queue, current.positive, current);
  //       if (current.negative && current.negative.length > 0)
  //         enqueueChildren(queue, current.negative, current);
  //       if (current.neutral && current.neutral.length > 0)
  //         enqueueChildren(queue, current.neutral, current);
  //     }
  //     setModelPrompt(prompt);
  //   };

  //   generateModel(connectionsList);
  // }, [nodes, edges, prompt, List, enqueueChildren]);

  return (
    <div style={{ whiteSpace: "pre-wrap" }} className="w-full">
      {/* {prompt} */}
    </div>
  );
}

export default ModelPrompt;
