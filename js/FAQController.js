
app.directive("faqDetails",function() { 
   return {
       restrict : 'EA',
       scope:{
         category: '=',
       },
       templateUrl: 'FAQPage.html',
       controller: 'ConvertorCtrl',
       controllerAs: 'convCtrl',
       link:function(scope,element,attrs) {
          scope.$watch("category",function(newValue){
            console.log("bala")
         });
       }
   }
});
