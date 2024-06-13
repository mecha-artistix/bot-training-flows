import { initNodes } from "./initialNodes.js";
import { initEdges } from "./initialEdges.js";
import { makeConnectionsObj, LinkedNodes } from "./sampleMake.js";

const List = new LinkedNodes();

makeConnectionsObj(List, initNodes, initEdges);
// const connectedList = JSON.stringify(List.getTree(), null, 2);
const connectedList = List.getTree();

// console.log(connectedList);

// const generateModel = (head) => {
//   let strArray = [];
//   function dfs(current) {
//     if (!current) return;
//     strArray.push(current.id);
//     dfs(current.positive);
//     dfs(current.negative);
//     dfs(current.neutral);
//   }
//   dfs(head);
//   return strArray;
// };

////////////////////////////////////////

////////////////////////////////////////
let modelPrompt = "";

/////// ---------------bfs
const generateModel = (head) => {
  let strArray = [];
  if (!head) return;
  let queue = [{ node: head, parent: null }];
  while (queue.length > 0) {
    let { node: current, parent } = queue.shift();

    let parentId = parent && parent.id ? parent.id : "";
    let parentResLabel =
      parent && parent.data && parent.data.texts ? parent.data.texts : "";

    // Collect response labels and texts
    let responseLabel =
      current.response && current.response.label ? current.response.label : "";
    let responseTexts =
      current.response && current.response.inputs
        ? current.response.inputs
        : "";
    let botText = current.data && current.data.texts ? current.data.texts : "";

    // Add the collected texts to strArray
    modelPrompt +=
      responseLabel.length > 0
        ? "Response to --> " + parentId + "\n > " + responseLabel + "\n"
        : "\n";
    modelPrompt +=
      responseTexts.length > 0
        ? "Response Examples --> " + responseTexts + "\n"
        : "\n";
    modelPrompt +=
      botText.length > 0 ? "Bot Response --> " + botText + "\n\n\n\n" : "\n";
    // strArray.push("response", responseLabel, responseTexts, "bot", botText);

    // Enqueue children nodes
    if (current.positive)
      queue.push({ node: current.positive, parent: current });
    if (current.negative)
      queue.push({ node: current.negative, parent: current });
    if (current.neutral) queue.push({ node: current.neutral, parent: current });
  }

  return strArray;
};
const arr = generateModel(connectedList);
// modelPrompt += arr.join("\n");
console.log(modelPrompt);
const list = JSON.stringify(List.getTree(), null, 2);

// console.log(list);
