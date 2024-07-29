

/*Función para mover la posición del scroll con más precisión dentro de la web*/

const links = document.querySelectorAll("a");
const offset = 100; //Pixeles a mover


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

	MENU DESPLEGABLE
		
	En esta sección hacemos el toggle del menu principal, donde se vuelve 
	un menu hamburguesa cuando el dispositivo es pequeño

--------------------------------------------------------*/

const navegacion = document.querySelector("nav"); 
const btnNav = document.querySelectorAll(".abrir , .cerrar"); 


btnNav.forEach((obj)=>{

	obj.addEventListener("click",()=>{
		navegacion.classList.toggle("desplegado");
	});


}); 


/*

Funcion para que el video solo se de play cuando se hace hover

*/

const iframe = document.querySelectorAll("iframe");

iframe.forEach(iframe =>{

    const player = new Vimeo.Player(iframe);

    player.pause();

    iframe.addEventListener("mouseenter", function() {
        player.play();
    });

    iframe.addEventListener("click", function() {
        player.getPaused().then(function(paused) {
            if (paused) {
                player.play();
            } else {
                player.pause();
            }
        }).catch(function(error) {
            console.error('Error toggling play/pause:', error);
        });
    });

    iframe.addEventListener("mouseleave", function() {
        player.pause();
    });

});