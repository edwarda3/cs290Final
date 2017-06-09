var showOrderList = false;
var order = [];
var totalOrderPrice = 0;
var orderList = document.querySelector('.orderList');

//next three functions are for the items added descriptions.
//called when '...' is clicked. Reveals added description of an item
function showItemDesc(a) {

    //a.target is this and next 2 functions refers to the button being pressed
    var itemDescBackdrop = a.target.nextSibling.nextSibling;
    var createItemDesc = a.target.nextSibling.nextSibling.nextSibling.nextSibling;

    // Show the ItemDesc and its backdrop.
    itemDescBackdrop.classList.remove('hidden');
    createItemDesc.classList.remove('hidden');

}

//called when 'close' or the x are clicked on the added item description. Closes the added description.
function closeItemDesc(a) {


    var itemDescBackdrop = a.target.parentNode.parentNode.parentNode.previousSibling.previousSibling;
    var createItemDesc = a.target.parentNode.parentNode.parentNode;

    // Hide the ItemDesc and its backdrop.
    itemDescBackdrop.classList.add('hidden');
    createItemDesc.classList.add('hidden');


}

//called when 'add item' is clicked on the added item description. closes added description and adds item to the order.
function addItemDesc(a) {
    var itemDescBackdrop = a.target.parentNode.parentNode.parentNode.previousSibling.previousSibling;
    var createItemDesc = a.target.parentNode.parentNode.parentNode;

    // Hide the ItemDesc and its backdrop.
    itemDescBackdrop.classList.add('hidden');
    createItemDesc.classList.add('hidden');

    //menu item = <section class="menuItem"> line in menuItem.handlebars file
    var menuItem = a.target.parentNode.parentNode.parentNode.parentNode;
    //gets item data and adds to order
    var item = {
        name: menuItem.childNodes[5].textContent, //name
        description: menuItem.childNodes[7].textContent, //description
        price: parseFloat(menuItem.childNodes[3].textContent.substring(1)), //price
        url: menuItem.childNodes[1].src //img
    }
    addToOrder(item);

}

window.addEventListener('DOMContentLoaded', function () {


    var createItemDesc = document.querySelectorAll('.create-itemDesc-button');
    for (i = 1; i < createItemDesc.length; i++) {
        createItemDesc[i].addEventListener('click', showItemDesc)
    }

    var itemDescCloseButton = document.querySelectorAll('.create-itemDesc .itemDesc-close-button');
    itemDescCloseButton.forEach(function (button) {
        button.addEventListener('click', closeItemDesc);
    }); 

    var itemDescCancalButton = document.querySelectorAll('.create-itemDesc .itemDesc-cancel-button');
    itemDescCancalButton.forEach(function (button) {
        button.addEventListener('click', closeItemDesc);
    });
  
    var itemDescAcceptButton = document.querySelectorAll('.create-itemDesc .itemDesc-accept-button');
    itemDescAcceptButton.forEach(function (button) {
        button.addEventListener('click', addItemDesc);
    });
    var placeOrderButton = document.querySelector('.placeOrder');
	placeOrderButton.addEventListener('click', placeOrder );
	
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

});

// ===== ORDER LOGIC =====//


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
	var closeButton = document.createElement('button');
	closeButton.textContent = "x";
	closeButton.addEventListener('click',removeFromOrder);
	newItem.appendChild(newItemImg); newItem.appendChild(closeButton); newItem.appendChild(newItemName); newItem.appendChild(newItemPrice); 
	orderList.appendChild(newItem);
	
	updatePlaceOrderButton(item.price, 1);
}
function removeFromOrder(event){
	order.splice(order.indexOf(event.target.parentNode),1);
	updatePlaceOrderButton(event.target.parentNode.childNodes[3].textContent,-1);
	event.target.parentNode.remove();
}
function updatePlaceOrderButton(price, sign){
	totalOrderPrice+=(sign*price);
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

