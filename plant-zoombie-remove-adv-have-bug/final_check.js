const fs = require('fs');
const path = require('path');

// Function to check if a string contains Chinese characters
function containsChinese(text) {
  return /[\u4e00-\u9fff]/.test(text);
}

// Function to scan a file for Chinese text
function scanFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const lines = content.split('\n');
    const chineseLines = [];
    
    lines.forEach((line, index) => {
      if (containsChinese(line)) {
        chineseLines.push({
          lineNumber: index + 1,
          content: line.trim()
        });
      }
    });
    
    return chineseLines.length > 0 ? {
      file: filePath,
      issues: chineseLines
    } : null;
  } catch (error) {
    console.error(`Error scanning ${filePath}:`, error.message);
    return null;
  }
}

// Function to scan all files in a directory
function scanDirectory(directory, fileExtensions = ['.js', '.html', '.css']) {
  const results = [];
  
  try {
    const files = fs.readdirSync(directory, { withFileTypes: true });
    
    for (const file of files) {
      const fullPath = path.join(directory, file.name);
      
      if (file.isDirectory()) {
        // Skip node_modules and other non-essential directories
        if (!['node_modules', '.git', '.github', 'dist', 'build'].includes(file.name)) {
          results.push(...scanDirectory(fullPath, fileExtensions));
        }
      } else if (fileExtensions.includes(path.extname(file.name).toLowerCase())) {
        const result = scanFile(fullPath);
        if (result) {
          results.push(result);
        }
      }
    }
  } catch (error) {
    console.error(`Error scanning directory ${directory}:`, error.message);
  }
  
  return results;
}

// Main function to run the final check
function runFinalCheck() {
  console.log('Starting final check for remaining Chinese text...\n');
  
  const rootDir = __dirname;
  const results = scanDirectory(rootDir);
  
  console.log('='.repeat(80));
  console.log('FINAL CHECK RESULTS');
  console.log('='.repeat(80));
  
  if (results.length === 0) {
    console.log('✅ No remaining Chinese text found in the codebase!');
  } else {
    console.log(`⚠️  Found ${results.length} files with Chinese text remaining:`);
    console.log('='.repeat(80));
    
    results.forEach(({ file, issues }, index) => {
      const relativePath = path.relative(rootDir, file);
      console.log(`\n${index + 1}. ${relativePath}`);
      console.log('   ' + '='.repeat(relativePath.length + 4));
      
      issues.forEach(({ lineNumber, content }) => {
        console.log(`   Line ${lineNumber}: ${content}`);
      });
    });
    
    console.log('\n' + '='.repeat(80));
    console.log('Please review these files and add translations as needed.');
  }
  
  console.log('\nFinal check complete!');
}

// Run the final check if this script is executed directly
if (require.main === module) {
  runFinalCheck();
}

// Export the functions for testing
module.exports = {
  containsChinese,
  scanFile,
  scanDirectory,
  runFinalCheck
};
