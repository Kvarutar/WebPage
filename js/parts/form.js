function form() {  
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
}

module.exports = form;