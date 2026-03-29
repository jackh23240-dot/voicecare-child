// HomeVoice English - 子女端应用主逻辑
// 包含完整的录音、存储、分享功能

// 单词卡片数据 - 5 个场景，每个场景 3 个单词
const wordData = {
    customs: {
        name: '过海关',
        icon: '🛃',
        words: [
            { id: 'c1', word: 'Passport', phonetic: '/ˈpæspɔːrt/', meaning: '护照', example: 'May I see your passport?', exampleCn: '请出示您的护照好吗？', aiScript: '妈，今天教你"Passport"，就是护照的意思。过海关的时候一定要带好哦！' },
            { id: 'c2', word: 'Customs', phonetic: '/ˈkʌstəmz/', meaning: '海关', example: 'We need to go through customs.', exampleCn: '我们需要通过海关检查。', aiScript: 'Customs 就是海关，检查行李的地方。记得要申报带的东西！' },
            { id: 'c3', word: 'Visa', phonetic: '/ˈviːzə/', meaning: '签证', example: 'Do I need a visa?', exampleCn: '我需要签证吗？', aiScript: 'Visa 是签证，去国外要提前办好。你的是旅游签证！' }
        ]
    },
    shopping: {
        name: '超市买菜',
        icon: '🛒',
        words: [
            { id: 's1', word: 'Vegetable', phonetic: '/ˈvedʒtəbl/', meaning: '蔬菜', example: 'I buy fresh vegetables every day.', exampleCn: '我每天买新鲜蔬菜。', aiScript: '妈，Vegetable 就是蔬菜，你每天买的那些青菜都是 vegetables！' },
            { id: 's2', word: 'Price', phonetic: '/praɪs/', meaning: '价格', example: 'What\'s the price?', exampleCn: '多少钱？', aiScript: 'Price 是价格，买菜的时候问"What\'s the price"就是问多少钱！' },
            { id: 's3', word: 'Discount', phonetic: '/ˈdɪskaʊnt/', meaning: '折扣', example: 'Is there a discount?', exampleCn: '有折扣吗？', aiScript: 'Discount 是折扣，看到打折的商品就可以问"Is there a discount"！' }
        ]
    },
    restaurant: {
        name: '餐厅点餐',
        icon: '🍽️',
        words: [
            { id: 'r1', word: 'Menu', phonetic: '/ˈmenju/', meaning: '菜单', example: 'Can I see the menu?', exampleCn: '能给我看看菜单吗？', aiScript: 'Menu 就是菜单，进餐厅第一件事就是"Can I see the menu"！' },
            { id: 'r2', word: 'Order', phonetic: '/ˈɔːrdər/', meaning: '点餐', example: 'I\'d like to order now.', exampleCn: '我现在想点餐。', aiScript: 'Order 是点餐，准备好点菜就说"I\'d like to order"！' },
            { id: 'r3', word: 'Delicious', phonetic: '/dɪˈlɪʃəs/', meaning: '美味的', example: 'This is delicious!', exampleCn: '这个很好吃！', aiScript: 'Delicious 是好吃的意思，吃到好吃的菜可以说"This is delicious"！' }
        ]
    },
    travel: {
        name: '出行问路',
        icon: '🗺️',
        words: [
            { id: 't1', word: 'Station', phonetic: '/ˈsteɪʃn/', meaning: '车站', example: 'Where is the station?', exampleCn: '车站在哪里？', aiScript: 'Station 是车站，找车站就问"Where is the station"！' },
            { id: 't2', word: 'Ticket', phonetic: '/ˈtɪkɪt/', meaning: '票', example: 'I need a ticket.', exampleCn: '我需要一张票。', aiScript: 'Ticket 就是票，买票的时候说"I need a ticket"！' },
            { id: 't3', word: 'Direction', phonetic: '/daɪˈrekʃn/', meaning: '方向', example: 'Can you show me the direction?', exampleCn: '能告诉我方向吗？', aiScript: 'Direction 是方向，迷路了可以问"Can you show me the direction"！' }
        ]
    },
    health: {
        name: '医院看病',
        icon: '🏥',
        words: [
            { id: 'h1', word: 'Doctor', phonetic: '/ˈdɑːktər/', meaning: '医生', example: 'I need to see a doctor.', exampleCn: '我需要看医生。', aiScript: 'Doctor 是医生，不舒服就说"I need to see a doctor"！' },
            { id: 'h2', word: 'Medicine', phonetic: '/ˈmedsn/', meaning: '药', example: 'Take this medicine.', exampleCn: '吃这个药。', aiScript: 'Medicine 是药，医生开的药就是 medicine！' },
            { id: 'h3', word: 'Hospital', phonetic: '/ˈhɑːspɪtl/', meaning: '医院', example: 'Where is the hospital?', exampleCn: '医院在哪里？', aiScript: 'Hospital 是医院，找医院就问"Where is the hospital"！' }
        ]
    }
};

