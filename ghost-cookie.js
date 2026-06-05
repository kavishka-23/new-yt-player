// ghost-cookie.js - Vibrant Ghost Privacy Guard & Tracker Link
(function() {
    const styles = `
        .cookie-popup {
            position: fixed; bottom: 20px; right: 20px;
            background: rgba(30, 27, 75, 0.95); backdrop-filter: blur(16px);
            border: 2px solid #a855f7; padding: 24px; border-radius: 20px;
            z-index: 100000; width: 340px; box-shadow: 0 15px 40px rgba(0,0,0,0.6);
            font-family: 'Segoe UI', sans-serif; color: #ffffff;
            display: none; flex-direction: column; gap: 14px; text-align: center;
        }
        .cookie-popup.show { display: flex !important; }
        
        .cookie-btns { display: flex; gap: 10px; justify-content: center; margin-top: 5px; width: 100%; }
        .cookie-btn {
            flex: 1; padding: 10px 16px; border-radius: 12px; border: none; cursor: pointer;
            font-size: 13px; font-weight: 600; transition: all 0.2s ease;
        }
        .btn-accept { background: linear-gradient(to right, #9333ea, #4f46e5); color: #fff; }
        .btn-accept:hover { opacity: 0.95; transform: scale(1.02); }
        .btn-decline { background: rgba(255,255,255,0.08); color: #cbd5e1; border: 1px solid rgba(255,255,255,0.1); }
        .btn-decline:hover { background: rgba(255,255,255,0.15); color: #fff; }

        /* Welcome Back Prompt Layout Styles */
        .resume-modal {
            position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
            background: rgba(15, 23, 42, 0.4); backdrop-filter: blur(8px);
            display: none; align-items: center; justify-content: center; z-index: 100001;
        }
        .resume-modal.show { display: flex !important; }
        .resume-box {
            background: rgba(24, 24, 37, 0.95); backdrop-filter: blur(20px);
            border: 1px solid rgba(168, 85, 247, 0.3); padding: 32px;
            border-radius: 24px; text-align: center; color: white; width: 90%; max-width: 440px;
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.7), 0 0 50px rgba(168, 85, 247, 0.2);
            display: flex; flex-direction: column; align-items: center; gap: 12px;
        }

        /* Fixed High-Visibility Cute CSS Ghost Graphic */
        .ghost-avatar-frame { 
            height: 90px; 
            display: flex; 
            justify-content: center; 
            align-items: center; 
            margin-bottom: 5px; 
            width: 100%;
        }
        .cute-ghost {
            position: relative; 
            width: 46px; 
            height: 58px; 
            background: #ffffff;
            border-radius: 24px 24px 0 0; 
            animation: ghostFloat 2s ease-in-out infinite;
            filter: drop-shadow(0 8px 16px rgba(168, 85, 247, 0.4));
        }
        .ghost-face { 
            position: absolute; 
            top: 22px; 
            left: 12px; 
            width: 22px; 
            display: flex; 
            justify-content: space-between; 
        }
        .ghost-eye { 
            width: 5px; 
            height: 5px; 
            background-color: #111827; 
            border-radius: 50%; 
        }
        .ghost-smile { 
            position: absolute; 
            bottom: -4px; 
            left: 6px; 
            width: 10px; 
            height: 5px; 
            border-bottom: 2px solid #111827; 
            border-radius: 0 0 10px 10px; 
        }
        .ghost-bottom { 
            position: absolute; 
            bottom: -6px; 
            left: 0; 
            width: 100%; 
            display: flex; 
        }
        .ghost-wave { 
            flex: 1; 
            height: 7px; 
            background: #ffffff; 
            border-radius: 0 0 50% 50%; 
        }
        @keyframes ghostFloat { 
            0%, 100% { transform: translateY(0); } 
            50% { transform: translateY(-10px); } 
        }
        
        .resume-box h2 { font-size: 22px; font-weight: 700; color: #ffffff; margin-top: 5px; }
        .resume-box p { color: #cbd5e1; font-size: 15px; margin-bottom: 12px; }
        .highlight { color: #c084fc; font-weight: 600; }
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
        <h2 style="font-size:18px;">Storage Permission Needed</h2>
        <p style="font-size:13px; color:#cbd5e1; margin-bottom:10px;">We use browser storage to recall your video playback positions and history features. Is that okay?</p>
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
