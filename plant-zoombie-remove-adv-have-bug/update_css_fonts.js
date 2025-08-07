const fs = require('fs');
const path = require('path');

// Define font family mappings from Chinese to English
const fontMappings = {
  "'Microsoft YaHei'": "Arial, sans-serif",
  "'Microsoft YaHei',sans-serif": "Arial, sans-serif",
  "'Microsoft YaHei',Verdana,Tahoma,sans-serif": "Arial, Verdana, Tahoma, sans-serif",
  "'NSimSun','SimSun',serif": "'Courier New', Courier, monospace",
  "'SimSun',serif": "'Courier New', Courier, monospace",
  "'YouYuan','Yu Gothic',sans-serif": "Arial, sans-serif",
  "'YouYuan','Yu Gothic',sans-serif": "Arial, sans-serif",
  "'Microsoft YaHei',Verdana,Tahoma,sans-serif": "Arial, Verdana, Tahoma, sans-serif"
};

// Path to the CSS file
const cssFilePath = path.join(__dirname, 'g.css');

// Read the CSS file
let cssContent = fs.readFileSync(cssFilePath, 'utf8');

let replacements = 0;

// Replace Chinese font families with English equivalents
for (const [chineseFont, englishFont] of Object.entries(fontMappings)) {
  const regex = new RegExp(chineseFont.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
  if (regex.test(cssContent)) {
    cssContent = cssContent.replace(regex, englishFont);
    replacements++;
    console.log(`Replaced: ${chineseFont} -> ${englishFont}`);
  }
}

// Update the Yahei Mono font to use a more standard monospace stack
cssContent = cssContent.replace(
  /font-family:\s*Yahei\s+mono/g, 
  'font-family: "Courier New", Courier, monospace, Yahei Mono'
);

// Add standard font stacks for better cross-browser compatibility
const standardFontStacks = `
/* Standard font stacks for better cross-browser compatibility */
body, button, input, select, textarea {
  font-family: Arial, Helvetica, sans-serif;
}

/* Monospace for code elements */
code, kbd, pre, samp {
  font-family: "Courier New", Courier, monospace;
}

/* Serif for headings if needed */
h1, h2, h3, h4, h5, h6 {
  font-family: Georgia, "Times New Roman", Times, serif;
}
`;

// Add standard font stacks to the end of the file
cssContent += standardFontStacks;

// Write the updated CSS back to the file
fs.writeFileSync(cssFilePath, cssContent, 'utf8');

console.log(`\nCSS font updates complete! Made ${replacements} font family replacements.`);
console.log('Added standard font stacks for better cross-browser compatibility.');
