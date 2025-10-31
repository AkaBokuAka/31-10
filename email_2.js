<script>
        const mailData = [
            {
                id: 1,
                sender: "張小明",
                email: "zhang@example.com",
                subject: "本週會議安排",
                preview: "大家好，關於本週的團隊會議，我想確認一下時間...",
                body: "大家好，<br><br>關於本週的團隊會議，我想確認一下時間。根據大家的時間表，我建議將會議安排在週三下午2點。<br><br>會議議程如下：<br>1. 專案進度報告<br>2. 下週工作安排<br>3. 其他事項討論<br><br>請大家確認是否可以參加。<br><br>謝謝！<br>張小明",
                time: "上午 10:30",
                unread: true
            },
            {
                id: 2,
                sender: "李經理",
                email: "li.manager@example.com",
                subject: "Q4 季度報告審核",
                preview: "請查看附件中的Q4季度報告草稿，並在本週五前提供反饋...",
                body: "您好，<br><br>請查看附件中的Q4季度報告草稿，並在本週五前提供反饋。<br><br>重點關注以下部分：<br>- 財務數據準確性<br>- 市場分析完整性<br>- 未來規劃可行性<br><br>如有任何問題，請隨時聯繫我。<br><br>最好的祝福，<br>李經理",
                time: "昨天",
                unread: true
            },
            {
                id: 3,
                sender: "人力資源部",
                email: "hr@example.com",
                subject: "年度績效評估通知",
                preview: "親愛的同仁，年度績效評估即將開始...",
                body: "親愛的同仁，<br><br>年度績效評估即將開始。請於下週一前完成自我評估表格。<br><br>評估內容包括：<br>- 工作成果<br>- 專業技能<br>- 團隊合作<br>- 個人發展<br><br>如有疑問，請聯繫人力資源部。<br><br>人力資源部",
                time: "週一",
                unread: false
            },
            {
                id: 4,
                sender: "王研發",
                email: "wang.rd@example.com",
                subject: "新產品原型測試邀請",
                preview: "我們的新產品原型已經完成，邀請您參加測試...",
                body: "您好，<br><br>我們的新產品原型已經完成，邀請您參加測試。<br><br>測試時間：本週四下午3點<br>地點：研發中心會議室<br><br>請準時參加，您的反饋對我們非常重要。<br><br>謝謝！<br>王研發",
                time: "上週",
                unread: false
            },
            {
                id: 5,
                sender: "陳市場部",
                email: "chen.marketing@example.com",
                subject: "新一季行銷活動提案",
                preview: "附上新一季的行銷活動提案，期待您的建議...",
                body: "您好，<br><br>附上新一季的行銷活動提案，期待您的建議。<br><br>本次活動主題：「創新未來」<br>預算：100萬元<br>執行期間：3個月<br><br>請在下次會議前審閱提案內容。<br><br>最好的祝福，<br>陳市場部",
                time: "10月15日",
                unread: false
            }
        ];


    function renderMailList() {
        const mailItems = document.getElementById('mailItems');
        mailItems.innerHTML = '';
        
        mailData.forEach(mail => {
            const mailItem = document.createElement('div');
            mailItem.className = `mail-item ${mail.unread ? 'unread' : ''}`;
            mailItem.innerHTML = `
                <div class="mail-sender">${mail.sender}</div>
                <div class="mail-subject">${mail.subject}</div>
                <div class="mail-preview">${mail.preview}</div>
                <div class="mail-time">${mail.time}</div>
            `;
            mailItem.addEventListener('click', () => showMailContent(mail));
            mailItems.appendChild(mailItem);
        });
    }

    function showMailContent(mail) {
        const mailContent = document.getElementById('mailContent');
        const initials = mail.sender.charAt(0);
        
        mailContent.innerHTML = `
            <div class="mail-content-header">
                <div class="back-button" onclick="hideMailContent()">
                    <span class="back-arrow">←</span>
                    <span class="back-text">返回</span>
                </div>
                <div class="mail-content-subject">${mail.subject}</div>
                <div class="mail-content-info">
                    <div class="sender-avatar">${initials}</div>
                    <div class="sender-details">
                        <div class="sender-name">${mail.sender}</div>
                        <div class="sender-email">${mail.email}</div>
                    </div>
                    <div class="mail-time">${mail.time}</div>
                </div>
            </div>
            <div class="mail-content-body">
                ${mail.body}
            </div>
        `;

        // 標記為已讀
        const mailItems = document.querySelectorAll('.mail-item');
        mailItems.forEach(item => item.classList.remove('active'));
        event.currentTarget.classList.add('active');
        event.currentTarget.classList.remove('unread');
        
        // 移動端顯示
        if (window.innerWidth <= 768) {
            mailContent.classList.add('show-mobile');
        }
    }

    // 新增的返回功能
    function hideMailContent() {
        const mailContent = document.getElementById('mailContent');
        mailContent.classList.remove('show-mobile');
    }

    // 資料夾切換
    document.querySelectorAll('.folder-item').forEach(folder => {
        folder.addEventListener('click', function() {
            document.querySelectorAll('.folder-item').forEach(f => f.classList.remove('active'));
            this.classList.add('active');
            
            const folderName = this.querySelector('span:last-child')?.textContent || this.textContent.trim();
            document.querySelector('.mail-list-header h2').textContent = folderName;
        });
    });

    // 初始化
    renderMailList();
</script>

<style>
    /* 新增返回按鈕的樣式 */
    .back-button {
        display: flex;
        align-items: center;
        padding: 10px 0;
        margin-bottom: 15px;
        cursor: pointer;
        color: #1a73e8;
        font-weight: 500;
        border-bottom: 1px solid #e0e0e0;
    }

    .back-arrow {
        font-size: 20px;
        margin-right: 8px;
    }

    .back-text {
        font-size: 16px;
    }

    .back-button:hover {
        opacity: 0.8;
    }

    /* 桌面版隱藏返回按鈕 */
    @media (min-width: 769px) {
        .back-button {
            display: none;
        }
    }

    /* 移動端郵件內容樣式 */
    @media (max-width: 768px) {
        .mail-content {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: white;
            z-index: 1000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            overflow-y: auto;
        }

        .mail-content.show-mobile {
            transform: translateX(0);
        }
    }

    /* 您現有的其他CSS樣式保持不變 */
    .mail-item {
        padding: 15px;
        border-bottom: 1px solid #e0e0e0;
        cursor: pointer;
        transition: background-color 0.2s;
    }

    .mail-item:hover {
        background-color: #f5f5f5;
    }

    .mail-item.unread {
        font-weight: bold;
    }

    .mail-content-header {
        padding: 20px;
        border-bottom: 1px solid #e0e0e0;
    }

    .mail-content-subject {
        font-size: 18px;
        font-weight: bold;
        margin-bottom: 15px;
    }

    .mail-content-info {
        display: flex;
        align-items: center;
    }

    .sender-avatar {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background-color: #1a73e8;
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        margin-right: 12px;
    }

    .sender-details {
        flex: 1;
    }

    .sender-name {
        font-weight: bold;
    }

    .sender-email {
        color: #666;
        font-size: 14px;
    }

    .mail-content-body {
        padding: 20px;
        line-height: 1.6;
    }
</style>
