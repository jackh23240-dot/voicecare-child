// HomeVoice English - 子女端应用主逻辑
// 包含词库、录音、分享功能

// 完整词库 - 10 个场景，每个场景 5 个单词
const wordLibrary = {
    customs: {
        name: '过海关',
        icon: '🛃',
        words: [
            { id: 'c1', word: 'Passport', phonetic: '/ˈpæspɔːrt/', meaning: '护照', example: 'May I see your passport?', exampleCn: '请出示您的护照好吗？', aiScript: '妈，今天教你"Passport"，就是护照的意思。过海关的时候一定要带好哦！' },
            { id: 'c2', word: 'Customs', phonetic: '/ˈkʌstəmz/', meaning: '海关', example: 'We need to go through customs.', exampleCn: '我们需要通过海关检查。', aiScript: 'Customs 就是海关，检查行李的地方。记得要申报带的东西！' },
            { id: 'c3', word: 'Visa', phonetic: '/ˈviːzə/', meaning: '签证', example: 'Do I need a visa?', exampleCn: '我需要签证吗？', aiScript: 'Visa 是签证，去国外要提前办好。你的是旅游签证！' },
            { id: 'c4', word: 'Declaration', phonetic: '/ˌdekləˈreɪʃn/', meaning: '申报', example: 'Do you have anything to declare?', exampleCn: '你有什么要申报的吗？', aiScript: 'Declaration 是申报，过海关时会问你有没有东西要申报！' },
            { id: 'c5', word: 'Luggage', phonetic: '/ˈlʌɡɪdʒ/', meaning: '行李', example: 'This is all my luggage.', exampleCn: '这是我所有的行李。', aiScript: 'Luggage 就是行李，你带的箱子包包都是 luggage！' }
        ]
    },
    shopping: {
        name: '超市买菜',
        icon: '🛒',
        words: [
            { id: 's1', word: 'Vegetable', phonetic: '/ˈvedʒtəbl/', meaning: '蔬菜', example: 'I buy fresh vegetables every day.', exampleCn: '我每天买新鲜蔬菜。', aiScript: '妈，Vegetable 就是蔬菜，你每天买的那些青菜都是 vegetables！' },
            { id: 's2', word: 'Price', phonetic: '/praɪs/', meaning: '价格', example: 'What\'s the price?', exampleCn: '多少钱？', aiScript: 'Price 是价格，买菜的时候问"What\'s the price"就是问多少钱！' },
            { id: 's3', word: 'Discount', phonetic: '/ˈdɪskaʊnt/', meaning: '折扣', example: 'Is there a discount?', exampleCn: '有折扣吗？', aiScript: 'Discount 是折扣，看到打折的商品就可以问"Is there a discount"！' },
            { id: 's4', word: 'Fresh', phonetic: '/freʃ/', meaning: '新鲜的', example: 'The vegetables are very fresh.', exampleCn: '这些蔬菜很新鲜。', aiScript: 'Fresh 是新鲜的意思，买菜要说"fresh vegetables"！' },
            { id: 's5', word: 'Cashier', phonetic: '/kæˈʃɪr/', meaning: '收银台', example: 'Where is the cashier?', exampleCn: '收银台在哪里？', aiScript: 'Cashier 是收银台，结账的时候找 cashier！' }
        ]
    },
    restaurant: {
        name: '餐厅点餐',
        icon: '🍽️',
        words: [
            { id: 'r1', word: 'Menu', phonetic: '/ˈmenju/', meaning: '菜单', example: 'Can I see the menu?', exampleCn: '能给我看看菜单吗？', aiScript: 'Menu 就是菜单，进餐厅第一件事就是"Can I see the menu"！' },
            { id: 'r2', word: 'Order', phonetic: '/ˈɔːrdər/', meaning: '点餐', example: 'I\'d like to order now.', exampleCn: '我现在想点餐。', aiScript: 'Order 是点餐，准备好点菜就说"I\'d like to order"！' },
            { id: 'r3', word: 'Delicious', phonetic: '/dɪˈlɪʃəs/', meaning: '美味的', example: 'This is delicious!', exampleCn: '这个很好吃！', aiScript: 'Delicious 是好吃的意思，吃到好吃的菜可以说"This is delicious"！' },
            { id: 'r4', word: 'Bill', phonetic: '/bɪl/', meaning: '账单', example: 'Can I have the bill?', exampleCn: '能给我账单吗？', aiScript: 'Bill 是账单，吃完饭要结账就说"Can I have the bill"！' },
            { id: 'r5', word: 'Water', phonetic: '/ˈwɔːtər/', meaning: '水', example: 'A glass of water, please.', exampleCn: '请给我一杯水。', aiScript: 'Water 就是水，要喝水就说"water"！' }
        ]
    },
    travel: {
        name: '出行问路',
        icon: '🗺️',
        words: [
            { id: 't1', word: 'Station', phonetic: '/ˈsteɪʃn/', meaning: '车站', example: 'Where is the station?', exampleCn: '车站在哪里？', aiScript: 'Station 是车站，找车站就问"Where is the station"！' },
            { id: 't2', word: 'Ticket', phonetic: '/ˈtɪkɪt/', meaning: '票', example: 'I need a ticket.', exampleCn: '我需要一张票。', aiScript: 'Ticket 就是票，买票的时候说"I need a ticket"！' },
            { id: 't3', word: 'Direction', phonetic: '/daɪˈrekʃn/', meaning: '方向', example: 'Can you show me the direction?', exampleCn: '能告诉我方向吗？', aiScript: 'Direction 是方向，迷路了可以问"Can you show me the direction"！' },
            { id: 't4', word: 'Map', phonetic: '/mæp/', meaning: '地图', example: 'Do you have a map?', exampleCn: '你有地图吗？', aiScript: 'Map 是地图，找路的时候可以看 map！' },
            { id: 't5', word: 'Taxi', phonetic: '/ˈtæksi/', meaning: '出租车', example: 'I need a taxi.', exampleCn: '我需要一辆出租车。', aiScript: 'Taxi 是出租车，打车就说"I need a taxi"！' }
        ]
    },
    health: {
        name: '医院看病',
        icon: '🏥',
        words: [
            { id: 'h1', word: 'Doctor', phonetic: '/ˈdɑːktər/', meaning: '医生', example: 'I need to see a doctor.', exampleCn: '我需要看医生。', aiScript: 'Doctor 是医生，不舒服就说"I need to see a doctor"！' },
            { id: 'h2', word: 'Medicine', phonetic: '/ˈmedsn/', meaning: '药', example: 'Take this medicine.', exampleCn: '吃这个药。', aiScript: 'Medicine 是药，医生开的药就是 medicine！' },
            { id: 'h3', word: 'Hospital', phonetic: '/ˈhɑːspɪtl/', meaning: '医院', example: 'Where is the hospital?', exampleCn: '医院在哪里？', aiScript: 'Hospital 是医院，找医院就问"Where is the hospital"！' },
            { id: 'h4', word: 'Fever', phonetic: '/ˈfiːvər/', meaning: '发烧', example: 'I have a fever.', exampleCn: '我发烧了。', aiScript: 'Fever 是发烧，不舒服可以说"I have a fever"！' },
            { id: 'h5', word: 'Pharmacy', phonetic: '/ˈfɑːrməsi/', meaning: '药店', example: 'Where is the pharmacy?', exampleCn: '药店在哪里？', aiScript: 'Pharmacy 是药店，买药就去 pharmacy！' }
        ]
    },
    greeting: {
        name: '日常问候',
        icon: '👋',
        words: [
            { id: 'g1', word: 'Hello', phonetic: '/həˈloʊ/', meaning: '你好', example: 'Hello, how are you?', exampleCn: '你好，你好吗？', aiScript: 'Hello 是最常用的问候，见到人都可以说！' },
            { id: 'g2', word: 'Thank you', phonetic: '/ˈθæŋk juː/', meaning: '谢谢', example: 'Thank you very much.', exampleCn: '非常感谢。', aiScript: 'Thank you 是谢谢，得到帮助要说哦！' },
            { id: 'g3', word: 'Sorry', phonetic: '/ˈsɔːri/', meaning: '对不起', example: 'I\'m sorry.', exampleCn: '对不起。', aiScript: 'Sorry 是对不起，不小心冒犯别人要说！' },
            { id: 'g4', word: 'Goodbye', phonetic: '/ˌɡʊdˈbaɪ/', meaning: '再见', example: 'Goodbye, see you later.', exampleCn: '再见，回头见。', aiScript: 'Goodbye 是再见，分别的时候说！' },
            { id: 'g5', word: 'Please', phonetic: '/pliːz/', meaning: '请', example: 'Please help me.', exampleCn: '请帮帮我。', aiScript: 'Please 是请，请求帮助要说 please！' }
        ]
    },
    numbers: {
        name: '数字时间',
        icon: '🔢',
        words: [
            { id: 'n1', word: 'One', phonetic: '/wʌn/', meaning: '一', example: 'One apple, please.', exampleCn: '请给我一个苹果。', aiScript: 'One 是一，数数从一开始！' },
            { id: 'n2', word: 'Two', phonetic: '/tuː/', meaning: '二', example: 'Two tickets, please.', exampleCn: '请给我两张票。', aiScript: 'Two 是二，两个东西就说 two！' },
            { id: 'n3', word: 'Time', phonetic: '/taɪm/', meaning: '时间', example: 'What time is it?', exampleCn: '现在几点了？', aiScript: 'Time 是时间，问时间就说"What time"！' },
            { id: 'n4', word: 'Today', phonetic: '/təˈdeɪ/', meaning: '今天', example: 'Today is Monday.', exampleCn: '今天是星期一。', aiScript: 'Today 是今天，每天都是新的开始！' },
            { id: 'n5', word: 'Tomorrow', phonetic: '/təˈmɔːroʊ/', meaning: '明天', example: 'See you tomorrow.', exampleCn: '明天见。', aiScript: 'Tomorrow 是明天，约好明天见就说这个！' }
        ]
    },
    family: {
        name: '家庭成员',
        icon: '👨‍👩‍👧',
        words: [
            { id: 'f1', word: 'Family', phonetic: '/ˈfæməli/', meaning: '家庭', example: 'I love my family.', exampleCn: '我爱我的家人。', aiScript: 'Family 是家庭，一家人就是 family！' },
            { id: 'f2', word: 'Mother', phonetic: '/ˈmʌðər/', meaning: '母亲', example: 'This is my mother.', exampleCn: '这是我的母亲。', aiScript: 'Mother 是母亲，妈妈就是 mother！' },
            { id: 'f3', word: 'Father', phonetic: '/ˈfɑːðər/', meaning: '父亲', example: 'This is my father.', exampleCn: '这是我的父亲。', aiScript: 'Father 是父亲，爸爸就是 father！' },
            { id: 'f4', word: 'Son', phonetic: '/sʌn/', meaning: '儿子', example: 'He is my son.', exampleCn: '他是我的儿子。', aiScript: 'Son 是儿子，你的孩子就是 son！' },
            { id: 'f5', word: 'Daughter', phonetic: '/ˈdɔːtər/', meaning: '女儿', example: 'She is my daughter.', exampleCn: '她是我的女儿。', aiScript: 'Daughter 是女儿，你的孩子就是 daughter！' }
        ]
    },
    weather: {
        name: '天气',
        icon: '🌤️',
        words: [
            { id: 'w1', word: 'Weather', phonetic: '/ˈweðər/', meaning: '天气', example: 'The weather is nice.', exampleCn: '天气很好。', aiScript: 'Weather 是天气，每天都可以聊聊 weather！' },
            { id: 'w2', word: 'Sunny', phonetic: '/ˈsʌni/', meaning: '晴朗的', example: 'It\'s sunny today.', exampleCn: '今天晴朗。', aiScript: 'Sunny 是晴朗，出太阳就是 sunny！' },
            { id: 'w3', word: 'Rain', phonetic: '/reɪn/', meaning: '雨', example: 'It\'s raining.', exampleCn: '下雨了。', aiScript: 'Rain 是雨，下雨天就说 rain！' },
            { id: 'w4', word: 'Cold', phonetic: '/koʊld/', meaning: '冷的', example: 'It\'s cold today.', exampleCn: '今天很冷。', aiScript: 'Cold 是冷的，天气冷就说 cold！' },
            { id: 'w5', word: 'Warm', phonetic: '/wɔːrm/', meaning: '温暖的', example: 'It\'s warm today.', exampleCn: '今天很温暖。', aiScript: 'Warm 是温暖的，舒服的天气就是 warm！' }
        ]
    },
    colors: {
        name: '颜色',
        icon: '🎨',
        words: [
            { id: 'col1', word: 'Red', phonetic: '/red/', meaning: '红色', example: 'This is red.', exampleCn: '这是红色。', aiScript: 'Red 是红色，像苹果一样的颜色！' },
            { id: 'col2', word: 'Blue', phonetic: '/bluː/', meaning: '蓝色', example: 'The sky is blue.', exampleCn: '天空是蓝色的。', aiScript: 'Blue 是蓝色，像天空一样的颜色！' },
            { id: 'col3', word: 'Green', phonetic: '/ɡriːn/', meaning: '绿色', example: 'The grass is green.', exampleCn: '草地是绿色的。', aiScript: 'Green 是绿色，像小草一样的颜色！' },
            { id: 'col4', word: 'White', phonetic: '/waɪt/', meaning: '白色', example: 'The snow is white.', exampleCn: '雪是白色的。', aiScript: 'White 是白色，像雪花一样的颜色！' },
            { id: 'col5', word: 'Black', phonetic: '/blæk/', meaning: '黑色', example: 'The cat is black.', exampleCn: '这只猫是黑色的。', aiScript: 'Black 是黑色，像夜晚一样的颜色！' }
        ]
    }
};

