// ghost-cookie.js - Fixed Permission Guard & Progress Tracker
(function() {
    // 1. Clean CSS styles matching your exact theme layout
    const styles = `
        .cookie-popup {
            position: fixed; bottom: 20px; right: 20px;
            background: #1c1a3a; border: 2px solid #5b21b6;
            padding: 20px; border-radius: 20px; z-index: 100000;
            width: 340px; box-shadow: 0 10px 40px rgba(0,0,0,0.6);
            font-family: 'Segoe UI', sans-serif; color: #ffffff;
            display: none; flex-direction: column; gap: 14px;
        }
        .cookie-popup.show { display: flex !important; }
        .cookie-header { display: flex; align-items: center; gap: 12px; font-weight: 700; font-size: 16px; }
        .cookie-text { font-size: 13px; color: #cbd5e1; line-height: 1.5; }
        .cookie-btns { display: flex; gap: 10px; justify-content: flex-end; margin-top: 5px; }
        .cookie-btn {
            padding: 8px 18px; border-radius: 10px; border: none; cursor: pointer;
            font-size: 13px; font-weight: 600; transition: all 0.2s ease;
        }
        .btn-accept { background: #7c3aed; color: #fff; }
        .btn-accept:hover { background: #6d28d9; transform: scale(1.03); }
        .btn-decline { background: #2e1065; color: #c084fc; }
        .btn-decline:hover { background: #4c1d95; color: #fff; }

        /* Welcome Back Prompt Layout matching the screenshot */
        .resume-modal {
            position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
            background: rgba(0,0,0,0.75); backdrop-filter: blur(6px);
            display: none; align-items: center; justify-content: center; z-index: 100001;
        }
        .resume-modal.show { display: flex !important; }
        .resume-box {
            background: #1c1a3a; border: 2px solid #5b21b6; padding: 35px;
            border-radius: 24px; text-align: center; color: white; max-width: 420px;
            font-family: 'Segoe UI', sans-serif; box-shadow: 0 25px 50px rgba(0,0,0,0.7);
            display: flex; flex-direction: column; align-items: center; gap: 15px;
        }
        .resume-box h3 { font-size: 22px; font-weight: 800; margin: 5px 0 0; }
        .resume-box p { font-size: 14px; color: #cbd5e1; line-height: 1.5; margin-bottom: 10px; }
    `;
    const styleSheet = document.createElement("style");
    styleSheet.innerText = styles;
    document.head.appendChild(styleSheet);

    // 2. Build Permission Popup Markup
    const cookieContainer = document.createElement("div");
    cookieContainer.className = "cookie-popup";
    cookieContainer.id = "privacyGuardPopup";
    cookieContainer.innerHTML = `
        <div class="cookie-header">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="#a78bfa"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>
            <span>Permission Request</span>
        </div>
        <div class="cookie-text">We use your browser's local storage to remember your video progress and build your history dashboard. Is it okay to store this data?</div>
        <div class="cookie-btns">
            <button class="cookie-btn btn-decline" id="cookieDeclineBtn">Not Okay</button>
            <button class="cookie-btn btn-accept" id="cookieAcceptBtn">Okay</button>
        </div>
    `;
    document.body.appendChild(cookieContainer);

    // 3. Build Resume Progress Modal Markup
    const resumeModal = document.createElement("div");
    resumeModal.className = "resume-modal";
    resumeModal.id = "resumeTrackModal";
    resumeModal.innerHTML = `
        <div class="resume-box">
            <svg width="60" height="60" viewBox="0 0 24 24" fill="#a78bfa"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/></svg>
            <h3>Welcome Back!</h3>
            <p id="resumeModalText">We found saved watch progress on this video. Would you like to resume where you left off?</p>
            <div class="cookie-btns" style="width: 100%; justify-content: center; gap: 15px;">
                <button class="cookie-btn btn-decline" style="flex:1;" id="resumeFreshBtn">Start Fresh</button>
                <button class="cookie-btn btn-accept" style="flex:1;" id="resumeConfirmBtn">Resume Video</button>
            </div>
        </div>
    `;
    document.body.appendChild(resumeModal);

    // 4. Strict State Guard Logic
    let trackingPermission = localStorage.getItem("app_cookie_permission");

    // Clear old layout items hidden inside HTML variables if they exist
    const oldCookieBlock = document.querySelector('.cookie-banner, [style*="z-index: 9999"]');
    if (oldCookieBlock) oldCookieBlock.remove();

    // Check status on page boot up
    if (trackingPermission === null) {
        document.getElementById("privacyGuardPopup").classList.add("show");
    } else if (trackingPermission === "granted") {
        initializeProgressScanner();
    }

    // "Okay" clicked
    document.getElementById("cookieAcceptBtn").addEventListener("click", () => {
        localStorage.setItem("app_cookie_permission", "granted");
        trackingPermission = "granted";
        document.getElementById("privacyGuardPopup").classList.remove("show");
        initializeProgressScanner();
    });

    // "Not Okay" clicked
    document.getElementById("cookieDeclineBtn").addEventListener("click", () => {
        localStorage.setItem("app_cookie_permission", "denied");
        trackingPermission = "denied";
        document.getElementById("privacyGuardPopup").classList.remove("show");
        clearAllSavedProgress();
    });

    function clearAllSavedProgress() {
        for (let i = localStorage.length - 1; i >= 0; i--) {
            const key = localStorage.key(i);
            if (key && (key.startsWith("yt_progress_") || key.startsWith("yt_meta_"))) {
                localStorage.removeItem(key);
            }
        }
    }

    // 5. Run tracking ONLY if authorized
    function initializeProgressScanner() {
        setInterval(() => {
            if (localStorage.getItem("app_cookie_permission") !== "granted" || !window.currentVideoId) return;
            
            // Send track call ping to YouTube iframe
            const iframe = document.getElementById("videoPlayer") || document.querySelector("iframe");
            if (iframe && iframe.contentWindow) {
                iframe.contentWindow.postMessage(JSON.stringify({ event: "listening" }), "*");
            }
        }, 2500);

        // Catch timestamps coming back from the video frame
        window.addEventListener("message", (event) => {
            if (localStorage.getItem("app_cookie_permission") !== "granted") return;
            try {
                const data = JSON.parse(event.data);
                if (data.event === "onStateChange" && window.currentVideoId) {
                    const currentSeconds = Math.floor(data.info.currentTime);
                    if (currentSeconds > 2) {
                        localStorage.setItem("yt_progress_" + window.currentVideoId, currentSeconds);
                    }
                }
            } catch (e) {}
        });

        // Trigger welcome prompt if old progress matches the video ID
        setTimeout(() => {
            if (window.currentVideoId && localStorage.getItem("app_cookie_permission") === "granted") {
                const savedTime = localStorage.getItem("yt_progress_" + window.currentVideoId);
                if (savedTime && parseInt(savedTime) > 3) {
                    const mins = Math.floor(savedTime / 60);
                    const secs = savedTime % 60;
                    document.getElementById("resumeModalText").innerText = `We found saved watch progress at ${mins}m ${secs}s. Would you like to resume where you left off?`;
                    document.getElementById("resumeTrackModal").classList.add("show");
                }
            }
        }, 1500);
    }

    // Modal click controllers
    document.getElementById("resumeConfirmBtn").addEventListener("click", () => {
        const savedTime = localStorage.getItem("yt_progress_" + window.currentVideoId);
        document.getElementById("resumeTrackModal").classList.remove("show");
        if (savedTime && window.executePlayerInit) {
            window.executePlayerInit(window.currentVideoId, parseInt(savedTime));
        } else if (savedTime) {
            // Fallback: If your page uses custom player methods, change URL search hash parameters
            const playerInput = document.querySelector('input[type="text"]') || document.querySelector('input');
            const playBtn = document.querySelector('button');
            if (playerInput && playBtn) {
                setTimeout(() => playBtn.click(), 100);
            }
        }
    });

    document.getElementById("resumeFreshBtn").addEventListener("click", () => {
        document.getElementById("resumeTrackModal").classList.remove("show");
    });
})();