// 应用状态
let appState = {
    currentScene: 'customs',
    currentWordId: null,
    isRecording: false,
    recordedWords: new Map(), // wordId -> { audioBlob, duration, timestamp }
    mediaRecorder: null,
    audioContext: null,
    analyser: null,
    animationId: null,
    recordStartTime: 0,
    recordTimerInterval: null
};

// IndexedDB 配置
const DB_NAME = 'HomeVoiceDB';
const DB_VERSION = 1;
const STORE_NAME = 'recordings';

// 初始化
document.addEventListener('DOMContentLoaded', () => {
    initDate();
    initSceneSelector();
    renderCards();
    initWaveform();
    loadRecordings();
    updateSendButton();
});

// 初始化日期显示
function initDate() {
    const now = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' };
    document.getElementById('current-date').textContent = now.toLocaleDateString('zh-CN', options);
}

// 初始化场景选择器
function initSceneSelector() {
    const container = document.getElementById('scene-selector');
    container.innerHTML = '';
    
    Object.entries(wordData).forEach(([key, scene]) => {
        const btn = document.createElement('button');
        btn.className = `flex-shrink-0 px-4 py-2 rounded-full font-medium transition-all btn-active ${
            appState.currentScene === key 
                ? 'bg-primary text-white shadow-md shadow-primary/30' 
                : 'bg-white text-on-surface-muted hover:bg-surface'
        }`;
        btn.innerHTML = `${scene.icon} ${scene.name}`;
        btn.onclick = () => switchScene(key);
        container.appendChild(btn);
    });
}

// 切换场景
function switchScene(sceneKey) {
    appState.currentScene = sceneKey;
    initSceneSelector();
    renderCards();
}

// 渲染单词卡片
function renderCards() {
    const container = document.getElementById('cards-container');
    const scene = wordData[appState.currentScene];
    container.innerHTML = '';
    
    scene.words.forEach((word, index) => {
        const isRecorded = appState.recordedWords.has(word.id);
        const card = document.createElement('div');
        card.className = 'bg-white rounded-2xl p-5 shadow-sm border border-surface card-enter';
        card.style.animationDelay = `${index * 0.1}s`;
        card.innerHTML = `
            <div class="flex items-start justify-between mb-3">
                <div>
                    <h3 class="text-2xl font-bold text-on-surface">${word.word}</h3>
                    <p class="text-sm text-on-surface-muted">${word.phonetic}</p>
                </div>
                <div class="flex gap-2">
                    <button onclick="playDemo('${word.word}')" class="w-10 h-10 bg-secondary/10 rounded-full flex items-center justify-center btn-active hover:bg-secondary/20" title="示范朗读">
                        <span class="material-symbols-rounded text-secondary text-xl">volume_up</span>
                    </button>
                    <button onclick="playTTS('${word.word}')" class="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center btn-active hover:bg-primary/20" title="播放发音">
                        <span class="material-symbols-rounded text-primary text-xl">play_arrow</span>
                    </button>
                </div>
            </div>
            <div class="flex items-baseline gap-2 mb-3">
                <span class="text-lg font-semibold text-on-surface">${word.meaning}</span>
            </div>
            <div class="bg-surface rounded-xl p-3 mb-4">
                <p class="text-sm text-on-surface">${word.example}</p>
                <p class="text-xs text-on-surface-muted mt-1">${word.exampleCn}</p>
            </div>
            <div class="flex gap-2">
                <button onclick="openRecordModal('${word.id}')" class="flex-1 h-12 ${isRecorded ? 'bg-primary' : 'bg-primary/10'} text-white rounded-xl font-medium btn-active transition-all flex items-center justify-center gap-2">
                    <span class="material-symbols-rounded text-lg">${isRecorded ? 'check_circle' : 'mic'}</span>
                    <span>${isRecorded ? '已录制' : '录制发音'}</span>
                </button>
                ${isRecorded ? `
                    <button onclick="playRecording('${word.id}')" class="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center btn-active hover:bg-secondary/20">
                        <span class="material-symbols-rounded text-secondary text-2xl">play_circle</span>
                    </button>
                ` : ''}
            </div>
        `;
        container.appendChild(card);
    });
    
    // 更新 AI 提示
    const firstWord = scene.words[0];
    document.getElementById('ai-tip').textContent = firstWord.aiScript;
}

