var cardFlipper = angular.module('cardFlipper', [])
    .controller('AppController', ['$scope', '$interval', function($scope, $interval) {

        $scope.name = 'wangtao';
        $scope.cards = [{
            title: "escheresque-dark",
            icon: "",
            imageUrl: "http://subtlepatterns.com/patterns/escheresque_ste.png",
            description: "Sublte Pattern Source image below...",
            source: "http://subtlepatterns.com/escheresque-dark/"
        }, {
            title: "dark sharp edges",
            icon: "",
            imageUrl: "http://subtlepatterns.com/patterns/footer_lodyas.png",
            description: "Sublte Pattern Source image below...",
            source: "http://subtlepatterns.com/dark-sharp-edges/"
        }, {
            title: "Grey Washed Wall",
            icon: "",
            imageUrl: "http://subtlepatterns.com/patterns/grey_wash_wall.png",
            description: "Sublte Pattern Source image below...",
            source: "http://subtlepatterns.com/grey-washed-wall/"
        }];
        $scope.currentCard = $scope.cards[0];

        $scope.isCardRevealed = false;
        $scope.flipCard = function() {
            $scope.isCardRevealed = !$scope.isCardRevealed;
            if ($scope.isCardRevealed) {
                $scope.generateCard();
            } else {

                $scope.currentCard = {};
                /*            setTimeout(function() {
//                $scope.isBackHidden = !$scope.isCardRevealed;
            }, 0.1 * 1000);
*/
            }

        }

        $scope.generateCard = function() {
            $scope.currentCard = {};
            var index = Math.floor((Math.random() * $scope.cards.length) + 0);
            $scope.currentCard = $scope.cards[index];
        }

    }]);