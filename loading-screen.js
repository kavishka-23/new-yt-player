// loading-screen.js - 100% Code-Generated 2D Live Loading Screen Animation
(function() {
    // 1. Inject Glassmorphic & Neon 2D Vector Styles
    const styles = `
        .skeleton-loading-overlay {
            position: fixed;
            top: 0; left: 0; width: 100vw; height: 100vh;
            background: radial-gradient(circle at center, #14092b 0%, #040509 100%);
            z-index: 999999;
            display: none;
            align-items: center;
            justify-content: center;
            overflow: hidden;
            font-family: 'Segoe UI', system-ui, sans-serif;
        }
        .skeleton-loading-overlay.active {
            display: flex;
        }

        /* --- Live Wind Background Effect --- */
        .wind-container {
            position: absolute;
            width: 100%; height: 100%;
            top: 0; left: 0;
            pointer-events: none;
            overflow: hidden;
        }
        .wind-stream {
            position: absolute;
            background: linear-gradient(90deg, transparent, rgba(217, 70, 239, 0.4), transparent);
            height: 3px;
            border-radius: 50%;
            filter: blur(1px);
            animation: blowWind 1.8s linear infinite;
        }
        .wind-stream:nth-child(1) { width: 250px; top: 25%; left: -250px; animation-delay: 0s; }
        .wind-stream:nth-child(2) { width: 350px; top: 50%; left: -350px; animation-delay: 0.4s; animation-duration: 1.3s; }
        .wind-stream:nth-child(3) { width: 280px; top: 75%; left: -280px; animation-delay: 0.8s; animation-duration: 2s; }

        @keyframes blowWind {
            0% { transform: translateX(0); opacity: 0; }
            20% { opacity: 1; }
            80% { opacity: 1; }
            100% { transform: translateX(calc(100vw + 400px)); opacity: 0; }
        }

        /* --- Glossy 2D Stage Floor --- */
        .animation-stage {
            position: relative;
            width: 850px;
            height: 450px;
            display: flex;
            align-items: flex-end;
            justify-content: center;
            border-bottom: 4px solid rgba(217, 70, 239, 0.3);
            padding-bottom: 20px;
            background: linear-gradient(180deg, transparent 60%, rgba(168, 85, 247, 0.05) 100%);
            border-radius: 0 0 100px 100px;
        }

        /* --- Character Core Sequences --- */
        .character-wrapper {
            position: absolute;
            bottom: 20px;
            width: 150px;
            height: 220px;
            display: flex;
            justify-content: center;
            align-items: flex-end;
        }

        .guitarist-group {
            left: -200px;
            animation: guitaristSequence 3.5s cubic-bezier(0.25, 1, 0.5, 1) infinite;
        }

        .couple-group {
            right: -200px;
            animation: coupleSequence 3.5s cubic-bezier(0.25, 1, 0.5, 1) infinite;
        }

        /* --- 2D Built-In Skeleton Vectors --- */
        .skel-body {
            position: relative;
            width: 120px;
            height: 200px;
            filter: drop-shadow(0 10px 15px rgba(0, 0, 0, 0.7)) drop-shadow(0 0 20px rgba(168, 85, 247, 0.3));
        }

        /* Running Leg Cycles */
        .skel-leg {
            position: absolute;
            bottom: 0;
            width: 12px;
            height: 60px;
            background: #f8fafc;
            border-radius: 6px;
            transform-origin: top center;
        }
        .leg-left { left: 45px; transform: rotate(20deg); }
        .leg-right { left: 65px; transform: rotate(-20deg); }

        /* Actively Running/Dancing Animations */
        .active-run .leg-left { animation: runCycle 0.5s linear infinite alternate; }
        .active-run .leg-right { animation: runCycle 0.5s linear infinite alternate-reverse; }

        @keyframes runCycle {
            0% { transform: rotate(35deg); }
            100% { transform: rotate(-35deg); }
        }

        /* --- Guitar Player Custom Elements --- */
        .mariachi-hat {
            width: 90px; height: 30px;
            background: linear-gradient(180deg, #ea580c, #9a3412);
            border-radius: 50% 50% 0 0;
            position: absolute; top: 10px; left: 15px;
            border-bottom: 6px solid #facc15;
            box-shadow: 0 4px 10px rgba(0,0,0,0.3);
        }
        .skull-head {
            width: 44px; height: 46px;
            background: #ffffff;
            border-radius: 50% 50% 40% 40%;
            position: absolute; top: 32px; left: 38px;
            border: 2px solid #475569;
        }
        .skull-head::before, .skull-head::after { /* Glowing Dia de los Muertos Eyes */
            content: ''; position: absolute; top: 12px; width: 10px; height: 10px;
            background: #22d3ee; border-radius: 50%; box-shadow: 0 0 8px #06b6d4;
        }
        .skull-head::before { left: 8px; }
        .skull-head::after { right: 8px; }

        .mexican-guitar {
            position: absolute;
            width: 85px; height: 35px;
            background: linear-gradient(45deg, #b45309, #d97706);
            border-radius: 15px 30px 30px 15px;
            top: 90px; left: 25px;
            transform: rotate(-15deg);
            box-shadow: 0 5px 10px rgba(0,0,0,0.4);
            animation: jamGuitar 0.3s ease-in-out infinite alternate;
            transform-origin: left center;
        }
        @keyframes jamGuitar {
            0% { transform: rotate(-10deg); }
            100% { transform: rotate(-25deg); }
        }

        /* --- Dancing Couple Custom Elements --- */
        .couple-container {
            position: relative; width: 100%; height: 100%;
            animation: danceSway 0.6s ease-in-out infinite alternate;
        }
        @keyframes danceSway {
            0% { transform: translateX(-8px) rotate(-4deg); }
            100% { transform: translateX(8px) rotate(4deg); }
        }
        .dancer-1 { position: absolute; left: 10px; top: 10px; }
        .dancer-2 { position: absolute; left: 45px; top: 5px; }
        
        .dress-glow {
            position: absolute; top: 75px; left: 32px;
            width: 60px; height: 75px;
            background: linear-gradient(180deg, #db2777, #701a75);
            clip-path: polygon(30% 0%, 70% 0%, 100% 100%, 0% 100%);
            opacity: 0.9;
            filter: drop-shadow(0 0 10px #f472b6);
        }

        /* --- Movement Timings (In, Play, Out) --- */
        @keyframes guitaristSequence {
            0% { left: -200px; transform: scaleX(1); }
            20% { left: calc(50% - 170px); transform: scaleX(1); } /* Stop running at mid-left */
            80% { left: calc(50% - 170px); transform: scaleX(-1); } /* Turn around */
            100% { left: -200px; transform: scaleX(-1); } /* Run back out */
        }

        @keyframes coupleSequence {
            0% { right: -200px; transform: scaleX(1); }
            20% { right: calc(50% - 150px); transform: scaleX(1); } /* Stop running at mid-right */
            80% { right: calc(50% - 150px); transform: scaleX(-1); } /* Turn around */
            100% { right: -200px; transform: scaleX(-1); } /* Run back out */
        }

        /* --- Glassmorphic Text Header --- */
        .loading-announcement {
            position: absolute;
            bottom: 35px;
            font-size: 14px;
            text-transform: uppercase;
            letter-spacing: 6px;
            color: #f472b6;
            background: rgba(255, 255, 255, 0.03);
            padding: 8px 24px;
            border-radius: 20px;
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.08);
            box-shadow: 0 4px 30px rgba(0, 0, 0, 0.2);
            text-shadow: 0 0 8px rgba(244, 114, 182, 0.6);
            animation: pulseText 1.4s ease-in-out infinite alternate;
        }
        @keyframes pulseText {
            0% { opacity: 0.4; transform: scale(0.97); }
            100% { opacity: 1; transform: scale(1.03); }
        }
    `;
    
    const styleSheet = document.createElement("style");
    styleSheet.innerText = styles;
    document.head.appendChild(styleSheet);

    // 2. Build Structured Layers Into DOM
    const overlay = document.createElement("div");
    overlay.className = "skeleton-loading-overlay";
    overlay.id = "skeletonLoaderOverlay";

    overlay.innerHTML = `
        <!-- Background Wind Trackers -->
        <div class="wind-container">
            <div class="wind-stream"></div>
            <div class="wind-stream"></div>
            <div class="wind-stream"></div>
        </div>

        <!-- Central Performance Arena -->
        <div class="animation-stage">
            
            <!-- Character 1: Left Entering Guitar Jammer -->
            <div class="character-wrapper guitarist-group active-run">
                <div class="skel-body">
                    <div class="skel-leg leg-left"></div>
                    <div class="skel-leg leg-right"></div>
                    <div class="mariachi-hat"></div>
                    <div class="skull-head"></div>
                    <div class="mexican-guitar"></div>
                </div>
            </div>

            <!-- Character 2: Right Entering Ballroom Dancers -->
            <div class="character-wrapper couple-group active-run">
                <div class="couple-container">
                    <!-- Dancer One (Feminine silhouette with neon dress) -->
                    <div class="skel-body dancer-1">
                        <div class="skel-leg leg-left"></div>
                        <div class="skel-leg leg-right"></div>
                        <div class="dress-glow"></div>
                        <div class="skull-head" style="top:25px; left:40px; transform: scale(0.9);"></div>
                    </div>
                    <!-- Dancer Two (Masculine skeleton frame) -->
                    <div class="skel-body dancer-2">
                        <div class="skel-leg leg-left" style="animation-delay: -0.25s;"></div>
                        <div class="skel-leg leg-right" style="animation-delay: -0.25s;"></div>
                        <div class="skull-head" style="top:20px; left:25px;"></div>
                    </div>
                </div>
            </div>

            <!-- Glassmorphic Global Loader Title -->
            <div class="loading-announcement">Staging Concert Arena...</div>
        </div>
    `;
    document.body.appendChild(overlay);

    // 3. Execution Control Hooks Window Interface
    window.SkeletonFiestaLoader = {
        show: function(callback) {
            const el = document.getElementById("skeletonLoaderOverlay");
            if (el) {
                el.classList.add("active");
                
                // Toggle run animations off when arriving in the center, and back on when exiting
                setTimeout(() => {
                    document.querySelectorAll('.character-wrapper').forEach(c => c.classList.remove('active-run'));
                }, 700);

                setTimeout(() => {
                    document.querySelectorAll('.character-wrapper').forEach(c => c.classList.add('active-run'));
                }, 2800);

                if (callback) setTimeout(callback, 3500); 
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
