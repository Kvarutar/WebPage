function modal() { 
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
}

module.exports = modal;