// 应用状态
let appState = {
    currentScene: 'customs',
    currentWordId: null,
    isRecording: false,
    selectedWords: new Set(), // 从词库选择的单词 ID
    demoRecordings: new Map(), // 示范朗读的单词 ID -> { duration, timestamp }
    userRecordings: new Map(), // 用户录制的单词 ID -> { audioBlob, duration, timestamp }
    mediaRecorder: null,
    audioContext: null,
    analyser: null,
    animationId: null,
    recordStartTime: 0,
    recordTimerInterval: null,
    showLibrary: false
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
    
    Object.entries(wordLibrary).forEach(([key, scene]) => {
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
    const scene = wordLibrary[appState.currentScene];
    container.innerHTML = '';
    
    scene.words.forEach((word, index) => {
        const hasDemo = appState.demoRecordings.has(word.id);
        const hasUserRecording = appState.userRecordings.has(word.id);
        const isSelected = appState.selectedWords.has(word.id);
        
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
                    <button onclick="playDemo('${word.id}', '${word.word}')" class="w-10 h-10 bg-secondary/10 rounded-full flex items-center justify-center btn-active hover:bg-secondary/20" title="示范朗读">
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
            
            <!-- 选择框 -->
            <div class="flex items-center gap-2 mb-3 p-3 bg-primary/5 rounded-xl">
                <input type="checkbox" id="select-${word.id}" ${isSelected ? 'checked' : ''} onchange="toggleWordSelection('${word.id}')" class="w-5 h-5 text-primary rounded focus:ring-primary">
                <label for="select-${word.id}" class="text-sm text-on-surface cursor-pointer flex-1">选择此单词加入发送列表</label>
            </div>
            
            <div class="flex gap-2">
                <button onclick="openRecordModal('${word.id}')" class="flex-1 h-12 ${hasUserRecording ? 'bg-primary' : 'bg-primary/10'} text-white rounded-xl font-medium btn-active transition-all flex items-center justify-center gap-2">
                    <span class="material-symbols-rounded text-lg">${hasUserRecording ? 'check_circle' : 'mic'}</span>
                    <span>${hasUserRecording ? '已录制' : '录制发音'}</span>
                </button>
                ${hasUserRecording ? `
                    <button onclick="playRecording('${word.id}')" class="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center btn-active hover:bg-secondary/20">
                        <span class="material-symbols-rounded text-secondary text-2xl">play_circle</span>
                    </button>
                ` : ''}
                ${hasDemo ? `
                    <button onclick="removeDemo('${word.id}')" class="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center btn-active hover:bg-red-200">
                        <span class="material-symbols-rounded text-red-600 text-2xl">delete</span>
                    </button>
                ` : ''}
            </div>
            
            <!-- 示范朗读状态 -->
            ${hasDemo ? `
                <div class="mt-3 flex items-center gap-2 p-2 bg-secondary/10 rounded-lg">
                    <span class="material-symbols-rounded text-secondary text-sm">check_circle</span>
                    <span class="text-xs text-secondary font-medium">已添加示范朗读</span>
                </div>
            ` : ''}
        `;
        container.appendChild(card);
    });
    
    // 更新 AI 提示
    const firstWord = scene.words[0];
    document.getElementById('ai-tip').textContent = firstWord.aiScript;
}

// 切换单词选择
function toggleWordSelection(wordId) {
    if (appState.selectedWords.has(wordId)) {
        appState.selectedWords.delete(wordId);
    } else {
        appState.selectedWords.add(wordId);
    }
    updateSendButton();
    showToast(appState.selectedWords.has(wordId) ? '已添加到发送列表' : '已从列表移除');
}

// 添加示范朗读
function addDemoRecording(wordId) {
    appState.demoRecordings.set(wordId, {
        duration: 0,
        timestamp: Date.now()
    });
    renderCards();
    updateSendButton();
    showToast('已添加示范朗读');
}

// 移除示范朗读
function removeDemo(wordId) {
    appState.demoRecordings.delete(wordId);
    appState.selectedWords.delete(wordId);
    renderCards();
    updateSendButton();
    showToast('已移除示范朗读');
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
    const scene = wordLibrary[appState.currentScene];
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
            appState.userRecordings.set(appState.currentWordId, {
                audioBlob: audioBlob,
                duration: duration,
                timestamp: Date.now()
            });
            
            // 存储到 IndexedDB
            await saveRecordingToDB(appState.currentWordId, audioBlob, duration, 'user');
            
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

// 播放/添加示范朗读
function playDemo(wordId, word) {
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
        const utterance = new SpeechSynthesisUtterance(word);
        utterance.lang = 'en-US';
        utterance.rate = 0.7;
        utterance.pitch = 1.0;
        utterance.volume = 1.0;
        speechSynthesis.speak(utterance);
        
        // 添加到示范朗读列表
        if (!appState.demoRecordings.has(wordId)) {
            addDemoRecording(wordId);
        }
    }, 150);
    
    showToast('示范朗读已添加');
}

// 播放录音
async function playRecording(wordId) {
    const recording = appState.userRecordings.get(wordId);
    if (!recording) return;
    
    const audioUrl = URL.createObjectURL(recording.audioBlob);
    const audio = new Audio(audioUrl);
    audio.play();
    
    showToast('播放录音');
}

// 更新发送按钮
function updateSendButton() {
    const btn = document.getElementById('send-btn');
    const selectedCount = appState.selectedWords.size;
    const demoCount = appState.demoRecordings.size;
    const userCount = appState.userRecordings.size;
    const totalCount = selectedCount + demoCount + userCount;
    
    document.getElementById('recorded-count').textContent = `已选择 ${selectedCount + demoCount} 个单词`;
    
    if (totalCount > 0) {
        btn.disabled = false;
        btn.classList.remove('bg-gray-300');
        btn.classList.add('bg-gradient-to-r', 'from-primary', 'to-primary-dark');
        btn.innerHTML = `
            <span class="material-symbols-rounded text-2xl">send</span>
            <span>发送声音包裹 (${totalCount}个)</span>
        `;
    } else {
        btn.disabled = true;
        btn.classList.add('bg-gray-300');
        btn.classList.remove('bg-gradient-to-r', 'from-primary', 'to-primary-dark');
        btn.innerHTML = `
            <span class="material-symbols-rounded text-2xl">send</span>
            <span>选择单词后发送</span>
        `;
    }
}

// 显示发送预览
function showSendPreview() {
    const previewList = document.getElementById('preview-list');
    previewList.innerHTML = '';
    
    let count = 0;
    
    // 添加选择的单词（示范朗读）
    appState.selectedWords.forEach(wordId => {
        if (!appState.demoRecordings.has(wordId)) {
            addDemoRecording(wordId);
        }
    });
    
    // 显示示范朗读
    appState.demoRecordings.forEach((recording, wordId) => {
        const scene = Object.values(wordLibrary).find(s => s.words.some(w => w.id === wordId));
        const word = scene.words.find(w => w.id === wordId);
        
        const item = document.createElement('div');
        item.className = 'flex items-center gap-3 p-3 bg-surface rounded-xl';
        item.innerHTML = `
            <div class="w-10 h-10 bg-secondary/10 rounded-full flex items-center justify-center flex-shrink-0">
                <span class="material-symbols-rounded text-secondary text-xl">volume_up</span>
            </div>
            <div class="flex-1 min-w-0">
                <p class="font-semibold text-on-surface truncate">${word.word} · ${word.meaning}</p>
                <p class="text-xs text-on-surface-muted">示范朗读 · ${scene.name}</p>
            </div>
            <button onclick="playTTS('${word.word}')" class="w-10 h-10 bg-white rounded-full flex items-center justify-center btn-active shadow-sm">
                <span class="material-symbols-rounded text-primary text-xl">play_arrow</span>
            </button>
        `;
        previewList.appendChild(item);
        count++;
    });
    
    // 显示用户录音
    appState.userRecordings.forEach((recording, wordId) => {
        if (!appState.demoRecordings.has(wordId)) {
            const scene = Object.values(wordLibrary).find(s => s.words.some(w => w.id === wordId));
            const word = scene.words.find(w => w.id === wordId);
            
            const item = document.createElement('div');
            item.className = 'flex items-center gap-3 p-3 bg-surface rounded-xl';
            item.innerHTML = `
                <div class="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <span class="material-symbols-rounded text-primary text-xl">mic</span>
                </div>
                <div class="flex-1 min-w-0">
                    <p class="font-semibold text-on-surface truncate">${word.word} · ${word.meaning}</p>
                    <p class="text-xs text-on-surface-muted">我的录音 · ${recording.duration.toFixed(1)}秒</p>
                </div>
                <button onclick="playRecording('${wordId}')" class="w-10 h-10 bg-white rounded-full flex items-center justify-center btn-active shadow-sm">
                    <span class="material-symbols-rounded text-primary text-xl">play_arrow</span>
                </button>
            `;
            previewList.appendChild(item);
            count++;
        }
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
    const count = appState.demoRecordings.size + appState.userRecordings.size;
    const scene = wordLibrary[appState.currentScene];
    
    return {
        title: `我为你准备了${count}个英语单词`,
        desc: `场景：${scene.icon} ${scene.name}，快来听听吧！`,
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
async function saveRecordingToDB(wordId, audioBlob, duration, type) {
    try {
        const db = await initDB();
        const transaction = db.transaction([STORE_NAME], 'readwrite');
        const store = transaction.objectStore(STORE_NAME);
        
        store.put({
            wordId: wordId,
            audioBlob: audioBlob,
            duration: duration,
            timestamp: Date.now(),
            scene: appState.currentScene,
            type: type
        });
        
        saveToHistory(wordId, type);
        
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
                if (rec.type === 'user') {
                    appState.userRecordings.set(rec.wordId, {
                        audioBlob: rec.audioBlob,
                        duration: rec.duration,
                        timestamp: rec.timestamp
                    });
                } else if (rec.type === 'demo') {
                    appState.demoRecordings.set(rec.wordId, {
                        duration: rec.duration,
                        timestamp: rec.timestamp
                    });
                }
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
function saveToHistory(wordId, type) {
    learningHistory.unshift({
        wordId: wordId,
        timestamp: Date.now(),
        scene: appState.currentScene,
        type: type
    });
    localStorage.setItem('homevoice_history', JSON.stringify(learningHistory));
}

// 显示统计
function showStats() {
    const total = learningHistory.length;
    const weekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
    const weekCount = learningHistory.filter(h => h.timestamp > weekAgo).length;
    const streak = calculateStreak();
    
    document.getElementById('stat-total').textContent = total;
    document.getElementById('stat-week').textContent = weekCount;
    document.getElementById('stat-streak').textContent = streak;
    
    const recentContainer = document.getElementById('stats-recent');
    recentContainer.innerHTML = '';
    
    learningHistory.slice(0, 5).forEach(record => {
        const scene = wordLibrary[record.scene];
        const date = new Date(record.timestamp);
        const timeStr = date.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' });
        
        const item = document.createElement('div');
        item.className = 'flex items-center gap-3 p-2 bg-white rounded-lg';
        item.innerHTML = `
            <span class="text-xl">${scene.icon}</span>
            <div class="flex-1">
                <p class="text-sm font-medium text-on-surface">${scene.name}</p>
                <p class="text-xs text-on-surface-muted">${timeStr} · ${record.type === 'demo' ? '示范' : '录音'}</p>
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
        count: appState.demoRecordings.size + appState.userRecordings.size,
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
        if (appState.isRecording) {
            stopRecording();
        }
    }
});
