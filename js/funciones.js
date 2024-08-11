/*--------------------------------------------------------
 Function to precisely move the scroll position within the web page 
 --------------------------------------------------------*/

const links = document.querySelectorAll("nav a");
const offset = 0; // Pixels to move

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


/*--------------------------------------------------------
Function to play the videos
 --------------------------------------------------------*/

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

     // Prevent context menu from appearing on long press
     video.addEventListener("contextmenu", function(event) {
        event.preventDefault();
    });
    
});

/*--------------------------------------------------------
Function to switch the href as needed in the UX/UI section
 --------------------------------------------------------*/

 const hrefs = document.querySelectorAll(".dynamicLink");

    function isMobile() {
        return /Mobi|Android/i.test(navigator.userAgent);
    }

    hrefs.forEach(link => {
        const desktopLink = link.getAttribute("data-desktop");
        const mobileLink = link.getAttribute("data-mobile");

        if (isMobile()) {
            link.href = mobileLink;
        } else {
            link.href = desktopLink;
        }
    });



/*-----------------------------------

GSAP Animations on first section

-----------------------------------*/

    gsap.from("header",{
        y: -200,

    })

    gsap.from(".sect1-bottom",{
        y: 1000,
        duration: 0.8
    })

    gsap.from(".sect1-top div:first-child h2",{
        x: 1000,
        duration: 1

    })

    gsap.from(".sect1-top div:last-child h2",{
        x: 1000,
        duration: 1.5

    })

    gsap.from(".sect1-top div:nth-child(2) h2",{
        x: -1000,
        duration: 1

    })

    

/*-----------------------------------

GSAP ScrollTrigger

-----------------------------------*/

gsap.registerPlugin(ScrollTrigger);


// We split the words in the parragraph 

const splitTypes = document.querySelectorAll(".reveal-p");

splitTypes.forEach((word,i) =>{
    const text = new SplitType(word, {types : 'words'});

    gsap.from(text.words, {
        scrollTrigger:{
            trigger: word,
            start: 'top 80%',
            end: 'top 20%',
            scrub: true,
            markers: false,
            
        },

        opacity: 0.1,
        stagger: 0.1
    })
})

const panels = Array.from(document.querySelectorAll('.swipe-section section'));

const createScrollParallax = () => {
    panels.forEach((panel, i) => {
        const isLast = i === panels.length - 1; // Identify the last panel in the original order

        // Set z-index so panels stack correctly
        gsap.set(panel, { zIndex: i + 1 });

        gsap.timeline({
            scrollTrigger: {
                trigger: panel,
                start: 'top top', // Start pinning when the top of the panel hits the top of the viewport
                end: isLast ? 'bottom bottom' : `+=${panel.offsetHeight}`, // For the last panel, end when it fully scrolls out of view
                scrub: 1,
                pin: true, // Pin each panel
                pinSpacing: isLast, // Add spacing after the last panel to transition to normal scrolling
                markers: false,
            }
        });
    });
};

createScrollParallax();
/*------------------------------

Rectangle Positions on section 3

------------------------*/

const leftRects = [document.querySelector(".r1"), document.querySelector(".r3")];
const rightRects = [document.querySelector(".r2"), document.querySelector(".r4")];

leftRects.forEach(rect =>{
    gsap.from(rect,{
        scrollTrigger:{
            trigger: rect,
            start: 'top 100%',
            end: 'top 50%',
            scrub: true
        },
    
        x : -1000,
        duration: 1
    })
})

rightRects.forEach(rect =>{
    gsap.from(rect,{
        scrollTrigger:{
            trigger: rect,
            start: 'top 100%',
            end: 'top 50%',
            scrub: true
        },
    
        x : 500,
        duration: 1
    })
})




 /* --------------------------

Llamamos a la librería de Lenis para activar el smooth scroll

 -------------------*/


    const lenis = new Lenis()

    lenis.on('scroll', (e) => {
   // console.log(e)
    })

    function raf(time) {
    lenis.raf(time)
    requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)


    /*----------------------
    Lottie animation

    ----------------*/

    let lottieContainer= document.querySelectorAll(".animation");

    if(lottieContainer) {
        LottieScrollTrigger({
            trigger: '.animation',
            start: 'top center',
            endTrigger : '.end-lottie',
            end: `bottom center +=${
                document.querySelector('.animation').offsetHeight
            }`,
            renderer: 'svg',
            target: '.animation',
            path: './sources/motherboardLoop.json',
            scrub: 5,
        });
    }


    function LottieScrollTrigger(vars){
        let playhead = {frame : -35},
        target = gsap.utils.toArray(vars.target)[0],
        speeds = {slow: '+=2000', medium: '+=1000', fast: '+=500'},
        st = {
            trigger: '.trigger',
            end: speeds[vars.speed] || '+=1000',
            scrub: 5,
            markers: false,
        },

        ctx = gsap.context && gsap.context(),
        animation = lottie.loadAnimation({
            container: target,
            renderer: vars.renderer || 'svg',
            loop: false,
            autplay: false,
            path: vars.path,
            rendererSettings: vars.rendererSettings  ||{
                preserveAspectRatio: 'xMidYMid slice',
                progressiveLoad: true, // Load frames progressively for smoother rendering
                clearCanvas: false, // Prevent flickering in some cases
            },
        });

        for(let p in vars) {
            st[p] = vars[p];
        }

        animation.addEventListener("DOMLoaded", function () {
            let createTween = function () {
                animation.frameTrween = gsap.to(playhead, {
                    frame: animation.totalFrames - 1,
                    ease: 'power1.inOut', // Smoother easing
                    onUpdate: () => animation.goToAndStop(playhead.frame, true),
                    scrollTrigger: st,
                });

                return () => animation.destroy && animation.destroy();
            };

            ctx && ctx.add ? ctx.add(createTween) : createTween();
        });

        return animation;
    }