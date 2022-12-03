function login(e){
  event.preventDefault();
  var username = document.getElementById("username").value;
  var password = document.getElementById("password").value;
  var userName = 'admin';
  var passWord = '123456' ;
  if ( username == userName && password == passWord ) {
    alert("Đăng nhập thành công <3 ")
    var lg = localStorage.getItem("login");
    var login=JSON.parse(lg);
    login = document.getElementById("username").value;
    localStorage.removeItem("login");
    localStorage.setItem("login",JSON.stringify(login));
    window.location.href = "./idex.html";
  } else {
    alert("Đăng nhập thất bại !!  ");
    var lg = localStorage.getItem("login");
    var login=JSON.parse(lg);
    login = false;
    localStorage.removeItem("login");
    localStorage.setItem("login",JSON.stringify(login));
  }
}

function loginE(){
  var lg = localStorage.getItem("login");
    var login=JSON.parse(lg);
    if(login!=false){
      document.getElementsByClassName("login-btn")[0].children[0].children[0].innerHTML='<i class="user-icon ti-user"></i>'+
                  '<h1>'+login+'</h1>';
      document.getElementsByClassName("login-btn")[0].children[0].children[0].href="";
    }
    else{
      document.getElementsByClassName("login-btn")[0].children[0].children[0].innerHTML='<i class="user-icon ti-user"></i>'+
                  '<h1>Login</h1>';
      document.getElementsByClassName("login-btn")[0].children[0].children[0].href="./login.html";
    }
    document.getElementsByClassName("login-btn")[0].onclick=function(e){
      if(login!=false){
        var lg = localStorage.getItem("login");
        var login=JSON.parse(lg);
        login = false;
        localStorage.removeItem("login");
        localStorage.setItem("login",JSON.stringify(login));
        document.getElementsByClassName("login-btn")[0].children[0].children[0].innerHTML='<i class="user-icon ti-user"></i>'+
                  '<h1>Login</h1>';
        document.getElementsByClassName("login-btn")[0].children[0].children[0].href="./login.html";
      }
      
    }
}

