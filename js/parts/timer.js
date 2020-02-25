function timer() { 
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
 }

 module.exports = timer;