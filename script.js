document.getElementById('watchBtn').addEventListener('click', loadVideo);

// Allow pressing "Enter" in the input box to load the video
document.getElementById('videoUrl').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        loadVideo();
    }
});

function loadVideo() {
    const inputUrl = document.getElementById('videoUrl').value.trim();
    const videoId = extractYouTubeId(inputUrl);

    const placeholder = document.getElementById('placeholder');
    const videoWrapper = document.getElementById('videoWrapper');
    const iframe = document.getElementById('videoPlayer');

    if (videoId) {
        // Construct the strict embed URL format YouTube expects
        const embedUrl = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1`;
        
        // Update player source and toggle visibility
        iframe.src = embedUrl;
        placeholder.style.display = 'none';
        videoWrapper.style.display = 'block';
    } else {
        alert('Please enter a valid YouTube link (e.g., https://www.youtube.com/watch?v=... or https://youtu.be/...)');
    }
}

/**
 * Extracts the 11-character YouTube video ID from various URL formats
 */
function extractYouTubeId(url) {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);

    return (match && match[2].length === 11) ? match[2] : null;
}
