// loading-screen.js - High-Expression Dia de los Muertos Animation Screen
(function() {
    // 1. Inject Advanced Disney-Style Fluid Animation CSS
    const styles = `
        .skeleton-loading-overlay {
            position: fixed;
            top: 0; left: 0; width: 100vw; height: 100vh;
            background: radial-gradient(circle at center, #1b0d3a 0%, #05070f 100%);
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

        /* Festive Stage Setup */
        .fiesta-stage {
            position: relative;
            width: 450px;
            height: 280px;
            display: flex;
            align-items: flex-end;
            justify-content: space-between;
            padding: 0 20px;
            margin-bottom: 30px;
        }

        /* Neon Glow Base Floor */
        .stage-floor-glow {
            position: absolute;
            bottom: -10px; left: 50%; transform: translateX(-50%);
            width: 380px; height: 30px;
            background: radial-gradient(ellipse, rgba(168, 85, 247, 0.6) 0%, rgba(236, 72, 153, 0) 70%);
            filter: blur(10px);
        }

        /* Individual Musician Actions */
        .musician {
            width: 70px;
            height: 120px;
            transform-origin: bottom center;
        }
        
        /* Guitarist: Frantic, enthusiastic strumming and head bopping */
        .guitarist { animation: bodyBounce 0.4s ease-in-out infinite alternate; }
        .guitarist .guitar-strum { animation: franticStrum 0.15s linear infinite alternate; transform-origin: 32px 52px; }
        .guitarist .head-bop { animation: headBopAction 0.4s ease-in-out infinite alternate; transform-origin: 32px 30px; }

        /* Drummer: Passionate drum beats slamming up and down */
        .drummer { animation: bodyBounce 0.4s ease-in-out infinite alternate-reverse; }
        .drummer .drum-arm-left { animation: drumStrikeLeft 0.2s ease-in-out infinite alternate; transform-origin: 20px 42px; }
        .drummer .drum-arm-right { animation: drumStrikeRight 0.2s ease-in-out infinite alternate-reverse; transform-origin: 44px 42px; }

        /* The Dancing Couple: Fluid, layered rhythmic motion */
        .anime-couple-dance {
            position: relative;
            width: 180px;
            height: 200px;
            z-index: 2;
        }
        
        /* Groom: Smooth swaying and dipping motion */
        .groom-skeleton {
            animation: groomSway 0.8s ease-in-out infinite alternate;
            transform-origin: 40px 150px;
        }
        
        /* Bride: Flowing dress spins and head tilts */
        .bride-skeleton {
            animation: brideDance 0.8s ease-in-out infinite alternate;
            transform-origin: 130px 140px;
        }
        .bride-skeleton .skirt-flare {
            animation: skirtSway 0.4s ease-in-out infinite alternate;
            transform-origin: 130px 95px;
        }

        /* Status Headline Text Stylings */
        .loading-announcement {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            font-size: 16px;
            font-weight: 800;
            letter-spacing: 3px;
            color: #ffe4e6;
            text-transform: uppercase;
            text-shadow: 0 0 12px #db2777, 0 0 25px #9333ea;
            animation: neonPulse 1.2s ease-in-out infinite alternate;
        }

        /* --- HIGH EXPRESSION ANIMATION TIMELINES --- */
        @keyframes bodyBounce {
            0% { transform: scaleY(0.93) translateY(4px); }
            100% { transform: scaleY(1.04) translateY(-2px); }
        }
        @keyframes headBopAction {
            0% { transform: rotate(-8deg) translateY(2px); }
            100% { transform: rotate(10deg) translateY(-1px); }
        }
        @keyframes franticStrum {
            0% { transform: rotate(-15deg); }
            100% { transform: rotate(20deg); }
        }
        @keyframes drumStrikeLeft {
            0% { transform: rotate(-40deg); }
            100% { transform: rotate(15deg); }
        }
        @keyframes drumStrikeRight {
            0% { transform: rotate(40deg); }
            100% { transform: rotate(-15deg); }
        }
        @keyframes groomSway {
            0% { transform: rotate(-6deg) translateX(-5px); }
            100% { transform: rotate(8deg) translateX(5px) scaleY(1.02); }
        }
        @keyframes brideDance {
            0% { transform: rotate(8deg) translateY(2px); }
            100% { transform: rotate(-10deg) translateY(-3px); }
        }
        @keyframes skirtSway {
            0% { transform: scaleX(0.92) rotate(-5deg); }
            100% { transform: scaleX(1.08) rotate(5deg); }
        }
        @keyframes neonPulse {
            0% { opacity: 0.7; transform: scale(0.97); }
            100% { opacity: 1; transform: scale(1.02); }
        }

        @media (max-width: 768px) {
            .fiesta-stage { width: 320px; height: 220px; }
            .musician { width: 50px; height: 90px; }
            .anime-couple-dance { width: 130px; height: 150px; }
        }
    `;
    const styleSheet = document.createElement("style");
    styleSheet.innerText = styles;
    document.head.appendChild(styleSheet);

    // 2. Build the Animated Stage and Character Rigging Layers
    const overlay = document.createElement("div");
    overlay.className = "skeleton-loading-overlay";
    overlay.id = "skeletonLoaderOverlay";

    overlay.innerHTML = `
        <div class="fiesta-stage">
            <div class="stage-floor-glow"></div>

            <div class="musician guitarist">
                <svg viewBox="0 0 64 120" width="100%" height="100%">
                    <path d="M 8 22 Q 32 0 56 22 Z" fill="#d97706"/>
                    <rect x="18" y="19" width="28" height="4" fill="#facc15"/>
                    <g class="head-bop">
                        <circle cx="32" cy="32" r="10" fill="#ffffff"/>
                        <circle cx="28" cy="32" r="2.5" fill="#000000"/>
                        <circle cx="36" cy="32" r="2.5" fill="#000000"/>
                        <path d="M 28 38 Q 32 41 36 38" stroke="#000" stroke-width="1.5" fill="none"/>
                    </g>
                    <path d="M 32 42 L 32 85 M 20 52 L 44 52 M 22 60 L 42 60" stroke="#ffffff" stroke-width="3" stroke-linecap="round"/>
                    <g class="guitar-strum">
                        <path d="M 12 55 L 54 75" stroke="#b45309" stroke-width="7" stroke-linecap="round"/>
                        <ellipse cx="20" cy="59" rx="7" ry="5" fill="#ea580c"/>
                        <path d="M 46 71 L 54 75" stroke="#facc15" stroke-width="2"/>
                    </g>
                    <path d="M 26 85 L 22 115 M 38 85 L 42 115" stroke="#ffffff" stroke-width="3.5" stroke-linecap="round"/>
                </svg>
            </div>

            <div class="anime-couple-dance">
                <svg viewBox="0 0 180 200" width="100%" height="100%">
                    
                    <g class="groom-skeleton">
                        <rect x="22" y="10" width="36" height="25" fill="#1e1b4b" rx="2"/>
                        <ellipse cx="40" cy="35" rx="24" ry="3" fill="#1e1b4b"/>
                        <circle cx="40" cy="48" r="11" fill="#ffffff"/>
                        <circle cx="36" cy="48" r="2.5" fill="#020617"/>
                        <circle cx="44" cy="48" r="2.5" fill="#020617"/>
                        <path d="M 40 59 L 40 110 M 24 70 L 56 70" stroke="#ffffff" stroke-width="3"/>
                        <path d="M 22 60 L 40 90 L 58 60 Z" fill="#111827"/>
                        <path d="M 24 70 Q 10 85 30 95" stroke="#ffffff" stroke-width="2.5" fill="none"/>
                        <path d="M 32 110 L 28 155 M 48 110 L 46 155" stroke="#ffffff" stroke-width="4" stroke-linecap="round"/>
                    </g>

                    <g class="bride-skeleton">
                        <circle cx="120" cy="36" r="4" fill="#e11d48"/>
                        <circle cx="130" cy="34" r="5" fill="#c084fc"/>
                        <circle cx="140" cy="37" r="4" fill="#e11d48"/>
                        <circle cx="130" cy="50" r="10.5" fill="#ffffff"/>
                        <circle cx="126" cy="50" r="2.5" fill="#000000"/>
                        <circle cx="134" cy="50" r="2.5" fill="#000000"/>
                        <path d="M 130 60 L 130 100 M 116 70 L 144 70" stroke="#ffffff" stroke-width="3"/>
                        <path d="M 116 70 Q 90 65 80 85" stroke="#ffffff" stroke-width="2.5" fill="none"/>
                        <g class="skirt-flare">
                            <path d="M 130 90 Q 90 135 110 165 Q 130 175 150 165 Q 170 135 130 90 Z" fill="#db2777"/>
                            <path d="M 103 145 Q 130 135 157 145" stroke="#facc15" stroke-width="3" fill="none"/>
                            <path d="M 111 158 Q 130 150 149 158" stroke="#38bdf8" stroke-width="2" fill="none"/>
                        </g>
                    </g>
                </svg>
            </div>

            <div class="musician drummer">
                <svg viewBox="0 0 64 120" width="100%" height="100%">
                    <path d="M 8 24 Q 32 4 56 24 Z" fill="#0891b2"/>
                    <circle cx="32" cy="34" r="9.5" fill="#ffffff"/>
                    <circle cx="28" cy="34" r="2" fill="#0f172a"/>
                    <circle cx="36" cy="34" r="2" fill="#0f172a"/>
                    <path d="M 32 44 L 32 80 M 16 54 L 48 54" stroke="#ffffff" stroke-width="3" stroke-linecap="round"/>
                    
                    <path class="drum-arm-left" d="M 18 54 L 8 72 L 20 74" stroke="#ffffff" stroke-width="3" fill="none" stroke-linecap="round"/>
                    <path class="drum-arm-right" d="M 46 54 L 56 72 L 44 74" stroke="#ffffff" stroke-width="3" fill="none" stroke-linecap="round"/>
                    
                    <rect x="10" y="80" width="44" height="26" rx="5" fill="#e11d48"/>
                    <ellipse cx="32" cy="80" rx="22" ry="5" fill="#facc15"/>
                    <path d="M 14 85 L 20 106 M 27 85 L 29 106 M 37 85 L 35 106 M 50 85 L 44 106" stroke="#ffffff" stroke-width="1.5"/>
                </svg>
            </div>
        </div>
        <div class="loading-announcement">Bringing Center Stage Alive...</div>
    `;
    document.body.appendChild(overlay);

    // 3. System Global Interface Hooks
    window.SkeletonFiestaLoader = {
        show: function(callback) {
            const el = document.getElementById("skeletonLoaderOverlay");
            if (el) {
                el.classList.add("active");
                if (callback) setTimeout(callback, 2400); 
            }
        },
        hide: function() {
            const el = document.getElementById("skeletonLoaderOverlay");
            if (el) el.classList.remove("active");
        }
    };
})();
