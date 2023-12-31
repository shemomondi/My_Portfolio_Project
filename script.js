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

