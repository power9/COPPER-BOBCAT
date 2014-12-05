angular.module('copperBobcat.questions', [])
.controller('QuestionsController', function ($scope, Questions, $http) {
  angular.extend($scope, Questions);

  Questions.getQuestions()
    .then(function(questions) {
      $scope.serverQuestions = questions;
    });

}).factory('Questions', function($http) {
  //Linked list?
  var questions = {};
  //Line break in questions is to fix uneven indenting in the pre tag
  //This is a hack ans should be removed eventually.
  // questions.list = [{question:"\nfunction add(a, b) {\n return a + b \n} \nadd(12, 3)", answer: '15'},
  //                   {question:"\nfunction subtract(a, b) {\n return a - b \n} \nsubtract(12, 3)", answer: '9'},
  //                   {question:"\nfunction divide(a, b) {\n return a / b \n} \ndivide(12, 3)", answer: '4'}];
  questions.index = 0;
  questions.isAnswered = false;
  
  questions.tap = function(){
    if(questions.isAnswered) {
      questions.isAnswered = false;
      questions.index += 1;
    } else {
      questions.isAnswered = true;
    }
  };

  var getQuestions = function() {
    return $http({
      method: 'GET',
      url: '/questions'
    })
    .then(function(res){
      return res.data;
    });
  };

  return {
    questions: questions,
    getQuestions: getQuestions
  };

});