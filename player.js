document.addEventListener("DOMContentLoaded", () => {
    // 1. Automatically grab the input, button, and iframe elements from your HTML
    const urlInput = document.querySelector("input");
    const watchButton = document.querySelector("button");
    const videoIframe = document.querySelector("iframe");

    function loadYouTubeVideo() {
        const videoUrl = urlInput.value.trim();

        if (!videoUrl) {
            alert("Please paste a YouTube link first!");
            return;
        }

        try {
            let videoId = '';
            
            // Extract ID from mobile links (https://youtu.be/r9_mme_Vtv0...)
            if (videoUrl.includes('youtu.be/')) {
                videoId = videoUrl.split('youtu.be/')[1].split('?')[0];
            } 
            // Extract ID from standard desktop links (https://www.youtube.com/watch?v=...)
            else if (videoUrl.includes('v=')) {
                videoId = videoUrl.split('v=')[1].split('&')[0];
            }
            // Extract ID from YouTube Shorts
            else if (videoUrl.includes('/shorts/')) {
                videoId = videoUrl.split('/shorts/')[1].split('?')[0];
            }

            if (videoId) {
                // Change the source to the correct embed URL format
                videoIframe.src = `https://www.youtube.com/embed/${videoId}`;
            } else {
                alert("Could not parse the YouTube ID. Please check the URL.");
            }
        } catch (e) {
            alert("An error occurred trying to read the link.");
        }
    }

    // Run when clicking the "Watch" button
    if (watchButton) {
        watchButton.addEventListener("click", loadYouTubeVideo);
    }

    // Run when hitting "Enter" on the keyboard inside the input field
    if (urlInput) {
        urlInput.addEventListener("keypress", (e) => {
            if (e.key === "Enter") {
                loadYouTubeVideo();
            }
        });
    }
});
