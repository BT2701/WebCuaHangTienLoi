
var giohang = new Array();
function addProduct(){
    document.getElementById("confirm").style.display="block";
    setTimeout(function(){
        document.getElementById("confirm").style.display="none";
        deletecart(); 
    },1000)
    setTimeout(function(){
        location.reload();
    },1100)
}
function themvaogiohang(x){
    var lg = localStorage.getItem("login");
    var login=JSON.parse(lg);
    if(login!=false){
        if (localStorage.getItem('giohang') != null){
            var box = x.parentElement;
            var gh = localStorage.getItem("giohang");
            var giohang=JSON.parse(gh);
            var box = x.parentElement;
            var boxsp = box.parentElement.children;
            var hinh = boxsp[0].getElementsByClassName("product-thumb")[0].children[0].src;
            var ten = boxsp[1].getElementsByClassName("product-name")[0].innerText;
            var gia = boxsp[1].getElementsByClassName("product-price")[0].innerText.replace(/[^0-9]/g, '');
            var soluong = boxsp[1].querySelector("#buy-amount").children[1].value;
            var sp = new Array(hinh, ten, gia,soluong);
            var temp =-1;
            for(var i=0;i<giohang.length;i++){
                console.log(sp[1]);
                if(JSON.stringify(giohang[i][1]) == JSON.stringify(sp[1])){
                    temp = i;
                    break;
                }
            }
            if(temp != -1){
                giohang[temp][3]=Number(giohang[temp][3])+Number(soluong);
                console.log(giohang[temp][3]);
                localStorage.removeItem("giohang");
                localStorage.setItem("giohang",JSON.stringify(giohang));
            }
            else{
                giohang.unshift(sp);
                localStorage.setItem("giohang",JSON.stringify(giohang));
            }
            
          } else {
            var box = x.parentElement;
            var boxsp = box.parentElement.children;
            var hinh = boxsp[0].getElementsByClassName("product-thumb")[0].children[0].src;
            var ten = boxsp[1].getElementsByClassName("product-name")[0].innerText;
            var gia = boxsp[1].getElementsByClassName("product-price")[0].innerText.replace(/[^0-9]/g, '');
            var soluong = boxsp[1].querySelector("#buy-amount").children[1].value;
            var sp = new Array(hinh, ten, gia,soluong);
            var giohang = new Array();
            giohang.push(sp);
            localStorage.setItem("giohang",JSON.stringify(giohang));
          }
        addProduct();
        
    }
    else{
        alert("Đăng nhập để tiếp tục");
    }
}

function showmycart(){
    var gh = localStorage.getItem("giohang");
    var giohang=JSON.parse(gh);
    var ttgh="";
    
    for(var i = 0;i<giohang.length;i++){
        var sotien=giohang[i][2].replace(/[^0-9]/g, '')*giohang[i][3];
        ttgh +=
        '<div class="item-children style="width: 50px;">'+
            '<h2 style="width: 2%;"><input onclick="totalAmount()" type="checkbox" class="check1sp[]" style="z-index: 1;"></h2>'+
            '<h2 style="width: 20%;position: relative;top: 23px;"  class="name">'+
                '<i class="stt">'+i+'</i>'+
                '<i class="img"><img src="'+giohang[i][0]+'" alt=""></i>'+
                '<i  style="left: 11%;position: relative;">'+giohang[i][1]+'</i>'+
            '</h2>'+
            '<h1>'+giohang[i][2]+'</h1>'+
            '<h1 class="soluong">'+
            ' '+giohang[i][3]+' '+
                '<button class=" ti-angle-up plus-btn" onclick="handlePlus(this)"></button>'+
                '<button class="ti-angle-down min-btn" onclick="handleMin(this)"  ></button>'+
            '</h1>'+
            '<h1>'+sotien+' đ'+'</h1>'+
            '<h1><button class="xoabtn" onclick="deleteitem(this)">Xóa</button></h1>'+
        '</div>';
    }
    document.getElementById("item").innerHTML+=ttgh;
}
function showmycart2(){
    var gh = localStorage.getItem("giohang");
    var giohang=JSON.parse(gh);
    var ttgh="";
    if(giohang.length==1){
        document.getElementsByClassName("cart-list")[0].style.height='112px';
        ttgh += '<div style="height: 50px;">'+
        '<h2 class="img"><img src="'+giohang[0][0]+'" alt=""></h2>'+
        '<h2 class="name">'+giohang[0][1]+'</h2>'+
        '<h2 class="value">'+giohang[0][2]+'đ'+'</h2>';
    }
    else{
        for(var i = 0;i<2;i++){
            ttgh += '<div style="height: 50px;">'+
            '<h2 class="img"><img src="'+giohang[i][0]+'" alt=""></h2>'+
            '<h2 class="name">'+giohang[i][1]+'</h2>'+
            '<h2 class="value">'+giohang[i][2]+'đ'+'</h2>';
        }
    }
    document.getElementById("item-header").innerHTML+=ttgh;


}

