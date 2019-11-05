var app=angular.module("app",['ngRoute','ngSanitize','ngCookies']);
var url="http://127.0.0.1/cibackendtemplate/";
app.config(function($routeProvider){
    $routeProvider
    .when('/',{templateUrl:'home.html'})
    .when('/biodata',{templateUrl:'biodata.html'})
    .otherwise({redirectTo:'404.html'});

});

app.controller("indexcontrol",function ($scope,$cookies,$location) {

  $scope.gobiodata=function () {
    $location.path('/biodata');
  }

  $scope.gohome=function () {
      $location.path('/');
  }

})


app.controller("biodatacontrol",function ($scope,$http,$cookies) {

  var ids="";


    $http.get(url+"biodata/readall").then(function (res) {
      $scope.data=res.data;
    });

    $scope.simpan=function(){
      var data={'nama':$scope.nama,'alamat':$scope.alamat};
      if(ids==""){
        $http.post(url+"biodata/insert",data,{header : {'Content-Type':'application/x-www-form-urlencoded ; charset=utf-8'}}).then(function(res) {
          console.log(res.data);
          $scope.data=res.data;
        });
      }else{
        $http.post(url+"biodata/update/"+ids,data,{header : {'Content-Type':'application/x-www-form-urlencoded ; charset=utf-8'}}).then(function(res) {
          console.log(res.data);
          $scope.data=res.data;
        });

      }

    }

    $scope.getedit=function(id,nama,alamat){
      ids=id;
      $scope.nama=nama;
      $scope.alamat=alamat;
    }

    $scope.reset=function(){
      ids="";
      $scope.nama="";
      $scope.alamat="";
    }

    $scope.hapus=function(id){
      var cek=confirm("Yakin ingin dihapus");
      if(cek==true){
        $http.get(url+"biodata/delete/"+id).then(function (res) {
          $scope.data=res.data;
        });
      }

    }


});
