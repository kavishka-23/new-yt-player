// sidebar-history.js - Clean router system
(function() {
    const styles = `
        .app-sidebar {
            position: fixed;
            top: 50%;
            left: 20px;
            transform: translateY(-50%);
            display: flex;
            flex-direction: column;
            gap: 16px;
            z-index: 99999;
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
        .sidebar-btn svg { width: 24px; height: 24px; fill: #e2e8f0; }
        .sidebar-btn:hover svg, .sidebar-btn.active svg { fill: #ffffff; }
        @media (max-width: 768px) {
            .app-sidebar { position: fixed; bottom: 10px; top: auto; left: 50%; transform: translateX(-50%); flex-direction: row; }
        }
    `;
    const styleSheet = document.createElement("style");
    styleSheet.innerText = styles;
    document.head.appendChild(styleSheet);

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

    // Route transitions
    document.getElementById("sideBtnHome").addEventListener("click", () => {
        window.location.href = "index.html";
    });

    document.getElementById("sideBtnRecent").addEventListener("click", () => {
        window.location.href = "recent.html";
    });

    // Check URL query strings on boot to see if a recent item was launched
    const urlParams = new URLSearchParams(window.location.search);
    const resumeVidId = urlParams.get('resumeVid');
    
    if (resumeVidId && window.checkProgressAndLoad) {
        window.currentVideoId = resumeVidId;
        // Intercept standard player init sequences
        setTimeout(() => {
            window.checkProgressAndLoad(resumeVidId, false);
        }, 500);
    }
})();
