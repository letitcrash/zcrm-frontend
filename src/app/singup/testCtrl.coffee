'use strict';

angular.module('inspinia').controller("SignupUserCtrl", ($scope, $route, $window, signupServices, generalUtils, $rootScope, requestService) ->
  console.log("SignupUserCtrl initializing")

  $scope.createUser = () ->
    contactProfile = $scope.contactProfile
    token = $scope.token
    email = $scope.email
    companyName = $scope.companyName
    vatId = $scope.vatId
    contactProfile.email = email
    password = $scope.password
    signupServices.activateUser(token, email, contactProfile, companyName, vatId, password).then(
      (response) ->
        console.log("success")
        $window.location.href = '/#/login'
      (response) ->
        console.log("fail")
        $window.location.href = '/#/login'
    )

  $scope.init = () ->
    console.log("do something")
    $rootScope.isOnSignup = true
    $scope.contactProfile = {}
    $scope.token = $route.current.params.token
    $scope.email = $route.current.params.email
    if (!$scope.email? && !$scope.token?)
      $rootScope.isOnSignup = false
      $window.location.href = '/#/login'
      return

  $scope.init()

)