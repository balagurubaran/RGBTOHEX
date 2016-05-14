var app = angular.module('RGBTOHEX', []);

app.controller('ConvertorCtrl', function($scope) {
        
		$(document).ready(function($event){
            $('[data-toggle="popover"]').popover();
        });
        $scope.consolidatedResult = '';
        $scope.titleLabel = {};
        $scope.wall = {};
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
	$scope.converHexToRGB = function(){
    		var finalString = $scope.hex;
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
        $window.open("https://github.com/balagurubaran/RGBTOHEX/", "_blank");
    };
    function updateFinalString(r,g,b,hex){
        $scope.consolidatedResult  = "RGB : ("+r+","+g+","+b+") HEX Code : "+hex;
    };
    
});

app.directive('noSpecialChar', function() {
    return {
      require: 'ngModel',
      restrict: 'A',
      link: function(scope, element, attrs, modelCtrl) {
        modelCtrl.$parsers.push(function(inputValue) {
          if (inputValue == null)
            return ''
          cleanInputValue = inputValue.replace(/[^\w\s]/gi, '');
          if (cleanInputValue != inputValue) {
            modelCtrl.$setViewValue(cleanInputValue);
            modelCtrl.$render();
          }
          return cleanInputValue;
        });
      }
    }
  });

app.directive('onlyNum', function() {
      return function(scope, element, attrs) {

         var keyCode = [8,9,37,39,48,49,50,51,52,53,54,55,56,57,96,97,98,99,100,101,102,103,104,105,110];
          element.bind("keydown", function(event) {
            if($.inArray(event.which,keyCode) == -1) {
                scope.$apply(function(){
                    scope.$eval(attrs.onlyNum);
                    event.preventDefault();
                });
                event.preventDefault();
            }

        });
     };
  });