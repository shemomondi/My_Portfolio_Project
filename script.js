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
                entry.target.setAttribute('data-loaded', 'true');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 }); // Adjusted the threshold

    // Create placeholders with data attributes for video IDs
    videoIds.forEach(videoId => {
        const placeholder = document.createElement('div');
        placeholder.setAttribute('data-video-id', videoId);
        placeholder.classList.add('video-placeholder'); // Add a class for styling if needed
        videosContainer.appendChild(placeholder);
        observer.observe(placeholder);
    });
}
document.addEventListener("DOMContentLoaded", function() {
    // Check if the user has visited the site before (using localStorage)
    if (!localStorage.getItem("popupShown")) {
        // If not, show the popup
        document.getElementById("popup-container").style.display = "flex";
    }
});

function closePopup() {
    // Close the popup and set a flag in localStorage to not show it again
    document.getElementById("popup-container").style.display = "none";
    localStorage.setItem("popupShown", "true");
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
        // Remove the event listener to avoid unnecessary calls
        window.removeEventListener('scroll', loadVideos);
    }
});

// Auth0 configuration
window.addEventListener('load', () => {
    const auth0 = new Auth0Client({
        domain: 'dev-vqvc5eurt0ic27a2.us.auth0.com',
        clientID: 'OCQL6716MW4rsHFEX6nQRyFtZQuNVuAZ',
        redirectUri: 'https://shemomondi.github.io/My_Portfolio_Project/callback',
        // Add other configuration options as needed
    });

    // Toggle login form visibility
    function toggleLoginForm() {
        const loginForm = document.getElementById('loginForm');
        loginForm.style.display = loginForm.style.display === 'none' ? 'block' : 'none';
    }

    const loginButton = document.getElementById('loginButton');

    if (loginButton) {
        loginButton.addEventListener('click', async () => {
            toggleLoginForm();
        });
    }

    // Add login logic here
    const submitButton = document.getElementById('submitButton');
    if (submitButton) {
        submitButton.addEventListener('click', async () => {
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            // Replace with your authentication logic
            if (username === 'yourUsername' && password === 'yourPassword') {
                alert('Login successful!');
            } else {
                alert('Login failed. Please check your credentials.');
            }
        });
    }
});
