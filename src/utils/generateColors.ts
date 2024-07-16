import randomColorGeneratorMode from "./randomColorGeneratorMode";

const generateColors = (
  totalUsers: number,
  theme: randomColorGeneratorMode
): { [key: number]: string } => {
  const colors: { [key: number]: string } = {};

  for (let i = 0; i < totalUsers; i++) {
    const hue = (i * 360) / totalUsers; // create a evenly spreaded colors in spectrum
    const saturation = 70; // fixed saturation
    // alternating lightness between 20 to 30 for dark theme and 50 to 70 for light theme
    const lightness =
      theme === randomColorGeneratorMode.Light
        ? 50 + (i % 2) * 20
        : 30 - (i % 2) * 10;

    colors[i] = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  }

  return colors;
};

export default generateColors;
