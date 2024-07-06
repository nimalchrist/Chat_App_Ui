//  To generate unique colors
const generateColors = (totalUsers: number): { [key: number]: string } => {
  const colors: { [key: number]: string } = {};
  for (let i = 0; i < totalUsers; i++) {
    colors[i] = `hsl(${(i * 360) / totalUsers}, 70%, 80%)`;
  }
  return colors;
};

export default generateColors;
