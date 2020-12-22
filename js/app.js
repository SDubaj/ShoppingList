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
const productsAmount = document.querySelector(".productsAmount");


var items = [];
//read items from localstorage
if (localStorage.items == undefined) { localStorage.items = "[]"; }
items= JSON.parse(localStorage.items);


var products = items.length;
var amount=0,weight=0;
countItems();
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
	itemInput.value="";
	itemAmount.value="";
	itemCategory.value="";
	saveToLS();
    showLists();
}



function showList(listType,a){
    let row, name;
    listType.innerHTML = "";
	
    for (var i=0; i<items.length; i++){
		if(items[i].category === ""){
			items.splice(i,1);
		}
		else if(items[i].category === a){
       row = document.createElement("div");
       row.className = " draggable item item" +i;
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
        removeButton.className = "removeButton btn btn-primary";
        removeButton.type = "button";
		removeButton.id= "non-printable";
        removeButton.value = "Usuń";
        removeButton.dataset.id = i;
		removeButton.dataset.category = a;
        removeButton.addEventListener("click", deleteItem);
        row.appendChild(removeButton);
		
		editButton = document.createElement("input");
        editButton.className = "editButton btn btn-primary";
		editButton.id = "non-printable";
        editButton.type = "button";
        editButton.value = "Edycja";
        editButton.dataset.id = i;
		editButton.dataset.category = a;
        editButton.addEventListener("click", editItem);
        row.appendChild(editButton);
		}
    }
	countItems();
	products = items.length;
	productsAmount.innerHTML  = "<h5>Liczba pozycji: " + products + " Ilość produktów: "+ amount  + " Waga produktów: " + weight + "gram </h5>";
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
		countItems();
		saveToLS();
		showLists();
		
		
}

function editItem(){
		datasetId=this.dataset.id;
		
		//create input to edit product's name
		id=document.getElementById ("item" + this.dataset.id);
		inputName = document.createElement("input");
        inputName.className = "editNameInput form-control";
        inputName.type = "text";
		inputName.value= items[datasetId].name;
		id.appendChild(inputName);
		
		//create input to edit producst's amount
		inputAmount = document.createElement("input");
        inputAmount.className = "editAmountInput form-control";
        inputAmount.type = "number";
		inputAmount.value= items[datasetId].amount;
		inputAmount.min=1;
		id.appendChild(inputAmount);
		
		//array of categories
		var categories = ["Warzywa","Owoce","Nabiał","Pieczywo","Artykuły higieniczne"];
		//create select
		selectList = document.createElement("select");
		selectList.id = "editCategory";
		selectList.className= "form-control";
		id.appendChild(selectList);
		
		//create first option (disabled, selected)
		option = document.createElement("option");
		option.value = "";
		option.text = "Wybierz Kategorie";
		option.disabled=true;
		option.selected=true;
		selectList.appendChild(option);
			
		//create and append rest of options
		for (var i = 0; i < categories.length; i++) {
			 option = document.createElement("option");
			option.value = categories[i];
			option.text = categories[i];
			selectList.appendChild(option);
		}
		
		//create button to confirm editing
		button = document.createElement("input");
        button.className = "confirmEdit btn btn-primary";
        button.type = "button";
		button.value="Potwierdź";
		button.addEventListener("click", confirmButton);
		id.appendChild(button);
		
		//disable all edit buttons until editing will be done
		var cells = document.getElementsByClassName("editButton"); 
		for (var i = 0; i < cells.length; i++) { 
			cells[i].disabled = true;
		}
		//confirm editing function
		function confirmButton(){
			items[datasetId].name = inputName.value;
			items[datasetId].amount = inputAmount.value;
			items[datasetId].category = selectList.value;
			//switch on edit buttons
			var buttons = document.getElementsByClassName("editButton"); 
			for (var i = 0; i < buttons.length; i++) { 
				buttons[i].disabled = false;
			}
			saveToLS();
			showLists();
		}
}

//save to localStorage
function saveToLS(){
    if (localStorage.items == undefined) { 
	localStorage.items = "[]"; 
	}
    localStorage.items = JSON.stringify(items);
}
//couting products
function countItems(){
	var i;
	weight=0;
	amount=0;
	for(i=0;i<items.length;i++){
		if(items[i].type=="sztuk"){
			amount+= parseInt(items[i].amount);
		}
		else if(items[i].type=="gram"){
			weight+= parseInt(items[i].amount);
		}
		else if(items[i].type==""){
			items.splice(i,1);
		}
	}
}

//print function
function printDiv(divName) {
     var printList = document.getElementById(divName).innerHTML;
     var originalContent = document.body.innerHTML;
	 
     document.body.innerHTML = printList;
     window.print();
     document.body.innerHTML = originalContent;
	 
}
//convert to pdf and download list
function toPDF(){
	var hideButtonsRemove = document.getElementsByClassName('removeButton');
	var hideButtonsEdit = document.getElementsByClassName('editButton');
	for (var i = 0; i < hideButtonsEdit.length; i++) { 
				hideButtonsRemove[i].style.display = "none";
				hideButtonsEdit[i].style.display = "none";
			}
	var element = document.getElementById('printableArea');
	html2pdf(element);
	timer();
	
	function timer() {
	  setTimeout(showButtons, 3000);
	}
	function showButtons(){
		for (var i = 0; i < hideButtonsEdit.length; i++) { 
				hideButtonsRemove[i].style.display = "inline-block";
				hideButtonsEdit[i].style.display = "inline-block";
			}
	}
}


//drag and drop
function dragStart(e) {
  this.style.opacity = '0.8';
  dragSrcEl = this;
  e.dataTransfer.effectAllowed = 'move';
  e.dataTransfer.setData('text/html', this.innerHTML);
};

function dragEnter(e) {
  this.classList.add('over');
}

function dragLeave(e) {
  e.stopPropagation();
  this.classList.remove('over');
}

function dragOver(e) {
  e.preventDefault();
  e.dataTransfer.dropEffect = 'move';
  return false;
}

function dragDrop(e) {
  if (dragSrcEl != this) {
    dragSrcEl.innerHTML = this.innerHTML;
    this.innerHTML = e.dataTransfer.getData('text/html');
  }
  return false;
}

function dragEnd(e) {
  var listItens = document.querySelectorAll('.draggable');
  [].forEach.call(listItens, function(item) {
    item.classList.remove('over');
  });
  this.style.opacity = '1';
}

function addEventsDragAndDrop(el) {
  el.addEventListener('dragstart', dragStart, false);
  el.addEventListener('dragenter', dragEnter, false);
  el.addEventListener('dragover', dragOver, false);
  el.addEventListener('dragleave', dragLeave, false);
  el.addEventListener('drop', dragDrop, false);
  el.addEventListener('dragend', dragEnd, false);
}

var listItens = document.querySelectorAll('.draggable');
[].forEach.call(listItens, function(item) {
  addEventsDragAndDrop(item);
});

    