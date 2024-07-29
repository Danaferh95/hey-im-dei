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

/* Function to play the video only when hovered or clicked */

const iframes = document.querySelectorAll("iframe");

iframes.forEach(iframe => {
    const player = new Vimeo.Player(iframe);

    iframe.addEventListener("mouseenter", function() {
        player.play().catch(function(error) {
            console.error('Error playing video on mouseenter:', error);
        });
    });

    iframe.addEventListener("click", function() {
        player.getPaused().then(function(paused) {
            if (paused) {
                player.play().catch(function(error) {
                    console.error('Error playing video on click:', error);
                });
            } else {
                player.pause().catch(function(error) {
                    console.error('Error pausing video on click:', error);
                });
            }
        }).catch(function(error) {
            console.error('Error getting paused state:', error);
        });
    });

    iframe.addEventListener("mouseleave", function() {
        player.pause().catch(function(error) {
            console.error('Error pausing video on mouseleave:', error);
        });
    });
});
