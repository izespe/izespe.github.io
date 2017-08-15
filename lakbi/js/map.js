var map;
var iw;
var markers = []
google.maps.event.addDomListener(window, 'load', init);
        function init() {
			iw = new google.maps.InfoWindow();
            var mapOptions = {
                center: new google.maps.LatLng(53.805269,27.629674),
                zoom: 6,
                zoomControl: true,
                zoomControlOptions: {
                    style: google.maps.ZoomControlStyle.SMALL,
                },
                disableDoubleClickZoom: true,
                mapTypeControl: false,
                scaleControl: false,
                scrollwheel: true,
                panControl: false,
                streetViewControl: false,
                draggable : true,
                overviewMapControl: false,
                overviewMapControlOptions: {
                    opened: false,
                },
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                styles: 
                [
                        {
                stylers: [
                    { hue: '#ff1a00' },
                    { invert_lightness: true },
                    { saturation: -100  },
                    { lightness: 33 },
                    { gamma: 0.5 }
                    ]
                    },{
                    featureType: 'water',
                    elementType: 'geometry',
                    stylers: [
                        { color: '#2D333C' }
                    ]
                    }
                ],
            };
            var mapElement = document.getElementById('map');
            map = new google.maps.Map(mapElement, mapOptions);
            var clusterStyle = [{
                    url: '/assets/templates/main/images/lakbi-marker-merge.png',
                    width: 48,
                    height: 48
                    /*opt_anchor: [52, 15]*/
                    /*opt_textSize: 12*/
                  }];

            for (var country in coords) {
                var countr = coords[country];
                for (var city in countr) {
                    var cit = countr[city];
					var iterator = 0;
                    for (var office in cit) {
                        offic = cit[office];
                        var marker = new google.maps.Marker({
                                icon: '/assets/templates/main/images/lakbi-marker.png',
                                position: new google.maps.LatLng(offic.lat, offic.lng),
                                map: map,
                                title: offic.title,
                                desc: offic.desc,
                                tel: '',
                                email: '',
                                web: ''
                            });
						with ({ co: country, ci: city, id:iterator }) {
                            google.maps.event.addListener(marker, 'click', function() {
                                if ($('.country-map').length > 0) {
                                    $('.country-map[data-country="'+co+'"]').addClass('active').trigger('click', [1]);
                                    $('.offices-map[data-country="'+co+'"] .show-city .button-link[data-city="'+ci+'"] ~ .offices > li[data-id="'+id+'"]').trigger('click', [1]);
                                }
                              });
                        }
                        bindInfoWindow(marker, map, offic.title, offic.desc, offic.phone, offic.email, offic.web);
                        markers.push(marker);
						iterator++;
                    }
                }
            }
            var markerCluster = new MarkerClusterer(map, markers, {
                styles: clusterStyle
            });

            /*var locations = [
                ['Магазины Минска', 'undefined', 'undefined', 'undefined', 'undefined', 53.9, 27.566667],
                ['Магазин в Бресте', 'undefined', 'undefined', 'undefined', 'undefined', 52.133333, 23.666667],
                ['Магазин в Витебске', 'undefined', 'undefined', 'undefined', 'undefined', 55.183333, 30.166667],
                ['Магазин в Гомеле', 'undefined', 'undefined', 'undefined', 'undefined', 52.44527799999999, 30.984167]
            ];
            
            for (i = 0; i < locations.length; i++) {
                if (locations[i][1] =='undefined'){ description ='';} else { description = locations[i][1];}
                if (locations[i][2] =='undefined'){ telephone ='';} else { telephone = locations[i][2];}
                if (locations[i][3] =='undefined'){ email ='';} else { email = locations[i][3];}
                if (locations[i][4] =='undefined'){ web ='';} else { web = locations[i][4];}
                marker = new google.maps.Marker({
                    icon: 'imgs/lakbi-marker.png',
                    position: new google.maps.LatLng(locations[i][5], locations[i][6]),
                    map: map,
                    title: locations[i][0],
                    desc: description,
                    tel: telephone,
                    email: email,
                    web: web
                });
                bindInfoWindow(marker, map, locations[i][0], description, telephone, email, web);
            }*/
        function bindInfoWindow(marker, map, title, desc, telephone, email, web) {
            if (web.substring(0, 7) != "http://") {link = "http://" + web;}
            else {link = web;}
            google.maps.event.addListener(marker, 'click', function() {
                var html= "<div class='map-tooltip'><h4>"+title+"</h4><p>"+desc+"<p><a href='tel:"+telephone+"'' >"+telephone+"<a><a href='mailto:"+email+"' >"+email+"<a><a href='"+link+"'' >"+web+"<a></div>";
				iw.setContent(html);
                iw.open(map,marker);
            });
        }
    }

function moveToLocation(lat, lng, zoom, index){
    var center = new google.maps.LatLng(lat, lng);
    // using global variable:
    map.panTo(center);
    map.setZoom(zoom);
	if (index != undefined) {
		google.maps.event.trigger(markers[index], "click");
	}
}