// Function to create and display YouTube videos using the API
function loadVideos() {
    const videoIds = [
        'XahEWKh1FIE',
       // 'nNdOyOY65WI',
        '2s0d80XaGWU',
        'RODs8Fkweww',
        'sufJ1VhZK24',
        'UpA95Zaoomg',
        'tC1X9EJlqAw',
       //'JrExz1NYn8o',
        'OTqRhVTE0Sk',
        'pabciQ-MJD0',
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

document.addEventListener('DOMContentLoaded', function () {
    const auth0 = new Auth0Client({
        domain: 'dev-vqvc5eurt0ic27a2.us.auth0.com',
        clientID: 'rlI0px3wJ1WggOCVRDSSN5LSWED571iS',
        redirectUri: 'https://shemomondi.github.io/My_Portfolio_Project/callback',
    });

    const loginButton = document.getElementById('loginButton');
    const logoutButton = document.getElementById('logoutButton');
    const submitButton = document.getElementById('submitButton');
    const loginForm = document.getElementById('loginForm');

    loginButton.addEventListener('click', function () {
        toggleLoginForm();
    });

    submitButton.addEventListener('click', function () {
        login();
    });

    logoutButton.addEventListener('click', function () {
        logout();
    });

    function toggleLoginForm() {
        loginForm.style.display = loginForm.style.display === 'none' ? 'block' : 'none';
    }

    function login() {
        auth0.loginWithRedirect();
    }

    function logout() {
        auth0.logout();
    }

    function handleAuthentication() {
        auth0.handleRedirectCallback().then(() => {
            // Now you can get the user's profile, etc.
            auth0.getUser().then((user) => {
                console.log('User profile:', user);
            });
        });
    }

    // Handle authentication on page load
    window.addEventListener('load', handleAuthentication);
});

