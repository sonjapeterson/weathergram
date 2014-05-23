var tester;

var weather = function(locations){

	// EXAMPLE 1: Load weather data and render it in particular location on HTML page
	
	// See also: Lines #9-17 of index.html
	// See also: Lines #109-115 of index.html (Implementation #1)
	// See also: Lines #147-167 of index.html (Implementation #2)
	
	var new_haven = locations['New Haven, CT'],
	    duluth  = locations['Duluth, MN'],
	    new_delhi = locations['New Delhi, India'];

    $('.location.new-haven').html(new_haven.city + ', ' + new_haven.country);
     $('.low.new-haven').html(new_haven.low + '&deg;');
     $('.high.new-haven').html(new_haven.high + '&deg;');
     $('.forecast.new-haven').html(new_haven.currently);

     $('.location.duluth').html(duluth.city + ', ' + duluth.country);
     $('.low.duluth').html(duluth.low + '&deg;');
     $('.high.duluth').html(duluth.high + '&deg;');
     $('.forecast.duluth').html(duluth.currently);

     $('.location.new-delhi').html(new_delhi.city + ', ' + new_delhi.country);
     $('.low.new-delhi').html(new_delhi.low + '&deg;');
     $('.high.new-delhi').html(new_delhi.high + '&deg;');
     $('.forecast.new-delhi').html(new_delhi.currently);
     

     // EXAMPLE 2
     // How to link certain weather conditions to formal elements in your HTML or CSS.
     
     // See also: index.html
     // See also: style/weather.css

     // Make an object of the weather condition codes
     var codes = {
        0:    "tornado",
        1:    "tropical storm",
        2:    "hurricane",
        3:    "severe thunderstorms",
        4:    "thunderstorms",
        5:    "mixed rain and snow",
        6:    "mixed rain and sleet",
        7:    "mixed snow and sleet",
        8:    "freezing drizzle",
        9:    "drizzle",
        10:   "freezing rain",
        11:   "showers 1",
        12:   "showers 2",
        13:   "snow flurries",
        14:   "light snow showers",
        15:   "blowing snow",
        16:   "snow",
        17:   "hail",
        18:   "sleet",
        19:   "dust",
        20:   "foggy",
        21:   "haze",
        22:   "smoky",
        23:   "blustery",
        24:   "windy",
        25:   "cold",
        26:   "cloudy",
        27:   "mostly cloudy (night)",
        28:   "mostly cloudy (day)",
        29:   "partly cloudy (night)",
        30:   "partly cloudy (day)",
        31:   "clear (night)",
        32:   "sunny",
        33:   "fair (night)",
        34:   "fair (day)",
        35:   "mixed rain and hail",
        36:   "hot",
        37:   "isolated thunderstorms",
        38:   "scattered thunderstorms 1",
        39:   "scattered thunderstorms 2",
        40:   "scattered showers",
        41:   "heavy snow",
        42:   "scattered snow showers",
        43:   "heavy snow",
        44:   "partly cloudy",
        45:   "thundershowers",
        46:   "snow showers",
        47:   "isolated thundershowers",
        3200: "not available"
      };

     var make_condition_from_code = function(code) {

        // Create a reference to the "Partly Cloudy" (for example) string.
        var condition_from_code = codes[code];

        return condition_from_code;
     };
    
     var add_css_class_based_on_condition_in_city = function(city, code) {
     // Used below via: var condition = add_css_class_based_on_condition_in_city(new_haven, '.new-haven-forecast');

        if(code == undefined){
          var code = city.weather_data.code;
        }

        console.log(city);
      	var css_class = city.css_class;

        var condition_from_code = make_condition_from_code(code);

      	// Alter the text to make all characters lowercase, and replace spaces with dashes.
      	var css_class_from_condition = generate_css_class_from_condition(condition_from_code);
      	
        console.log(css_class_from_condition);

        delete_condition_classes_from_element(css_class);
        $(css_class).addClass(css_class_from_condition); 

        $('.print-weather-condition').html("TESTING: " + condition_from_code);
        return condition_from_code;

      };

      var generate_css_class_from_condition = function(condition) {
        var css_class = "c-" + condition.toLowerCase().replace(/'/g, '').replace("(", '').replace(")", '').replace(/\s+/g, '-');
        return css_class;
      }

      var delete_condition_classes_from_element = function(selector){

        var current_classes = $(selector).attr('class').split(/\s+/);
        var filtered_classes =[];

        for(var i = 0; i < current_classes.length; i++){
          var current_class = current_classes[i];
          if(current_class.indexOf('c-') == 0){
            filtered_classes.push(current_class);
          };
        };

        // Use jQuery or "$" to find an html element with class="new_haven_forecast" and then add our class.
        $(selector).removeClass(filtered_classes.join(' '))

      };


  	  // EXAMPLE 3
  	  // How to replace a certain weather condition with specific text.
      // Here, we want one of three text options to appear at random for each weather condition
      
      // See also: index.html
      // See also: style/weather.css
	  
	  // Define the basic text for each weather condition. Replace the text after the ":"
      var default_strings = {
        "tornado": "<a class='popup2' href='stormy.html'>Stormy</a>",
        "tropical storm": "<a class='popup2' href='stormy.html'>Stormy</a>",
        "hurricane": "<a class='popup2' href='stormy.html'>Stormy</a>",
        "severe thunderstorms": "<a class='popup2' href='thunderstorms.html'>Thunderstorms</a>",
        "thunderstorms": "<a class='popup2' href='thunderstorms.html'>Thunderstorms</a>",
        "mixed rain and snow": "<a class='popup2' href='sleet.html'>Sleet</a>",
        "mixed rain and sleet": "<a class='popup2' href='sleet.html'>Sleet</a>",
        "mixed snow and sleet": "<a class='popup2' href='sleet.html'>Sleet</a>",
        "freezing drizzle": "<a class='popup2' href='rainy.html'>Rainy</a>",
        "drizzle": "<a class='popup2' href='rainy.html'>Rainy</a>",
        "freezing rain": "<a class='popup2' href='rainy.html'>Rainy</a>",
        "showers 1": "<a class='popup2' href='rainy.html'>Rainy</a>",
        "showers 2": "<a class='popup2' href='rainy.html'>Rainy</a>",
        "snow flurries": "<a class='popup2' href='snow.html'>Snow</a>",
        "light snow showers": "<a class='popup2' href='snow.html'>Snow</a>",
        "blowing snow": "<a class='popup2' href='snow.html'>Snow</a>",
        "snow": "<a class='popup2' href='snow.html'>Snow</a>",
        "hail": "<a class='popup2' href='hail.html'>Hail</a>",
        "sleet": "<a class='popup2' href='sleet.html'>Sleet</a>",
        "dust": "<a class='popup2' href='dusty.html'>Dusty</a>",
        "foggy": "<a class='popup2' href='foggy.html'>Foggy</a>",
        "haze": "<a class='popup2' href='hazy.html'>Hazy</a>",
        "smoky": "<a class='popup2' href='smoky.html'>Smoky</a>",
        "blustery": "<a class='popup2' href='windy.html'>Windy</a>",
        "windy": "<a class='popup2' href='windy.html'>Windy</a>",
        "cold": "<a class='popup2' href='cold.html'>Cold</a>",
        "cloudy": "<a class='popup2' href='cloudy.html'>Cloudy</a>",
        "mostly cloudy (night)": "<a class='popup2' href='cloudy.html'>Cloudy</a>",
        "mostly cloudy (day)": "<a class='popup2' href='cloudy.html'>Cloudy</a>",
        "partly cloudy (night)": "<a class='popup2' href='cloudy.html'>Cloudy</a>",
        "partly cloudy (day)": "<a class='popup2' href='cloudy.html' class='popup2'>Cloudy</a>",
        "clear night": "<a class='popup2' href='sunny.html'>Sunny</a>",
        "sunny": "<a class='popup2' href='sunny.html'>Sunny</a>",
        "fair (night)": "<a class='popup2' href='sunny.html'>Sunny</a>",
        "fair (day)": "<a class='popup2' href='sunny.html'>Sunny</a>",
        "mixed rain and hail": "<a class='popup2' href='rainy.html'>Rainy</a>",
        "hot": "<a class='popup2' href='hot.html'>Hot</a>",
        "isolated thunderstorms": "<a class='popup2' href='thunderstorms.html'>Thunderstorms</a>",
        "scattered thunderstorms 1": "<a class='popup2' href='thunderstorms.html'>Thunderstorms</a>",
        "scattered thunderstorms 2": "<a class='popup2' href='thunderstorms.html'>Thunderstorms</a>",
        "scattered showers": "<a class='popup2' href='rainy.html'>Rainy</a>",
        "heavy snow": "<a class='popup2' href='snow.html'>Snow</a>",
        "scattered snow showers": "<a class='popup2' href='snow.html'>Snow</a>",
        "heavy snow": "<a class='popup2' href='snow.html'>Snow</a>",
        "partly cloudy": "<a class='popup2' href='cloudy.html'>Cloudy</a>",
        "thundershowers": "<a class='popup2' href='thunderstorms'>thunderstorms</a>",
        "snow showers": "<a class='popup2' href='snow.html'>Snow</a>",
        "isolated thundershowers": "<a class='popup2' href='thunderstorms'>thunderstorms</a>",
        "not available": "Not available"
      };

      var special_text_from_condition_in_city_two = function(city, condition) {

        var special_text = city.strings[condition] || default_strings[condition] || "No condition, or default defined for: " + condition;

        console.log(special_text);

        $(city.css_class + ' ' + '.weather-condition-special-text').html(special_text);
      
      };

      var all_cities_with_css_classes_and_strings = [

        {
          weather_data: new_haven,
          css_class: ".new-haven-forecast",
          strings: {
            "foggy": "It is foggy in New Haven today.",
            "hail": "HAIL IN NEW HAVEN!"
          }
        },

        {
         weather_data: duluth,
         css_class: ".duluth-forecast",
         strings: {
          "foggy": "Duluth is blurry when it's foggy.",
          "sunny": "Duluth is sunny!"
         }
        },

        {
         weather_data: new_delhi,
         css_class: ".new-delhi-forecast",
         strings: {
          "foggy": "Since when is it foggy here in New Delhi?!",
          "showers": "We need more showers like this in New Delhi!"
         }
        }

      ];

        var name_strings = {
        "tornado": "Tornado",
        "tropical storm": "Tropical storm",
        "hurricane": "Hurricane",
        "severe thunderstorms": "Severe thunderstorms",
        "thunderstorms": "Thunderstorms",
        "mixed rain and snow": "Sleet",
        "mixed rain and sleet": "Sleet",
        "mixed snow and sleet": "Sleet",
        "freezing drizzle": "Freezing rain",
        "drizzle": "Light rain",
        "freezing rain": "Freezing rain",
        "showers 1": "Rain showers",
        "showers 2": "Rain showers",
        "snow flurries": "Snow flurries",
        "light snow showers": "Snow showers",
        "blowing snow": "Blowing snow",
        "snow": "Snow",
        "hail": "Hail",
        "sleet": "Sleet",
        "dust": "Dusty",
        "foggy": "Foggy",
        "haze": "Hazy",
        "smoky": "Smoky",
        "blustery": "Blustering winds",
        "windy": "Windy",
        "cold": "Cold",
        "cloudy": "Cloudy",
        "mostly cloudy (night)": "Mostly cloudy",
        "mostly cloudy (day)": "Mostly cloudy",
        "partly cloudy (night)": "Partly cloudy",
        "partly cloudy (day)": "Partly cloudy",
        "clear night": "Sunny",
        "sunny": "Sunny",
        "fair (night)": "Sunny and fair",
        "fair (day)": "Sunny and fair",
        "mixed rain and hail": "Rain and hail",
        "hot": "Hot",
        "isolated thunderstorms": "Isolated thunderstorms",
        "scattered thunderstorms 1": "Scattered thunderstorms",
        "scattered thunderstorms 2": "Scattered thunderstorms",
        "scattered showers": "Scattered rain",
        "heavy snow": "Heavy snow",
        "scattered snow showers": "Scattered snow showers",
        "heavy snow": "Heavy snow",
        "partly cloudy": "Partly cloudy",
        "thundershowers": "Thunderstorms",
        "snow showers": "Snow showers",
        "isolated thundershowers": "Isolated thunderstorms",
        "not available": "Not available"
      };

       var special_text_from_condition_in_city_three = function(city, condition) {

        var special_text_three = city.strings[condition] || name_strings[condition] || "No condition, or default defined for: " + condition;

        console.log(special_text_three);

        $(city.css_class + ' ' + '.weather-condition-name-text').html(special_text_three);
      
      };

      // Iterate over all_cities_with_css_classes.

      for (var i in all_cities_with_css_classes_and_strings) {

        var city = all_cities_with_css_classes_and_strings[i];

        var condition = add_css_class_based_on_condition_in_city(city);

        special_text_from_condition_in_city_two(city, condition);

        special_text_from_condition_in_city_three(city, condition);


      };
      
      
      // EXAMPLE 4
      // How to create a tester for all possible weather conditions.
      
      // See also: index.html
      // See also: style/weather.css
     
      // To run this test, type "tester();" in your web browser console)...
      // When you do this, every second the weather condition changes.

      // Define all cities are in an object with their classes

      tester = function() {

        var count = 1;
        var city = all_cities_with_css_classes_and_strings[0];

        $('.print-weather-condition').css("visibility","visible");

        var interval = setInterval(function(){
          count += 1;
          if(count <= 47){

            var condition = add_css_class_based_on_condition_in_city(city, count);
            var css_class = generate_css_class_from_condition(condition);

            delete_condition_classes_from_element('.forecast');
            $('.forecast').addClass(css_class);

            var condition_from_code = make_condition_from_code(count);
            special_text_from_condition_in_city_two(city, condition_from_code);
          
          } else {
            count = 1; // Loop forever.
            // clearInterval(interval); // Loop once.
          }
        }, 500);
        // ^
        // To set the speed of the tester, change this number.

      };

//initialize the 3 popup css class names - create more if needed
  var matchClass=['popup1','popup2','popup3'];
  //Set your 3 basic sizes and other options for the class names above - create more if needed
  var popup1 = 'width=400,height=300,toolbar=0,menubar=0,location=0,status=1,scrollbars=1,resizable=1,left=0,top=0';
  var popup2 = 'width=800,height=600,toolbar=0,menubar=0,location=0,status=1,scrollbars=1,resizable=1,left=0,top=0';
  var popup3 = 'width=1000,height=750,toolbar=0,menubar=0,location=0,status=1,scrollbars=1,resizable=1,left=20,top=20';
  
  //The pop-up function
  function tfpop(){

      var x = 0;
      var popClass;
      //Cycle through the class names
      while(x < matchClass.length){
          popClass = "'."+matchClass[x]+"'";
          //Attach the clicks to the popup classes
          $(eval(popClass)).click(function() {
              //Get the destination URL and the class popup specs
              var popurl = $(this).attr('href');
              var popupSpecs = $(this).attr('class');
              //Create a "unique" name for the window using a random number
              var popupName = Math.floor(Math.random()*10000001);
              //Opens the pop-up window according to the specified specs
              newwindow=window.open(popurl,popupName,eval(popupSpecs));
              return false;
          });             
      x++;
      } 
  }
  
  //Wait until the page loads to call the function
  $(function() {
    tfpop();
  });

};



