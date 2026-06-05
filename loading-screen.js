// loading-screen.js - Interactive Cinematic Loading Stage Animation
(function() {
    // 1. Inject Styles with Wind Background, Entry/Exit Running, and Standby Dancing/Playing
    const styles = `
        .skeleton-loading-overlay {
            position: fixed;
            top: 0; left: 0; width: 100vw; height: 100vh;
            background: radial-gradient(circle at center, #0e071a 0%, #030407 100%);
            z-index: 999999;
            display: none;
            align-items: center;
            justify-content: center;
            overflow: hidden;
            font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, sans-serif;
        }
        .skeleton-loading-overlay.active {
            display: flex;
        }

        /* --- Live Wind Background Lines --- */
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
            background: linear-gradient(90deg, transparent, rgba(168, 85, 247, 0.45), transparent);
            height: 2px;
            border-radius: 50%;
            animation: blowWind 2s linear infinite;
        }
        .wind-stream:nth-child(1) { width: 200px; top: 25%; left: -200px; animation-delay: 0s; animation-duration: 1.8s; }
        .wind-stream:nth-child(2) { width: 320px; top: 50%; left: -320px; animation-delay: 0.4s; animation-duration: 1.4s; }
        .wind-stream:nth-child(3) { width: 240px; top: 75%; left: -240px; animation-delay: 0.9s; animation-duration: 2.1s; }

        @keyframes blowWind {
            0% { transform: translateX(0); opacity: 0; }
            15% { opacity: 1; }
            85% { opacity: 1; }
            100% { transform: translateX(calc(100vw + 350px)); opacity: 0; }
        }

        /* --- Animation Floor Stage Area --- */
        .animation-stage {
            position: relative;
            width: 850px;
            height: 450px;
            display: flex;
            align-items: flex-end;
            justify-content: center;
            border-bottom: 4px solid rgba(168, 85, 247, 0.25);
            padding-bottom: 20px;
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
        }

        /* --- Character Base Setup --- */
        .character {
            position: absolute;
            bottom: 20px;
            width: 130px;
            height: 160px;
            background-image: url('1000071237.png');
            background-repeat: no-repeat;
            background-size: 260px 160px; /* Two-part image grid setup layout */
            transition: transform 0.2s linear;
        }

        /* --- LEFT CHARACTER: Guitarist --- */
        .guitarist {
            background-position: 0px 0px; /* Left half of your image sprite */
            left: -180px;
            animation: guitaristSequence 3.2s cubic-bezier(0.25, 1, 0.5, 1) infinite;
        }

        /* --- RIGHT CHARACTER: Dancing Couple --- */
        .dancing-couple {
            background-position: -130px 0px; /* Right half of your image sprite */
            right: -180px;
            animation: coupleSequence 3.2s cubic-bezier(0.25, 1, 0.5, 1) infinite;
        }

        /* --- Core Sequence Timing Keyframes (In, Play/Dance, Out) --- */
        @keyframes guitaristSequence {
            0% { left: -180px; transform: scaleX(1) translateY(0); }
            22% { left: calc(50% - 150px); transform: scaleX(1) translateY(0); } /* Enters and arrives */
            /* Middle Jam Phase - Micro-bounce rocking movements */
            35% { transform: scaleX(1) translateY(-8px) rotate(-3deg); }
            48% { transform: scaleX(1) translateY(0) rotate(4deg); }
            62% { transform: scaleX(1) translateY(-8px) rotate(-3deg); }
            75% { left: calc(50% - 150px); transform: scaleX(-1) translateY(0); } /* Turn around */
            95%, 100% { left: -180px; transform: scaleX(-1) translateY(0); } /* Exit back to left */
        }

        @keyframes coupleSequence {
            0% { right: -180px; transform: scaleX(1) translateY(0); }
            22% { right: calc(50% - 150px); transform: scaleX(1) translateY(0); } /* Enters and arrives */
            /* Middle Dance Phase - Micro-sway rhythm movements */
            35% { transform: scaleX(1) translateX(-6px) rotate(3deg); }
            48% { transform: scaleX(1) translateX(6px) rotate(-3deg); }
            62% { transform: scaleX(1) translateX(-6px) rotate(3deg); }
            75% { right: calc(50% - 150px); transform: scaleX(-1) translateY(0); } /* Turn around */
            95%, 100% { right: -180px; transform: scaleX(-1) translateY(0); } /* Exit back to right */
        }

        /* --- Interactive Loading Text --- */
        .loading-announcement {
            position: absolute;
            bottom: 35px;
            font-size: 15px;
            text-transform: uppercase;
            letter-spacing: 5px;
            color: #c084fc;
            text-shadow: 0 0 12px rgba(168, 85, 247, 0.65);
            animation: pulseText 1.2s ease-in-out infinite alternate;
        }
        @keyframes pulseText {
            0% { opacity: 0.3; transform: scale(0.98); }
            100% { opacity: 1; transform: scale(1.02); }
        }
    `;
    
    const styleSheet = document.createElement("style");
    styleSheet.innerText = styles;
    document.head.appendChild(styleSheet);

    // 2. Build DOM Structural Elements
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
            <div class="character guitarist"></div>
            <div class="character dancing-couple"></div>
            <div class="loading-announcement">Syncing Stage Assets...</div>
        </div>
    `;
    document.body.appendChild(overlay);

    // 3. Main Window Controller System Hooks linked to your Sidebar Router Engine
    window.SkeletonFiestaLoader = {
        show: function(callback) {
            const el = document.getElementById("skeletonLoaderOverlay");
            if (el) {
                el.classList.add("active");
                // Gives enough space (2.6 seconds) for running, jamming, and starting to clear
                if (callback) setTimeout(callback, 2600); 
            }
        },
        hide: function() {
            const el = document.getElementById("skeletonLoaderOverlay");
            if (el) {
                el.classList.remove("active");
            }
        }
    };
})();
