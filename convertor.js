var app = angular.module('RGBTOHEX', []);

app.controller('ConvertorCtrl', function($scope) {
		$(document).ready(function(){
            $('[data-toggle="popover"]').popover();
        });
        
        $scope.titleLabel = {};
        $scope.wall = {};
    $scope.convertRGBtoHEX = function(){
    	console.log('bala');
    	var red = parseInt($scope.red);
    	var green = parseInt($scope.green);
    	var blue = parseInt($scope.blue);
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
				$scope.hex = colorValue;
                $scope.invertColor(colorValue);
            }
    };
    function insert(str, index, value) {
            return str.substr(0, index) + value + str.substr(index);
        }
	$scope.converHexToRGB = function(){
    		var finalString = $scope.hex;
    		
    		if(finalString != null && finalString.indexOf('#') > -1){
				finalString =  finalString.slice(1,finalString.length);
			}
			var missingCharCount = 6 - finalString.length;
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
});