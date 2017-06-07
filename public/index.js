//fill
var showOrderList = false;

document.querySelector('.site-title').addEventListener('click', function(event){
	toggleOrderDisplay();
});

function toggleOrderDisplay (){
	var orderList = document.querySelector('.orderList');
	if(showOrderList) orderList.style.transform =  'translate(0, 100px)'; //move down
	else orderList.style.transform = 'translate(0, 0)';
	showOrderList = !showOrderList;
}