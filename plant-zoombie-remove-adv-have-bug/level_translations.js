// Translation mapping for Chinese text in level files
const translations = {
  // Common UI text
  "小游戏": "Mini-game",
  "关卡": "Level",
  "第": "", // Prefix for level numbers
  "关": "", // Suffix for level numbers
  
  // Level titles and descriptions
  "小游戏：乱葬岗": "Mini-game: Mass Grave",
  "小游戏:坚果保龄球": "Mini-game: Bowling with Nuts",
  "小游戏:坚果保龄球 2": "Mini-game: Bowling with Nuts 2",
  "小游戏：贫瘠之地": "Mini-game: Barren Wasteland",
  "小游戏：超乎寻常的压力!": "Mini-game: Extreme Pressure!",
  "小游戏：你的心脏够强劲吗？": "Mini-game: Is Your Heart Strong Enough?",
  "小游戏：僵尸快跑!(IE6-8无加速)": "Mini-game: Zombie Run! (No acceleration in IE6-8)",
  
  // Game instructions and messages
  "在红线的左边才能放坚果！": "You can only place nuts to the left of the red line!",
  "植物必须布满设置范围！\n\n请布置完整后再次保存！": "Plants must cover the entire set area!\n\nPlease complete the setup before saving!",
  "请输入阳光数量，范围150-350且必须是25的倍数\n可选：150,175,200,225,250,275,300,325,350": 
    "Enter sun amount (150-350, must be multiples of 25)\nOptions: 150, 175, 200, 225, 250, 275, 300, 325, 350",
  "请输入一个范围在150-350之间且是25的倍数的数字！": 
    "Please enter a number between 150-350 that is a multiple of 25!",
  "请输入自定义游戏的标题(50字符内)\n未输入则使用默认标题": 
    "Enter custom game title (max 50 chars)\nLeave blank for default title",
  "正在保存": "Saving...",
  "选择摆放植物的列数：": "Select number of plant columns:",
  "4列": "4 columns",
  "5列": "5 columns",
  "6列": "6 columns",
  
  // TestUHeart.js specific
  "测试一下CPU和浏览器是否强劲(IE9以下勿试5000个)？打开任务管理器，点击开始吧！": 
    "Test your CPU and browser performance (Don't try 5000 on IE9 or below)? Open Task Manager and click Start!",
  "翠花,上5000个!!": "Let's go with 5000!!",
  "下面有请我们的100个僵尸客串演员出场！": "Here come our 100 zombie extras!",
  "下面有请我们的1000个僵尸客串演员出场！": "Here come our 1000 zombie extras!",
  "有请5000个客串演员出场！！或许他们化妆需要一点时间，请耐心等待。。。": 
    "Here come 5000 zombie extras!! They might take a moment to get ready, please be patient...",
  
  // Font families (already handled in CSS, but just in case)
  "幼圆": "Arial"
};

// Function to replace Chinese text with translations
function translateText(text) {
  let result = text;
  // Replace known phrases
  for (const [chinese, english] of Object.entries(translations)) {
    result = result.replace(new RegExp(escapeRegExp(chinese), 'g'), english);
  }
  
  // Handle level numbers (e.g., "第1关" -> "Level 1")
  result = result.replace(/第(\d+)关/g, 'Level $1');
  
  return result;
}

// Helper function to escape special regex characters
function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// Apply translations to all level files
function applyTranslations() {
  const fs = require('fs');
  const path = require('path');
  const levelsDir = path.join(__dirname, 'level');
  
  try {
    const files = fs.readdirSync(levelsDir);
    const jsFiles = files.filter(file => file.endsWith('.js'));
    let filesUpdated = 0;
    
    console.log(`Processing ${jsFiles.length} level files...\n`);
    
    jsFiles.forEach(file => {
      const filePath = path.join(levelsDir, file);
      try {
        let content = fs.readFileSync(filePath, 'utf8');
        let modified = false;
        
        // Check each translation
        for (const [chinese, english] of Object.entries(translations)) {
          if (content.includes(chinese)) {
            content = content.replace(new RegExp(escapeRegExp(chinese), 'g'), english);
            modified = true;
          }
        }
        
        // Handle level number patterns
        const levelPattern = /第(\d+)关/g;
        if (levelPattern.test(content)) {
          content = content.replace(levelPattern, 'Level $1');
          modified = true;
        }
        
        // Update font families
        if (content.includes('幼圆')) {
          content = content.replace(/font-family:\s*['"]?幼圆['"]?/g, 'font-family: Arial');
          modified = true;
        }
        
        // Write back if modified
        if (modified) {
          fs.writeFileSync(filePath, content, 'utf8');
          console.log(`Updated: ${file}`);
          filesUpdated++;
        }
      } catch (error) {
        console.error(`Error processing ${file}:`, error.message);
      }
    });
    
    console.log(`\nTranslation complete! Updated ${filesUpdated} out of ${jsFiles.length} files.`);
    
  } catch (error) {
    console.error('Error reading levels directory:', error.message);
  }
}

// Run the translation if this script is executed directly
if (require.main === module) {
  applyTranslations();
}

// Export the translation function for use in other scripts
module.exports = {
  translateText,
  applyTranslations
};
