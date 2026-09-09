const pairs = [
  ['dark primary text', '#c8e8c8', '#070b07', 4.5],
  ['dark muted text', '#5a8a5a', '#070b07', 4.5],
  ['dark muted text on panel', '#5a8a5a', '#0d140d', 4.5],
  ['terminal muted text', '#5a8a5a', '#0a0e0a', 4.5],
  ['dark dim green on panel', '#229b30', '#0d140d', 4.5],
  ['dark green accent', '#33ff33', '#070b07', 4.5],
  ['dark amber accent', '#ffcc44', '#070b07', 4.5],
  ['light primary text', '#17231a', '#f5f8f5', 4.5],
  ['light muted text', '#53665a', '#f5f8f5', 4.5],
  ['light muted text on panel', '#53665a', '#ffffff', 4.5],
  ['light dim green on panel', '#347a45', '#ffffff', 4.5],
  ['light green accent', '#176b2a', '#f5f8f5', 4.5],
  ['light amber accent', '#805500', '#f5f8f5', 4.5],
  ['light button text', '#ffffff', '#176b2a', 4.5],
];

function channel(value) {
  const normalized = value / 255;
  return normalized <= 0.04045
    ? normalized / 12.92
    : ((normalized + 0.055) / 1.055) ** 2.4;
}

function luminance(hex) {
  const value = hex.replace('#', '');
  const channels = [0, 2, 4].map((index) => channel(Number.parseInt(value.slice(index, index + 2), 16)));
  return 0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2];
}

function contrast(foreground, background) {
  const light = Math.max(luminance(foreground), luminance(background));
  const dark = Math.min(luminance(foreground), luminance(background));
  return (light + 0.05) / (dark + 0.05);
}

let failed = false;
for (const [label, foreground, background, minimum] of pairs) {
  const ratio = contrast(foreground, background);
  const passed = ratio >= minimum;
  console.log(`${passed ? 'PASS' : 'FAIL'} ${label}: ${ratio.toFixed(2)}:1`);
  failed ||= !passed;
}

if (failed) process.exit(1);