// 初始化波形
function initWaveform() {
    const container = document.getElementById('waveform');
    container.innerHTML = '';
    for (let i = 0; i < 40; i++) {
        const bar = document.createElement('div');
        bar.className = 'waveform-bar';
        bar.style.height = '10%';
        container.appendChild(bar);
    }
}

// 打开录音模态框
function openRecordModal(wordId) {
    const scene = wordData[appState.currentScene];
    const word = scene.words.find(w => w.id === wordId);
    
    appState.currentWordId = wordId;
    document.getElementById('record-word-title').textContent = word.word;
    document.getElementById('record-word-meaning').textContent = word.meaning;
    document.getElementById('record-modal').classList.add('active');
    
    initWaveform();
}

// 关闭录音模态框
function closeRecordModal() {
    stopRecording();
    document.getElementById('record-modal').classList.remove('active');
}

// 开始录音
async function startRecording(event) {
    if (event) event.preventDefault();
    if (appState.isRecording) return;
    
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ 
            audio: {
                echoCancellation: true,
                noiseSuppression: true,
                sampleRate: 44100
            } 
        });
        
        appState.mediaRecorder = new MediaRecorder(stream, {
            mimeType: 'audio/webm;codecs=opus'
        });
        
        const audioChunks = [];
        
        appState.mediaRecorder.ondataavailable = (event) => {
            if (event.data.size > 0) {
                audioChunks.push(event.data);
            }
        };
        
        appState.mediaRecorder.onstop = async () => {
            const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
            const duration = (Date.now() - appState.recordStartTime) / 1000;
            
            // 保存录音
            appState.recordedWords.set(appState.currentWordId, {
                audioBlob: audioBlob,
                duration: duration,
                timestamp: Date.now()
            });
            
            // 存储到 IndexedDB
            await saveRecordingToDB(appState.currentWordId, audioBlob, duration);
            
            // 更新 UI
            renderCards();
            updateSendButton();
            closeRecordModal();
            showToast('录制成功！');
            
            // 停止音轨
            stream.getTracks().forEach(track => track.stop());
        };
        
        // 设置音频分析器用于波形动画
        appState.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const source = appState.audioContext.createMediaStreamSource(stream);
        appState.analyser = appState.audioContext.createAnalyser();
        source.connect(appState.analyser);
        appState.analyser.fftSize = 64;
        
        // 开始录音
        appState.mediaRecorder.start();
        appState.isRecording = true;
        appState.recordStartTime = Date.now();
        
        // 更新 UI
        document.getElementById('record-icon').textContent = 'stop';
        document.getElementById('record-text').textContent = '松开结束';
        document.getElementById('record-status').textContent = '正在录音...';
        document.getElementById('record-btn').classList.add('bg-red-500');
        
        // 开始计时器
        appState.recordTimerInterval = setInterval(updateTimer, 100);
        
        // 开始波形动画
        animateWaveform();
        
    } catch (err) {
        console.error('录音失败:', err);
        showToast('无法访问麦克风，请检查权限设置');
    }
}

