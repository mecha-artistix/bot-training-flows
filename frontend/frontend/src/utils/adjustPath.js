/**
 * Adjusts the path to include a horizontal segment immediately after the starting point.
 *
 * @param {string} path - The original path string.
 * @param {number} sourceX - The x-coordinate of the source.
 * @param {number} sourceY - The y-coordinate of the source.
 * @param {number} horizontalSpacing - The horizontal spacing to be added.
 * @returns {string} - The adjusted path string.
 */
export default function adjustPath(path, sourceX, sourceY, horizontalSpacing) {
  // Regular expression to match the initial move command
  const moveCommandRegex = new RegExp(`M${sourceX}[ ,]${sourceY}`, "i");

  // The starting move command
  const moveCommand = `M${sourceX},${sourceY}`;

  // Calculate the new x position after horizontal spacing
  const newX = sourceX + horizontalSpacing;

  // The new horizontal line command
  const horizontalLine = `H${newX}`;

  // Ensure the path starts with the move command, then insert the horizontal line
  //   const adjustedPath = path.replace(
  //     moveCommand,
  //     `${moveCommand} ${horizontalLine}`
  //   );
  const adjustedPath = path.replace(moveCommandRegex, `$& ${horizontalLine}`);

  // console.log("Original Path:", path);
  // console.log("Adjusted Path:", adjustedPath);

  return adjustedPath;
}
