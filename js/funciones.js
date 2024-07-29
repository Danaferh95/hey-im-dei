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

gridItems.forEach(item => {
    const video = item.querySelector("video");

    function playVideo() {
       // console.log('Playing video');
        video.play();
    }

    function pauseVideo() {
       // console.log('Pausing video');
        video.pause();
    }

    item.addEventListener("mouseenter", playVideo);
    item.addEventListener("mouseleave", pauseVideo);

    // Add touch events for mobile devices if touch is supported
    if ('ontouchstart' in window || navigator.maxTouchPoints) {
        //console.log('Touch events supported');
        item.addEventListener("touchstart", function(event) {
            event.preventDefault();
            //console.log('Touch start');
            playVideo();
        });

        item.addEventListener("touchend", function(event) {
            event.preventDefault();
            //console.log('Touch end');
            pauseVideo();
        });
    }
});