// loading-screen.js - Cinematic Interactive Loading Stage Animation
(function() {
    // 1. Inject Styles with Complex Keyframe Animations for Winds, Running, Playing, and Dancing
    const styles = `
        .skeleton-loading-overlay {
            position: fixed;
            top: 0; left: 0; width: 100vw; height: 100vh;
            background: radial-gradient(circle at center, #110724 0%, #030408 100%);
            z-index: 999999;
            display: none;
            align-items: center;
            justify-content: center;
            overflow: hidden;
            font-family: 'Segoe UI', sans-serif;
        }
        .skeleton-loading-overlay.active {
            display: flex;
        }

        /* --- Live Wind Background Effect --- */
        .wind-container {
            position: absolute;
            width: 100%;
            height: 100%;
            top: 0; left: 0;
            pointer-events: none;
            overflow: hidden;
        }
        .wind-stream {
            position: absolute;
            background: linear-gradient(90deg, transparent, rgba(168, 85, 247, 0.4), transparent);
            height: 2px;
            border-radius: 50%;
            animation: blowWind 2s linear infinite;
        }
        .wind-stream:nth-child(1) { width: 150px; top: 20%; left: -150px; animation-delay: 0s; }
        .wind-stream:nth-child(2) { width: 250px; top: 45%; left: -250px; animation-delay: 0.5s; animation-duration: 1.5s; }
        .wind-stream:nth-child(3) { width: 180px; top: 70%; left: -180px; animation-delay: 1s; animation-duration: 2.2s; }

        @keyframes blowWind {
            0% { transform: translateX(0) scaleY(1); opacity: 0; }
            10% { opacity: 0.7; }
            90% { opacity: 0.7; }
            100% { transform: translateX(calc(100vw + 300px)) scaleY(1.5); opacity: 0; }
        }

        /* --- Animation Stage Area --- */
        .animation-stage {
            position: relative;
            width: 800px;
            height: 400px;
            display: flex;
            align-items: flex-end;
            justify-content: center;
            border-bottom: 3px solid rgba(168, 85, 247, 0.3);
            padding-bottom: 20px;
        }

        /* --- Character Base Setup --- */
        .character {
            position: absolute;
            bottom: 20px;
            width: 100px;
            height: 140px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: flex-end;
            transition: all 0.3s ease;
        }

        /* --- LEFT CHARACTER: Guitarist --- */
        .guitarist {
            left: -150px; /* Start hidden off-screen left */
            animation: guitaristSequence 3.5s cubic-bezier(0.25, 1, 0.5, 1) forwards;
        }

        /* --- RIGHT CHARACTER: Dancing Couple --- */
        .dancing-couple {
            right: -150px; /* Start hidden off-screen right */
            animation: coupleSequence 3.5s cubic-bezier(0.25, 1, 0.5, 1) forwards;
        }

        /* --- Visual Elements for Avatars (Can be replaced with images later) --- */
        .avatar-body {
            width: 70px;
            height: 110px;
            background-size: contain;
            background-repeat: no-repeat;
            background-position: center;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        /* Built-in high quality SVG elements so it works instantly */
        .guitar-svg {
            width: 70px;
            height: 70px;
            filter: drop-shadow(0 0 8px #d946ef);
        }
        .dance-svg {
            width: 85px;
            height: 110px;
            filter: drop-shadow(0 0 8px #3b82f6);
        }

        /* --- Performance Status Animations --- */
        .jamming {
            animation: rockGuitars 0.4s ease-in-out infinite alternate;
        }
        .dancing {
            animation: salsaDance 0.6s ease-in-out infinite alternate;
        }

        /* --- Core Sequence Timing Keyframes --- */
        @keyframes guitaristSequence {
            0% { left: -150px; transform: scaleX(1); }                /* Offscreen */
            20% { left: calc(50% - 140px); transform: scaleX(1); }     /* Run to Left-Center position */
            25% { transform: scaleX(1); }                             /* Face forward/right */
            80% { left: calc(50% - 140px); transform: scaleX(-1); }    /* Jam finished, flip direction to face left */
            100% { left: -150px; transform: scaleX(-1); }              /* Run back offscreen left */
        }

        @keyframes coupleSequence {
            0% { right: -150px; transform: scaleX(1); }                /* Offscreen */
            20% { right: calc(50% - 140px); transform: scaleX(1); }    /* Run to Right-Center position */
            25% { transform: scaleX(1); }                             /* Face forward/left */
            80% { right: calc(50% - 140px); transform: scaleX(-1); }   /* Dance finished, flip direction to face right */
            100% { right: -150px; transform: scaleX(-1); }             /* Run back offscreen right */
        }

        /* Action micro-movements during the middle section */
        @keyframes rockGuitars {
            0% { transform: translateY(0) rotate(-5deg); }
            100% { transform: translateY(-8px) rotate(8deg); }
        }

        @keyframes salsaDance {
            0% { transform: translateX(-5px) rotate(-3deg) scale(1.02); }
            100% { transform: translateX(5px) rotate(3deg) scale(0.98); }
        }

        /* --- Loading Announcement Title Text --- */
        .loading-announcement {
            position: absolute;
            bottom: 40px;
            font-size: 16px;
            text-transform: uppercase;
            letter-spacing: 4px;
            color: #a855f7;
            text-shadow: 0 0 10px rgba(168, 85, 247, 0.6);
            animation: pulseText 1.5s ease-in-out infinite alternate;
        }
        @keyframes pulseText {
            0% { opacity: 0.4; }
            100% { opacity: 1; }
        }
    `;
    
    const styleSheet = document.createElement("style");
    styleSheet.innerText = styles;
    document.head.appendChild(styleSheet);

    // 2. Build Layered HTML Document Structure
    const overlay = document.createElement("div");
    overlay.className = "skeleton-loading-overlay";
    overlay.id = "skeletonLoaderOverlay";

    overlay.innerHTML = `
        <div class="wind-container">
            <div class="wind-stream"></div>
            <div class="wind-stream"></div>
            <div class="wind-stream"></div>
        </div>

        <div class="animation-stage">
            
            <div class="character guitarist">
                <div class="avatar-body jamming">
                    <svg class="guitar-svg" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20 4L15.3 8.7C15.1 8.5 14.8 8.4 14.5 8.5C14 8.6 13.6 9.1 13.6 9.6C13.6 9.9 13.7 10.1 13.9 10.3L10.3 13.9C10.1 13.7 9.9 13.6 9.6 13.6C9.1 13.6 8.6 14 8.5 14.5C8.4 14.8 8.5 15.1 8.7 15.3L4 20L5 21L9.7 16.3C9.9 16.5 10.2 16.6 10.5 16.5C11 16.4 11.4 16 11.4 15.5C11.4 15.2 11.3 15 11.1 14.8L14.8 11.1C15 11.3 15.2 11.4 15.5 11.4C16 11.4 16.4 11 16.5 10.5C16.6 10.2 16.5 9.9 16.3 9.7L21 5L20 4Z" fill="#e879f9" stroke="#db2777" stroke-width="1.5"/>
                        <path d="M19 8L16 5" stroke="#f472b6" stroke-width="1.5"/>
                    </svg>
                </div>
            </div>

            <div class="character dancing-couple">
                <div class="avatar-body dancing">
                    <svg class="dance-svg" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="26" cy="12" r="4" fill="#60a5fa"/>
                        <circle cx="38" cy="14" r="4" fill="#f472b6"/>
                        <path d="M22 24C24 20 30 18 34 22C36 24 38 28 42 30M26 24L20 42M34 24L38 46M38 24C35 28 32 32 29 44" stroke="#93c5fd" stroke-width="3" stroke-linecap="round"/>
                        <path d="M42 30C40 34 39 40 43 52M36 32C32 36 28 42 25 50" stroke="#f9a8d4" stroke-width="2.5" stroke-linecap="round"/>
                    </svg>
                </div>
            </div>

            <div class="loading-announcement">Tuning Stage Setup...</div>
        </div>
    `;
    document.body.appendChild(overlay);

    // 3. Automation Engine Control Hooks Hooked into Navigation Router
    window.SkeletonFiestaLoader = {
        show: function(callback) {
            const el = document.getElementById("skeletonLoaderOverlay");
            if (el) {
                el.classList.add(\"active\");
                // Holds full execution window so the sequence runs up, plays out, and exits cleanly
                if (callback) setTimeout(callback, 3500); 
            }
        },
        hide: function() {
            const el = document.getElementById("skeletonLoaderOverlay");
            if (el) el.classList.remove("active");
        }
    };
})();