// 停止录音
function stopRecording() {
    if (!appState.isRecording || !appState.mediaRecorder) return;
    
    appState.mediaRecorder.stop();
    appState.isRecording = false;
    
    // 停止计时器
    if (appState.recordTimerInterval) {
        clearInterval(appState.recordTimerInterval);
        appState.recordTimerInterval = null;
    }
    
    // 停止动画
    if (appState.animationId) {
        cancelAnimationFrame(appState.animationId);
        appState.animationId = null;
    }
    
    // 关闭音频上下文
    if (appState.audioContext) {
        appState.audioContext.close();
        appState.audioContext = null;
    }
    
    // 重置 UI
    document.getElementById('record-icon').textContent = 'mic';
    document.getElementById('record-text').textContent = '长按录音';
    document.getElementById('record-status').textContent = '点击按钮开始录音';
    document.getElementById('record-timer').textContent = '00:00';
    document.getElementById('record-btn').classList.remove('bg-red-500');
    
    initWaveform();
}

// 更新计时器
function updateTimer() {
    const elapsed = Math.floor((Date.now() - appState.recordStartTime) / 1000);
    const minutes = Math.floor(elapsed / 60).toString().padStart(2, '0');
    const seconds = (elapsed % 60).toString().padStart(2, '0');
    document.getElementById('record-timer').textContent = `${minutes}:${seconds}`;
}

// 波形动画
function animateWaveform() {
    if (!appState.analyser) return;
    
    const bufferLength = appState.analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    const bars = document.querySelectorAll('.waveform-bar');
    
    const draw = () => {
        if (!appState.isRecording) return;
        
        appState.analyser.getByteFrequencyData(dataArray);
        
        bars.forEach((bar, index) => {
            const value = dataArray[index % bufferLength];
            const percent = value / 255;
            bar.style.height = `${Math.max(10, percent * 100)}%`;
            bar.classList.add('recording');
        });
        
        appState.animationId = requestAnimationFrame(draw);
    };
    
    draw();
}

// 播放 TTS（机器发音）
function playTTS(text) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = 0.8;
    speechSynthesis.speak(utterance);
    showToast('播放发音');
}

// 播放示范朗读（真人发音模拟 - 使用更高质量的 TTS）
function playDemo(text) {
    // 先播放提示音
    const context = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = context.createOscillator();
    const gainNode = context.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(context.destination);
    
    oscillator.frequency.value = 800;
    oscillator.type = 'sine';
    gainNode.gain.setValueAtTime(0.1, context.currentTime);
    
    oscillator.start(context.currentTime);
    oscillator.stop(context.currentTime + 0.1);
    
    // 然后播放单词
    setTimeout(() => {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'en-US';
        utterance.rate = 0.7;
        utterance.pitch = 1.0;
        utterance.volume = 1.0;
        speechSynthesis.speak(utterance);
    }, 150);
    
    showToast('示范朗读');
}

// 播放录音
async function playRecording(wordId) {
    const recording = appState.recordedWords.get(wordId);
    if (!recording) return;
    
    const audioUrl = URL.createObjectURL(recording.audioBlob);
    const audio = new Audio(audioUrl);
    audio.play();
    
    showToast('播放录音');
}

// 更新发送按钮
function updateSendButton() {
    const btn = document.getElementById('send-btn');
    const count = appState.recordedWords.size;
    
    document.getElementById('recorded-count').textContent = `已录制 ${count}/3 个单词`;
    
    if (count > 0) {
        btn.disabled = false;
        btn.classList.remove('bg-gray-300');
        btn.classList.add('bg-gradient-to-r', 'from-primary', 'to-primary-dark');
        btn.innerHTML = `
            <span class="material-symbols-rounded text-2xl">send</span>
            <span>发送声音包裹 (${count}个)</span>
        `;
    } else {
        btn.disabled = true;
        btn.classList.add('bg-gray-300');
        btn.classList.remove('bg-gradient-to-r', 'from-primary', 'to-primary-dark');
        btn.innerHTML = `
            <span class="material-symbols-rounded text-2xl">send</span>
            <span>选择单词后录音</span>
        `;
    }
}

