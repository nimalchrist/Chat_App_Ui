import Theme from "./Theme";

const generateColors = (
  totalUsers: number,
  theme: Theme
): { [key: number]: string } => {
  const colors: { [key: number]: string } = {};

  for (let i = 0; i < totalUsers; i++) {
    const hue = (i * 360) / totalUsers; // create a evenly spreaded colors in spectrum
    const saturation = 70; // fixed saturation
    // alternating lightness between 50 to 70 for dark theme and 20 to 30 for light theme
    const lightness =
      theme === Theme.Light ? 30 - (i % 2) * 20 : 50 + (i % 2) * 10;

    colors[i] = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  }

  return colors;
};

export default generateColors;
