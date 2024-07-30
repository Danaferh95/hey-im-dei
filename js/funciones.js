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

const videos = document.querySelectorAll("video");
let currentPlayingVideo = null;

videos.forEach(video => {

    function playVideo() {
        // Pause the currently playing video if it's different from the one being played
        if (currentPlayingVideo && currentPlayingVideo !== video) {
            currentPlayingVideo.pause();
        }

        // Play the new video
        video.play();
        // Update the current playing video
        currentPlayingVideo = video;
    }

    function pauseVideo() {
        // Only pause if this video is the currently playing one
        if (currentPlayingVideo === video) {
            video.pause();
         };
            currentPlayingVideo = null; 
    }
  

    video.addEventListener("mouseenter", playVideo);
    video.addEventListener("mouseleave", pauseVideo);

    video.addEventListener("touchstart", function(event) {
        playVideo();
    });

});