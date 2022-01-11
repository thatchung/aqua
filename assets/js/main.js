function initScrollEvent() {
    gsap.registerPlugin(ScrollTrigger);


    gsap.to('.services-img1',{
        scrollTrigger:{
            trigger: '.services-img1',
            toggleActions: 'restart none none reset'
        },
        opacity:1,
        x:0,
        ease: "expo.out",
        duration: 2
    })

    gsap.to('.services-img2',{
        scrollTrigger:{
            trigger: '.services-img2',
            toggleActions: 'restart none none reset'
        },
        opacity:1,
        y:0,
        ease: "expo.out",
        duration: 2
    })

    gsap.to('.services-img3',{
        scrollTrigger:{
            trigger: '.services-img3',
            toggleActions: 'restart none none reset'
        },
        opacity:1,
        x:0,
        ease: "expo.out",
        duration: 2.5
    })

    gsap.to('.services-img4',{
        scrollTrigger:{
            trigger: '.services-img4',
            toggleActions: 'restart none none reset'
        },
        opacity:1,
        x:0,
        ease: "expo.out",
        duration: 2
    })

    gsap.to('.services-img5',{
        scrollTrigger:{
            trigger: '.services-img5',
            toggleActions: 'restart none none reset'
        },
        opacity:1,
        x:0,
        ease: "expo.out",
        duration: 1.5
    })

    gsap.to('.services-img6',{
        scrollTrigger:{
            trigger: '.services-img6',
            toggleActions: 'restart none none reset'
        },
        opacity:1,
        y:0,
        ease: "expo.out",
        duration: 2
    })

    gsap.to('.services-img7',{
        scrollTrigger:{
            trigger: '.services-img7',
            toggleActions: 'restart none none reset'
        },
        opacity:1,
        y:0,
        ease: "expo.out",
        duration: 1
    })

    gsap.to('.services-img88',{
        scrollTrigger:{
            trigger: '.services-img88',
            toggleActions: 'restart none none reset'
        },
        opacity:1,
        y:0,
        ease: "expo.out",
        duration: 2.2
    })

    gsap.to('.services-img9',{
        scrollTrigger:{
            trigger: '.services-img9',
            toggleActions: 'restart none none reset'
        },
        opacity:1,
        x:0,
        ease: "expo.out",
        duration: 2.2
    })

    gsap.to('.services-img10',{
        scrollTrigger:{
            trigger: '.services-img10',
            toggleActions: 'restart none none reset'
        },
        opacity:1,
        x:0,
        ease: "expo.out",
        duration: 2.2
    })

    gsap.to('.services-img11',{
        scrollTrigger:{
            trigger: '.services-img11',
            toggleActions: 'restart none none reset'
        },
        opacity:1,
        x:0,
        ease: "expo.out",
        duration: 2.2
    })

    gsap.to('.img-product',{
        scrollTrigger:{
            trigger: '.img-product',
            toggleActions: 'restart none none reset'
        },
        opacity:1,
        y:0,
        ease: "expo.out",
        duration: 1.3
    })
}



$(document).ready(function($) {
  initScrollEvent(); 
})
