// loading-screen.js - High-Expression Festive Skeleton Animation Overlay
(function() {
    // 1. Inject Glassy Cinematic Stage Styles
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

        /* Responsive Animation Container Stage */
        .fiesta-stage-container {
            width: 420px;
            height: 320px;
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
            margin-bottom: 20px;
        }

        /* High-Expression Anime Performance Asset */
        .fiesta-animation-asset {
            width: 100%;
            height: 100%;
            object-fit: contain;
            filter: drop-shadow(0 0 25px rgba(168, 85, 247, 0.55));
        }

        /* Glow effects mimicking theatrical lighting */
        .stage-neon-floor {
            position: absolute;
            bottom: 10px;
            width: 260px;
            height: 20px;
            background: radial-gradient(ellipse, rgba(236, 72, 153, 0.5) 0%, rgba(147, 51, 234, 0) 70%);
            filter: blur(12px);
            z-index: 1;
        }

        /* Neon Marigold Status Announcement Headline */
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

    // 2. Build Content Layers
    const overlay = document.createElement("div");
    overlay.className = "skeleton-loading-overlay";
    overlay.id = "skeletonLoaderOverlay";

    overlay.innerHTML = `
        <div class="fiesta-stage-container">
            <img class="fiesta-animation-asset" 
                 src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExM3N5YmN5ZzZicnRyN3F4N3ZkMHJ4ajI2Ym9oNjQ3bXJ1cGtoenRxaCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/L330Y6YwVcoMsnMshV/giphy.gif" 
                 alt="Dia de los Muertos Live Band Animation">
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
                // Gives the user enough time to appreciate the lively band actions
                if (callback) setTimeout(callback, 2600); 
            }
        },
        hide: function() {
            const el = document.getElementById("skeletonLoaderOverlay");
            if (el) el.classList.remove("active");
        }
    };
})();
