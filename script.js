document.getElementById('watchBtn').addEventListener('click', loadVideo);

// Allow pressing "Enter" key in the text field to watch
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
        // Build the precise YouTube embed string
        const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
        
        iframe.src = embedUrl;
        placeholder.style.style.display = 'none';
        videoWrapper.style.display = 'block';
    } else {
        alert('Please enter a valid YouTube link (e.g., https://www.youtube.com/watch?v=...)');
    }
}

/**
 * Extracts the standard 11-digit YouTube video ID string
 */
function extractYouTubeId(url) {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);

    return (match && match[2].length === 11) ? match[2] : null;
}
