// ghost-cookie.js - Functional Privacy Guard & Progress Tracker
(function() {
    // 1. Inject Styles for the Privacy Banner & Welcome Back Modal
    const styles = `
        .cookie-popup {
            position: fixed; bottom: 20px; right: 20px;
            background: #1e1b4b; border: 1px solid #4338ca;
            padding: 20px; border-radius: 16px; z-index: 100000;
            width: 320px; box-shadow: 0 10px 30px rgba(0,0,0,0.5);
            font-family: 'Segoe UI', sans-serif; color: #ffffff;
            display: none; flex-direction: column; gap: 12px;
        }
        .cookie-popup.show { display: flex; }
        .cookie-header { display: flex; align-items: center; gap: 10px; font-weight: 700; }
        .cookie-text { font-size: 13px; color: #cbd5e1; line-height: 1.4; }
        .cookie-btns { display: flex; gap: 10px; justify-content: flex-end; margin-top: 5px; }
        .cookie-btn {
            padding: 8px 16px; border-radius: 8px; border: none; cursor: pointer;
            font-size: 13px; font-weight: 600; transition: all 0.2s;
        }
        .btn-accept { background: #8b5cf6; color: #fff; }
        .btn-accept:hover { background: #7c3aed; }
        .btn-decline { background: #312e81; color: #94a3b8; }
        .btn-decline:hover { background: #3730a3; color: #fff; }

        /* Welcome Back Prompt Layout */
        .resume-modal {
            position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
            background: rgba(0,0,0,0.7); backdrop-filter: blur(4px);
            display: none; align-items: center; justify-content: center; z-index: 100001;
        }
        .resume-modal.show { display: flex; }
        .resume-box {
            background: #181825; border: 1px solid #313244; padding: 30px;
            border-radius: 20px; text-align: center; color: white; max-width: 400px;
            font-family: 'Segoe UI', sans-serif; box-shadow: 0 20px 40px rgba(0,0,0,0.6);
        }
        .resume-box h3 { margin: 15px 0 10px; font-size: 20px; }
        .resume-box p { font-size: 14px; color: #a6adc8; margin-bottom: 20px; }
    `;
    const styleSheet = document.createElement("style");
    styleSheet.innerText = styles;
    document.head.appendChild(styleSheet);

    // 2. Build the DOM structures
    const cookieContainer = document.createElement("div");
    cookieContainer.className = "cookie-popup";
    cookieContainer.id = "privacyGuardPopup";
    cookieContainer.innerHTML = `
        <div class="cookie-header">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="#a78bfa"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>
            <span>Hey there!</span>
        </div>
        <div class="cookie-text">I am using your browser local storage to save your video watch progress so you can pick up where you left off. Is that okay?</div>
        <div class="cookie-btns">
            <button class="cookie-btn btn-decline" id="cookieDeclineBtn">Not Okay</button>
            <button class="cookie-btn btn-accept" id="cookieAcceptBtn">Okay</button>
        </div>
    `;
    document.body.appendChild(cookieContainer);

    const resumeModal = document.createElement("div");
    resumeModal.className = "resume-modal";
    resumeModal.id = "resumeTrackModal";
    resumeModal.innerHTML = `
        <div class="resume-box">
            <svg width="50" height="50" viewBox="0 0 24 24" fill="#8b5cf6"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/></svg>
            <h3>Welcome Back!</h3>
            <p id="resumeModalText">We found saved progress on this video. Would you like to resume?</p>
            <div class="cookie-btns" style="justify-content: center;">
                <button class="cookie-btn btn-decline" id="resumeFreshBtn">Start Fresh</button>
                <button class="cookie-btn btn-accept" id="resumeConfirmBtn">Resume Video</button>
            </div>
        </div>
    `;
    document.body.appendChild(resumeModal);

    // 3. Main Operational Variables & State Guard Checks
    let trackingPermission = localStorage.getItem("app_cookie_permission");

    window.addEventListener("load", () => {
        // Only show popup if the user has never made a choice before
        if (trackingPermission === null) {
            document.getElementById("privacyGuardPopup").classList.add("show");
        } else if (trackingPermission === "granted") {
            initializeProgressScanner();
        }
    });

    // Accept Permission Choice Action
    document.getElementById("cookieAcceptBtn").addEventListener("click", () => {
        localStorage.setItem("app_cookie_permission", "granted");
        trackingPermission = "granted";
        document.getElementById("privacyGuardPopup").classList.remove("show");
        initializeProgressScanner(); // Start saving data immediately!
    });

    // Decline Permission Choice Action
    document.getElementById("cookieDeclineBtn").addEventListener("click", () => {
        localStorage.setItem("app_cookie_permission", "denied");
        trackingPermission = "denied";
        document.getElementById("privacyGuardPopup").classList.remove("show");
        // Clear out any old traces instantly if they choose no
        clearAllSavedProgress();
    });

    function clearAllSavedProgress() {
        for (let i = localStorage.length - 1; i >= 0; i--) {
            const key = localStorage.key(i);
            if (key.startsWith("yt_progress_") || key.startsWith("yt_meta_")) {
                localStorage.removeItem(key);
            }
        }
    }

    // 4. Background Active Tracker Core Logic
    function initializeProgressScanner() {
        // Regularly check and save timestamps only if permission stays granted
        setInterval(() => {
            if (trackingPermission !== "granted" || !window.currentVideoId) return;

            // Target the active custom iframe element
            const iframe = document.getElementById("videoPlayer");
            if (iframe && iframe.contentWindow) {
                // Request current video times safely
                iframe.contentWindow.postMessage(JSON.stringify({ event: "listening" }), "*");
            }
        }, 3000);

        // Catch incoming messages from Youtube iframe structure elements
        window.addEventListener("message", (event) => {
            if (trackingPermission !== "granted") return;
            try {
                const data = JSON.parse(event.data);
                if (data.event === "onStateChange" && window.currentVideoId) {
                    // Capture timestamp intervals
                    const currentSeconds = Math.floor(data.info.currentTime);
                    if (currentSeconds > 5) {
                        localStorage.setItem("yt_progress_" + window.currentVideoId, currentSeconds);
                    }
                }
            } catch (e) {}
        });

        // Check if current launched URL has a video to prompt resume actions
        setTimeout(() => {
            if (window.currentVideoId && trackingPermission === "granted") {
                const savedTime = localStorage.getItem("yt_progress_" + window.currentVideoId);
                if (savedTime && parseInt(savedTime) > 5) {
                    const mins = Math.floor(savedTime / 60);
                    const secs = savedTime % 60;
                    document.getElementById("resumeModalText").innerText = `We found saved progress at ${mins}m ${secs}s. Would you like to resume where you left off?`;
                    document.getElementById("resumeTrackModal").classList.add("show");
                }
            }
        }, 1200);
    }

    // Modal UI Control Buttons
    document.getElementById("resumeConfirmBtn").addEventListener("click", () => {
        const savedTime = localStorage.getItem("yt_progress_" + window.currentVideoId);
        document.getElementById("resumeTrackModal").classList.remove("show");
        if (savedTime && window.executePlayerInit) {
            window.executePlayerInit(window.currentVideoId, parseInt(savedTime));
        }
    });

    document.getElementById("resumeFreshBtn").addEventListener("click", () => {
        document.getElementById("resumeTrackModal").classList.remove("show");
    });
})();
