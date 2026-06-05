// loading-screen.js - Pure Handmade CSS Festive Skeleton Stage Overlay
(function() {
    // 1. Inject Pure CSS Handmade Animation & Stage Styles
    const styles = `
        .skeleton-loading-overlay {
            position: fixed;
            top: 0; left: 0; width: 100vw; height: 100vh;
            background: radial-gradient(circle at center, #140727 0%, #04050a 100%);
            z-index: 999999;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            opacity: 0;
            pointer-events: none;
            transition: opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .skeleton-loading-overlay.active {
            opacity: 1;
            pointer-events: auto;
        }

        /* Responsive Handmade Animation Stage */
        .fiesta-stage-container {
            width: 420px;
            height: 320px;
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
            margin-bottom: 20px;
        }

        /* --- HANDMADE CSS SKELETON ART --- */
        .handmade-skull-band {
            position: relative;
            width: 140px;
            height: 160px;
            animation: skullDance 0.8s ease-in-out infinite alternate;
            z-index: 5;
        }

        /* Skull Head Structure */
        .skull-head {
            position: absolute;
            width: 120px;
            height: 110px;
            background: #fffbfa;
            border-radius: 60px 60px 40px 40px;
            left: 10px;
            top: 10px;
            box-shadow: 0 0 25px rgba(236, 72, 153, 0.6), inset -5px -5px 15px rgba(0,0,0,0.1);
        }

        /* Skull Jaw */
        .skull-jaw {
            position: absolute;
            width: 70px;
            height: 45px;
            background: #fffbfa;
            bottom: 12px;
            left: 35px;
            border-radius: 0 0 20px 20px;
            box-shadow: 0 10px 15px rgba(0,0,0,0.2);
        }

        /* Teeth markings */
        .skull-jaw::after {
            content: '';
            position: absolute;
            width: 40px;
            height: 25px;
            left: 15px;
            top: 5px;
            border-left: 4px solid #140727;
            border-right: 4px solid #140727;
            background: repeating-linear-gradient(90deg, transparent, transparent 6px, #140727 6px, #140727 10px);
        }

        /* Festive Neon Eyes */
        .skull-eye {
            position: absolute;
            width: 32px;
            height: 32px;
            background: #140727;
            border-radius: 50%;
            top: 38px;
            border: 4px solid #db2777;
            box-shadow: 0 0 12px #db2777;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .skull-eye.left { left: 22px; }
        .skull-eye.right { right: 22px; }

        /* Glowing inner eye lights flashing to beats */
        .skull-eye::before {
            content: '';
            width: 10px;
            height: 10px;
            background: #a855f7;
            border-radius: 50%;
            box-shadow: 0 0 10px #a855f7;
            animation: eyeFlash 0.4s infinite alternate;
        }

        /* Marigold flower design on forehead */
        .skull-deco-flower {
            position: absolute;
            top: 15px;
            left: 55px;
            width: 30px;
            height: 30px;
            background: #f59e0b;
            clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%);
            animation: flowerSpin 3s linear infinite;
        }

        /* Neon Stage Floor Glow */
        .stage-neon-floor {
            position: absolute;
            bottom: 10px;
            width: 280px;
            height: 20px;
            background: radial-gradient(ellipse, rgba(236, 72, 153, 0.7) 0%, rgba(147, 51, 234, 0) 70%);
            filter: blur(10px);
            z-index: 1;
            animation: floorPulse 0.8s ease-in-out infinite alternate;
        }

        /* Status Announcement Headline */
        .loading-announcement {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            font-size: 15px;
            font-weight: 800;
            letter-spacing: 4px;
            color: #ffe4e6;
            text-transform: uppercase;
            text-shadow: 0 0 10px #db2777, 0 0 25px #9333ea;
            animation: neonStagePulse 1.2s ease-in-out infinite alternate;
            z-index: 2;
        }

        /* --- STAGE ANIMATIONS --- */
        @keyframes skullDance {
            0% { transform: translateY(0) rotate(-4deg) scale(1); }
            100% { transform: translateY(-15px) rotate(4deg) scale(1.05); }
        }
        @keyframes eyeFlash {
            0% { background: #a855f7; box-shadow: 0 0 4px #a855f7; }
            100% { background: #38bdf8; box-shadow: 0 0 14px #38bdf8; }
        }
        @keyframes flowerSpin {
            100% { transform: rotate(360deg); }
        }
        @keyframes floorPulse {
            0% { transform: scaleX(0.9); opacity: 0.5; }
            100% { transform: scaleX(1.1); opacity: 1; }
        }
        @keyframes neonStagePulse {
            0% { opacity: 0.65; transform: scale(0.97); }
            100% { opacity: 1; transform: scale(1.03); }
        }

        @media (max-width: 768px) {
            .fiesta-stage-container { width: 300px; height: 240px; }
        }
    `;
    const styleSheet = document.createElement("style");
    styleSheet.innerText = styles;
    document.head.appendChild(styleSheet);

    // 2. Build Handmade Content Layers
    const overlay = document.createElement("div");
    overlay.className = "skeleton-loading-overlay";
    overlay.id = "skeletonLoaderOverlay";

    overlay.innerHTML = `
        <div class="fiesta-stage-container">
            <div class="handmade-skull-band">
                <div class="skull-head">
                    <div class="skull-deco-flower"></div>
                    <div class="skull-eye left"></div>
                    <div class="skull-eye right"></div>
                </div>
                <div class="skull-jaw"></div>
            </div>
            <div class="stage-neon-floor"></div>
        </div>
        <div class="loading-announcement">Tuning the Instruments...</div>
    `;
    document.body.appendChild(overlay);

    // 3. Setup global hooks for sidebar navigation actions to call
    window.SkeletonFiestaLoader = {
        show: function(callback) {
            const el = document.getElementById("skeletonLoaderOverlay");
            if (el) {
                el.classList.add("active");
                if (callback) setTimeout(callback, 2600); 
            }
        },
        hide: function() {
            const el = document.getElementById("skeletonLoaderOverlay");
            if (el) el.classList.remove("active");
        }
    };
})();
