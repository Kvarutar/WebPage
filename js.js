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
});