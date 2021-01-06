var app = angular.module("myApp",['ngRoute','ngAnimate']);

    app.config(function ($routeProvider) {
      
      $routeProvider
        .when('/dangnhap', {
          templateUrl: 'signin.html',
          controller: 'account'
        })
        .when('/dangky', {
          templateUrl: 'signin.html',
          controller: 'account'
        })
        .when('/changep', {
          templateUrl: 'changep.html',
          controller: 'account'
        })
        .when('/quenmk', {
          templateUrl: 'reset.html',
          controller: 'account'
        })
        .when('/profile', {
          templateUrl: 'user.html',
          controller: 'account'
        })
        .when('/subjects', {
          templateUrl: 'subjects.html',
          controller: 'subjectsCtrl'
        })
        .when('/quiz/:id/:name', {
          templateUrl: 'test.html',
          controller: 'quizCtrl'
        })
        .when('/gioithieu', {
          templateUrl: 'about.html',
          controller: 'gioithieuCtrl'
        })
        .when('/lienhe', {
          templateUrl: 'contact.html',
          controller: 'lienheCtrl'
        })
        .when('/gopy', {
          templateUrl: 'suggest.html',
          controller: 'gopyCtrl'
        })
        .when('/hoidap', {
          templateUrl: 'q&a.html',
          controller: 'hoidapCtrl'
        })
        
        .otherwise({
          templateUrl: "home.html",
          controller: 'subjectsCtrl'
        });

    });

    app.controller("account", function ($scope, $http) {
      $scope.profile = [];
      $http.get("./db/Students.js").then(
        function (r) {
          $scope.profile = r.data;
        },
        function (d) {
          alert('Lỗi :' + d.statusText);
        }
      );
      $scope.login = function () {
        var u = $scope.u;
        var p = $scope.p;
        var tc = false;
        var motsv;
        for (var i = 0; i < $scope.profile.length; i++) {
          motsv = $scope.profile[i];
          if (u == motsv.username && p == motsv.password) {
            tc = true;
            break;
          }
          else{
            $(".tbaosaimk").text("Tài khoản hoặc mật khẩu không đúng :((")
          }
        }
        if (tc) {
          sessionStorage.setItem("index", i);
          sessionStorage.setItem("username", motsv.username);
          sessionStorage.setItem("hoten", motsv.fullname);
          sessionStorage.setItem("gender", motsv.gender);
          sessionStorage.setItem("birthday", motsv.birthday);
          sessionStorage.setItem("email", motsv.email);
          sessionStorage.setItem("sdt", motsv.sdt);
          sessionStorage.setItem("password", motsv.password);
          document.location = "index.html";
        }
      }
      $scope.logout = function () {
        sessionStorage.clear();
        document.location = "index.html";
      }
      $scope.index = sessionStorage.getItem("index");
      $scope.username = sessionStorage.getItem("username");
      $scope.hoten = sessionStorage.getItem("hoten");
      $scope.gender = sessionStorage.getItem("gender");
      $scope.birthday = sessionStorage.getItem("birthday");
      $scope.email = sessionStorage.getItem("email");
      $scope.sdt = sessionStorage.getItem("sdt");
      $scope.password = sessionStorage.getItem("password");
      $scope.editpro = {};
      $scope.pro = [{
        hoten: $scope.hoten,
        email: $scope.email,
        gender: $scope.gender,
        birthday: $scope.birthday,
        sdt: $scope.sdt,
        password: $scope.password
      }];
      $scope.edit = function () {
        $scope.editpro = angular.copy($scope.pro[0])
      }
      $scope.update = function () {
        sessionStorage.setItem("hoten", angular.copy($scope.editpro.hoten));
        sessionStorage.setItem("gender", angular.copy($scope.editpro.gender));
        sessionStorage.setItem("birthday", angular.copy($scope.editpro.birthday));
        sessionStorage.setItem("email", angular.copy($scope.editpro.email));
        alert("Cập nhập hồ sơ thành công");
        document.location = "index.html";
      }
      $scope.signup = function(){
        sessionStorage.setItem("hoten", angular.copy($scope.editpro.hoten));  
        sessionStorage.setItem("username", angular.copy($scope.editpro.username));  
        sessionStorage.setItem("password", angular.copy($scope.editpro.password));  
        sessionStorage.setItem("gender", angular.copy($scope.editpro.gender));
        sessionStorage.setItem("birthday", angular.copy($scope.editpro.birthday));
        sessionStorage.setItem("sdt", angular.copy($scope.editpro.sdt));
        sessionStorage.setItem("email", angular.copy($scope.editpro.email));
        document.location="index.html";  
    }
      $scope.changep = function () {
        if ($scope.passold == $scope.password) {
          sessionStorage.setItem("password", $scope.passnew);
          alert("Đổi mật khẩu thành công, mật khẩu mới của bạn là: " + $scope.passnew);
          document.location = "index.html";
        } else alert("Mật khẩu sai, vui lòng thử lại")
      };
      $scope.forgot = function () {
        var motsv;
        var tc = false;
        for (var i = 0; i < $scope.profile.length; i++) {
          motsv = $scope.profile[i];
          if ($scope.user == motsv.username || $scope.user == motsv.email) {
            tc = true;
            break;
          }
        }
        if (tc) {
          alert("Mật khẩu của bạn là: " + motsv.password);
        } else alert("Tài khoản không tồn tại !!!");
      };
    });
    app.controller('subjectsCtrl', function ($scope, $http) {
      $scope.list_subject = [];
      $http.get('./db/Subjects.js').then(function (res) {
        $scope.list_subject = res.data;
      });
      $scope.start = 0;
      $scope.next = function () {
            if ($scope.start < $scope.list_subject.length - 6)
                $scope.start += 6;
        }
        $scope.prev = function () {
            if ($scope.start > 0)
                $scope.start -= 6;
        }
        $scope.first = function () {
            $scope.start = 0;
        }
        $scope.last = function () {
            sotrang = Math.ceil($scope.list_subject.length / 6);
            $scope.start = (sotrang - 1) * 6;
        }
    });
    app.controller('quizCtrl', function ($scope, $http, $routeParams, quizFactory) {
      $http.get('./db/Quizs/' + $routeParams.id + '.js').then(function (res) {
        quizFactory.questions = res.data;
      });
    });
    app.directive("quizpoly", function (quizFactory, $routeParams) {
      return {
        restrict: 'AE',
        scope: {},
        templateUrl: 'listtest.html',
        link: function (scope, elem, attrs) {
          scope.start = function () {
            quizFactory.getQuestions().then(function () {
              scope.subjectName = $routeParams.name;
              scope.subjectLogo = $routeParams.logo;
              scope.id = 1;
              scope.inProgess = true;
              scope.getQuestion();
              scope.quizOver = false;
            });
          };
          scope.reset = function () {
            scope.inProgess = false;
            scope.score = 0;
          };
          scope.getQuestion = function () {
            var quiz = quizFactory.getQuestion(scope.id);
            if (quiz) {
              scope.question = quiz.Text;
              scope.options = quiz.Answers;
              scope.answer = quiz.AnswerId;
              scope.answerMode = true;
            } else {
              scope.quizOver = true;
            }
          }

          scope.checkAnswer = function () {
            // alert('Answer')
            if (!$('input[name = answer]:checked').length) return;
            var ans = $('input[name = answer]:checked').val();
            if (ans == scope.answer) {
              //alert('Chúc mừng, Bạn đã trả lời ĐÚNG !');
              scope.score++;
              scope.correcAnswers = true;
            } else {
              //alert('Thật tiếc, Bạn đã trả lờI SAI !');
              scope.correcAnswers = false;
            }
            scope.answerMode = false;
          }
          scope.nextQuestion = function () {
            scope.id++;
            scope.getQuestion();
          }
          scope.prevQuestion = function () {
            scope.id--;
            scope.getQuestion();
          }
          scope.reset();
        }
      }
    });
    app.factory('quizFactory', function ($http, $routeParams) {
      //alert(questions.length);

      return {
        getQuestions: function () {
          return $http.get('./db/Quizs/' + $routeParams.id + '.js').then(function (res) {
            questions = res.data;
          });
        },

        getQuestion: function (id) {
          var randomItem = questions[Math.floor(Math.random() * questions.length)];
          var count = questions.length;
          if (count > 10) {
            count = 10;
          }
          if (id < count) {
            return randomItem;
          } else {
            return false;
          }
        }
      }
    });
    //timecode
    window.onload = function () {
      var min = 09;
      var sec = 59;
      setInterval(function () {
        document.getElementById("timer").innerHTML = min + ":" + sec;
        sec--;
        if (sec == 00) {
          min--;
          sec = 60;
          if (min == 00) {
            document.getElementById("timerend").innerHTML = "Hết Thơi Gian !";
          }
        }
      }, 1000);
    };
