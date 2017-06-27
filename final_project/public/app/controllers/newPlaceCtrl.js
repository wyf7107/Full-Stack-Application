angular.module('newPlaceController',[])


.controller('newPlaceCtrl', function($scope,$http,$timeout,$window) {

    var app = this;
    $scope.types = ['accounting',
                        'airport',
                        'amusement_park',
                        'aquarium',
                        'art_gallery',
                        'atm',
                        'bakery',
                        'bank',
                        'bar',
                        'beauty_salon',
                        'bicycle_store',
                        'book_store',
                        'bowling_alley',
                        'bus_station',
                        'cafe',
                        'campground',
                        'car_dealer',
                        'car_rental',
                        'car_repair',
                        'car_wash',
                        'casino',
                        'cemetery',
                        'church',
                        'city_hall',
                        'clothing_store',
                        'convenience_store',
                        'courthouse',
                        'dentist',
                        'department_store',
                        'doctor',
                        'electrician',
                        'electronics_store',
                        'embassy',
                        'hospital',
                        'insurance_agency',
                        'jewelry_store',
                        'laundry',
                        'lawyer',
                        'library',
                        'liquor_store',
                        'local_government_office',
                        'locksmith',
                        'lodging',
                        'meal_delivery',
                        'meal_takeaway',
                        'mosque',
                        'movie_rental',
                        'movie_theater',
                        'moving_company',
                        'museum',
                        'night_club',
                        'painter',
                        'park',
                        'parking',
                        'pet_store',
                        'pharmacy',
                        'physiotherapist'];
    $scope.search = function () {
        $http.get('/api/search/'+$scope.locationEntered+'/'+$scope.radiusEntered + '/' + $scope.selectedName).then(function (response) {
            console.log(response)
            var dataArray = [];
            var addressArray = [];
            for(i=0; i<response.data.length;i++){
                dataArray.push(response.data[i].name + ': ' + response.data[i].vicinity)
            }
            var uniqueNames = [];
            $.each(dataArray, function(i, el){
                if($.inArray(el, uniqueNames) === -1) uniqueNames.push(el);
            });
            $scope.response = {text:uniqueNames};

        })
       
    }

    $scope.show = function (name) {
        $window.location.href=('http://www.google.com/#q='+name);
    }






});