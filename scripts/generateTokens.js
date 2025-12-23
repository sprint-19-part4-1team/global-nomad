const fs = require('fs');

/** rem 기본 단위 16 */
const REM_DIVIDER = 16;

/** spacing 단위 최대 1920px까지 */
const SPACING_LIMIT = 1920;

/** border-radius 최대 500px까지 */
const RADIUS_LIMIT = 500;

let css = `@theme {\n`;

// spacing
for (let i = 0; i <= SPACING_LIMIT; i++) {
  css += `  --spacing-${i}: ${i / REM_DIVIDER}rem;\n`;
}

// radius
for (let i = 1; i <= RADIUS_LIMIT; i++) {
  css += `  --radius-${i}: ${i / REM_DIVIDER}rem;\n`;
}

css += `}\n`;

fs.writeFileSync('src/shared/styles/base/tokens.css', css);
