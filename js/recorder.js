/**
 * 家音英语 - 录音功能模块
 * 使用 Web Audio API 和 MediaRecorder API 实现录音和声波动画
 */

const Recorder = {
    // 状态
    isRecording: false,
    audioContext: null,
    analyser: null,
    microphone: null,
    mediaRecorder: null,
    audioChunks: [],
    animationFrame: null,
    startTime: null,
    timerInterval: null,

    // 初始化
    init() {
        this.canvas = document.getElementById('waveform');
        this.canvasCtx = this.canvas?.getContext('2d');
        this.statusDot = document.querySelector('.status-dot');
        this.statusText = document.querySelector('.status-text');
        this.timerDisplay = document.getElementById('record-timer');
        
        this.setupCanvas();
        window.addEventListener('resize', () => this.setupCanvas());
    },

    // 设置画布
    setupCanvas() {
        if (!this.canvas) return;
        
        const dpr = window.devicePixelRatio || 1;
        const rect = this.canvas.getBoundingClientRect();
        
        this.canvas.width = rect.width * dpr;
        this.canvas.height = rect.height * dpr;
        
        this.canvasCtx.scale(dpr, dpr);
        this.canvasWidth = rect.width;
        this.canvasHeight = rect.height;
        
        // 绘制初始状态
        this.drawIdleWaveform();
    },

    // 绘制空闲状态波形
    drawIdleWaveform() {
        if (!this.canvasCtx) return;
        
        this.canvasCtx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
        this.canvasCtx.fillStyle = '#E5E7EB';
        
        const barCount = 30;
        const barWidth = this.canvasWidth / barCount;
        
        for (let i = 0; i < barCount; i++) {
            const barHeight = 10 + Math.sin(i * 0.5) * 5;
            const x = i * barWidth;
            const y = (this.canvasHeight - barHeight) / 2;
            
            this.canvasCtx.fillRect(x + 2, y, barWidth - 4, barHeight);
        }
    },

    // 开始录音
    async start() {
        try {
            // 请求麦克风权限
            const stream = await navigator.mediaDevices.getUserMedia({ 
                audio: {
                    echoCancellation: true,
                    noiseSuppression: true,
                    sampleRate: 44100
                } 
            });

            // 创建 AudioContext
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            this.analyser = this.audioContext.createAnalyser();
            this.analyser.fftSize = 256;
            
            this.microphone = this.audioContext.createMediaStreamSource(stream);
            this.microphone.connect(this.analyser);

            // 创建 MediaRecorder
            this.mediaRecorder = new MediaRecorder(stream, {
                mimeType: 'audio/webm;codecs=opus'
            });

            this.audioChunks = [];
            
            this.mediaRecorder.ondataavailable = (event) => {
                if (event.data.size > 0) {
                    this.audioChunks.push(event.data);
                }
            };

            this.mediaRecorder.start(100);

            // 更新状态
            this.isRecording = true;
            this.startTime = Date.now();
            
            if (this.statusDot) {
                this.statusDot.classList.add('recording');
            }
            if (this.statusText) {
                this.statusText.textContent = '录音中...';
            }

            // 启动计时器
            this.startTimer();
            
            // 启动波形动画
            this.animateWaveform();

            return true;
        } catch (error) {
            console.error('录音启动失败:', error);
            
            if (error.name === 'NotAllowedError') {
                alert('需要麦克风权限才能录音，请在浏览器设置中允许访问麦克风。');
            } else if (error.name === 'NotFoundError') {
                alert('未检测到麦克风设备，请检查设备连接。');
            }
            
            return false;
        }
    },

    // 停止录音
    stop() {
        return new Promise((resolve) => {
            if (!this.isRecording) {
                resolve(null);
                return;
            }

            // 停止 MediaRecorder
            this.mediaRecorder.onstop = () => {
                const audioBlob = new Blob(this.audioChunks, { type: 'audio/webm' });
                resolve(audioBlob);
            };

            this.mediaRecorder.stop();

            // 停止所有音轨
            this.mediaRecorder.stream.getTracks().forEach(track => track.stop());

            // 关闭 AudioContext
            if (this.audioContext) {
                this.audioContext.close();
                this.audioContext = null;
            }

            // 更新状态
            this.isRecording = false;
            
            if (this.statusDot) {
                this.statusDot.classList.remove('recording');
            }
            if (this.statusText) {
                this.statusText.textContent = '按住说话';
            }

            // 停止计时器
            this.stopTimer();

            // 停止动画
            if (this.animationFrame) {
                cancelAnimationFrame(this.animationFrame);
                this.animationFrame = null;
            }

            // 绘制最终波形
            this.drawFinalWaveform();
        });
    },

    // 录制音频波形动画
    animateWaveform() {
        if (!this.isRecording || !this.analyser) return;

        const bufferLength = this.analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);
        
        const draw = () => {
            if (!this.isRecording) return;

            this.analyser.getByteFrequencyData(dataArray);

            this.canvasCtx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);

            const barCount = 60;
            const barWidth = this.canvasWidth / barCount;
            const step = Math.floor(bufferLength / barCount);

            for (let i = 0; i < barCount; i++) {
                const value = dataArray[i * step];
                const barHeight = (value / 255) * this.canvasHeight * 0.8;
                
                const x = i * barWidth;
                const y = (this.canvasHeight - barHeight) / 2;

                // 渐变色
                const gradient = this.canvasCtx.createLinearGradient(x, 0, x + barWidth, 0);
                gradient.addColorStop(0, '#3B82F6');
                gradient.addColorStop(0.5, '#60A5FA');
                gradient.addColorStop(1, '#3B82F6');

                this.canvasCtx.fillStyle = gradient;
                this.canvasCtx.beginPath();
                this.canvasCtx.roundRect(x + 1, y, barWidth - 2, barHeight, 3);
                this.canvasCtx.fill();
            }

            this.animationFrame = requestAnimationFrame(draw);
        };

        draw();
    },

    // 绘制最终波形（静态）
    drawFinalWaveform() {
        if (!this.canvasCtx) return;
        
        this.canvasCtx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
        this.canvasCtx.fillStyle = '#10B981';
        
        const barCount = 30;
        const barWidth = this.canvasWidth / barCount;
        
        for (let i = 0; i < barCount; i++) {
            const barHeight = 15 + Math.sin(i * 0.3 + Date.now() / 1000) * 8;
            const x = i * barWidth;
            const y = (this.canvasHeight - barHeight) / 2;
            
            this.canvasCtx.fillRect(x + 2, y, barWidth - 4, barHeight);
        }
    },

    // 启动计时器
    startTimer() {
        this.updateTimer();
        this.timerInterval = setInterval(() => this.updateTimer(), 1000);
    },

    // 停止计时器
    stopTimer() {
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
            this.timerInterval = null;
        }
    },

    // 更新计时器显示
    updateTimer() {
        if (!this.timerDisplay || !this.startTime) return;
        
        const elapsed = Math.floor((Date.now() - this.startTime) / 1000);
        const minutes = Math.floor(elapsed / 60);
        const seconds = elapsed % 60;
        
        this.timerDisplay.textContent = 
            `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    },

    // 获取录音时长
    getDuration() {
        if (!this.startTime) return 0;
        return Math.floor((Date.now() - this.startTime) / 1000);
    },

    // 格式化时长
    formatDuration(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    },

    // 将 Blob 转换为 URL
    blobToUrl(blob) {
        return URL.createObjectURL(blob);
    },

    // 将 Blob 转换为 Base64
    blobToBase64(blob) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(blob);
        });
    }
};

// 初始化
document.addEventListener('DOMContentLoaded', () => {
    Recorder.init();
});
