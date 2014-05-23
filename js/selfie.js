    var codes = {
        0:    "tornado",
        1:    "tropical storm",
        2:    "hurricane",
        3:    "thunderstorm",
        4:    "thunderstorm",
        5:    "sleet",
        6:    "sleet",
        7:    "sleet",
        8:    "rainy",
        9:    "rainy",
        10:   "rainy",
        11:   "rainy",
        12:   "rainy",
        13:   "snow",
        14:   "snow",
        15:   "snow",
        16:   "snow",
        17:   "hail",
        18:   "sleet",
        19:   "dust",
        20:   "foggy",
        21:   "haze",
        22:   "smoky",
        23:   "windy",
        24:   "windy",
        25:   "cold",
        26:   "cloudy",
        27:   "cloudy",
        28:   "cloudy",
        29:   "cloudy",
        30:   "cloudy",
        31:   "clear",
        32:   "sunny",
        33:   "sunny",
        34:   "sunny",
        35:   "rainy",
        36:   "hot",
        37:   "thunderstorm",
        38:   "thunderstorm",
        39:   "thunderstorm",
        40:   "rainy",
        41:   "snow",
        42:   "snow",
        43:   "snow",
        44:   "cloudy",
        45:   "thunderstorm",
        46:   "snow",
        47:   "thunderstorm",
        3200: "not available"
      };

var make_condition_from_code = function(code) {

        // Create a reference to the "Partly Cloudy" (for example) string.
        var condition_from_code = codes[code];

        return condition_from_code;
     };


$(document).ready(function() {
  $.simpleWeather({
    location: 'New Haven, CT',
    woeid: '',
    unit: 'f',
    success: function(weather) {
      html = '<h2 class="temp">'+weather.temp+'&deg;'+weather.units.temp+'</h2>';
      html += '<ul><li class="city">'+weather.city+', '+weather.region+'</li>';
      html += '<li class="currently">'+weather.currently+'</li>';
      html += '<li class="wind">Wind: '+weather.wind.direction+' '+weather.wind.speed+' '+weather.units.speed+'</li></ul>';
      var instatag = make_condition_from_code(weather.code);
      var feed = new Instafeed({
    get: 'tagged',
    tagName: ''+ instatag + '',
    clientId: 'ec728b96ee834e6ba02dee545bea7b4f',
     limit: 60,

    after: function () {
        var images = $('#instafeed').find('a');
        $.each(images, function(index, image) {
          var delay = (index * 75) + 'ms';
          $(image).css('-webkit-animation-delay', delay);
          $(image).css('-moz-animation-delay', delay);
          $(image).css('-ms-animation-delay', delay);
          $(image).css('-o-animation-delay', delay);
          $(image).css('animation-delay', delay);
          $(image).addClass('animated fadeIn');
    });
  },
template: '<a href="{{link}}" target="_blank"><img src="{{image}}"/></a>',
filter: function(image) {
    return image.tags.indexOf('selfie') >= 0;
  }
});
feed.run();
    $("#weather").html(html);
    },
    error: function(error) {
      $("#weather").html('<p>'+error+'</p>');
    }
  });
    });
