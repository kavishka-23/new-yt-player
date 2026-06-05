// loading-screen.js - Animated Pixar-Style Halloween Fiesta Loading Screen
(function() {
    // 1. Inject Glassy Cinematic Stage Styles & Layered Animations
    const styles = `
        .skeleton-loading-overlay {
            position: fixed;
            top: 0; left: 0; width: 100vw; height: 100vh;
            /* Halloween Atmospheric Gradient Overlay */
            background: radial-gradient(circle at center, rgba(20, 7, 39, 0.4) 0%, #04050a 100%), 
                        url('https://lh3.googleusercontent.com/rd-gg-dl/AFfU-fInvNOViUGJN8aeIFns6q7dzGJbTkMtTJZ18FMKKLjAR3lLe9t6uRZ9x5iAE6VFC2snSP8RgP4jF28f5d3MndTV5DC1vepfyPW1rTrobhOETDLy0sGf_Ei7pJclzHvtpzZxQVrFkj8y0j7g51eeTw796FR8jQbXBY71qAcQMAf_u85A5_co92Ld5reve-3kZ1puGM12unTnXkwVX6fIuuuiWTp42saZui-1MeJ5vkVkhYI7z-noBGsF3CZxb8uOoGko1Wr7BO1yzbxPZoKwOWBzx2-8i4ppGoGUQybQBIHHItW0h2Sl1hoBhJbPGP-J42q7khj7vWnpgswTyir5IIt85NrbHfNhaQI82HiEhVBwrR1fgrov7zX2bq4B6lrQxbQvdWj6znamF50tWhYvsMqr1Mf-j_HNmARVFbo81ic85YGjBWfai15TvgjRENg9tzcRK2PHft4amyZMcsemVgSutF6yy8bSA6mvDt1uZAcXQE3Dmjgi8zUmnIYqVKPeeKG7AnzFT7NFJtQC6BajNUijzznej_rd7VEByXecBFfFApEWrQeAoA-hDKwm_c3yf6M9Mohq3QNwlA6iUVBT8CdQ13AJ9z5_H3zFGv8j5K4XcRgI8cU-ggDfz1uMmF2qP6Jj73KRoe_i1NZZfgVLW_sZzDXnwYK3E16aa5Wi-SBXsBumge4YHqu8vnSlMgLtQTLpHEUm9piCbDCDBAes47x9LHZlYyJnPnw-nHTzZLOqgL0o6miwsLXsmJ5CIfJOMBd-czW0H4kCHtR-CLkU2iedP7SZaK7UfF_FSXrar_a_B5v8-Y4UQN33A-8dVql0LO6reniKhxpNvnejSyLr7iIYDZvXFYvjJFVN653axHXcQda0AxkDcFXWpoI0zTap53iTO0LUUY8WU2P0K4jA1dPCxOPt6WkhR1XWT2D7ascVsEeIu2XnQ0a8_BWQZW9vtwP5bTI1Q9aJG8UKXQAMvPTEIDlCyscYapglj11GXbC1x9z96iTK29cRKDnmzH4wOCKp8RWAkekNi2sw96SlWo-nowazWrgzQw-uXL3pbOQdA3LNSxgRQzARLUqMq_XnS8G5WH8LXAq97DcBujgBFBr-ZZbJU-Bb1M5aGpjCCFbFb05c6-oD1at83KlMctBxMfVGq6I7fFivFzJcaxg2Ukw-LUQ9-YRdTxWX1Pvrhv2qiFv5UAMUTP9FNmf0G1e5l5-1W13MQezxGjVTG-3wvA=s1024-rj');
            background-size: cover;
            background-position: center;
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

        /* Animated Frame Container simulating a lively dance floor */
        .fiesta-stage-container {
            width: 550px;
            height: 350px;
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
            margin-bottom: -20px;
            border-radius: 16px;
            overflow: hidden;
            /* Rhythmic camera bobbing/dancing effect */
            animation: stageRock 2.4s ease-in-out infinite alternate;
        }

        /* Theatrical Neon Spotlight Glow behind text */
        .stage-neon-floor {
            position: absolute;
            bottom: 40px;
            width: 380px;
            height: 40px;
            background: radial-gradient(ellipse, rgba(219, 39, 119, 0.6) 0%, rgba(147, 51, 234, 0) 75%);
            filter: blur(15px);
            z-index: 1;
            animation: spotlightPulse 1.2s ease-in-out infinite alternate;
        }

        /* Bright Neon Marigold Text Headline */
        .loading-announcement {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            font-size: 18px;
            font-weight: 900;
            letter-spacing: 5px;
            color: #fff1f2;
            text-transform: uppercase;
            text-shadow: 0 0 10px #db2777, 0 0 25px #9333ea, 0 0 40px #f59e0b;
            animation: neonGlowPulse 1.2s ease-in-out infinite alternate;
            z-index: 2;
            margin-top: 10px;
        }

        /* --- CINEMATIC ANIMATIONS --- */
        @keyframes stageRock {
            0% { transform: translateY(0) scale(1) rotate(-1deg); }
            50% { transform: translateY(-8px) scale(1.02) rotate(0deg); }
            100% { transform: translateY(0) scale(1) rotate(1deg); }
        }

        @keyframes spotlightPulse {
            0% { transform: scaleX(0.8); opacity: 0.4; filter: blur(10px); }
            100% { transform: scaleX(1.2); opacity: 0.9; filter: blur(18px); }
        }

        @keyframes neonGlowPulse {
            0% { opacity: 0.7; transform: scale(0.96); text-shadow: 0 0 8px #db2777, 0 0 15px #9333ea; }
            100% { opacity: 1; transform: scale(1.04); text-shadow: 0 0 15px #db2777, 0 0 35px #9333ea, 0 0 50px #f59e0b; }
        }

        @media (max-width: 768px) {
            .fiesta-stage-container { width: 90vw; height: 50vw; }
            .loading-announcement { font-size: 14px; letter-spacing: 3px; }
        }
    `;
    
    const styleSheet = document.createElement("style");
    styleSheet.innerText = styles;
    document.head.appendChild(styleSheet);

    // 2. Build Structural HTML Layout
    const overlay = document.createElement("div");
    overlay.className = "skeleton-loading-overlay";
    overlay.id = "skeletonLoaderOverlay";

    overlay.innerHTML = `
        <div class="fiesta-stage-container">
            <div class="stage-neon-floor"></div>
        </div>
        <div class="loading-announcement">Tuning the Instruments...</div>
    `;
    document.body.appendChild(overlay);

    // 3. Global Control Hook Interface for your Sidebar Navigation Scripts
    window.SkeletonFiestaLoader = {
        show: function(callback) {
            const el = document.getElementById("skeletonLoaderOverlay");
            if (el) {
                el.classList.add("active");
                // Keeps loading overlay visible long enough to enjoy the animation phase
                if (callback) setTimeout(callback, 2600); 
            }
        },
        hide: function() {
            const el = document.getElementById("skeletonLoaderOverlay");
            if (el) el.classList.remove("active");
        }
    };
})();
