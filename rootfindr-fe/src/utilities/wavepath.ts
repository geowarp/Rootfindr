export function generateWavePath(
  amplitude: number,
  frequency: number,
  phase: number,
  offset: number = 0
): string {
  const points = [];
  const width = 900; // Match your SVG's width
  const height = 600; // Match your SVG's height
  const segments = 200; // Number of segments for smoothness

  for (let i = 0; i <= segments; i++) {
    const x = (i / segments) * width;
    const y =
      height / 2 +
      offset +
      amplitude * Math.sin((x * frequency + phase) * (Math.PI / 180));
    points.push(`${x},${y}`);
  }

  // Close the path at the bottom
  return `M0,${height} L${points.join(" ")} L${width},${height} Z`;
}
