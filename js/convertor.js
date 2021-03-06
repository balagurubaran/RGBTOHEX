  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-52653600-10', 'auto');
  ga('send', 'pageview');

var app = angular.module('RGBTOHEX', ['ngRoute']);

app.config(function($routeProvider) {
    $routeProvider
    .when("/imagetopixel", {
        templateUrl : "HTML/imagetopixel.html"
    })
    .when("/ColorPalette", {
        templateUrl : "HTML/ColorPalette.html"
    })
});

   
app.controller('ConvertorCtrl', function($scope,$location) {

    showRGB = true;
    showImagePixel = false;
    showColorPallete = false;
    $scope.Default_Objective_c = '[UIColor colorWithRed:RRR/255.0 green:GGG/255.0 blue:BBB/255.0 alpha:1.0];'
    $scope.Default_Swift3 = 'UIColor.init(red:RRR/255.0, green:GGG/255.0, blue:BBB/255.0, alpha: 1.0)'
    $scope.Default_javaScript = 'rgb(RRR,GGG,BBB)'

    $scope.Objective_c = ''
    $scope.swift3 = ''
    $scope.javaScript = ''

    updateFinalString(0,0,0,0000)


    var pixelData;
    function CMYK(c, m, y, k) {
        if (c <= 0) { c = 0; }
        if (m <= 0) { m = 0; }
        if (y <= 0) { y = 0; }
        if (k <= 0) { k = 0; }
        if (c > 100) { c = 100; }
        if (m > 100) { m = 100; }
        if (y > 100) { y = 100; }
        if (k > 100) { k = 100; }
        this.c = c;
        this.m = m;
        this.y = y;
        this.k = k;
    }
        
    $(document).ready(function($event){
        $('[data-toggle="popover"]').popover();
    });

    $scope.consolidatedResult = '';
    $scope.titleLabel = {};
    $scope.wall = {};
    $scope.dominatColor = {};
    $scope.paletteOne = {};
    $scope.paletteTwo = {};
    $scope.paletteThree = {};
    $scope.paletteFour = {};
    $scope.paletteFive = {};
    $scope.paletteSix = {};
    $scope.paletteSeven = {};
    $scope.paletteEight = {};

    var dominantPalette = [];
    var dominant        = '';

    $scope.convertRGBtoHEX = function(){
    
        var red = parseInt($scope.red);
        var green = parseInt($scope.green);
        var blue = parseInt($scope.blue);
            if(red > 255){
                $scope.red = 255;
                red = 255;
            }
            if(green > 255){
                $scope.green = 255;
                green = 255;
            }
            if(blue > 255){
                $scope.blue = 255;
                blue = 255;
            }
            if(red  <= 256 && green <= 256 && blue <= 256) {
                var colorValue =  "#".concat(((blue | green << 8 | red << 16) / 0x1000000).toString(16).substring(2));

                if(blue == 0 && colorValue.length <= 5){
                    colorValue = insert(colorValue,colorValue.length,"00");
                }
                if(red == 0 && colorValue.length <= 5){
                    colorValue = insert(colorValue,1,"00");
                }
                if(blue== 0 && colorValue.length <= 5){
                    colorValue = insert(colorValue,3,"00");
                }
                $scope.hex = colorValue.slice(1,colorValue.length);;
                $scope.invertColor(colorValue);
                updateFinalString(red,green,blue,colorValue)
            }
    };
    function insert(str, index, value) {
        return str.substr(0, index) + value + str.substr(index);
    }
    $scope.converHexToRGB = function(dontCheck){
            var finalString = $scope.hex;
            if(finalString.length > 6 && dontCheck){
                return;
            }
            var missingCharCount;
            if(finalString != null && finalString.indexOf('#') > -1){
                finalString =  finalString.slice(1,finalString.length);
                $scope.hex = finalString;
            }
                missingCharCount = 6 - finalString.length;
                for (var i = 0;i < missingCharCount;i++){
                    finalString = finalString.concat("0");

                }
                var bigint = parseInt(finalString, 16);
                var r = (bigint >> 16) & 255;
                var g = (bigint >> 8) & 255;
                var b = bigint & 255;

                $scope.red = r;
                $scope.blue = b;
                $scope.green = g;
                $scope.invertColor('#'+finalString);
                updateFinalString(r,g,b,'#'+finalString)
    };
    $scope.invertColor = function(hexColor){
            var color = hexColor;
            color = color.substring(1);           // remove #
            color = parseInt(color, 16);          // convert to integer
            color = 0xFFFFFF ^ color;             // invert three bytes
            color = color.toString(16);           // convert to hex
            color = ("000000" + color).slice(-6); // pad with leading zeros
            color = "#" + color;

            if(hexColor.length  > 1) {
                $scope.wall.style = {"background-color":hexColor};
                $scope.titleLabel.style = {"color":color};
            }
    };
    $scope.loadGithubPage = function(){
        window.open("https://github.com/balagurubaran/RGBTOHEX/", "_blank");
    };

    function updateFinalString(r,g,b,hex){
        $scope.consolidatedResult  = "RGB : ("+r+","+g+","+b+") HEX Code : "+hex;
        $scope.RGB_out = r+","+g+","+b;
        $scope.CSS_RGB_out =  "rgb("+r+","+g+","+b+")"

        $scope.HEX_out = hex;

        var hsl = RGBtoHSL(r,g,b);
        $scope.HSL_out = hsl[0]+","+hsl[1]+","+hsl[2];
        $scope.CSS_HSL_out = "hsl("+ hsl[0]+","+hsl[1]+","+hsl[2]+")";

        var cmyk = RGBtoCMYK(r,g,b);
        $scope.CMYK_out = cmyk.c+","+cmyk.m+","+cmyk.y+","+cmyk.k;

        $scope.Objective_c = $scope.Default_Objective_c

        $scope.Objective_c = $scope.Objective_c.replace("RRR", r);
        $scope.Objective_c = $scope.Objective_c.replace("GGG", g);
        $scope.Objective_c = $scope.Objective_c.replace("BBB", b);


        $scope.swift3 = $scope.Default_Swift3

        $scope.swift3 = $scope.swift3.replace("RRR", r);
        $scope.swift3 = $scope.swift3.replace("GGG", g);
        $scope.swift3 = $scope.swift3.replace("BBB", b);

        $scope.javaScript = $scope.Default_javaScript

        $scope.javaScript = $scope.javaScript.replace("RRR", r);
        $scope.javaScript = $scope.javaScript.replace("GGG", g);
        $scope.javaScript = $scope.javaScript.replace("BBB", b);

    };

    $scope.RGBMousemove = function(imageID){
        var img = document.getElementById(imageID);
        var canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        canvas.getContext('2d').drawImage(img, 0, 0, img.width, img.height);
        
        var pixelData = canvas.getContext('2d').getImageData(event.offsetX, event.offsetY, 1, 1).data;

        $scope.red = pixelData[0];
        $scope.green = pixelData[1];
        $scope.blue = pixelData[2];   
        $scope.convertRGBtoHEX(); 
    };

    $scope.colorCodePalette = function(index){
        var pixelData
        if(index === 8){
            pixelData = dominant;
        }else if(dominantPalette.length > index + 1){
            pixelData = dominantPalette[index+1];
        }

        $scope.red = pixelData[0];
        $scope.green = pixelData[1];
        $scope.blue = pixelData[2];

        $scope.convertRGBtoHEX();
    };
    /**
     * Converts an RGB color value to HSV. Conversion formula
     * adapted from http://en.wikipedia.org/wiki/HSV_color_space.
     * Assumes r, g, and b are contained in the set [0, 255] and
     * returns h, s, and v in the set [0, 1].
     *
     * @param   Number  r       The red color value
     * @param   Number  g       The green color value
     * @param   Number  b       The blue color value
     * @return  Array           The HSV representation
     */
    function RGBtoHSV(r, g, b){
        r = r/255, g = g/255, b = b/255;
        var max = Math.max(r, g, b), min = Math.min(r, g, b);
        var h, s, v = max;

        var d = max - min;
        s = max == 0 ? 0 : d / max;

        if(max == min){
            h = 0; // achromatic
        }else{
            switch(max){
                case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                case g: h = (b - r) / d + 2; break;
                case b: h = (r - g) / d + 4; break;
            }
            h /= 6;
        }

        return [h*360, s*100, v*100];
    }

    function RGBtoHSL(r, g, b){
        r /= 255, g /= 255, b /= 255;
        var max = Math.max(r, g, b), min = Math.min(r, g, b);
        var h, s, l = (max + min) / 2;

        if(max == min){
            h = s = 0; // achromatic
        }else{
            var d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            switch(max){
                case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                case g: h = (b - r) / d + 2; break;
                case b: h = (r - g) / d + 4; break;
            }
            h /= 6;
        }

        return [ Math.round(h*360),  Math.round(s*100),  Math.round(l*100)];
    }

    function RGBtoCMYK(r,g,b){
            var result = new CMYK(0, 0, 0, 0);
            r = r / 255;
            g = g / 255;
            b = b / 255;
            result.k = Math.min( 1 - r, 1 - g, 1 - b );
            result.c = ( 1 - r - result.k ) / ( 1 - result.k );
            result.m = ( 1 - g - result.k ) / ( 1 - result.k );
            result.y = ( 1 - b - result.k ) / ( 1 - result.k );
            result.c = Math.round( result.c * 100 );
            result.m = Math.round( result.m * 100 );
            result.y = Math.round( result.y * 100 );
            result.k = Math.round( result.k * 100 );
            return result;
    }


    $scope.keyPressed = function(e) {
        $scope.keyCode = e.which;
        if($scope.keyCode == 32){
          $scope.generateColour();
        }
      };

     $scope.generateColour = function() {
        var hex = '#';
        var range = 'ABCDEF0123456789';

        for (var i = 0; i < 6; i++ ) {
          hex += range.charAt(Math.floor(Math.random() * range.length));
        }
        $scope.hex = hex;
        $scope.hidden = false;
        $scope.converHexToRGB(false);
        //$('h1').text(hex);
        //$('body').css('background-color', hex);
    //    $('body').colourBrightness();
      }
      $scope.showRGBtoHEX = function(){
        // $scope.showRGB = true;
        // $scope.showImagePixel = false;
        // $scope.showColorPallete = false;
        $location.path("/");
      }

      $scope.showiamgePixel = function(){
        // $scope.showRGB = false;
        // $scope.showImagePixel = !$scope.showImagePixel;
        // $scope.showColorPallete = false;

        // return
        $location.path("/imagetopixel");
        //$state.go("ColorPalette");
      }

      $scope.showColor = function(){
        // $scope.showRGB = false;
        // $scope.showImagePixel = false;
        // $scope.showColorPallete = !$scope.showColorPallete;
        //$state.go("imagetopixel");
        $location.path("/ColorPalette");
      }

      $scope.getColorFromArray = function(dominant){
        var red = dominant[0];
        var green = dominant[1];
        var blue  = dominant[2];
        var colorValue = '';
        if(red  <= 256 && green <= 256 && blue <= 256) {
                var colorValue =  "#".concat(((blue | green << 8 | red << 16) / 0x1000000).toString(16).substring(2));

                if(blue == 0 && colorValue.length <= 5){
                    colorValue = insert(colorValue,colorValue.length,"00");
                }
                if(red == 0 && colorValue.length <= 5){
                    colorValue = insert(colorValue,1,"00");
                }
                if(blue== 0 && colorValue.length <= 5){
                    colorValue = insert(colorValue,3,"00");
                }
        }
        return colorValue;
      }

      $scope.imagePalette = function(){
        var colorThief = new ColorThief();
        var img = document.getElementById("imgSource");
        dominant = colorThief.getColor(img);

        var color = $scope.getColorFromArray(dominant);
        $scope.dominatColor.style = {"background-color" : color};

        dominantPalette = colorThief.getPalette(img);

        for (var i = 1; i < dominantPalette.length;i++){
            var color = $scope.getColorFromArray(dominantPalette[i]);
            if(i === 1){
                $scope.paletteOne.style = {"background-color" : color};
            }
            if(i === 2){
                $scope.paletteTwo.style = {"background-color" : color};
            }if(i === 3){
                $scope.paletteThree.style = {"background-color" : color};
            }
            if(i === 4){
                $scope.paletteFour.style = {"background-color" : color};
            }if(i === 5){
                $scope.paletteFive.style = {"background-color" : color};
            }if(i === 6){
                $scope.paletteSix.style = {"background-color" : color};
            }if(i === 7){
                $scope.paletteSeven.style = {"background-color" : color};
            }if(i === 8){
                $scope.paletteEight.style = {"background-color" : color};
            }
        }

      }


});

app.directive("imageToPixel",function() { 
   return {
       templateUrl: 'HTML/imagetopixel.html',
   };
});

app.directive("imageonload",function() { 
    return {
        scope: false,
        link: function(scope, element, attrs,$scope) {   

            element.bind("load" , function(e){ 
                //colorThief.getColor(sourceImage);
                //colorThief.getColor(scope.imgSource);
                scope.$apply(attrs.imageonload);
            });
        }
    }
});

app.directive("colorPaletee",function() { 
   return {
       templateUrl: 'HTML/ColorPalette.html',
   };
});

app.directive('shortcut', function() {
  return {
    restrict: 'E',
    replace: true,
    scope: true,
    link:    function postLink(scope, iElement, iAttrs){
      jQuery(document).on('keypress', function(e){
         scope.$apply(scope.keyPressed(e));
       });
    }
  };
});

  