// 显示发送预览
function showSendPreview() {
    const previewList = document.getElementById('preview-list');
    previewList.innerHTML = '';
    
    let count = 0;
    appState.recordedWords.forEach((recording, wordId) => {
        const scene = Object.values(wordData).find(s => s.words.some(w => w.id === wordId));
        const word = scene.words.find(w => w.id === wordId);
        
        const item = document.createElement('div');
        item.className = 'flex items-center gap-3 p-3 bg-surface rounded-xl';
        item.innerHTML = `
            <div class="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                <span class="material-symbols-rounded text-primary text-xl">mic</span>
            </div>
            <div class="flex-1 min-w-0">
                <p class="font-semibold text-on-surface truncate">${word.word} · ${word.meaning}</p>
                <p class="text-xs text-on-surface-muted">${recording.duration.toFixed(1)}秒 · ${scene.name}</p>
            </div>
            <button onclick="playRecording('${wordId}')" class="w-10 h-10 bg-white rounded-full flex items-center justify-center btn-active shadow-sm">
                <span class="material-symbols-rounded text-primary text-xl">play_arrow</span>
            </button>
        `;
        previewList.appendChild(item);
        count++;
    });
    
    document.getElementById('preview-count').textContent = count;
    document.getElementById('preview-modal').classList.add('active');
}

// 关闭预览模态框
function closePreviewModal() {
    document.getElementById('preview-modal').classList.remove('active');
}

// 分享到微信
function shareToWeChat() {
    const shareData = generateShareData();
    
    // 尝试使用微信 JS-SDK（如果可用）
    if (typeof wx !== 'undefined') {
        wx.updateAppMessageShareData({
            title: shareData.title,
            desc: shareData.desc,
            link: window.location.href,
            imgUrl: shareData.imgUrl,
            success: () => {
                showToast('分享成功！');
                saveShareHistory();
                closePreviewModal();
            }
        });
    } else {
        // 降级方案：复制链接
        copyShareLink();
    }
}

// 生成分享数据
function generateShareData() {
    const count = appState.recordedWords.size;
    const scene = wordData[appState.currentScene];
    
    return {
        title: `我为你录了${count}个英语单词`,
        desc: `场景：${scene.icon} ${scene.name}，快来听听我的声音吧！`,
        imgUrl: 'https://raw.githubusercontent.com/jackh23240-dot/voicecare-child/main/assets/share-card.png'
    };
}

// 复制分享链接
async function copyShareLink() {
    const shareData = generateShareData();
    const shareText = `${shareData.title}\n${shareData.desc}\n\n${window.location.href}`;
    
    try {
        await navigator.clipboard.writeText(shareText);
        showToast('链接已复制，可以粘贴发送给家人了！');
        saveShareHistory();
        closePreviewModal();
    } catch (err) {
        // 降级方案：选择文本
        const textArea = document.createElement('textarea');
        textArea.value = shareText;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        showToast('链接已复制！');
    }
}

// IndexedDB 操作
async function initDB() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, DB_VERSION);
        
        request.onerror = () => reject(request.error);
        request.onsuccess = () => resolve(request.result);
        
        request.onupgradeneeded = (event) => {
            const db = event.target.result;
            if (!db.objectStoreNames.contains(STORE_NAME)) {
                db.createObjectStore(STORE_NAME, { keyPath: 'wordId' });
            }
        };
    });
}

// 保存录音到 IndexedDB
async function saveRecordingToDB(wordId, audioBlob, duration) {
    try {
        const db = await initDB();
        const transaction = db.transaction([STORE_NAME], 'readwrite');
        const store = transaction.objectStore(STORE_NAME);
        
        store.put({
            wordId: wordId,
            audioBlob: audioBlob,
            duration: duration,
            timestamp: Date.now(),
            scene: appState.currentScene
        });
        
        // 保存到学习历史
        saveToHistory(wordId);
        
    } catch (err) {
        console.error('保存录音失败:', err);
    }
}

