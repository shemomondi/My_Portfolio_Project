// Function to create and display YouTube videos using the API
function loadVideos() {
    const videoIds = [
        'XahEWKh1FIE',
        'nNdOyOY65WI',
        '2s0d80XaGWU',
        'RODs8Fkweww',
        'sufJ1VhZK24',
        'UpA95Zaoomg',
        'tC1X9EJlqAw',
        // Add more video IDs as needed
    ];

    const videosContainer = document.getElementById('videosContainer');

    // Use Intersection Observer to load videos when they enter the viewport
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.hasAttribute('data-loaded')) {
                const videoId = entry.target.getAttribute('data-video-id');
                const iframe = document.createElement('iframe');
                iframe.src = `https://www.youtube.com/embed/${videoId}`;
                iframe.width = '560';
                iframe.height = '315';
                iframe.allowFullscreen = true;
                entry.target.appendChild(iframe);
                // Set a flag to indicate that the video is loaded
                entry.target.setAttribute('data-loaded', 'true');
                // Unobserve the target to avoid unnecessary loads
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 }); // Adjust the threshold as needed

    // Create placeholders with data attributes for video IDs
    videoIds.forEach(videoId => {
        const placeholder = document.createElement('div');
        placeholder.setAttribute('data-video-id', videoId);
        placeholder.classList.add('video-placeholder'); // Add a class for styling if needed
        videosContainer.appendChild(placeholder);
        observer.observe(placeholder);
    });
}

// Flag to prevent multiple video loads
let videosLoaded = false;

// Event listener for scroll
window.addEventListener('scroll', () => {
    const videosSection = document.getElementById('videosSection');
    const distanceToTop = videosSection.getBoundingClientRect().top;

    // If the videos section is in the viewport and videos are not loaded, load videos
    if (distanceToTop < window.innerHeight && distanceToTop > -videosSection.clientHeight && !videosLoaded) {
        loadVideos();
        videosLoaded = true;
    }
});
