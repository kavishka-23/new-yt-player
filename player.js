// Get the URL from your input field
const videoUrl = document.getElementById('urlInput').value; 

try {
    const urlObj = new URL(videoUrl);
    let videoId = '';

    // Check if it's a standard youtube.com watch link
    if (urlObj.hostname.includes('youtube.com')) {
        videoId = urlObj.searchParams.get('v');
    } 
    // Check if it's a shortened youtu.be link
    else if (urlObj.hostname.includes('youtu.be')) {
        videoId = urlObj.pathname.substring(1);
    }

    if (videoId) {
        // Update your iframe source with the correct embed path
        document.getElementById('yourIframeId').src = `https://www.youtube.com/embed/${videoId}`;
    } else {
        alert("Please enter a valid YouTube URL.");
    }
} catch (error) {
    alert("Please enter a valid URL website address.");
}
