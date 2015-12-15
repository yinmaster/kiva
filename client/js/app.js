
    // GET PARTNERS FROM API  
   function GET_partners($http, $q) {
       var self = this;
       self.getPartnersP = $q.defer();

       self.getPartners = function() {
            // API REQUEST   
           $http.get('https://api.kivaws.org/v1/partners.json').
           success(function(data, status, headers, config) {
               self.getPartnersP.resolve(data.partners);
           }).
           error(function(data, status, headers, config) {});
       };
       return self;
   }

   function PartnersCtrl(GET_partners,$scope) {
       var self = this;
      self.data;
      self.countryList = [];
      // CHECK IF COUNTRY HAS FAVIORTE IN LOCAL STORAGE AND SET IF FAVORITE EXISITS 
      if(amplify.store("country")){
         self.selectedCountry = amplify.store("country").country; 
         self.favoriteCountry = amplify.store("country").country;  
      }else{
         self.selectedCountry; 
         self.favoriteCountry;
      }
      
        // SET FAVORITE AND SAVE TO LOCAL STORAGE
       $scope.fav = function(value){
         self.favoriteCountry = value.country
         self.selectedCountry = value.country;
         amplify.store("country",{'country' : value.country});
       }
       
        // SELECT COUNTRY WITH BUTTON
       $scope.selectCountry = function(value){
           self.selectedCountry = value.country;
       }

        //PROMISE TO RUN WHEN DATA IS RETURNED FROM THE API
       GET_partners.getPartners();
       GET_partners.getPartnersP.promise.then(function(data) {
           self.data = data;

            //LOOP THROUGH AVAIBLE COUNTRIES AND REMOVE DUPS
           function getCountries() {
               var countries = []
               for (var i = 0; i < self.data.length; i++) {
                   // console.log(self.data[i].name)
                   for (var c = 0; c < self.data[i].countries.length; c++) {
                       //console.log(self.data[i].countries[c].name)
                       countries.push(self.data[i].countries[c].name);
                   }
               }
               return countries
           }
            // ONLY SHOW UNIQUE NAMES
           self.countryList = _.uniq(getCountries());
       })
   }


// INI ANGULAR APP SERVICE AND CONTROLLER
       angular.module('app', [])
           .service('GET_partners', ['$http', '$q', GET_partners])
           .controller('PartnersCtrl', ['GET_partners', '$scope', PartnersCtrl]);


// INI FOUNDATION
       $(document).ready(function() {
           $(document).foundation();
       });
   
