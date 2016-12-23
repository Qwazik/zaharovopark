  var maxHeight = $('.events .events__item').height();
  $(document).ready(function(){
    /*-------------------------------------------------*/
    /*    header menu, search
    /*-------------------------------------------------*/

    $('.search-block button').click(function(){
        var searchBlock = $(this).closest('.search-block');
        if(!$(searchBlock).is('.active')){
            $(this).closest('.search-block').addClass('active');
            return false;
        }else{
            $(this).closest('form').submit();
        }
    }); 

    $('.main-menu__button').click(function(){
        toggleAct(this);
        toggleAct('.main-menu');
        toggleOverlay();
    });

    $('.overlay').click(function(){
        toggleOverlay();
        toggleAct('.main-menu__button');
        toggleAct('.main-menu');
    });

    function toggleOverlay(){
        var ov = $('.overlay');
        if(ov.is(':visible')){
            ov.fadeOut();
        }else{
            ov.fadeIn();
        }
    }

    function toggleAct(e){
        if(!$(e).is('.active')){
            $(e).addClass('active');
        }else{
            $(e).removeClass('active');
        }
    }

    $('.events .events__item').each(function(){
    if(maxHeight < $(this).height()){
        maxHeight = $(this).height();
    }
    }) 
    $('.events .events__item').each(function(){
        $(this).height(maxHeight);
    })
    $('.bxslider').bxSlider({
      pagerCustom: '#bx-pager',
      nav: true
    });

    /*-------------------------------------------------*/
    /*    погода
    /*-------------------------------------------------*/
    var tempCelsius = null,
        geturl = 'http://api.openweathermap.org/data/2.5/forecast/city?q=Moscow&APPID=86dac10b732b3cb5a9270c46edaacf2a';
        weatherCall = $.get(geturl, function(data){
        var tempKelvin = data['list'][0]['main']['temp'],
            clouds = data['list'][0]['clouds'].all,
            cloudsText = '';
        switch(Math.round(clouds/10)){
            case 0: cloudsText = 'Ясно'; break
            case 1: 
            case 2: 
            case 3: cloudsText = 'Малооблачно'; break
            case 4: 
            case 5: 
            case 6: cloudsText = 'Переменная облачность'; break
            case 7: 
            case 8: 
            case 9: 
            case 10: cloudsText = 'Облачно'; break
        }
        tempCelsius = Math.round((tempKelvin - 273.15));
        $('.weather-block__info .val').fadeIn(300);
        $('.weather-block__info .val span').text(tempCelsius);
        $('.weather-block__info .val').siblings('span').text(cloudsText);
    });


    /*-------------------------------------------------*/
    /*    afisha filter
    /*-------------------------------------------------*/

    var afishaFilter = $('.afisha-filter'),
        afishaFilterList = $(afishaFilter).find('.month__list');

    $('.afisha-filter .year li').click(function(){
        toggleActive(this);
        afishaFilterSort();
        return false;
    });

    $(document).click(function(e){
        e.target != $('.afisha-filter .month');
        $(afishaFilterList).hide();
    })

    $('.afisha-filter .month').click(function(){
        if($(this).find('.month__list').is(":hidden")){
            $(this).find('.month__list').fadeIn();
        }
        return false;
    });

    $('.afisha-filter .month__list li').click(function(){
        $('.afisha-filter .month__current').text($(this).text());
        toggleActive(this);
        $(afishaFilterList).hide();
        afishaFilterSort();
        return false;
    });

    // page load
    var date = new Date(),
        monthArray = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];

    $('.afisha-filter .year li').filter(':contains("'+date.getFullYear()+'")').addClass('active');
    $('.afisha-filter .month li').filter(':contains("'+monthArray[date.getMonth()]+'")').addClass('active');
    $('.afisha-filter .month__current').text(monthArray[date.getMonth()]);
    afishaFilterSort();
    
    // page load end

    function toggleActive(e){
        $(e).siblings().removeClass('active');
        $(e).addClass('active');
    }

    function afishaFilterSort(){
        var year = $('.afisha-filter .year .active').text(),
            month = $('.afisha-filter .month .active').text(),
            data = ('[data-year="'+year+'"]') + ('[data-month="'+month+'"]');
        $('#afisha .news__item').each(function(){
            if($(this).is(data)){
                $(this).fadeIn();
            }else{
                $(this).hide();
            }
        });
    }
    /*-------------------------------------------------*/
    /*    instagram
    /*-------------------------------------------------*/
       
});



$.get('https://api.instagram.com/oauth/authorize/?client_id=59a1f437a2534e89b47b2ff37f15a1d2&redirect_uri=http://localhost:3000', function(a){
    console.log(a);
})

$(window).load(function(){
    $('.preload').fadeIn(300);
});