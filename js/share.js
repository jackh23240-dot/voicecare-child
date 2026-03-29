/**
 * 家音英语 - 分享功能模块
 * 负责生成分享卡片和微信分享
 */

const Share = {
    // 分享配置
    config: {
        appTitle: '家音英语',
        appDesc: '让亲情在英语学习中流淌',
        appIcon: '🎙️'
    },

    // 生成分享卡片数据
    generateShareData(card, audioUrl) {
        return {
            title: `我学会了 "${card.word}"`,
            description: `${card.scene} · ${card.translation}`,
            word: card.word,
            translation: card.translation,
            scene: card.scene,
            sceneIcon: card.sceneIcon,
            aiScript: card.aiScript,
            audioUrl,
            timestamp: Date.now(),
            shareUrl: this.generateShareUrl(card)
        };
    },

    // 生成分享链接（模拟）
    generateShareUrl(card) {
        const baseUrl = window.location.origin + window.location.pathname;
        return `${baseUrl}?share=${card.id}&t=${Date.now()}`;
    },

    // 生成分享卡片图片（使用 Canvas）
    async generateShareCard(shareData) {
        return new Promise((resolve, reject) => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            
            // 卡片尺寸（适合微信分享）
            const width = 600;
            const height = 400;
            canvas.width = width;
            canvas.height = height;

            // 背景渐变
            const gradient = ctx.createLinearGradient(0, 0, width, height);
            gradient.addColorStop(0, '#3B82F6');
            gradient.addColorStop(1, '#60A5FA');
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, width, height);

            // 装饰圆
            ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
            for (let i = 0; i < 10; i++) {
                const x = Math.random() * width;
                const y = Math.random() * height;
                const r = Math.random() * 50 + 20;
                ctx.beginPath();
                ctx.arc(x, y, r, 0, Math.PI * 2);
                ctx.fill();
            }

            // 顶部区域
            ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
            ctx.beginPath();
            ctx.roundRect(30, 30, width - 60, 340, 20);
            ctx.fill();

            // 场景标签
            ctx.fillStyle = '#3B82F6';
            ctx.font = 'bold 16px -apple-system, sans-serif';
            ctx.fillText(`${shareData.sceneIcon} ${shareData.scene}`, 50, 80);

            // 单词
            ctx.fillStyle = '#1F2937';
            ctx.font = 'bold 48px -apple-system, sans-serif';
            ctx.fillText(shareData.word, 50, 150);

            // 翻译
            ctx.fillStyle = '#6B7280';
            ctx.font = '24px -apple-system, sans-serif';
            ctx.fillText(shareData.translation, 50, 190);

            // AI 脚本
            ctx.fillStyle = '#3B82F6';
            ctx.font = '16px -apple-system, sans-serif';
            const scriptLines = this.wrapText(ctx, shareData.aiScript, 500);
            scriptLines.forEach((line, i) => {
                ctx.fillText(line, 50, 240 + i * 28);
            });

            // 底部信息
            ctx.fillStyle = '#9CA3AF';
            ctx.font = '14px -apple-system, sans-serif';
            ctx.fillText('家音英语 · HomeVoice English', 50, 340);

            // 转换为图片
            canvas.toBlob((blob) => {
                if (blob) {
                    resolve({
                        blob,
                        url: canvas.toDataURL('image/png'),
                        canvas
                    });
                } else {
                    reject(new Error('生成卡片失败'));
                }
            }, 'image/png');
        });
    },

    // 文本换行
    wrapText(ctx, text, maxWidth) {
        const lines = [];
        const words = text.split('');
        let line = '';

        for (let i = 0; i < words.length; i++) {
            const testLine = line + words[i];
            const metrics = ctx.measureText(testLine);
            
            if (metrics.width > maxWidth && i > 0) {
                lines.push(line);
                line = words[i];
            } else {
                line = testLine;
            }
        }
        lines.push(line);
        return lines;
    },

    // 分享到微信
    async shareToWechat(shareData) {
        try {
            // 生成分享卡片
            const cardImage = await this.generateShareCard(shareData);
            
            // 检查是否在微信中
            const isWechat = /micromessenger/i.test(navigator.userAgent);
            
            if (isWechat) {
                // 微信内分享（需要微信 JS-SDK）
                this.wechatShare(shareData, cardImage);
            } else {
                // 非微信环境，提示用户
                this.showShareInstructions(shareData, cardImage);
            }
            
            return true;
        } catch (error) {
            console.error('分享失败:', error);
            alert('分享功能暂时不可用，请截图分享');
            return false;
        }
    },

    // 微信 JS-SDK 分享
    wechatShare(shareData, cardImage) {
        // 注意：实际使用需要配置微信 JS-SDK
        // 这里提供示例代码
        
        if (typeof wx !== 'undefined') {
            wx.updateAppMessageShareData({
                title: shareData.title,
                desc: shareData.description,
                link: shareData.shareUrl,
                imgUrl: cardImage.url,
                success: () => {
                    console.log('分享设置成功');
                }
            });

            wx.showMenuItems({
                menuList: ['menuItem:share:appMessage']
            });
        } else {
            // 没有微信 SDK，降级处理
            this.showShareInstructions(shareData, cardImage);
        }
    },

    // 显示分享指引
    showShareInstructions(shareData, cardImage) {
        // 创建分享指引弹窗
        const modal = document.createElement('div');
        modal.className = 'share-modal';
        modal.innerHTML = `
            <div class="share-modal-content">
                <h3>分享指引</h3>
                <p>请在微信中打开此页面以使用完整分享功能</p>
                <div class="share-card-preview">
                    <img src="${cardImage.url}" alt="分享卡片预览">
                </div>
                <p class="share-tip">长按图片可以保存到相册</p>
                <button class="share-modal-close" onclick="this.closest('.share-modal').remove()">知道了</button>
            </div>
        `;
        
        // 添加样式
        const style = document.createElement('style');
        style.textContent = `
            .share-modal {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(0, 0, 0, 0.6);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 2000;
            }
            .share-modal-content {
                background: white;
                border-radius: 16px;
                padding: 24px;
                max-width: 340px;
                text-align: center;
            }
            .share-modal-content h3 {
                font-size: 18px;
                margin-bottom: 8px;
            }
            .share-modal-content p {
                font-size: 14px;
                color: #6B7280;
                margin-bottom: 16px;
            }
            .share-card-preview img {
                width: 100%;
                border-radius: 8px;
                margin-bottom: 12px;
            }
            .share-tip {
                font-size: 12px;
                color: #9CA3AF !important;
            }
            .share-modal-close {
                background: #3B82F6;
                color: white;
                border: none;
                padding: 12px 32px;
                border-radius: 8px;
                font-size: 15px;
                cursor: pointer;
            }
        `;
        document.head.appendChild(style);
        document.body.appendChild(modal);
    },

    // 复制链接
    async copyLink(shareData) {
        try {
            await navigator.clipboard.writeText(shareData.shareUrl);
            return true;
        } catch (error) {
            // 降级方案
            const textarea = document.createElement('textarea');
            textarea.value = shareData.shareUrl;
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand('copy');
            document.body.removeChild(textarea);
            return true;
        }
    },

    // 下载分享卡片
    async downloadCard(shareData) {
        try {
            const cardImage = await this.generateShareCard(shareData);
            
            const link = document.createElement('a');
            link.download = `家音英语-${shareData.word}.png`;
            link.href = cardImage.url;
            link.click();
            
            return true;
        } catch (error) {
            console.error('下载失败:', error);
            return false;
        }
    },

    // 检查分享参数
    checkShareParams() {
        const params = new URLSearchParams(window.location.search);
        const shareId = params.get('share');
        
        if (shareId) {
            const card = Cards.getCardById(parseInt(shareId));
            if (card) {
                return {
                    isShared: true,
                    card,
                    fromShare: true
                };
            }
        }
        
        return {
            isShared: false,
            fromShare: false
        };
    }
};

// 检查是否从分享链接进入
document.addEventListener('DOMContentLoaded', () => {
    const shareInfo = Share.checkShareParams();
    if (shareInfo.isShared) {
        console.log('从分享链接进入:', shareInfo.card);
        // 可以在这里显示特殊的分享视图
    }
});
