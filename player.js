document.addEventListener("DOMContentLoaded", () => {
    // 1. Grab your HTML elements
    const urlInput = document.querySelector("input[type='text']");
    const watchButton = document.querySelector("button");
    const videoIframe = document.querySelector("iframe");

    // 2. Define the player updater logic
    function updateVideoPlayer() {
        const videoUrl = urlInput.value.trim();

        if (!videoUrl) {
            alert("Please paste a YouTube URL first!");
            return;
        }

        try {
            let videoId = '';
            const urlObj = new URL(videoUrl);

            // Handle standard youtube.com watch links (?v=...)
            if (urlObj.hostname.includes('youtube.com')) {
                if (urlObj.pathname.includes('/shorts/')) {
                    // Handle YouTube Shorts
                    videoId = urlObj.pathname.split('/shorts/')[1].split(/[?#]/)[0];
                } else {
                    videoId = urlObj.searchParams.get('v');
                }
            } 
            // Handle shortened youtu.be mobile links
            else if (urlObj.hostname.includes('youtu.be')) {
                videoId = urlObj.pathname.substring(1).split(/[?#]/)[0];
            }

            // 3. If we found an ID, update the iframe src using /embed/
            if (videoId) {
                videoIframe.src = `https://www.youtube.com/embed/${videoId}`;
            } else {
                alert("Could not extract a valid video ID. Make sure it's a valid YouTube link.");
            }

        } catch (error) {
            alert("Please enter a valid web address (URL).");
        }
    }

    // 4. Trigger when clicking the "Watch" button
    watchButton.addEventListener("click", updateVideoPlayer);

    // 5. OPTIONAL: Trigger when pressing the "Enter" key inside the input box
    urlInput.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            updateVideoPlayer();
        }
    });
});
