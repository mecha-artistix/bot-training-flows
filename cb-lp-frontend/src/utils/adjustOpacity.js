// Utility function to adjust opacity
export const adjustOpacity = (color, alpha) => {
  const [r, g, b] = color.match(/\d+/g).map(Number);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};
