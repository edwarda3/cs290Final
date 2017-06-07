//fill
var showOrderList = false;
var order = [];
var totalOrderPrice = 0;
var orderList = document.querySelector('.orderList');


// ===== ORDER LOGIC =====//
document.querySelector('.placeOrder').addEventListener('click', function(event){
	placeOrder();
});
var addButtons = document.querySelectorAll('.addToOrder');
addButtons.forEach(function(button){
	button.addEventListener('click', function(event){
		var item = {
			name: button.parentNode.childNodes[5].textContent, //name
			description: button.parentNode.childNodes[7].textContent, //description
			price: parseFloat(button.parentNode.childNodes[3].textContent.substring(1)), //price
			url: button.parentNode.childNodes[1].src //img
		}
		addToOrder(item);
	});
});

function addToOrder(item){
	if(!showOrderList) toggleOrderDisplay();
	order.push(item);
	var newItem = document.createElement('section');
	newItem.classList.add('orderItem');
	var newItemImg = document.createElement('img');
	newItemImg.src = item.url;
	var newItemName = document.createElement('span');
	newItemName.textContent = item.name;
	var newItemPrice = document.createElement('span');
	newItemPrice.textContent = item.price;
	newItem.appendChild(newItemImg); newItem.appendChild(newItemName); newItem.appendChild(newItemPrice);
	console.log(newItem);
	orderList.appendChild(newItem);
	
	updatePlaceOrderButton(item);
}
function updatePlaceOrderButton(item){
	totalOrderPrice+=item.price;
	var placeOrderButton = document.querySelector('.placeOrder');
	if(placeOrderButton.textContent==0) placeOrderButton.textContent= "Place Order";
	else placeOrderButton.textContent = "Place Order ($" + totalOrderPrice + ")";
}

function toggleOrderDisplay (){
	if(showOrderList) orderList.style.transform =  'translate(0, 100px)'; //move down
	else orderList.style.transform = 'translate(0, 0)';
	showOrderList = !showOrderList;
}

function placeOrder (){
	var orderRequest = new XMLHttpRequest();
	var url = '/queue/placeOrder';
	orderRequest.open('POST', url);
	orderRequest.setRequestHeader('Content-Type','application/json');
	
	orderRequest.send(JSON.stringify(order));
}
