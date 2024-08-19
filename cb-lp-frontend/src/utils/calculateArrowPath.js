export const calculateArrowPath = (startX, startY, endX, endY) => {
  const arrowHeadSize = 10;
  const dx = endX - startX;
  const dy = endY - startY;
  const angle = Math.atan2(dy, dx);

  const arrowHeadX1 = endX - arrowHeadSize * Math.cos(angle - Math.PI / 6);
  const arrowHeadY1 = endY - arrowHeadSize * Math.sin(angle - Math.PI / 6);
  const arrowHeadX2 = endX - arrowHeadSize * Math.cos(angle + Math.PI / 6);
  const arrowHeadY2 = endY - arrowHeadSize * Math.sin(angle + Math.PI / 6);

  return `M${startX},${startY} L${endX},${endY} M${endX},${endY} L${arrowHeadX1},${arrowHeadY1} M${endX},${endY} L${arrowHeadX2},${arrowHeadY2}`;
};
