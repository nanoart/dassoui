var ssoModule = angular.module('ssoApp', ['ngRoute','pascalprecht.translate']);


function MainCntl($scope, $route, $routeParams, $location) {
    $scope.$route = $route;
    $scope.$location = $location;
    $scope.$routeParams = $routeParams;
}

function BookCntl($scope, $routeParams) {
    $scope.name = "BookCntl";
    $scope.params = $routeParams;
}

function ChapterCntl($scope, $routeParams) {
    $scope.name = "ChapterCntl";
    $scope.params = $routeParams;
}

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

/*
 Windows Locale Codes - Sortable list
 http://www.science.co.il/Language/Locale-codes.asp
 de_DE, en_US, zh_CN
*/

ssoModule.config(function ($translateProvider) {

    $translateProvider.useStaticFilesLoader({
        prefix: '/languages/locale-',
        suffix: '.json'
    });
    $translateProvider.uses('zh_CN');

});

ssoModule.controller('TranslateCtrl', ['$scope', '$translate', function ($scope, $translate) {

    $scope.switchLanguage = function (key) {
        $translate.uses(key);
    };
}]);


ssoModule.config(function($routeProvider, $locationProvider) {
    $routeProvider.when('/allinone', {
        templateUrl: 'allinone.html',
        controller: BookCntl
/*
        resolve: {
            // I will cause a 1 second delay
            delay: function($q, $timeout) {
                var delay = $q.defer();
                $timeout(delay.resolve, 1000);
                return delay.promise;
            }
        }
*/
    });
    $routeProvider.when('/wizard', {
        templateUrl: 'wizard.html',
        controller: ChapterCntl
    });

    // configure html5 to get links working on jsfiddle
    $locationProvider.html5Mode(true);
});



function AuthWizardCtrl($scope,$http, $translate) {
    "use strict";
    $scope.currentstep = 0;
    $scope.submitText = $translate('CONTINUE');
    $scope.username = '';

    $scope.url = 'logonprecedure.json';
    $scope.authenticators = [];
	
	$scope.declareCredentials = function() {
		//will be using the credentials collected and sent back to server
		$scope.credentials = new Array($scope.logonsteps.length);
		
		$scope.selectedauthenticators = new Array($scope.logonsteps.length);
		for(var i = 0; i < $scope.logonsteps.length; i++)
		{
			$scope.selectedauthenticators[i] = $scope.logonsteps[i][0];
		}
		
	}

    $scope.fetchLogonPrecedure = function() {
        $http.get($scope.url).then(function(result){
//            console.log('HELLO! ' + result.data);
            $scope.logonsteps = result.data;
            $scope.authenticators = $scope.logonsteps[$scope.currentstep];
            $scope.authenticator = $scope.authenticators[0];
			
			$scope.declareCredentials();
        });
    }

    $scope.fetchLogonPrecedure();


    $scope.list = [];
    $scope.text = 'hello';
    $scope.submit = function() {

        if($scope.currentstep < $scope.logonsteps.length-1)
            $scope.currentstep += 1;

        $scope.authenticators = $scope.logonsteps[$scope.currentstep];
        $scope.authenticator = $scope.authenticators[0];

        if($scope.currentstep == $scope.logonsteps.length-1)
        {
            $scope.submitText = $translate('FINISH');
        }
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


ssoModule.controller('GridScreenCtrl', function($scope, $http) {
    "use strict";

    $scope.url = 'gridscreen.json';
/*
    $scope.gridscreen = {};
    $scope.fetchGridData = function() {
        //this asynch is too late.
        $http.get('gridscreen.json').then(function(result){
//            console.log('HELLO! ' + result.data);
            $scope.gridscreen = result.data;
        });
    }

    $scope.fetchGridData();
*/
});


/* Directives */

ssoModule.directive('appVersion', ['version', function(version) {
    return function(scope, elm, attrs) {
      elm.text(version);
    };
  }]);


ssoModule.directive('dsGridScreen',['$http','$interpolate', function($http, $interpolate){

    var getHeader = function(col)
    {
        var finalHeader = '<tr style="background-color:#778899"><td style="text-align: center; padding: 0px;"> </td>';
        for(var i = 0; i < col; i++)
        {
            finalHeader += '<td style="text-align: center; padding: 0px;">' + String.fromCharCode(65+i) + '</td>';
        }
        finalHeader += '<td style="text-align: center; padding: 0px;"> </td></tr>';
        return finalHeader;
    }

    var getTemplate = function(gridscreen)
    {
        var finalDOM = '<table class="grid" cellspacing="0px">'
        //draw the header
        finalDOM += getHeader(gridscreen.col);

        var cellTemplate = '<td style="text-align: center; padding: 0px; cursor: pointer;" class="grid-content" id="grid-{{col}}-{{row}}" original-gbcolor="">{{cell}}</td>';
        var getCellExp = $interpolate(cellTemplate);
        for(var j = 0; j < gridscreen.row; j++)
        {
            finalDOM += (j%2)?'<tr style="background-color:#a9a9a9">': '<tr style="background-color:#d3d3d3">';
            finalDOM += '<td style="text-align: center; padding: 0px; background-color:#778899;">';
            finalDOM += j + '</td>';
            for(var i = 0; i < gridscreen.col; i++)
            {
                var strCell = getCellExp({row: j, col:String.fromCharCode(65+i), cell: gridscreen.cell[j*gridscreen.col+i]});
                finalDOM += strCell;
            }
            finalDOM += '<td style="text-align: center; padding: 0px; background-color:#778899;">';
            finalDOM += j + '</td></tr>';
        }
        //draw the footer
        finalDOM += getHeader(gridscreen.col);

        finalDOM += '</table>';
        return finalDOM;

    }

    var linker = function(scope, iElement, iAttrs)
    {
        $http.get(scope.url).success(function(gridscreen){
            var finalDOM = getTemplate(gridscreen);
            iElement.html(finalDOM);
//                iElement.replaceWith($compile(tplContent)(scope));
        })
    }

    return {
        restrict: 'E',
        replace:true,
        link: linker
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

