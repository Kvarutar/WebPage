window.addEventListener('DOMContentLoaded', function(){//скрипт будет выполнятся после постройки DOM дерева
    'use strict';//всегда писать

    let infoHeader = document.querySelector('.info-header'),
        infoHeaderTab = document.getElementsByClassName('info-header-tab'),
        tabContent = document.querySelectorAll('.info-tabcontent');
    
    function hideTabContent(a) {
        for (let i = a; i < tabContent.length; i++){//скрытие со страницы
            tabContent[i].classList.remove('show');
            tabContent[i].classList.add('hide');
        }
    }
    hideTabContent(1);

    function showTabContent(b) {
        if (tabContent[b].classList.contains('hide')) {
            tabContent[b].classList.remove('hide');
            tabContent[b].classList.add('show');
        }
    }

    infoHeader.addEventListener('click', function(event) {
        let target = event.target;
        if (target && target.classList.contains('info-header-tab')){
            for (let i = 0; i < infoHeaderTab.length; i++){//ищем какую информацию показать
                if (target == infoHeaderTab[i]){
                    hideTabContent(0);//скрытие всех табов
                    showTabContent(i);
                    break;
                }
            }
        }
    });

    // Timer

    let deadLine = '2020-02-20';

    function getTimeRemaining(endtime) {
        let t = Date.parse(endtime) - Date.parse(new Date()),
            seconds = Math.floor((t/1000) % 60),
            minutes = Math.floor((t/1000/60) % 60),
            hours = Math.floor((t/(1000*3600)));

        return { //можно вернуть объект
            'total' : t,
            'hours' : hours,
            'minutes' : minutes,
            'seconds' : seconds
        };
    }

    function setClock(id, endtime){
        let timer = document.getElementById(id),
            hours = timer.querySelector('.hours'),
            minutes = timer.querySelector('.minutes'),
            seconds = timer.querySelector('.seconds'),
            timeInterval = setInterval(updateClock, 1000);

            function updateClock(){
                let t = getTimeRemaining(endtime);
                
                hours.textContent = t.hours;
                minutes.textContent = t.minutes;
                seconds.textContent = t.seconds;

                if(t.total <= 0){
                    clearInterval(timeInterval);
                    t.hours = t.minutes = t.seconds = 0;
                }
                if (t.hours < 10){hours.textContent = '0' + t.hours;}
                if (t.minutes < 10){minutes.textContent = '0' + t.minutes;}
                if (t.seconds < 10){seconds.textContent = '0' + t.seconds;}
            }
        
    }

    setClock('timer', deadLine);

    //модальное окно
    let moreBtn = document.querySelector('.more'),
        overlay = document.querySelector('.overlay'),
        close = document.querySelector('.popup-close'),
        descriptionBtn = document.querySelectorAll('.description-btn'),
        info = document.querySelector('.info'),
        target = '';

    moreBtn.addEventListener('click', function(event){
        showOverflow(event.target);
        target = event.target;
    });

    close.addEventListener('click', function(){
        overlay.style.display = 'none';
        target.classList.remove('more-splash');
        document.body.style.overflow = '';//разрешение прокрутки
        form.removeChild(statusMasage);
    });

    info.addEventListener('click', function(event){
        if (event.target && event.target.classList.contains('description-btn')){
            console.log(event.target);
            showOverflow(event.target);
            target = event.target;
        }
    });

    function showOverflow(target){
        overlay.style.display = 'block';
        target.classList.add('more-splash');
        document.body.style.overflow = 'hidden';//запрет прокрутки при открытом модальном окне
    }

    //отправка даных

    let message = {
        loading: 'Загрузка',
        success: 'Спасибо за заявку, мы скоро свяжемся с вами',
        failure: 'Ошибка'
    };

    let form = document.querySelector('.main-form'),
        input = form.getElementsByTagName('input'),
        statusMasage = document.createElement('div');

    statusMasage.classList.add('status');

    form.addEventListener('submit', function(event){//лучше отслеживать когда сама форма отправляется
        event.preventDefault();
        form.appendChild(statusMasage);

        let request = new XMLHttpRequest();
        request.open('POST', 'server.php');
        request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

        let formData1 = new FormData(form);
        let obj = {};
        formData1.forEach(function(value, key){
            obj[key] = value;
            console.log(key);
        });
        let json = JSON.stringify(obj);
        request.send(json);

        request.addEventListener('readystatechange', function(){
            if (request.readyState < 4){
                statusMasage.textContent = message.loading;
            } else if (request.readyState === 4 && request.status == 200){
                statusMasage.textContent = message.success;
            } else {
                statusMasage.textContent = message.failure;
            }
        });

        for (let i = 0; i < input.length; i++){
            input[i].value = '';
        }
    });

    let contactForm = document.getElementById('form');
        
    contactForm.addEventListener('submit', function(event){
        event.preventDefault();
        contactForm.appendChild(statusMasage);

        let request = new XMLHttpRequest();
        request.open('POST', 'server.php');
        request.setRequestHeader('Content-type', 'application/json; charset=utf-8');
        //request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

        let formData = new FormData(contactForm);
        
        function ref (){
            return new Promise((resolve, reject) => {
                let obj = {};
                formData.forEach(function(value, key){
                    obj[key] = value;
                    console.log(key);
                });
                let json = JSON.stringify(obj);
                request.send(json);
                
                request.addEventListener('readystatechange', function(){
                    if (request.readyState < 4){
                        //statusMasage.textContent = message.loading;
                        resolve();
                    } else if (request.readyState === 4 && request.status == 200){
                        //statusMasage.textContent = message.success;
                        resolve();
                    } else {
                        //statusMasage.textContent = message.failure;
                        reject();
                    }
                });
            });
        };
        ref()
        .then(()=>{statusMasage.textContent = message.loading;})
        .then(()=>{statusMasage.textContent = message.success;})
        .catch(()=>{statusMasage.textContent = message.failure;})

    });

    //slider
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

    //Calculator
    let persons = document.querySelectorAll('.counter-block-input')[0],
        restDays = document.querySelectorAll('.counter-block-input')[1],
        place = document.getElementById('select'),
        totalValue = document.getElementById('total'),
        personsSum = 0,
        daysSum = 0,
        total = 0;

        totalValue.textContent = 0;

        persons.addEventListener('change', function(){
            personsSum = +this.value;//получаем значение с ввода
            total = (daysSum + personsSum)*4000;//эта функция случайная

            if(restDays.value == '' || persons.value == ''){
                totalValue.textContent = 0;
            } else {
                totalValue.textContent = total;
            }
            total = (daysSum + personsSum)*4000;//эта функция случайная
        });

        restDays.addEventListener('change', function(){
            daysSum = +this.value;//получаем значение с ввода
            total = (daysSum + personsSum)*4000;//эта функция случайная

            if(persons.value == '' || restDays.value == ''){
                totalValue.textContent = 0;
            } else {
                totalValue.textContent = total;
            }
        });

        place.addEventListener('change', function(){
            if(restDays.value == '' || persons.value == ''){
                totalValue.textContent = 0;
            } else {
                let a = total;//при переключении, если бы мы все записывали в тотал, то она бы постоянно увеличчивалась, так мы можем избежать ошибки
                totalValue.textContent = a * this.options[this.selectedIndex].value;
            }
        });
});

