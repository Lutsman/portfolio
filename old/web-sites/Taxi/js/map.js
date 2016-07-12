// Яндекс карта
ymaps.ready(init);
var myMap,
    myPlacemark;

function init(){
		myMap = new ymaps.Map('map', {
        center: [55.73772, 37.730347],
        zoom: 14
    }, {
        searchControlProvider: 'yandex#search'
    }),
        myPlacemark = new ymaps.Placemark([55.73772, 37.730347], {
            hintContent: 'Андроновское шоссе, 26с4'
        }, {
            iconLayout: 'default#image',
            iconImageHref: 'images/placemark.png',
            iconImageSize: [60, 47],
            iconImageOffset: [-30, -50]
        });

    myMap.geoObjects.add(myPlacemark);
}