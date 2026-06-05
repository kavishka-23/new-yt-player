// sidebar-history.js - Completely isolated navigation & watch history system
(function() {
    // 1. Inject Sidebar & Dashboard CSS Styles dynamically
    const styles = `
        /* Glassy Sidebar Menu on Left Center */
        .app-sidebar {
            position: fixed;
            top: 50%;
            left: 20px;
            transform: translateY(-50%);
            display: flex;
            flex-direction: column;
            gap: 16px;
            z-index: 9999;
        }
        .sidebar-btn {
            width: 54px;
            height: 54px;
            background: rgba(255, 255, 255, 0.06);
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
            border: 1px solid rgba(255, 255, 255, 0.15);
            border-radius: 16px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: all 0.25s ease;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
        }
        .sidebar-btn:hover {
            background: rgba(255, 255, 255, 0.15);
            border-color: #a855f7;
            transform: scale(1.08);
        }
        .sidebar-btn.active {
            background: linear-gradient(135deg, rgba(147, 51, 234, 0.3), rgba(79, 70, 229, 0.3));
            border-color: #a855f7;
            box-shadow: 0 0 20px rgba(168, 85, 247, 0.3);
        }
        .sidebar-btn svg {
            width: 24px;
            height: 24px;
            fill: #e2e8f0;
            transition: fill 0.2s;
        }
        .sidebar-btn:hover svg, .sidebar-btn.active svg {
            fill: #ffffff;
        }

        /* Recent History Dashboard View Layer */
        .history-dashboard {
            width: 100%;
            height: 100%;
            background: #0f172a;
            padding: 30px;
            overflow-y: auto;
            display: none;
            color: #ffffff;
        }
        .history-dashboard h2 {
            font-size: 24px;
            font-weight: 700;
            margin-bottom: 24px;
            background: linear-gradient(to right, #fff, #a855f7);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
        .history-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
            gap: 20px;
        }
        .history-card {
            background: rgba(30, 27, 75, 0.4);
            border: 1px solid rgba(255, 255, 255, 0.08);
            border-radius: 16px;
            overflow: hidden;
            cursor: pointer;
            transition: all 0.2s ease;
        }
        .history-card:hover {
            transform: translateY(-4px);
            border-color: #a855f7;
            box-shadow: 0 12px 24px rgba(0,0,0,0.4);
        }
        .thumb-wrapper {
            position: relative;
            width: 100%;
            aspect-ratio: 16/9;
            background: #000;
        }
        .thumb-wrapper img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
        /* Custom Progress Bar Layer on thumbnail */
        .progress-track {
            position: absolute;
            bottom: 0; left: 0; width: 100%;
            height: 4px; background: rgba(255,255,255,0.2);
        }
        .progress-bar {
            height: 100%; background: linear-gradient(to right, #9333ea, #4f46e5);
            width: 0%;
        }
        .card-details {
            padding: 14px;
        }
        .card-title {
            font-size: 14px;
            font-weight: 600;
            color: #f1f5f9;
            margin-bottom: 6px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
        .card-meta {
            font-size: 12px;
            color: #94a3b8;
        }
        .no-history {
            grid-column: 1 / -1;
            text-align: center;
            color: #64748b;
            padding: 40px 0;
            font-size: 15px;
        }
    `;
    const styleSheet = document.createElement("style");
    styleSheet.innerText = styles;
    document.head.appendChild(styleSheet);

    // 2. Build and Render the Sidebar Menu
    const sidebar = document.createElement("div");
    sidebar.className = "app-sidebar";
    sidebar.innerHTML = `
        <div class="sidebar-btn active" id="sideBtnHome" title="Home">
            <svg viewBox="0 0 24 24"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>
        </div>
        <div class="sidebar-btn" id="sideBtnRecent" title="Recently Played">
            <svg viewBox="0 0 24 24"><path d="M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z"/></svg>
        </div>
    `;
    document.body.appendChild(sidebar);

    // 3. Inject the History Dashboard right alongside your original #videoPlayer inside .video-wrapper
    let dashContainer;
    const targetWrapper = document.querySelector(".video-wrapper");
    
    if (targetWrapper) {
        dashContainer = document.createElement("div");
        dashContainer.className = "history-dashboard";
        dashContainer.id = "historyDashboard";
        targetWrapper.appendChild(dashContainer);
    }

    // 4. History Tracking Helper: Scan localStorage for all active saved tokens
    function getWatchHistory() {
        const history = [];
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key.startsWith("yt_progress_")) {
                const videoId = key.replace("yt_progress_", "");
                const savedSeconds = parseInt(localStorage.getItem(key)) || 0;
                history.push({ videoId, savedSeconds });
            }
        }
        return history;
    }

    // 5. Render History Panel List view dynamically
    function renderHistoryView() {
        if (!dashContainer) return;
        
        const historyData = getWatchHistory();
        
        let htmlContent = `
            <h2>Recently Played Videos</h2>
            <div class="history-grid">
        `;

        if (historyData.length === 0) {
            htmlContent += `<div class="no-history">No watch history records found yet.</div>`;
        } else {
            historyData.forEach(item => {
                const mins = Math.floor(item.savedSeconds / 60);
                const secs = item.savedSeconds % 60;
                
                // Approximate completion ratio safely (mock duration tracking benchmark 20 mins)
                const mockDuration = 1200; 
                const progressPercent = Math.min((item.savedSeconds / mockDuration) * 100, 100);

                htmlContent += `
                    <div class="history-card" data-id="${item.videoId}" data-time="${item.savedSeconds}">
                        <div class="thumb-wrapper">
                            <img src="https://img.youtube.com/vi/${item.videoId}/mqdefault.jpg" alt="Thumbnail">
                            <div class="progress-track">
                                <div class="progress-bar" style="width: ${progressPercent}%"></div>
                            </div>
                        </div>
                        <div class="card-details">
                            <div class="card-title">Video ID: ${item.videoId}</div>
                            <div class="card-meta">Stopped at: <span style="color: #c084fc; font-weight:600;">${mins}m ${secs}s</span></div>
                        </div>
                    </div>
                `;
            });
        }

        htmlContent += `</div>`;
        dashContainer.innerHTML = htmlContent;

        // Click Event Listeners on Dashboard Cards
        dashContainer.querySelectorAll(".history-card").forEach(card => {
            card.addEventListener("click", () => {
                const vId = card.getAttribute("data-id");
                const vTime = parseInt(card.getAttribute("data-time"));
                
                // Connect back smoothly with your existing main frame global functions safely
                if (window.executePlayerInit) {
                    window.currentVideoId = vId;
                    switchToHomeView();
                    window.executePlayerInit(vId, vTime, false);
                }
            });
        });
    }

    function switchToHomeView() {
        document.getElementById("sideBtnRecent").classList.remove("active");
        document.getElementById("sideBtnHome").classList.add("active");
        
        if (dashContainer) dashContainer.style.display = "none";
        const mainPlayerElement = document.getElementById("videoPlayer");
        if (mainPlayerElement) mainPlayerElement.style.display = "block";
    }

    // 6. Navigation Event Hooks
    document.getElementById("sideBtnHome").addEventListener("click", () => {
        window.location.href = "https://kavishka-23.github.io/new-yt-player/";
    });

    document.getElementById("sideBtnRecent").addEventListener("click", () => {
        document.getElementById("sideBtnHome").classList.remove("active");
        document.getElementById("sideBtnRecent").classList.add("active");
        
        const mainPlayerElement = document.getElementById("videoPlayer");
        if (mainPlayerElement) mainPlayerElement.style.display = "none";
        
        if (dashContainer) {
            dashContainer.style.display = "block";
            renderHistoryView();
        }
    });
})();
