# 🏠 HomeVoice English - 家音英语（子女端）

> 用声音传递知识，用亲情温暖学习 🎙️💙

[![Deploy to GitHub Pages](https://img.shields.io/badge/GitHub-Pages-blue?logo=github)](https://jackh23240-dot.github.io/voicecare-child/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## 📱 项目简介

家音英语是一款专为子女设计的亲情英语学习应用。通过每日场景化单词学习，子女可以录制温暖的学习声音，打包成"声音包裹"分享给父母家人，让英语学习成为连接亲情的纽带。

**核心理念**：子女负责"生产内容（录音 + 派单）"，老人负责"情感消费（听声音 + 简单反馈）"

## ✨ 核心功能

### 1. 每日灵感卡片 📚
- 5 大生活场景：过海关、超市买菜、餐厅点餐、出行问路、医院看病
- 每个场景 3 个核心单词，共 15 个实用单词
- 包含音标、释义、例句、AI 智能脚本提示

### 2. 长按录音 🎙️
- 长按录音按钮开始录制
- 实时声波动画可视化
- Web Audio API 专业录音效果
- 录音时长实时显示

### 3. AI 智能脚本 💡
- 智能提示如何向家人讲解单词
- 示例："妈，今天教你'Passport'，就是护照的意思"
- 让学习分享更自然温暖

### 4. 声音包裹 📦
- 录音完成后生成精美预览
- 可回放录制的音频
- 一键分享到微信或复制链接

### 5. 学习统计 📊
- 总学习数量统计
- 本周学习追踪
- 连续打卡天数

## 🚀 快速开始

### 在线访问
访问 GitHub Pages 部署的在线版本：
https://jackh23240-dot.github.io/voicecare-child/

### 本地运行
```bash
# 克隆项目
git clone https://github.com/jackh23240-dot/voicecare-child.git
cd voicecare-child

# 使用任意 HTTP 服务器启动
# 方式 1: Python
python3 -m http.server 8080

# 方式 2: Node.js
npx serve .

# 访问 http://localhost:8080
```

## 📁 项目结构

```
voicecare-child/
├── index.html          # 主页面（SPA 结构）
├── css/
│   └── style.css       # 样式文件
├── js/
│   └── app.js          # 主应用逻辑
├── assets/
│   └── icon.svg        # 应用图标
└── README.md           # 项目说明
```

## 🎨 界面设计

### 设计规范
- **主色调**: 活力蓝 `#3B82F6`
- **辅助色**: 成功绿 `#10B981`、警告橙 `#F59E0B`
- **风格**: 现代、简洁、温暖
- **按钮高度**: 44px 标准触控尺寸
- **响应式**: 手机优先，适配 375px+ 屏幕

### 场景分类
| 场景 | 图标 | 单词示例 |
|------|------|----------|
| 过海关 | 🛃 | Passport, Customs, Visa |
| 超市买菜 | 🛒 | Vegetable, Price, Discount |
| 餐厅点餐 | 🍽️ | Menu, Order, Delicious |
| 出行问路 | 🗺️ | Station, Ticket, Direction |
| 医院看病 | 🏥 | Doctor, Medicine, Hospital |

## 🔧 技术实现

### 前端技术栈
- **HTML5** - 语义化结构
- **CSS3** - Tailwind CSS + 自定义样式
- **JavaScript (ES6+)** - 原生实现，无框架依赖

### 核心 API
- **Web Audio API** - 音频处理和波形分析
- **MediaRecorder API** - 音频录制
- **IndexedDB** - 本地音频数据存储
- **localStorage** - 用户数据和设置
- **SpeechSynthesis API** - TTS 发音预览

### 特性
- ✅ 响应式设计（手机优先）
- ✅ PWA 就绪（可添加到主屏幕）
- ✅ 离线可用
- ✅ 触摸优化交互
- ✅ 无障碍支持

## 💾 数据存储

### localStorage
- 用户设置（提醒、音效）
- 学习历史索引
- 分享记录

### IndexedDB
- 录音音频文件（Blob 存储）
- 数据库名：`HomeVoiceDB`

## 📱 浏览器兼容性

| 浏览器 | 支持程度 |
|--------|----------|
| Chrome (Android) | ✅ 完全支持 |
| Safari (iOS) | ✅ 完全支持 |
| 微信内置浏览器 | ✅ 完全支持 |
| Firefox | ✅ 完全支持 |
| Edge | ✅ 完全支持 |

### 录音功能要求
- 需要 HTTPS 或 localhost 环境
- 需要麦克风权限
- Chrome/Edge 支持最佳

## 🎯 使用流程

1. **打开应用** → 查看今日 3 张灵感卡片
2. **选择场景** → 切换不同学习场景
3. **点击卡片** → 查看单词详情
4. **长按录音** → 录制讲解声音（带声波动画）
5. **松开结束** → 自动保存录音
6. **预览确认** → 点击底部按钮查看已录制内容
7. **分享发送** → 分享到微信或复制链接

## 🔐 隐私说明

- 所有数据存储在本地设备
- 不上传任何用户数据到服务器
- 录音文件保存在 IndexedDB
- 分享功能由用户主动触发

## 🛠️ 开发扩展

### 添加新场景
编辑 `js/app.js` 中的 `wordData` 对象：

```javascript
const wordData = {
    newScene: {
        name: '场景名称',
        icon: '🎯',
        words: [
            { 
                id: 'n1', 
                word: 'NewWord', 
                phonetic: '/音标/', 
                meaning: '释义', 
                example: 'Example sentence.', 
                exampleCn: '例句翻译', 
                aiScript: 'AI 提示脚本' 
            },
            // ... 更多单词
        ]
    }
};
```

### 自定义主题色
编辑 `index.html` 中的 Tailwind 配置：

```javascript
colors: {
    primary: '#你的主色',
    secondary: '#辅助色',
    // ... 更多颜色
}
```

## 📈 路线图

### v1.0 (当前版本)
- ✅ 5 个场景 15 个单词
- ✅ 录音功能
- ✅ 声波动画
- ✅ 分享功能
- ✅ 学习统计

### v1.1 (计划中)
- [ ] 老人端应用
- [ ] 微信订阅消息推送
- [ ] 音频压缩优化
- [ ] 更多场景词库

### v2.0 (未来)
- [ ] AI 纠音评分
- [ ] 云端数据同步
- [ ] 家庭学习圈
- [ ] 成就系统

## 🤝 贡献指南

欢迎提交 Issue 和 Pull Request！

## 📄 许可证

MIT License

## 💝 设计理念

> **"让亲情在英语学习中流淌"**

将英语学习包装成**亲子之间的语音留言**，让学习变成情感连接的载体。

---

**家音英语** - 用声音传递知识，用亲情温暖学习 🎙️💙

## 🌐 在线演示

访问：https://jackh23240-dot.github.io/voicecare-child/
