const fs = require('fs');
const path = require('path');

/** rem 기본 단위 16px */
const REM_DIVIDER = 16;

/** spacing 단위 최대 1520px까지 */
const SPACING_LIMIT = 1520;

/** border-radius 최대 48px까지 */
const RADIUS_LIMIT = 48;

/** css 파일 저장 위치 */
const TOKENS_CSS_PATH = path.resolve(__dirname, '../src/shared/styles/base/tokens.css');

const cssLines = ['@theme {'];

// spacing
for (let i = 0; i <= SPACING_LIMIT; i++) {
  cssLines.push(`  --spacing-${i}: ${i / REM_DIVIDER}rem;`);
}

// radius
for (let i = 1; i <= RADIUS_LIMIT; i++) {
  cssLines.push(`  --radius-${i}: ${i / REM_DIVIDER}rem;`);
}

cssLines.push('}');

fs.writeFileSync(TOKENS_CSS_PATH, cssLines.join('\n') + '\n');