function onchecked(){
    //input dưới
    document.getElementById('checksum').onclick = function(e){
        if (this.checked){
            item = document.getElementsByClassName("check1sp[]");
            for(var i = 0;i<item.length;i++){
                item[i].checked = true;
                document.getElementsByClassName("checkbox")[0].checked = true;
            }
            totalAmount();
            sumProduct();
        }
        else{
            item = document.getElementsByClassName("check1sp[]");
            for(var i = 0;i<item.length;i++){
                item[i].checked = false;
                document.getElementsByClassName("checkbox")[0].checked = false;
            }
            totalAmount();
            sumProduct();
        }
    };
    //input trên
    document.getElementsByClassName("checkbox")[0].onclick = function(e){
        if (this.checked){
            item = document.getElementsByClassName("check1sp[]");
            for(var i = 0;i<item.length;i++){
                item[i].checked = true;
                document.getElementById('checksum').checked = true;
            }
            totalAmount();
            sumProduct();
        }
        else{
            item = document.getElementsByClassName("check1sp[]");
            for(var i = 0;i<item.length;i++){
                item[i].checked = false;
                document.getElementById('checksum').checked = false;
            }
            totalAmount();
            sumProduct();
        }
    };
}
function onchecked2(){
    item = document.getElementsByClassName("check1sp[]");
    for(var i = 0;i<item.length;i++){
        item[i].checked = true;
        document.getElementById('checksum').checked = true;
        document.getElementsByClassName("checkbox")[0].checked = true;
    }
    totalAmount();
    sumProduct();
    
}
function deleteitem(x){
    var sp = x.parentElement;
    var vitri = sp.children[0].innerHTML;
    console.log(vitri);
    var gh = localStorage.getItem("giohang");
    var giohang=JSON.parse(gh);
    giohang.splice(vitri,1);
    localStorage.removeItem("giohang");
    localStorage.setItem("giohang",JSON.stringify(giohang));
    location.reload();
}

function deletecart(){
    item = document.getElementsByClassName("check1sp[]");
    var gh = localStorage.getItem("giohang");
    var giohang=JSON.parse(gh);
    for(var i = giohang.length-1;i>=0;i--){
        if(item[i].checked){
            giohang.splice(i,1);
            console.log(giohang);
            // i--;
        }
    }
    localStorage.removeItem("giohang");
    localStorage.setItem("giohang",JSON.stringify(giohang));
    location.reload();
}
function totalAmount(){
    var sumP = 0;
    console.log(sumP);
    var amount = document.getElementsByClassName("total-amount");
    item = document.getElementsByClassName("check1sp[]");
    for(var i = 0;i<item.length;i++){
        if(item[i].checked){
            sumP+=Number(item[i].parentElement.parentElement.children[2].innerHTML.replace(/[^0-9]/g, ''));        
        }
    }
    amount[0].innerHTML=sumP + ' ₫';
    sumProduct();
}
function pay(){
    document.getElementById("confirm").style.display="block";
    setTimeout(function(){
        document.getElementById("confirm").style.display="none";
        deletecart();
    },2500)
}

function nullcart(){
    var gh = localStorage.getItem("giohang");
    var giohang=JSON.parse(gh);
    var lg = localStorage.getItem("login");
    var login=JSON.parse(lg);
    // console.log(document.getElementsByClassName("top-nullcart")[0].style.display);
    if (giohang.length!=0 && login!=false ){
        document.getElementsByClassName("nullcart")[0].style.display="none";
        document.getElementsByClassName("title")[0].style.display="block";
        document.getElementsByClassName("top-nullcart")[0].style.display="none";
    }
    else{
        document.getElementsByClassName("nullcart")[0].style.display="block"; 
        document.getElementsByClassName("title")[0].style.display="none";
        document.getElementsByClassName("top-nullcart")[0].style.display="block";
    }

}

