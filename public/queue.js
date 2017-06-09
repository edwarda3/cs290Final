var closeButtons = document.querySelectorAll('.closeButton');
closeButtons.forEach(function (button){
	button.addEventListener('click', removeFromQueue);	
});

function removeFromQueue(event){
	var orderNum = { number: event.target.parentNode.childNodes[1].textContent.slice(7) };
	sendRemoveReq(orderNum);
	event.target.parentNode.remove();
}

function sendRemoveReq(orderNum){
	var removeRequest = new XMLHttpRequest();
	var url = 'queue/clearOrder';
	removeRequest.open('POST', url);
	removeRequest.setRequestHeader('Content-Type','application/json');
	removeRequest.send(JSON.stringify(orderNum));
}