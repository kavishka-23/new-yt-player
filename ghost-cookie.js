// ghost-cookie.js - High Visibility Ghost Guard & Tracker
(function() {
    const styles = `
        .cookie-popup {
            position: fixed !important; bottom: 20px !important; right: 20px !important;
            background: rgba(30, 27, 75, 0.98) !important; backdrop-filter: blur(16px) !important;
            border: 2px solid #a855f7 !important; padding: 24px !important; border-radius: 20px !important;
            z-index: 100000 !important; width: 340px !important; box-shadow: 0 15px 40px rgba(0,0,0,0.6) !important;
            font-family: 'Segoe UI', sans-serif !important; color: #ffffff !important;
            display: none; flex-direction: column !important; gap: 14px !important; text-align: center !important;
        }
        .cookie-popup.show { display: flex !important; }
        
        .cookie-btns { display: flex !important; gap: 10px !important; justify-content: center !important; margin-top: 5px !important; width: 100% !important; }
        .cookie-btn {
            flex: 1 !important; padding: 10px 16px !important; border-radius: 12px !important; border: none !important; cursor: pointer !important;
            font-size: 13px !important; font-weight: 600 !important; transition: all 0.2s ease !important;
        }
        .btn-accept { background: linear-gradient(to right, #9333ea, #4f46e5) !important; color: #fff !important; }
        .btn-accept:hover { opacity: 0.95 !important; transform: scale(1.02) !important; }
        .btn-decline { background: rgba(255,255,255,0.08) !important; color: #cbd5e1 !important; border: 1px solid rgba(255,255,255,0.1) !important; }
        .btn-decline:hover { background: rgba(255,255,255,0.15) !important; color: #fff !important; }

        /* Welcome Back Prompt Layout Styles */
        .resume-modal {
            position: fixed !important; top: 0 !important; left: 0 !important; width: 100vw !important; height: 100vh !important;
            background: rgba(15, 23, 42, 0.6) !important; backdrop-filter: blur(8px) !important;
            display: none; align-items: center !important; justify-content: center !important; z-index: 100001 !important;
        }
        .resume-modal.show { display: flex !important; }
        .resume-box {
            background: #151329 !important;
            border: 2px solid #a855f7 !important; padding: 32px !important;
            border-radius: 24px !important; text-align: center !important; color: white !important; width: 90% !important; max-width: 440px !important;
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.8), 0 0 50px rgba(168, 85, 247, 0.3) !important;
            display: flex !important; flex-direction: column !important; align-items: center !important; gap: 15px !important;
        }

        /* Fixed High-Visibility Pure CSS Cute Ghost Avatar */
        .ghost-avatar-frame { 
            height: 80px !important; 
            display: flex !important; 
            justify-content: center !important; 
            align-items: center !important; 
            width: 100% !important;
            margin-bottom: 5px !important;
        }
        .cute-ghost {
            position: relative !important; 
            width: 46px !important; 
            height: 56px !important; 
            background: #ffffff !important;
            border-radius: 24px 24px 0 0 !important; 
            animation: ghostFloat 2s ease-in-out infinite !important;
            filter: drop-shadow(0 0 12px rgba(168, 85, 247, 0.7)) !important;
            display: block !important;
        }
        .ghost-face { 
            position: absolute !important; 
            top: 22px !important; 
            left: 11px !important; 
            width: 24px !important; 
            display: flex !important; 
            justify-content: space-between !important; 
        }
        .ghost-eye { 
            width: 5px !important; 
            height: 5px !important; 
            background-color: #1a103c !important; 
            border-radius: 50% !important; 
        }
        .ghost-smile { 
            position: absolute !important; 
            bottom: -5px !important; 
            left: 7px !important; 
            width: 10px !important; 
            height: 5px !important; 
            border-bottom: 2px solid #1a103c !important; 
            border-radius: 0 0 10px 10px !important; 
        }
        .ghost-bottom { 
            position: absolute !important; 
            bottom: -6px !important; 
            left: 0 !important; 
            width: 100% !important; 
            display: flex !important; 
        }
        .ghost-wave { 
            flex: 1 !important; 
            height: 7px !important; 
            background: #ffffff !important; 
            border-radius: 0 0 50% 50% !important; 
        }
        @keyframes ghostFloat { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
        
        .resume-box h2 { font-size: 24px !important; font-weight: 800 !important; color: #ffffff !important; margin: 0 !important; }
        .resume-box p { color: #cbd5e1 !important; font-size: 15px !important; margin: 5px 0 12px 0 !important; line-height: 1.5 !important; }
        .highlight { color: #c084fc !important; font-weight: 700 !important; }
    `;
    const styleSheet = document.createElement("style");
    styleSheet.innerText = styles;
    document.head.appendChild(styleSheet);

    // Create Permission Box DOM structure
    const cookieContainer = document.createElement("div");
    cookieContainer.className = "cookie-popup";
    cookieContainer.id = "privacyGuardPopup";
    cookieContainer.innerHTML = `
        <div class="ghost-avatar-frame"><div class="cute-ghost"><div class="ghost-face"><div class="ghost-eye"></div><div class="ghost-eye"></div><div class="ghost-smile"></div></div><div class="ghost-bottom"><div class="ghost-wave"></div><div class="ghost-wave"></div><div class="ghost-wave"></div></div></div></div>
        <h2 style="font-size:18px !important;">Storage Permission Needed</h2>
        <p style="font-size:13px !important; color:#cbd5e1 !important; margin-bottom:10px !important;">We use browser storage to recall your video playback positions and history features. Is that okay?</p>
        <div class="cookie-btns">
            <button class="cookie-btn btn-decline" id="cookieDeclineBtn">Not Okay</button>
            <button class="cookie-btn btn-accept" id="cookieAcceptBtn">Okay</button>
        </div>
    `;
    document.body.appendChild(cookieContainer);

    // Create Progress Modal DOM structure
    const resumeModal = document.createElement("div");
    resumeModal.className = "resume-modal";
    resumeModal.id = "resumeTrackModal";
    resumeModal.innerHTML = `
        <div class="resume-box">
            <div class="ghost-avatar-frame">
                <div class="cute-ghost">
                    <div class="ghost-face">
                        <div class="ghost-eye"></div>
                        <div class="ghost-eye"></div>
                        <div class="ghost-smile"></div>
                    </div>
                    <div class="ghost-bottom">
                        <div class="ghost-wave"></div>
                        <div class="ghost-wave"></div>
                        <div class="ghost-wave"></div>
                    </div>
                </div>
            </div>
            <h2>Welcome Back!</h2>
            <p>We found saved watch progress at <span id="savedTimeLabel" class="highlight">0m 0s</span>. Would you like to resume where you left off?</p>
            <div class="cookie-btns">
                <button class="cookie-btn btn-accept" id="resumeConfirmBtn">Resume Video</button>
                <button class="cookie-btn btn-decline" id="resumeFreshBtn">Start Fresh</button>
            </div>
        </div>
    `;
    document.body.appendChild(resumeModal);

    let trackingPermission = localStorage.getItem("app_cookie_permission");
    let targetPendingVid = '';

    window.initializeProgressScanner = function() {
        if (trackingPermission === null) {
            document.getElementById("privacyGuardPopup").classList.add("show");
        } else if (trackingPermission === "granted") {
            window.checkProgressAndPrompt(window.currentVideoId);
        } else {
            if (window.executePlayerInit) window.executePlayerInit(window.currentVideoId, 0);
        }
    };

    window.checkProgressAndPrompt = function(videoId) {
        targetPendingVid = videoId;
        const savedTime = localStorage.getItem("yt_progress_" + videoId);
        
        if (trackingPermission === "granted" && savedTime && parseInt(savedTime) > 4) {
            const mins = Math.floor(savedTime / 60);
            const secs = savedTime % 60;
            document.getElementById("savedTimeLabel").innerText = `${mins}m ${secs}s`;
            document.getElementById("resumeTrackModal").classList.add("show");
        } else {
            if (window.executePlayerInit) window.executePlayerInit(videoId, 0);
        }
    };

    // Permission Choices handlers
    document.getElementById("cookieAcceptBtn").addEventListener("click", () => {
        localStorage.setItem("app_cookie_permission", "granted");
        trackingPermission = "granted";
        document.getElementById("privacyGuardPopup").classList.remove("show");
        window.checkProgressAndPrompt(window.currentVideoId);
    });

    document.getElementById("cookieDeclineBtn").addEventListener("click", () => {
        localStorage.setItem("app_cookie_permission", "denied");
        trackingPermission = "denied";
        document.getElementById("privacyGuardPopup").classList.remove("show");
        for (let i = localStorage.length - 1; i >= 0; i--) {
            const k = localStorage.key(i);
            if (k && (k.startsWith("yt_progress_") || k.startsWith("yt_meta_"))) localStorage.removeItem(k);
        }
        if (window.executePlayerInit) window.executePlayerInit(window.currentVideoId, 0);
    });

    // Capture playback data parameters
    window.addEventListener("message", (event) => {
        if (trackingPermission !== "granted") return;
        try {
            const data = JSON.parse(event.data);
            if (data.customTrackPing && data.videoId) {
                const currentTime = Math.floor(data.currentTime);
                if (currentTime > 2 && currentTime < (data.duration - 5)) {
                    localStorage.setItem("yt_progress_" + data.videoId, currentTime);
                }
            }
        } catch (e) {}
    });

    // Modal control actions
    document.getElementById("resumeConfirmBtn").addEventListener("click", () => {
        const savedTime = localStorage.getItem("yt_progress_" + targetPendingVid);
        document.getElementById("resumeTrackModal").classList.remove("show");
        if (window.executePlayerInit) window.executePlayerInit(targetPendingVid, parseInt(savedTime || 0));
    });

    document.getElementById("resumeFreshBtn").addEventListener("click", () => {
        localStorage.removeItem("yt_progress_" + targetPendingVid);
        document.getElementById("resumeTrackModal").classList.remove("show");
        if (window.executePlayerInit) window.executePlayerInit(targetPendingVid, 0);
    });
})();