function sumProduct(){
    var sum = 0;
    item = document.getElementsByClassName("check1sp[]");
    for(var i = 0;i<item.length;i++){
        if(item[i].checked){
            sum +=1;
        }
    }
    document.getElementsByClassName("am")[0].innerHTML = sum;
}

function handlePlus(x){
    var stt = x.parentElement.parentElement.children[1].children[0].innerHTML;
    var giatri = x.parentElement.parentElement.children[3].innerText;
    x.parentElement.parentElement.children[3].innerHTML=Number(x.parentElement.parentElement.children[3].innerText)+1+
    '<button class=" ti-angle-up plus-btn" onclick="handlePlus(this)"></button>'+
    '<button class="ti-angle-down min-btn" onclick="handleMin(this)"  ></button>';
    giatri++;
    var gh = localStorage.getItem("giohang");;
    var giohang=JSON.parse(gh);
    console.log(""+giatri);
    giohang[stt][3]= giatri;
    localStorage.removeItem("giohang");
    localStorage.setItem("giohang",JSON.stringify(giohang));
    showmycart();
    location.reload();
}
function handleMin(x){
    if(x.parentElement.children[5].innerHTML>1){
        x.parentElement.children[5].innerHTML=Number(x.parentElement.children[5].innerHTML)-1;
        var stt = x.parentElement.children[1].innerHTML
        console.log(""+stt);
        var gh = localStorage.getItem("giohang");;
        var giohang=JSON.parse(gh);
        giohang[stt][3]=x.parentElement.children[5].innerHTML;
        localStorage.removeItem("giohang");
        localStorage.setItem("giohang",JSON.stringify(giohang));
        showmycart();
        location.reload();
    }
}
function themvaogiohang2(x){
    var lg = localStorage.getItem("login");
    var login=JSON.parse(lg);
    if(login!=false){
        if (localStorage.getItem('giohang') != null){
            var gh = localStorage.getItem("giohang");
            var giohang=JSON.parse(gh);
            var box = x.parentElement;
            var boxsp = box.parentElement.children;
            var hinh = boxsp[0].getElementsByClassName("product-thumb")[0].children[0].src;
            var ten = boxsp[1].getElementsByClassName("product-name")[0].innerText;
            var gia = boxsp[1].getElementsByClassName("product-price")[0].innerText.replace(/[^0-9]/g, '');
            var soluong = 1;
            var sp = new Array(hinh, ten, gia,soluong);
            console.log(""+gia);
            var temp =-1;
            for(var i=0;i<giohang.length;i++){
                console.log(sp[1]);
                if(JSON.stringify(giohang[i][1]) == JSON.stringify(sp[1])){
                    temp = i;
                    break;
                }
            }
            if(temp != -1){
                giohang[temp][3]=Number(giohang[temp][3])+Number(soluong);
                console.log(giohang[temp][3]);
                localStorage.removeItem("giohang");
                localStorage.setItem("giohang",JSON.stringify(giohang));
            }
            else{
                giohang.unshift(sp);
                localStorage.setItem("giohang",JSON.stringify(giohang));
            }
            
          } else {
            var box = x.parentElement;
            var boxsp = box.parentElement.children;
            var hinh = boxsp[0].getElementsByClassName("product-thumb")[0].children[0].src;
            var ten = boxsp[1].getElementsByClassName("product-name")[0].innerText;
            var gia = boxsp[1].getElementsByClassName("product-price")[0].innerText.replace(/[^0-9]/g, '');
            var soluong = 1;
            var sp = new Array(hinh, ten, gia,soluong);
            var giohang = new Array();
            giohang.push(sp);
            localStorage.setItem("giohang",JSON.stringify(giohang));
          }
        addProduct();
        location.reload();
    }
    else{
        alert("Đăng nhập để tiếp tục");
    }
}
function itemChildren(){
    var gh = localStorage.getItem("giohang");
    var giohang=JSON.parse(gh);
    var lg = localStorage.getItem("login");
    var login=JSON.parse(lg);
    if (giohang.length!=0 && login!=false ){
      document.getElementsByClassName("title")[0].style.display="block";
      document.getElementsByClassName("top-nullcart")[0].style.display="none";
      showmycart2();
    }
    else{
        document.getElementsByClassName("title")[0].style.display="none";
        document.getElementsByClassName("top-nullcart")[0].style.display="block";
    }
}
