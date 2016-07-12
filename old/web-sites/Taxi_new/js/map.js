// Яндекс карта
ymaps.ready(init);
var myMap,
    myPlacemark;

function init(){
		myMap = new ymaps.Map('map', {
        center: [55.77849621, 37.72781714],
        zoom: 14
    }, {
        searchControlProvider: 'yandex#search'
    }),
        myPlacemark = new ymaps.Placemark([55.77849621, 37.72781714], {
            hintContent: 'Такси Гранд <br/> Адрес: Измайловское шоссе д. 28, оф. 301'
        }, {
            preset:'islands#dotIcon',
            iconColor: '#30a7c6'
        });

    myMap.geoObjects.add(myPlacemark);
}