// 从 IndexedDB 加载录音
async function loadRecordings() {
    try {
        const db = await initDB();
        const transaction = db.transaction([STORE_NAME], 'readonly');
        const store = transaction.objectStore(STORE_NAME);
        const request = store.getAll();
        
        request.onsuccess = () => {
            const recordings = request.result;
            recordings.forEach(rec => {
                appState.recordedWords.set(rec.wordId, {
                    audioBlob: rec.audioBlob,
                    duration: rec.duration,
                    timestamp: rec.timestamp
                });
            });
            renderCards();
            updateSendButton();
        };
    } catch (err) {
        console.error('加载录音失败:', err);
    }
}

// 学习历史
let learningHistory = [];

// 保存到历史
function saveToHistory(wordId) {
    learningHistory.unshift({
        wordId: wordId,
        timestamp: Date.now(),
        scene: appState.currentScene
    });
    localStorage.setItem('homevoice_history', JSON.stringify(learningHistory));
}

// 显示统计
function showStats() {
    const total = learningHistory.length;
    
    // 本周统计
    const weekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
    const weekCount = learningHistory.filter(h => h.timestamp > weekAgo).length;
    
    // 连续天数
    const streak = calculateStreak();
    
    document.getElementById('stat-total').textContent = total;
    document.getElementById('stat-week').textContent = weekCount;
    document.getElementById('stat-streak').textContent = streak;
    
    // 最近记录
    const recentContainer = document.getElementById('stats-recent');
    recentContainer.innerHTML = '';
    
    learningHistory.slice(0, 5).forEach(record => {
        const scene = wordData[record.scene];
        const date = new Date(record.timestamp);
        const timeStr = date.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' });
        
        const item = document.createElement('div');
        item.className = 'flex items-center gap-3 p-2 bg-white rounded-lg';
        item.innerHTML = `
            <span class="text-xl">${scene.icon}</span>
            <div class="flex-1">
                <p class="text-sm font-medium text-on-surface">${scene.name}</p>
                <p class="text-xs text-on-surface-muted">${timeStr}</p>
            </div>
        `;
        recentContainer.appendChild(item);
    });
    
    document.getElementById('stats-modal').classList.add('active');
}

// 计算连续天数
function calculateStreak() {
    if (learningHistory.length === 0) return 0;
    
    let streak = 1;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    let currentDate = new Date(today);
    
    for (let i = 0; i < learningHistory.length; i++) {
        const recordDate = new Date(learningHistory[i].timestamp);
        recordDate.setHours(0, 0, 0, 0);
        
        const diffDays = Math.floor((today - recordDate) / (24 * 60 * 60 * 1000));
        
        if (diffDays === streak - 1) {
            streak++;
        } else if (diffDays > streak) {
            break;
        }
    }
    
    return Math.max(1, streak - 1);
}

// 关闭统计
function closeStats() {
    document.getElementById('stats-modal').classList.remove('active');
}

// 显示历史
function showHistory() {
    showToast('历史记录功能开发中...');
}

// 保存分享历史
function saveShareHistory() {
    const shareRecord = {
        timestamp: Date.now(),
        count: appState.recordedWords.size,
        scene: appState.currentScene
    };
    
    let shares = JSON.parse(localStorage.getItem('homevoice_shares') || '[]');
    shares.unshift(shareRecord);
    localStorage.setItem('homevoice_shares', JSON.stringify(shares.slice(0, 50)));
}

// Toast 提示
function showToast(message) {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toast-message');
    
    toastMessage.textContent = message;
    toast.style.opacity = '1';
    toast.style.transform = 'translateX(-50%) translateY(0)';
    
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(-50%) translateY(-10px)';
    }, 2000);
}

// 页面可见性变化处理
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // 页面隐藏时停止录音
        if (appState.isRecording) {
            stopRecording();
        }
    }
});
