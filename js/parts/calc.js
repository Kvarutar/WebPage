function calc() {  
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
}

module.exports = calc;