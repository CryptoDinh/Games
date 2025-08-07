// Translation mapping for Chinese to English
const translations = {
  // Error messages and alerts
  "超时退出游戏": "Game timed out. Restarting...",
  "直接进入游戏": "Skip Loading",
  "图片载入完毕": "Images loaded!",
  "倒计时": "Starting in ",
  "秒,点击这里开始": " seconds, click here to start",
  
  // Game tips and UI text
  "游戏小贴士": "Game Tips:",
  "亲,不要说我没提示你,本游戏自带调速功能,在游戏选项里哦,别再抱怨节奏慢了!亲!!": 
    "Hey there! Did you know you can adjust the game speed in the options menu? No more complaining about slow pace!",
  "本游戏有选关功能,请到游戏选项里选择!": 
    "This game has level selection! Check the options menu to choose your level.",
  "只有注册用户才能自动保存关卡进度,未注册用户每次玩请自己选关": 
    "Only registered users get automatic level saving. Guests, please select your level manually.",
  "不会关闭声音?请到游戏选项里勾选静音功能!": 
    "Need to mute? Find the mute option in the game settings!",
  "表忘记游戏选项里面有一个为偷懒人士准备的“自动拾取阳光”的功能!": 
    "Lazy? Enable 'Auto-collect Sun' in the game options!",
  "不会玩?点左下角“点击开始”,再点击右边墓碑上的选项开始玩,初次玩就点“开始冒险吧”": 
    "New to the game? Click 'Click to Start' at bottom left, then select an option from the gravestone. First time? Try 'Start Adventure'!",
  "这游戏是不是给3岁小孩玩的?这么幼稚!亲爱的,如果你玩过原版植物僵尸就不会这么认为了": 
    "Think this game is for kids? Try the original Plants vs Zombies and think again!",
  "这是山寨版?是的,这纯粹就是个人练习程序的产物,后来免费放网上给大家无聊时打发时间的": 
    "Is this a knockoff? Yes, it started as a programming exercise and was later shared for fun.",
  "有广告?这是个人提供的免费游戏,租赁服务器价格不便宜,为了提供更好的硬件所以这是必须的": 
    "Ads? This is a free game. Server costs aren't cheap, and ads help cover the expenses.",
  "初次玩的朋友,请从第一关开始玩起,自然会有教学功能教你一步一步玩下去": 
    "First time playing? Start from level one for a guided tutorial.",
  "为啥看不到阳光或者僵尸?检查一下你浏览器里的广告杀手功能,也许是它在搞鬼!": 
    "Missing sun or zombies? Check if your ad blocker is interfering with the game!",
  "游戏毫无难度?在目前进度下,可以尝试着使用调速功能玩更快的速度": 
    "Too easy? Try increasing the game speed for more challenge!",
  "为啥这么卡?如果你是IE6-8的用户,请使用IE9,Chrome,Firefox,Opera等更好的浏览器!": 
    "Laggy? If you're using IE6-8, please upgrade to IE9+, Chrome, Firefox, or Opera.",
  "如果你支持我,非常感谢,请一如既往继续支持我!": 
    "Your support is greatly appreciated! Please keep it coming!",
  "这是用什么语言写的?javascript,一个简单而又神奇的语言,纯的,JS!": 
    "What's this written in? JavaScript - simple yet powerful, pure JS!",
  
  // Server names and locations
  "号(深圳电信)": " (Shenzhen Telecom)",
  "号(浙江联通)": " (Zhejiang Unicom)",
  "号(浙江电信)": " (Zhejiang Telecom)",
  
  // Default user name
  "游客": "Guest"
};

// Function to recursively process an object and translate its string values
function translateObject(obj) {
  if (typeof obj === 'string') {
    // Check if this string needs translation
    for (const [zh, en] of Object.entries(translations)) {
      if (obj.includes(zh)) {
        return obj.replace(new RegExp(zh, 'g'), en);
      }
    }
    return obj;
  } else if (Array.isArray(obj)) {
    // Process each item in the array
    return obj.map(item => translateObject(item));
  } else if (typeof obj === 'object' && obj !== null) {
    // Process object properties
    const result = {};
    for (const [key, value] of Object.entries(obj)) {
      result[key] = translateObject(value);
    }
    return result;
  }
  return obj;
}

// Function to process a single file
function processFile(filePath) {
  const fs = require('fs');
  const path = require('path');
  
  try {
    // Read the file
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;
    
    // Replace each Chinese string with its English translation
    for (const [zh, en] of Object.entries(translations)) {
      if (content.includes(zh)) {
        content = content.replace(new RegExp(zh, 'g'), en);
        modified = true;
      }
    }
    
    // Write back to the file if modified
    if (modified) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`Translated: ${path.basename(filePath)}`);
    } else {
      console.log(`No translations needed: ${path.basename(filePath)}`);
    }
    
    return modified;
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error.message);
    return false;
  }
}

// Process all JavaScript files in the directory
function processAllFiles(directory) {
  const fs = require('fs');
  const path = require('path');
  
  try {
    const files = fs.readdirSync(directory);
    let translatedCount = 0;
    
    files.forEach(file => {
      if (file.endsWith('.js')) {
        const filePath = path.join(directory, file);
        if (processFile(filePath)) {
          translatedCount++;
        }
      }
    });
    
    console.log(`\nTranslation complete! Processed ${files.length} files, updated ${translatedCount} files.`);
  } catch (error) {
    console.error('Error processing directory:', error.message);
  }
}

// Run the translation on the current directory if this script is executed directly
if (require.main === module) {
  const dir = __dirname;
  console.log(`Starting translation in: ${dir}`);
  processAllFiles(dir);
}

// Export the translation function for use in other scripts
module.exports = {
  translateText: (text) => translations[text] || text,
  translateObject,
  processFile,
  processAllFiles
};
