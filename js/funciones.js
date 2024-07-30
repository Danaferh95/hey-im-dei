/* Function to precisely move the scroll position within the web page */

const links = document.querySelectorAll("a");
const offset = 100; // Pixels to move

links.forEach(link => {
    link.addEventListener("click", function(event) {
        event.preventDefault();
        const targetId = this.getAttribute("href").substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - offset,
                behavior: "smooth"
            });
        }
    });
});

/*--------------------------------------------------------
    MENU TOGGLE
    This section toggles the main menu, turning it into 
    a hamburger menu when the device is small
--------------------------------------------------------*/

const navegacion = document.querySelector("nav"); 
const btnNav = document.querySelectorAll(".abrir , .cerrar"); 

btnNav.forEach((obj) => {
    obj.addEventListener("click", () => {
        navegacion.classList.toggle("desplegado");
    });
}); 


/* Functions to play the videos */
const gridItems = document.querySelectorAll(".grid-item");
let currentPlayingVideo = null;

gridItems.forEach(item => {
    const video = item.querySelector("video");

    function playVideo() {
        // Pause the currently playing video if it's different from the one being played
        if (currentPlayingVideo && currentPlayingVideo !== video) {
            currentPlayingVideo.pause().catch(function(error) {
                console.error('Error pausing video:', error);
            });
        }

        // Play the new video
        video.play().catch(function(error) {
            console.error('Error playing video:', error);
        });

        // Update the current playing video
        currentPlayingVideo = video;
    }

    function pauseVideo() {
        // Only pause if this video is the currently playing one
        if (currentPlayingVideo === video) {
            video.pause().catch(function(error) {
                console.error('Error pausing video:', error);
            });
            currentPlayingVideo = null; // Reset the current playing video
        }
    }

    item.addEventListener("mouseenter", playVideo);
    item.addEventListener("mouseleave", pauseVideo);

   
    if ('ontouchstart' in window || navigator.maxTouchPoints) {
        // console.log('Touch events supported');
        item.addEventListener("touchstart", function(event) {
            playVideo();
        });

        item.addEventListener("touchend", function(event) {
            setTimeout(pauseVideo, 100); // Adding a slight delay to prevent conflict
        });
    }
});