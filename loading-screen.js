// loading-screen.js - Isolated Festive Skeleton Loading Animation Overlay
(function() {
    // 1. Inject Mexican Dia de los Muertos Anime Styles
    const styles = `
        .skeleton-loading-overlay {
            position: fixed;
            top: 0; left: 0; width: 100vw; height: 100vh;
            background: radial-gradient(circle at center, #1e1135 0%, #070a12 100%);
            z-index: 999999;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            opacity: 0;
            pointer-events: none;
            transition: opacity 0.4s ease-in-out;
        }
        .skeleton-loading-overlay.active {
            opacity: 1;
            pointer-events: auto;
        }

        /* Stage Canvas Container */
        .fiesta-stage {
            position: relative;
            width: 320px;
            height: 240px;
            display: flex;
            align-items: flex-end;
            justify-content: center;
            gap: 20px;
            margin-bottom: 24px;
        }

        /* Neon Marigold/Purple Light Glows */
        .fiesta-stage::after {
            content: ''; position: absolute; bottom: 0; width: 200px; height: 20px;
            background: rgba(168, 85, 247, 0.4); filter: blur(15px); border-radius: 50%;
        }

        /* Dancing Couple Framework */
        .anime-couple-dance {
            position: relative;
            width: 120px;
            height: 160px;
            animation: rhythmicSway 0.8s ease-in-out infinite alternate;
            transform-origin: bottom center;
            z-index: 2;
        }

        /* Mariachi Band Members */
        .skeleton-band {
            display: flex;
            gap: 15px;
            position: absolute;
            bottom: 0;
            opacity: 0.75;
        }
        .musician {
            width: 45px;
            height: 75px;
            transform-origin: bottom center;
        }
        .guitarist { animation: guitarJam 0.5s ease-in-out infinite alternate; }
        .drummer { animation: drumBang 0.4s ease-in-out infinite alternate; }

        /* Custom Neon Typography Loading Status Text */
        .loading-announcement {
            font-family: 'Segoe UI', sans-serif;
            font-size: 18px;
            font-weight: 700;
            letter-spacing: 2px;
            color: #fca5a5;
            text-transform: uppercase;
            text-shadow: 0 0 10px #ef4444, 0 0 20px #b91c1c;
            animation: neonPulse 1.5s infinite alternate;
        }

        /* Animation Keyframe Blocks */
        @keyframes rhythmicSway {
            0% { transform: rotate(-5deg) scaleY(0.98); }
            100% { transform: rotate(5deg) scaleY(1.02); }
        }
        @keyframes guitarJam {
            0% { transform: scaleY(1) rotate(-3deg); }
            100% { transform: scaleY(1.05) rotate(7deg); }
        }
        @keyframes drumBang {
            0% { transform: translateY(0); }
            100% { transform: translateY(-6px); }
        }
        @keyframes neonPulse {
            0% { opacity: 0.6; text-shadow: 0 0 8px #ef4444; }
            100% { opacity: 1; text-shadow: 0 0 18px #ef4444, 0 0 30px #f43f5e; }
        }
    `;
    const styleSheet = document.createElement("style");
    styleSheet.innerText = styles;
    document.head.appendChild(styleSheet);

    // 2. Construct Canvas Elements & Embedded SVG Characters
    const overlay = document.createElement("div");
    overlay.className = "skeleton-loading-overlay";
    overlay.id = "skeletonLoaderOverlay";

    overlay.innerHTML = `
        <div class="fiesta-stage">
            <div class="musician guitarist">
                <svg viewBox="0 0 64 100" width="100%" height="100%">
                    <circle cx="32" cy="25" r="10" fill="#fff"/>
                    <circle cx="29" cy="25" r="2.5" fill="#000"/>
                    <circle cx="35" cy="25" r="2.5" fill="#000"/>
                    <path d="M 28 31 Q 32 34 36 31" stroke="#000" stroke-width="1.5" fill="none"/>
                    <path d="M 12 18 Q 32 5 52 18 Z" fill="#ea580c"/>
                    <rect x="20" y="16" width="24" height="4" fill="#facc15"/>
                    <path d="M 32 35 L 32 70 M 20 45 L 44 45" stroke="#fff" stroke-width="3"/>
                    <path d="M 24 40 L 48 55" stroke="#eab308" stroke-width="6" stroke-linecap="round"/>
                </svg>
            </div>

            <div class="anime-couple-dance">
                <svg viewBox="0 0 120 180" width="100%" height="100%">
                    <g transform="translate(15, 20)">
                        <circle cx="25" cy="25" r="12" fill="#fff"/>
                        <rect x="21" y="12" width="8" height="6" fill="#000" transform="rotate(15 25 25)"/> 
                        <circle cx="21" cy="25" r="3" fill="#000"/>
                        <circle cx="29" cy="25" r="3" fill="#000"/>
                        <path d="M 25 37 L 25 85 M 10 48 L 40 45" stroke="#fff" stroke-width="4"/>
                        <path d="M 12 39 L 25 60 L 38 39 Z" fill="#1e1b4b"/>
                    </g>
                    <g transform="translate(55, 15)">
                        <circle cx="25" cy="25" r="11" fill="#fff"/>
                        <circle cx="25" cy="12" r="4" fill="#dc2626"/>
                        <circle cx="20" cy="24" r="2.5" fill="#000"/>
                        <circle cx="30" cy="24" r="2.5" fill="#000"/>
                        <path d="M 25 36 L 25 75" stroke="#fff" stroke-width="3"/>
                        <path d="M 25 45 Q -5 100 25 115 Q 55 100 25 45 Z" fill="#db2777"/>
                        <path d="M 5 80 Q 25 70 45 80" stroke="#facc15" stroke-width="3" fill="none"/>
                    </g>
                </svg>
            </div>

            <div class="musician drummer">
                <svg viewBox="0 0 64 100" width="100%" height="100%">
                    <circle cx="32" cy="22" r="9" fill="#fff"/>
                    <circle cx="29" cy="22" r="2" fill="#000"/>
                    <circle cx="35" cy="22" r="2" fill="#000"/>
                    <path d="M 16 16 Q 32 6 48 16 Z" fill="#0d9488"/>
                    <path d="M 32 31 L 32 65 M 18 42 L 46 42" stroke="#fff" stroke-width="3"/>
                    <rect x="14" y="60" width="36" height="20" rx="4" fill="#dc2626"/>
                    <ellipse cx="32" cy="60" rx="18" ry="4" fill="#facc15"/>
                </svg>
            </div>
        </div>
        <div class="loading-announcement">Preparing Your Stage...</div>
    `;
    document.body.appendChild(overlay);

    // 3. System Global Interface Hooks
    window.SkeletonFiestaLoader = {
        show: function(callback) {
            const el = document.getElementById("skeletonLoaderOverlay");
            if (el) {
                el.classList.add("active");
                // Run callback instantly or after custom buffer delay window frame
                if (callback) setTimeout(callback, 2500); 
            }
        },
        hide: function() {
            const el = document.getElementById("skeletonLoaderOverlay");
            if (el) el.classList.remove("active");
        }
    };
})();
