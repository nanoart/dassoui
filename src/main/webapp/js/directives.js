var ssoModule = angular.module('ssoApp', []);

function AuthStepsCtrl($scope,$http) {
    $scope.authsteps = [
        {name:'Step', serial:'1', otp:''},
        {name:'Step', serial:'2', otp:''},
        {name:'Step', serial:'3', otp:''}
    ];
    $scope.authstep = $scope.authsteps[0];

    $scope.list = [];
    $scope.text = 'hello';
    $scope.submit = function() {
        this.list = [];
        $.each(this.authsteps,function(index, value)
        {
            $scope.list.push(value.otp);
        });

        //let us also post to server
        $http.post("/doauth", $scope.list).success(function(data)
        {
            alert(data);

        });
    }


};

function CertificateCtrl($scope,$http) {

    $scope.fingerprints = "54325923e8c36bd82e97354c42de80e33b585b8e";
    $scope.browseruseragent = navigator.userAgent;

};

ssoModule.controller('FaceSenseCtrl', function ($scope, $http) {
    $scope.sessionid = "A3B97923EBD2B8A4FAF84806B0A68603";
    $scope.connectionserver = "http://dualshield.deepnetsecurity.local:8074undefined";

});

ssoModule.controller('FlashPassCtrl', function ($scope, $http) {
    $scope.sessionid = "A3B97923EBD2B8A4FAF84806B0A68603";
    $scope.connectionserver = "http://dualshield.deepnetsecurity.local:8074undefined";

});


ssoModule.controller('KeyStrokeCtrl', function ($scope, $http) {
    $scope.tokenid = "#i#_TokenAssignment_479";
    $scope.serviceurl = "/appsso/httpproxy/1383922021775112";

});

ssoModule.controller('DemoCtrl', function ($scope, $http) {
    $scope.selectedTestAccount = null;
    $scope.testAccounts = [];

    $http({
        method: 'GET',
        url: 'authenticators.json',
        data: { applicationId: 3 }
    }).success(function (result) {
            $scope.testAccounts = result;
        });
});

ssoModule.controller('AuthenticatorsHTTPCtrl', function($scope, $http) {
    "use strict";

    $scope.url = 'authenticators.json';
    $scope.authenticators = [];

    $scope.fetchAuthenticators = function() {
        $http.get($scope.url).then(function(result){
//            console.log('HELLO! ' + result.data);
            $scope.authenticators = result.data;
            $scope.authenticator = $scope.authenticators[0]; // first one
        });
    }

    $scope.fetchAuthenticators();
});


/* Directives */

ssoModule.directive('appVersion', ['version', function(version) {
    return function(scope, elm, attrs) {
      elm.text(version);
    };
  }]);


ssoModule.directive('dsFaceSense',['$http','$templateCache','$interpolate', function($http, $templateCache, $interpolate){

    return {
        restrict: 'E',
        replace:true,
        link: function(scope, iElement, iAttrs)
        {
            $http.get('fsTemplate.html', {cache: $templateCache}).success(function(tplContent){
                var getRealHTML = $interpolate(tplContent);
                var finalDOM = getRealHTML(scope);
                iElement.html(finalDOM);
//                iElement.replaceWith($compile(tplContent)(scope));
            })

        }
    };

}]);


ssoModule.directive('dsFlashPass',['$http','$templateCache','$interpolate', function($http, $templateCache, $interpolate){

    return {
        restrict: 'E',
        replace:true,
        link: function(scope, iElement, iAttrs)
        {
            $http.get('fpTemplate.html', {cache: $templateCache}).success(function(tplContent){
                var getRealHTML = $interpolate(tplContent);
                var finalDOM = getRealHTML(scope);
                iElement.html(finalDOM);
//                iElement.replaceWith($compile(tplContent)(scope));
            })

        }
    };

}]);

ssoModule.directive('dsKeyStroke',['$http','$templateCache','$interpolate', function($http, $templateCache, $interpolate){

    return {
        restrict: 'E',
        replace:true,
        link: function(scope, iElement, iAttrs)
        {
            $http.get('ksTemplate.html', {cache: $templateCache}).success(function(tplContent){
                var getRealHTML = $interpolate(tplContent);
                var finalDOM = getRealHTML(scope);
                iElement.html(finalDOM);
//                iElement.replaceWith($compile(tplContent)(scope));
            })

        }
    };

}]);

ssoModule.directive('dsCertAuth',['$http','$templateCache','$interpolate', function($http, $templateCache, $interpolate){

    return {
        restrict: 'E',
//        templateUrl: 'certTemplate.html', remove it, otherwise it will do twice
        replace:true,
        link: function(scope, iElement, iAttrs)
        {
            $http.get('certTemplate.html', {cache: $templateCache}).success(function(tplContent){
                var getRealHTML = $interpolate(tplContent);
                var finalDOM = getRealHTML(scope);
                iElement.html(finalDOM);

//                iElement.replaceWith($compile(tplContent)(scope));
            })
        }
    };

}]);

ssoModule.directive('dsChannelsList', ['$compile', '$http',  function($compile, $http) {

    var getTemplate = function(content){
        var templateNew = '<div class="navbar"><ul class="nav navbar-nav"><a class="navbar-brand" href="#">Channels:</a>';
        $.each(content, function(key, value) {
//            console.log(key, value);

            templateNew += '<li class="dropdown">';
            templateNew += '<a href="#" class="dropdown-toggle" data-toggle="dropdown">' + key + '<b class="caret"></b></a>';
            var aryContact = value;
            //also add menu
            if(aryContact.length> 0)
            {
                templateNew += '<ul class="dropdown-menu">';
                for(var i = 0; i < aryContact.length; i++)
                {
                    templateNew += ' <li><a href="#">' + aryContact[i] + '</a></li>';

                }

                templateNew += '</ul>';


            }

            templateNew += '</li>';

        });

        templateNew += "</ul></div>";
        return templateNew;

        //do we need a separate ajax call here?
/*
        var templateUrl = "sso.login/sessionid=";
        var templateLoader = $http.get(templateUrl, {cache: $templateCache});
        return templateLoader;
*/

    }

    var linker = function(scope, element, attrs){

        var loader = $http.get('channels.json');
        var promise = loader.success(function(content){
                var finalDOM = getTemplate(content);
                element.html(finalDOM);
            }).then(function(response){
                element.replaceWith($compile(element.html())(scope))
            }
        );

/*
     element.html(getTemplate(scope.content)).show();
     $compile(element.content())(scope);

        var loader = getTemplate(scope.content);
        var promise = loader.success(function(html){
                element.html(html);
            }
        ).then(function(response){
                element.replaceWith($compile(element.html())(scope));
            });
*/
    }

    return {
        restrict:'E',
        link: linker,
        scope: {
            post:'='
        }
    };

    }]);

