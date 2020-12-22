const itemInput = document.querySelector(".shopItem");
const itemAmount = document.querySelector(".itemAmount");
const itemCategory = document.getElementById("category");
const addButton = document.querySelector(".addingButton");
//shopping lists
const vegeList = document.querySelector(".vegeItems");
const fruitsList = document.querySelector(".fruitsItems");
const dairyList =document.querySelector(".dairyItems");
const bakeryList =document.querySelector(".bakeryItems");
const hygenicsList =document.querySelector(".hygenicItems");

var items = [];


//load items from localstorage
if (localStorage.items == undefined) { localStorage.items = "[]"; }
items= JSON.parse(localStorage.items);

var products = items.length;
var amount,weight;
countItems()

console.log("amount"+ items);
showLists();

function addItem(){
	var itemType = document.querySelector('input[name="food"]:checked')

    items.push({
		name:itemInput.value,
		amount:itemAmount.value,
		type: itemType.value,
		category:itemCategory.value,
		checked:false
    })
	saveToLS();
    showLists();
}

function showList(listType,a){
    let row, name;
    listType.innerHTML = ""
   
    for (var i=0; i<items.length; i++){
		if(items[i].category === a){
       row = document.createElement("div");
       row.className = "item item" +i;
	   row.id = "item" +i;
	   row.draggable="true";
       listType.appendChild(row);
  
       itemName = document.createElement("div");
       itemName.className = "itemName";
       itemName.innerHTML = "Produkt: " + items[i].name + "<br> Ilość: " 
	   + items[i].amount + " " + items[i].type;
       if (items[i].checked) {
         itemName.classList.add("item-got");
       }
       row.appendChild(itemName)
	   
       removeButton = document.createElement("input");
        removeButton.className = "removeButton";
        removeButton.type = "button";
        removeButton.value = "Usuń";
        removeButton.dataset.id = i;
		removeButton.dataset.category = a;
        removeButton.addEventListener("click", deleteItem);
        row.appendChild(removeButton);
		
		editButton = document.createElement("input");
        editButton.className = "editButton";
        editButton.type = "button";
        editButton.value = "Edycja";
        editButton.dataset.id = i;
		editButton.dataset.category = a;
        editButton.addEventListener("click", editItem);
        row.appendChild(editButton);
		}
    }
	saveToLS();
}

function showLists(){
	showList(vegeList, "Warzywa");
	showList(fruitsList, "Owoce");
	showList(dairyList, "Nabiał");
	showList(bakeryList, "Pieczywo");
	showList(hygenicsList,"Artykuły higieniczne");

}
function deleteItem(){	
		items.splice(this.dataset.id, 1); 
		showLists();
}

function editItem(){
	datasetId=this.dataset.id;
	
		id=document.getElementById ("item" + this.dataset.id);
		inputName = document.createElement("input");
        inputName.id = "editNameInput";
        inputName.type = "text";
		inputName.value= items[datasetId].name;
		id.appendChild(inputName);
		inputAmount = document.createElement("input");
        inputAmount.id = "editAmountInput";
        inputAmount.type = "number";
		inputAmount.value= items[datasetId].amount;
		inputAmount.min=1;
		id.appendChild(inputAmount);
		
		button = document.createElement("input");
        button.className = "confirmEdit";
        button.type = "button";
		button.value="Potwierdź";
		button.addEventListener("click", confirmButton);
		id.appendChild(button);
		editButton = document.getElementsByClassName('editButton');
		editButton.className= "ss";
		
		var cells = document.getElementsByClassName("editButton"); 
		for (var i = 0; i < cells.length; i++) { 
			cells[i].disabled = true;
		}
		
		function confirmButton(){
			// inputName = document.getElementById("editNameInput");
			// inputAmount= document.getElementById("editAmountInput");
			
			items[datasetId].name = inputName.value;
			items[datasetId].amount = inputAmount.value;
			
			var cells = document.getElementsByClassName("editButton"); 
			for (var i = 0; i < cells.length; i++) { 
				cells[i].disabled = false;
			}
			
			saveToLS();
			showLists();
		}
}

function saveToLS(){
    if (localStorage.items == undefined) { 
	localStorage.items = "[]"; 
	}
    localStorage.items = JSON.stringify(items);
}

function countItems(){
	var i;
	for(i=0;i<items.length;i++){
		if(items[i].type=="sztuk"){
			amount+=items[i].amount;
		}
	}
}


// var dragSrcEl = null;

// function handleDragStart(e) {
  // // Target (this) element is the source node.
  // dragSrcEl = this;

  // e.dataTransfer.effectAllowed = 'move';
  // e.dataTransfer.setData('text/html', this.outerHTML);

  // this.classList.add('dragElem');
// }
// function handleDragOver(e) {
  // if (e.preventDefault) {
    // e.preventDefault(); // Necessary. Allows us to drop.
  // }
  // this.classList.add('over');

  // e.dataTransfer.dropEffect = 'move';  // See the section on the DataTransfer object.

  // return false;
// }

// function handleDragEnter(e) {
  // // this / e.target is the current hover target.
// }

// function handleDragLeave(e) {
  // this.classList.remove('over');  // this / e.target is previous target element.
// }

// function handleDrop(e) {
  // // this/e.target is current target element.

  // if (e.stopPropagation) {
    // e.stopPropagation(); // Stops some browsers from redirecting.
  // }

  // // Don't do anything if dropping the same column we're dragging.
  // if (dragSrcEl != this) {
    // // Set the source column's HTML to the HTML of the column we dropped on.
    // //alert(this.outerHTML);
    // //dragSrcEl.innerHTML = this.innerHTML;
    // //this.innerHTML = e.dataTransfer.getData('text/html');
    // this.parentNode.removeChild(dragSrcEl);
    // var dropHTML = e.dataTransfer.getData('text/html');
    // this.insertAdjacentHTML('beforebegin',dropHTML);
    // var dropElem = this.previousSibling;
    // addDnDHandlers(dropElem);
    
  // }
  // this.classList.remove('over');
  // return false;
// }

// function handleDragEnd(e) {
  // // this/e.target is the source node.
  // this.classList.remove('over');

  // /*[].forEach.call(cols, function (col) {
    // col.classList.remove('over');
  // });*/
// }

// function addDnDHandlers(elem) {
  // elem.addEventListener('dragstart', handleDragStart, false);
  // elem.addEventListener('dragenter', handleDragEnter, false)
  // elem.addEventListener('dragover', handleDragOver, false);
  // elem.addEventListener('dragleave', handleDragLeave, false);
  // elem.addEventListener('drop', handleDrop, false);
  // elem.addEventListener('dragend', handleDragEnd, false);

// }

// var cols = document.querySelectorAll('#columns .column');
// [].forEach.call(cols, addDnDHandlers);

    