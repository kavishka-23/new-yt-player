const params = new URLSearchParams(window.location.search);
const videoId = params.get('video');

if (!videoId) {
  document.body.innerHTML = 'No video loaded';
}

const iframe = document.getElementById('ytFrame');
iframe.src = `https://www.youtube.com/embed/${videoId}?origin=${location.origin}&rel=0`;
