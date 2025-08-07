const fs = require('fs');
const path = require('path');

// Common Chinese text patterns in the game
const chinesePatterns = [
  // Level titles and descriptions
  { 
    pattern: /(LevelName|LevelDesc|LevelTitle):\s*['"]([^'"]*[\u4e00-\u9fff]+[^'"\n]*)['"]/g, 
    description: 'Level title/description/name' 
  },
  // Dialog and messages
  { 
    pattern: /['"]([^'"]*[\u4e00-\u9fff]+[^'"\n]*)['"]/g, 
    description: 'General string with Chinese characters' 
  },
  // Comments
  { 
    pattern: /\/\/(.*[\u4e00-\u9fff]+.*)/g, 
    description: 'Single-line comment with Chinese' 
  },
  { 
    pattern: /\/\*([\s\S]*?[\u4e00-\u9fff]+[\s\S]*?)\*\//g, 
    description: 'Multi-line comment with Chinese' 
  }
];

// Function to check if a string contains Chinese characters
function containsChinese(text) {
  return /[\u4e00-\u9fff]/.test(text);
}

// Function to process a single file
function processFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const fileName = path.basename(filePath);
    let foundChinese = [];
    
    // Check for Chinese text using all patterns
    chinesePatterns.forEach(({ pattern, description }) => {
      let match;
      while ((match = pattern.exec(content)) !== null) {
        const matchedText = match[1] || match[0];
        if (containsChinese(matchedText)) {
          foundChinese.push({
            text: matchedText.trim(),
            pattern: description,
            line: content.substring(0, match.index).split('\n').length
          });
        }
      }
    });
    
    // If we found Chinese text, print it
    if (foundChinese.length > 0) {
      console.log(`\nFile: ${fileName}`);
      console.log('='.repeat(80));
      
      foundChinese.forEach(({ text, pattern, line }, index) => {
        console.log(`[${index + 1}] Line ~${line} (${pattern}):`);
        console.log(`   Original: ${text}`);
        console.log(`   Translation needed`);
        console.log('   ' + '-'.repeat(70));
      });
      
      return foundChinese.length;
    }
    
    return 0;
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error.message);
    return 0;
  }
}

// Function to process all level files
function processLevels() {
  const levelsDir = path.join(__dirname, 'level');
  
  try {
    const files = fs.readdirSync(levelsDir);
    const jsFiles = files.filter(file => file.endsWith('.js'));
    let totalChineseFound = 0;
    
    console.log(`Scanning ${jsFiles.length} level files for Chinese text...\n`);
    
    jsFiles.forEach(file => {
      const filePath = path.join(levelsDir, file);
      totalChineseFound += processFile(filePath);
    });
    
    console.log('\n' + '='.repeat(80));
    if (totalChineseFound > 0) {
      console.log(`\nFound Chinese text in ${jsFiles.length} level files.`);
      console.log('Please provide translations for the Chinese text above.');
    } else {
      console.log('\nNo Chinese text found in level files!');
    }
    
  } catch (error) {
    console.error('Error reading levels directory:', error.message);
  }
}

// Run the scanner
processLevels();
