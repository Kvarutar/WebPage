function slider() {
    let slideIndex = 1,
    slides = document.querySelectorAll('.slider-item'),
    prev = document.querySelector('.prev'),
    next = document.querySelector('.next'),
    dotsWrap = document.querySelector('.slider-dots'),
    dots = document.querySelectorAll('.dot');

    showSlides(slideIndex);
    function showSlides(current) {
        if (current > slides.length) {
            slideIndex = 1;
        }
        if (current < 1) {
            slideIndex = slides.length;
        }

        slides.forEach((item) => item.style.display = 'none');
        dots.forEach((item) => item.classList.remove('dot-active'));

        slides[slideIndex - 1].style.display = 'block';
        dots[slideIndex - 1].classList.add('dot-active');
    }

    function plusSlides(current) {
        showSlides(slideIndex += current);
    }
    function currentSlide(current) {
        showSlides(slideIndex = current);
    }

    prev.addEventListener('click', function(){
        plusSlides(-1);
    });

    next.addEventListener('click', function() {
        plusSlides(1);
    });

    dotsWrap.addEventListener('click', function(event){
        let target = event.target;
        if (target.classList.contains('dot')){
            for (let i = 0; i < dots.length + 1; i++){
                if (target == dots[i - 1]){
                    currentSlide(i);
                }
            }
        }
    });
}

module.exports = slider;