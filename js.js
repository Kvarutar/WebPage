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

    let deadLine = '2020-02-10';

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
        console.log(info);

    moreBtn.addEventListener('click', function(event){
        showOverflow(event.target);
        target = event.target;
    });

    close.addEventListener('click', function(){
        overlay.style.display = 'none';
        target.classList.remove('more-splash');
        document.body.style.overflow = '';
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
});

