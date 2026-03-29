/**
 * 家音英语 - 卡片数据管理
 * 负责单词卡片的存储、获取和管理
 */

const Cards = {
    // 单词卡片数据
    wordCards: [
        {
            id: 1,
            scene: '过海关',
            sceneIcon: '🛃',
            word: 'Passport',
            translation: '护照',
            pronunciation: '/ˈpæspɔːrt/',
            example: {
                en: 'May I see your passport, please?',
                zh: '请出示您的护照好吗？'
            },
            aiScript: '妈，今天教你 "Passport"，就是护照的意思。过海关的时候一定会用到！',
            category: 'travel',
            difficulty: 'easy'
        },
        {
            id: 2,
            scene: '超市买菜',
            sceneIcon: '🛒',
            word: 'Vegetables',
            translation: '蔬菜',
            pronunciation: '/ˈvedʒtəbəlz/',
            example: {
                en: 'I need to buy some fresh vegetables.',
                zh: '我需要买一些新鲜蔬菜。'
            },
            aiScript: '妈，"Vegetables" 是蔬菜的意思。去超市买菜时可以这样说哦～',
            category: 'shopping',
            difficulty: 'easy'
        },
        {
            id: 3,
            scene: '问路',
            sceneIcon: '🗺️',
            word: 'Excuse me',
            translation: '打扰一下',
            pronunciation: '/ɪkˈskjuːz miː/',
            example: {
                en: 'Excuse me, could you tell me the way to the station?',
                zh: '打扰一下，您能告诉我去车站的路吗？'
            },
            aiScript: '妈，问路前先说 "Excuse me"，就是"打扰一下"，很有礼貌的表达！',
            category: 'travel',
            difficulty: 'easy'
        },
        {
            id: 4,
            scene: '餐厅点餐',
            sceneIcon: '🍽️',
            word: 'Menu',
            translation: '菜单',
            pronunciation: '/ˈmenjuː/',
            example: {
                en: 'Could I see the menu, please?',
                zh: '请问可以看一下菜单吗？'
            },
            aiScript: '妈，"Menu" 就是菜单。在餐厅吃饭时可以用到这个单词～',
            category: 'dining',
            difficulty: 'easy'
        },
        {
            id: 5,
            scene: '购物付款',
            sceneIcon: '💳',
            word: 'Credit card',
            translation: '信用卡',
            pronunciation: '/ˈkredɪt kɑːrd/',
            example: {
                en: 'Can I pay by credit card?',
                zh: '我可以用信用卡付款吗？'
            },
            aiScript: '妈，"Credit card" 是信用卡。现在购物经常用到呢！',
            category: 'shopping',
            difficulty: 'medium'
        },
        {
            id: 6,
            scene: '医院看病',
            sceneIcon: '🏥',
            word: 'Doctor',
            translation: '医生',
            pronunciation: '/ˈdɑːktər/',
            example: {
                en: 'I need to see a doctor.',
                zh: '我需要看医生。'
            },
            aiScript: '妈，"Doctor" 是医生的意思。不舒服的时候要知道这个单词哦～',
            category: 'health',
            difficulty: 'easy'
        },
        {
            id: 7,
            scene: '打电话',
            sceneIcon: '📞',
            word: 'Hold on',
            translation: '稍等一下',
            pronunciation: '/hoʊld ɒn/',
            example: {
                en: 'Hold on, let me get a pen.',
                zh: '稍等，我去拿支笔。'
            },
            aiScript: '妈，电话里让人等一下说 "Hold on"，很实用的表达！',
            category: 'communication',
            difficulty: 'medium'
        },
        {
            id: 8,
            scene: '天气聊天',
            sceneIcon: '🌤️',
            word: 'Weather',
            translation: '天气',
            pronunciation: '/ˈweðər/',
            example: {
                en: 'The weather is nice today.',
                zh: '今天天气真好。'
            },
            aiScript: '妈，"Weather" 是天气。聊天时经常说到呢～',
            category: 'daily',
            difficulty: 'easy'
        },
        {
            id: 9,
            scene: '乘坐出租车',
            sceneIcon: '🚕',
            word: 'Destination',
            translation: '目的地',
            pronunciation: '/ˌdestɪˈneɪʃn/',
            example: {
                en: 'What\'s your destination?',
                zh: '您的目的地是哪里？'
            },
            aiScript: '妈，打车时司机问 "Destination" 就是问你要去哪里～',
            category: 'travel',
            difficulty: 'medium'
        },
        {
            id: 10,
            scene: '朋友聚会',
            sceneIcon: '🎉',
            word: 'Cheers',
            translation: '干杯',
            pronunciation: '/tʃɪrz/',
            example: {
                en: 'Cheers to our friendship!',
                zh: '为我们的友谊干杯！'
            },
            aiScript: '妈，聚会时说 "Cheers" 就是干杯的意思，很开心用的！',
            category: 'social',
            difficulty: 'easy'
        }
    ],

    // 初始化
    init() {
        this.loadFavorites();
        this.loadHistory();
    },

    // 获取今日卡片（每天 3 张）
    getTodayCards() {
        const today = new Date().toDateString();
        const lastDate = localStorage.getItem('cards_last_date');
        
        // 如果是新的一天，重新选择卡片
        if (lastDate !== today) {
            const shuffled = [...this.wordCards].sort(() => Math.random() - 0.5);
            const selected = shuffled.slice(0, 3);
            
            localStorage.setItem('cards_last_date', today);
            localStorage.setItem('cards_today', JSON.stringify(selected.map(c => c.id)));
            
            return selected;
        }
        
        // 否则返回今天已选的卡片
        const todayIds = JSON.parse(localStorage.getItem('cards_today') || '[]');
        return this.wordCards.filter(card => todayIds.includes(card.id));
    },

    // 根据 ID 获取卡片
    getCardById(id) {
        return this.wordCards.find(card => card.id === id);
    },

    // 获取所有卡片
    getAllCards() {
        return this.wordCards;
    },

    // 按类别获取卡片
    getCardsByCategory(category) {
        return this.wordCards.filter(card => card.category === category);
    },

    // 收藏管理
    loadFavorites() {
        const favorites = localStorage.getItem('favorites');
        this.favorites = favorites ? JSON.parse(favorites) : [];
    },

    saveFavorites() {
        localStorage.setItem('favorites', JSON.stringify(this.favorites));
    },

    toggleFavorite(cardId) {
        const index = this.favorites.indexOf(cardId);
        if (index === -1) {
            this.favorites.push(cardId);
        } else {
            this.favorites.splice(index, 1);
        }
        this.saveFavorites();
        return this.favorites.includes(cardId);
    },

    isFavorite(cardId) {
        return this.favorites.includes(cardId);
    },

    // 历史记录管理
    loadHistory() {
        const history = localStorage.getItem('history');
        this.history = history ? JSON.parse(history) : [];
    },

    saveHistory() {
        localStorage.setItem('history', JSON.stringify(this.history));
    },

    addToHistory(cardId, audioBlob, timestamp = Date.now()) {
        const record = {
            id: Date.now(),
            cardId,
            card: this.getCardById(cardId),
            audioBlob,
            timestamp,
            date: new Date(timestamp).toLocaleDateString('zh-CN')
        };
        
        this.history.unshift(record);
        this.saveHistory();
        
        // 同时保存音频数据
        if (audioBlob) {
            this.saveAudioData(record.id, audioBlob);
        }
        
        return record;
    },

    getHistory() {
        return this.history;
    },

    // 音频数据管理（使用 IndexedDB 存储大文件）
    saveAudioData(recordId, audioBlob) {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open('HomeVoiceAudio', 1);
            
            request.onerror = () => reject(request.error);
            request.onsuccess = () => {
                const db = request.result;
                const transaction = db.transaction(['audio'], 'readwrite');
                const store = transaction.objectStore('audio');
                
                store.put({ id: recordId, blob: audioBlob });
                transaction.oncomplete = () => resolve();
            };
            
            request.onupgradeneeded = (event) => {
                const db = event.target.result;
                if (!db.objectStoreNames.contains('audio')) {
                    db.createObjectStore('audio', { keyPath: 'id' });
                }
            };
        });
    },

    getAudioData(recordId) {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open('HomeVoiceAudio', 1);
            
            request.onerror = () => reject(request.error);
            request.onsuccess = () => {
                const db = request.result;
                const transaction = db.transaction(['audio'], 'readonly');
                const store = transaction.objectStore('audio');
                
                const audioRequest = store.get(recordId);
                audioRequest.onsuccess = () => resolve(audioRequest.result?.blob);
                audioRequest.onerror = () => reject(audioRequest.error);
            };
            
            request.onupgradeneeded = (event) => {
                const db = event.target.result;
                if (!db.objectStoreNames.contains('audio')) {
                    db.createObjectStore('audio', { keyPath: 'id' });
                }
            };
        });
    },

    // 统计信息
    getStats() {
        const today = new Date();
        const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
        
        const weekCount = this.history.filter(h => h.timestamp >= weekAgo.getTime()).length;
        
        // 计算连续天数
        let streak = 0;
        const dates = [...new Set(this.history.map(h => new Date(h.timestamp).toDateString()))];
        dates.sort((a, b) => new Date(b) - new Date(a));
        
        let currentDate = new Date();
        for (const dateStr of dates) {
            const date = new Date(dateStr);
            const diffDays = Math.floor((currentDate - date) / (24 * 60 * 60 * 1000));
            
            if (diffDays <= 1) {
                streak++;
                currentDate = date;
            } else {
                break;
            }
        }
        
        return {
            total: this.history.length,
            week: weekCount,
            streak
        };
    }
};

// 初始化
Cards.init();
