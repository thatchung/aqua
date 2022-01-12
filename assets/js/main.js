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

function sendEmail() {
    Email.send({
        Host : "smtp.elasticemail.com",
        Username : "trieuqk@gmail.com",
        Password : "6EF379414655B83BF26804104E4F82D29B81",
        To : 'thatchung1@gmail.com',
        From : "trieuqk@gmail.com",
        Subject : "Test SendEmail",
        Body : "And this is the body"
    }).then(
      message => alert(message)
    );
}

function telephoneCheck(str) {
  var isphone = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im.test(str);
  return isphone;
}

function validateEmail (emailAdress)
{
  let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (emailAdress.match(regexEmail)) {
    return true; 
  } else {
    return false; 
  }
}

$(document).ready(function($) {
  initScrollEvent();

  $("#submit_btn").click(function() {
    let ho = $("#name_form").val();
    let ten = $("#sub_name_form").val();
    let sdt = $("#phone_form").val();
    let email = $("#email_form").val();
    if(!ho || !ten) {
        alert('Vui lòng nhập đầy đủ họ tên');
    } else
    if(!sdt) {
        alert('Vui lòng nhập số điện thoại');
    } else
    if(!telephoneCheck(sdt)) {
        alert('Vui lòng nhập đúng định dạng số điện thoại');
    } else
    if(!email) {
        alert('Vui lòng nhập địa chỉ email');
    } else
    if(!validateEmail(email)) {
        alert('Vui lòng nhập đúng địa chỉ email');
    } else {
        sendEmail();
    }
  });
})
