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

/* Funcion para dar play a los videos */

const iframes = document.querySelectorAll("iframe");

iframes.forEach(iframe => {
    const player = new Vimeo.Player(iframe);

    function playVideo() {
        player.play().catch(function(error) {
            console.error('Error playing video:', error);
        });
    }

    function pauseVideo() {
        player.pause().catch(function(error) {
            console.error('Error pausing video:', error);
        });
    }

    iframe.addEventListener("mouseenter", playVideo);
    iframe.addEventListener("mouseleave", pauseVideo);

    // Para mobil
    iframe.addEventListener("touchstart", playVideo);
    iframe.addEventListener("touchend", pauseVideo);
});