const fs = require('fs');
const path = require('path');
const { processAllFiles } = require('./translate_zh_to_en');

// Define the directories to process
const directoriesToProcess = [
  path.join(__dirname, 'js'),      // Main JS files
  path.join(__dirname, 'levels')   // Level-specific JS files
];

console.log('Starting translation process...\n');

// Process each directory
let totalTranslated = 0;
directoriesToProcess.forEach(dir => {
  if (fs.existsSync(dir)) {
    console.log(`Processing directory: ${dir}`);
    processAllFiles(dir);
  } else {
    console.log(`Directory not found, skipping: ${dir}`);
  }
});

console.log('\nTranslation process completed!');
console.log('To apply these changes, run: node run_translation.js');
