// ghost-cookie.js - Completely isolated feature script
(function() {
    // Inject Ghost Styles directly so index.html stays clean
    const styles = `
        .ghost-cookie-overlay {
            position: fixed;
            top: 0; left: 0; width: 100vw; height: 100vh;
            background: rgba(15, 23, 42, 0.7);
            backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);
            display: flex; align-items: center; justify-content: center;
            z-index: 100000; opacity: 0; pointer-events: none;
            transition: all 0.5s ease;
        }
        .ghost-cookie-overlay.center-mode {
            opacity: 1; pointer-events: auto;
        }
        .ghost-cookie-box {
            position: fixed;
            bottom: 20px; right: -400px;
            display: flex; align-items: center; gap: 15px;
            background: rgba(30, 27, 75, 0.85);
            backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);
            border: 1px solid rgba(168, 85, 247, 0.3);
            border-radius: 20px; padding: 18px 24px;
            box-shadow: 0 15px 35px rgba(0, 0, 0, 0.5), 0 0 30px rgba(168, 85, 247, 0.15);
            max-width: 380px; z-index: 100001;
            transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        .ghost-cookie-box.slide-in { right: 20px; }
        .ghost-cookie-box.center-lock {
            position: relative; bottom: auto; right: auto;
            transform: scale(1.1); margin: 0 auto;
        }
        .ghost-cookie-char {
            position: relative; width: 44px; height: 60px;
            background: #ffffff; border-radius: 22px 22px 0 0;
            animation: cookieGhostFloat 2s ease-in-out infinite; flex-shrink: 0;
            box-shadow: 0 8px 15px rgba(255, 255, 255, 0.1);
        }
        .ghost-cookie-face {
            position: absolute; top: 22px; left: 11px; width: 22px;
            display: flex; justify-content: space-between;
        }
        .ghost-cookie-eye { width: 5px; height: 5px; background: #1e1b4b; border-radius: 50%; }
        .ghost-cookie-smile {
            position: absolute; bottom: -3px; left: 6px; width: 10px; height: 5px;
            border-bottom: 2px solid #1e1b4b; border-radius: 0 0 10px 10px;
        }
        .ghost-cookie-blush {
            position: absolute; top: 26px; width: 4px; height: 3px;
            background: #ff94b8; border-radius: 50%;
        }
        .ghost-cookie-blush.left { left: 5px; }
        .ghost-cookie-blush.right { right: 5px; }
        .ghost-cookie-bottom { position: absolute; bottom: -8px; left: 0; width: 100%; display: flex; }
        .ghost-cookie-wave { flex: 1; height: 8px; background: #ffffff; border-radius: 0 0 50% 50%; }
        .ghost-cookie-content { display: flex; flex-direction: column; gap: 8px; }
        .ghost-cookie-content p { color: #cbd5e1; font-size: 14px; margin: 0; line-height: 1.4; }
        .ghost-cookie-content strong { color: #fff; font-size: 15px; }
        .ghost-cookie-btns { display: flex; gap: 8px; margin-top: 4px; }
        .gc-btn {
            padding: 8px 16px; border: none; border-radius: 8px;
            font-size: 13px; font-weight: 600; cursor: pointer; transition: all 0.2s;
        }
        .gc-btn-ok { background: linear-gradient(to right, #9333ea, #4f46e5); color: white; }
        .gc-btn-no { background: rgba(255, 255, 255, 0.08); color: #cbd5e1; }
        .gc-btn-no:hover { background: rgba(255, 255, 255, 0.15); color: #fff; }
        @keyframes cookieGhostFloat {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-8px); }
        }
    `;

    // Inject styles to head
    const styleSheet = document.createElement("style");
    styleSheet.innerText = styles;
    document.head.appendChild(styleSheet);

    // Create background blocking overlay layer
    const overlay = document.createElement("div");
    overlay.className = "ghost-cookie-overlay";
    document.body.appendChild(overlay);

    // Create the Ghost notification element box
    const ghostBox = document.createElement("div");
    ghostBox.className = "ghost-cookie-box";
    ghostBox.innerHTML = `
        <div class="ghost-cookie-char">
            <div class="ghost-cookie-face"><div class="ghost-cookie-eye"></div><div class="ghost-cookie-eye"></div><div class="ghost-cookie-smile"></div></div>
            <div class="ghost-cookie-blush left"></div><div class="ghost-cookie-blush right"></div>
            <div class="ghost-cookie-bottom"><div class="ghost-cookie-wave"></div><div class="ghost-cookie-wave"></div><div class="ghost-cookie-wave"></div></div>
        </div>
        <div class="ghost-cookie-content" id="gcContent">
            <p><strong>Hey there!</strong></p>
            <p>I am using your cookies to save your video watch progress. Is that okay?</p>
            <div class="ghost-cookie-btns">
                <button class="gc-btn gc-btn-ok" id="gcAccept">Okay</button>
                <button class="gc-btn gc-btn-no" id="gcReject">Not Okay</button>
            </div>
        </div>
    `;
    document.body.appendChild(ghostBox);

    // Slide in the ghost panel slightly after refresh loads
    setTimeout(() => {
        ghostBox.classList.add("slide-in");
    }, 800);

    // Logic Event Listener: IF CHOSEN OKAY
    document.getElementById("gcAccept").addEventListener("click", () => {
        ghostBox.classList.remove("slide-in");
        setTimeout(() => ghostBox.remove(), 500); // Remove cleanly from UI
    });

    // Logic Event Listener: IF CHOSEN NOT OKAY
    document.getElementById("gcReject").addEventListener("click", () => {
        // 1. Move ghost box into the dark blurred center overlay frame
        ghostBox.classList.remove("slide-in");
        overlay.classList.add("center-mode");
        ghostBox.classList.add("center-lock");
        overlay.appendChild(ghostBox);

        // 2. Say goodbye and switch to a locked text state
        document.getElementById("gcContent").innerHTML = `
            <p><strong style="font-size: 18px; color: #f43f5e;">Good bye!</strong></p>
            <p style="font-size: 15px;">Let's see you next time! 👋</p>
        `;

        // 3. Stop functioning: Block application container visibility entirely
        const appContainer = document.querySelector(".container");
        if (appContainer) {
            appContainer.style.pointerEvents = "none";
            appContainer.style.filter = "blur(20px)";
            appContainer.style.opacity = "0.1";
        }
    });
})();
