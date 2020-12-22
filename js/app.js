const itemInput = document.querySelector(".shopItem");
const itemAmount = document.querySelector(".itemAmount");
;
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
console.log(items);
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
    listType.innerHTML = "";
	
   
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
        removeButton.className = "removeButton btn btn-primary";
        removeButton.type = "button";
        removeButton.value = "Usuń";
        removeButton.dataset.id = i;
		removeButton.dataset.category = a;
        removeButton.addEventListener("click", deleteItem);
        row.appendChild(removeButton);
		
		editButton = document.createElement("input");
        editButton.className = "editButton btn btn-primary";
        editButton.type = "button";
        editButton.value = "Edycja";
        editButton.dataset.id = i;
		editButton.dataset.category = a;
        editButton.addEventListener("click", editItem);
        row.appendChild(editButton);
		}
    }
	countItems();
	productsAmount.innerHTML  = "<h4>Liczba pozycji: " + products + " Ilość produktów: "+ amount  + " Waga produktów: " + weight + "gram </h4>";
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
	
		id=document.getElementById ("item" + this.dataset.id);
		inputName = document.createElement("input");
        inputName.className = "editNameInput form-control";
        inputName.type = "text";
		inputName.value= items[datasetId].name;
		id.appendChild(inputName);
		
		inputAmount = document.createElement("input");
        inputAmount.className = "editAmountInput form-control";
        inputAmount.type = "number";
		inputAmount.value= items[datasetId].amount;
		inputAmount.min=1;
		id.appendChild(inputAmount);
		
		button = document.createElement("input");
        button.className = "confirmEdit btn btn-primary";
        button.type = "button";
		button.value="Potwierdź";
		button.addEventListener("click", confirmButton);
		id.appendChild(button);
		
		
		var cells = document.getElementsByClassName("editButton"); 
		for (var i = 0; i < cells.length; i++) { 
			cells[i].disabled = true;
		}
		
		function confirmButton(){
			// inputName = document.getElementById("editNameInput");
			// inputAmount= document.getElementById("editAmountInput");
			
			items[datasetId].name = inputName.value;
			items[datasetId].amount = inputAmount.value;
			
			var buttons = document.getElementsByClassName("editButton"); 
			for (var i = 0; i < buttons.length; i++) { 
				buttons[i].disabled = false;
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
	weight=0;
	amount=0;
	console.log("dziala1")
	for(i=0;i<items.length;i++){
		if(items[i].type=="sztuk"){
			console.log(parseInt(items[i].amount))
			amount+= parseInt(items[i].amount);
		}
		else if(items[i].type=="gram"){
			weight+= parseInt(items[i].amount);
			console.log("grams"+ parseInt(items[i].amount))
		}
	}
}

    