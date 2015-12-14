   function GET_partners($http, $q) {
       var self = this;
       self.partnerList = []
       self.getPartnersP = $q.defer();

       self.getPartners = function() {
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
      self.selectedCountry;
      self.favoriteCountry;
       
       $scope.fav = function(value){
         self.favoriteCountry = value.country
         self.selectedCountry = value.country;
       }
       
       $scope.selectCountry = function(value){
           self.selectedCountry = value.country;
       }
       
       self.setCountry = function(){
          // self.selectedCountry =
       }
       
       
       GET_partners.getPartners();
       GET_partners.getPartnersP.promise.then(function(data) {
           self.data = data;

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

           self.countryList = _.uniq(getCountries());
       })
   }



       angular.module('app', [])
           .service('GET_partners', ['$http', '$q', GET_partners])
           .controller('PartnersCtrl', ['GET_partners', '$scope', PartnersCtrl]);



       $(document).ready(function() {
           $(document).foundation();
       });
   