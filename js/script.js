
let menu = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menu.onclick = () => {
	menu.classList.toggle('bx-x');
	navbar.classList.toggle('active');
};

window.onscroll = () => {
	menu.classList.remove('bx-x');
	navbar.classList.remove('active');
};

//gio hang
const btn =document.querySelectorAll("button")
btn.forEach(function(button,index){
button.addEventListener("click",function(event){{
	if(JSON.parse(localStorage.getItem('loginStatus')) == 1) {
		var btnItem=event.target
		var product=btnItem.parentElement
		var productImg=product.querySelector("img").src
		var productName=product.querySelector("h4").innerText
		var productPrice=product.querySelector("span").innerText
		addcart(productPrice,productImg,productName)
	} else 
		alert("Vui lòng đăng nhập!")
}})
})
function addcart(productPrice,productImg,productName){
	var addtr=document.createElement("tr")
	var cartItem=document.querySelectorAll("tbody tr")
	var trcontent='<tr><td style="display: flex;align-items: center"> <img width="70px" src="'+productImg+'" alt="">'+productName+'</td><td><p><span>'+productPrice+'</span><sup>đ</sup></p></td><td><input style="width:30px ;cursor: pointer" type="number"value="1" min="1"></td><td style="cursor: pointer"><span class="cart-delete">Xóa</span></td></tr>'
	addtr.innerHTML=trcontent
	var cartTable=document.querySelector("tbody")
	cartTable.append(addtr)
	carttotal()
	deleteCart()
} 

function carttotal(){
	var cartItem=document.querySelectorAll("tbody tr")
	var totalC=0
	var totalB=5000000	
	for(var i=0;i<cartItem.length;i++){
		var inputValue=cartItem[i].querySelector("input").value
		//console.log(inputValue)
		var productPrice=cartItem[i].querySelector("span").innerHTML
		//console.log(productPrice)
		totalA=inputValue*productPrice*1000
		//totalB=totalA.toLocaleString('de-DE')
		totalC=totalC + totalA
		//totalD=totalC.toLocaleString('de-DE')
		totalB=totalB - totalA	
		
	}
	var cartTotalA=document.querySelector(".price-total span")
	var cartPrice =document.querySelector(".cart1-icon span")	
	cartTotalA.innerHTML=totalC.toLocaleString('de-DE')
	cartPrice.innerHTML=totalB.toLocaleString('de-DE')
	
	if(cartPrice.innerHTML<1000000){
		alert("tài khoản của bạn hiện còn dưới 1.000.000VNĐ! Vui lòng nạp thêm tiền vào tài khoản!");
	}
	
	deleteCart()
	inputChange()
}

function deleteCart(){
	var cartItem=document.querySelectorAll("tbody tr")
	for(var i=0;i<cartItem.length;i++){
		var productT=document.querySelectorAll(".cart-delete")
		productT[i].addEventListener("click",function(event){
			var cartDelete=event.target
			var cartitemR=cartDelete.parentElement.parentElement
			cartitemR.remove()
			carttotal()
		})
	}
}
function inputChange(){
	var cartItem=document.querySelectorAll("tbody tr")
	for(var i=0;i<cartItem.length;i++){ 
		var inputValue=cartItem[i].querySelector("input")
		inputValue.addEventListener("change",function(){
			carttotal()
		})
	}
}
const cartbtn = document.querySelector(".fa-times")
const cartshow = document.querySelector(".fa-shopping-cart")
cartshow.addEventListener("click", function () {
		document.querySelector(".cart1").style.right = "0"
		
})
cartbtn.addEventListener("click", function () {
		document.querySelector(".cart1").style.right = "-100%"
})
	
//----------Search items function----------//
function searchItems() {
	const searchText = document.querySelector(".search-input-field").value
	const storeItems = document.querySelector(".container")
	const products = storeItems.querySelectorAll(".box")
	const pName = storeItems.querySelectorAll("h4")

	let count = 0;
	for(var i = 0; i < pName.length; i++) {
			if(pName[i].innerText.toUpperCase().indexOf(searchText.toUpperCase()) > -1) {
				products[i].style.display = ""
				count++
			} else {
				products[i].style.display = "none"
			}
			
			if(i + 1 == pName.length && count == 0) {
				storeItems.innerHTML = "Không tìm thấy sản phẩm!"
			}
	}
}
// Lắng nghe sự kiện keypress trên ô nhập liệu
document.querySelector(".search-input-field").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        searchItems(); // Gọi hàm searchItems() khi nhấn phím Enter
    }
});


//----------Trang thanh toán----------//

//Lấy các item trong giỏ hàng lưu vào 1 mảng
var itemsInCart = []
function saveItemsInCart() {
	const storeItems = document.querySelector(".cart1 table tbody")
	const products = storeItems.querySelectorAll("tr")

	for(var i = 0; i < products.length; i++) {
		var pName = products[i].querySelector("td").innerText
		var imgSrc = products[i].querySelector("td img").src
		var pPrice = products[i].querySelector("td span").innerText
		var pQuanity = products[i].querySelector("input").value

		var product = {
			pName : pName,
			imgSrc : imgSrc,
			pPrice : pPrice,
			pQuanity : pQuanity
		}
		itemsInCart.push(product)
	}
	localStorage.setItem('itemsInCart', JSON.stringify(itemsInCart))
}
//Hiện các item tại trang thanh toán
function displayCartItems() {
	var storedItems = JSON.parse(localStorage.getItem('itemsInCart'))
	const storeItems = document.querySelector(".cart table tbody")
	for(var i = 0; i < storedItems.length; i++) {
		var item = document.createElement("tr")
		var itemContent = '<tr><td style="display: flex;align-items: center"> <img width="70px" src="'+storedItems[i].imgSrc+'" alt="">'+storedItems[i].pName+'</td><td><p><span>'+storedItems[i].pPrice+'</span><sup>đ</sup></p></td><td><input style="width:30px ;cursor: pointer"type="number" value="'+storedItems[i].pQuanity+'" min="'+storedItems[i].pQuanity+'" max="'+storedItems[i].pQuanity+'"></td><td style="cursor: pointer"><span class="cart-delete">Đã chọn</span></td></tr>'
		item.innerHTML = itemContent
		storeItems.append(item)
	}
	
}
//Hàm khi nhấn nút thanh toán
function validateShippingForm() {
	var totalPrice = document.querySelector(".price-total span").innerText
	if(totalPrice == 0)
		alert("Giỏ hàng rỗng!")
	else 
		alert("Thanh toán thành công!")
}



//Dang nhap moi hien tien

if(JSON.parse(localStorage.getItem('loginStatus')) != 1) {
	document.querySelector(".cart1-icon").innerHTML = '<p><i class="fas fa-shopping-cart"></i></p>'
} 


//Dang xuat
var logOutBtn = document.querySelector('.bx-log-out')
logOutBtn.addEventListener("click", function(event) {
	if(JSON.parse(localStorage.getItem('loginStatus')) != 0) {
		var loginStatus = 0;
		localStorage.setItem('loginStatus', JSON.stringify(loginStatus))
	} 
})


