//fill
/*
 * This function hides the modal to create a twit and clears any existing
 * values from the input fields whenever any of the modal close actions are
 * taken.
 */
function closeItemDesc(a) {


    var itemDescBackdrop = a.target.parentNode.parentNode.parentNode.previousSibling.previousSibling;
    var createItemDesc = a.target.parentNode.parentNode.parentNode;

    // Hide the modal and its backdrop.
    itemDescBackdrop.classList.add('hidden');
    createItemDesc.classList.add('hidden');


}

function addItemDesc(a) {
    var itemDescBackdrop = a.target.parentNode.parentNode.parentNode.previousSibling.previousSibling;
    var createItemDesc = a.target.parentNode.parentNode.parentNode;

    // Hide the modal and its backdrop.
    itemDescBackdrop.classList.add('hidden');
    createItemDesc.classList.add('hidden');

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


});
