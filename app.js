const novelData = [
            {
                title: "第一章：测验能力",
                filePath: 'novel/novel1.txt'
            },
            {
                title: "第二章：餐厅认人",
                filePath: 'novel/novel2.txt'
            },
            {
                title: "第三章：凡人的愤怒",
                filePath: 'novel/novel3.txt'
            },
            {
                title: "第四章：考前突击",
                filePath: 'novel/novel4.txt'
            },
            {
                title: "番外篇a",
                filePath: 'novel/番外篇a.txt'
            },
            {
                title: "第五章：消失的坐标",
                filePath: 'novel/novel5.txt'
            }

        ];

        let currentChapterIndex = 0;
        const chapterListEl = document.getElementById('chapterList');
        const titleEl = document.getElementById('chapterTitle');
        const contentEl = document.getElementById('chapterContent');
        const statusEl = document.getElementById('connectionStatus');
        const landingPage = document.getElementById('landing-page');
        const readerMain = document.getElementById('reader-main');

        function enterReader() {
            landingPage.classList.add('hide');
            setTimeout(() => {
                readerMain.classList.add('show');
                init();
            }, 300);
        }

        document.addEventListener('keydown', () => {
            if (!landingPage.classList.contains('hide')) {
                enterReader();
            }
        });

        function init() {
            renderChapterList();
            loadChapter(0);
        }

        function renderChapterList() {
            chapterListEl.innerHTML = '';
            novelData.forEach((chapter, index) => {
                const btn = document.createElement('button');
                btn.className = `chapter-btn ${index === currentChapterIndex ? 'active' : ''}`;
                btn.innerText = `SEC_0${index + 1} // ${chapter.title}`;
                btn.onclick = () => loadChapter(index);
                chapterListEl.appendChild(btn);
            });
        }

        // 加载章节
        function loadChapter(index) {
            if (index < 0 || index >= novelData.length) return;

            currentChapterIndex = index;
            renderChapterList();

            // 加载前的过渡效果
            titleEl.style.opacity = 0;
            contentEl.style.opacity = 0;
            statusEl.innerText = "DOWNLOADING DATA...";
            statusEl.style.color = "#ff6600";

            setTimeout(async () => {
                const currentChapter = novelData[index];
                titleEl.innerText = currentChapter.title;

                if (currentChapter.filePath) {
                    try {
                        const res = await fetch(currentChapter.filePath);
                        if (!res.ok) throw new Error("文件读取失败");
                        const txtContent = await res.text();
                        contentEl.innerHTML = txtContent.split('\n').filter(line => line.trim()).map(p => `<p>${p}</p>`).join('');
                    } catch (err) {
                        contentEl.innerHTML = `<p style="color: #ff4444;">错误：无法加载章节文件 ${currentChapter.filePath}</p>`;
                    }
                } else {
                    contentEl.innerHTML = currentChapter.content;
                }

                titleEl.style.opacity = 1;
                contentEl.style.opacity = 1;
                statusEl.innerText = "SYNC COMPLETE: SEC_0" + (index + 1);
                statusEl.style.color = "#00ffcc";
                document.querySelector('.reader-container').scrollTop = 0;
            }, 300);
        }
        // 下一章
        function nextChapter() {
            if (currentChapterIndex < novelData.length - 1) {
                loadChapter(currentChapterIndex + 1);
            }
        }

        // 上一章
        function prevChapter() {
            if (currentChapterIndex > 0) {
                loadChapter(currentChapterIndex - 1);
            }
        }

        // 简单的视觉切换（彩蛋）
        function toggleTheme() {
            const root = document.documentElement;
            const currentBg = getComputedStyle(root).getPropertyValue('--bg-dark').trim();
            if (currentBg === '#050505') {
                root.style.setProperty('--bg-dark', '#1a1a1a');
                root.style.setProperty('--panel-bg', '#252525');
            } else {
                root.style.setProperty('--bg-dark', '#050505');
                root.style.setProperty('--panel-bg', '#111111');
            }
        }

        // 启动
        init();