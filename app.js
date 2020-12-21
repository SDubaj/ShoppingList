const itemInput = document.querySelector(".shopItem");
const itemAmount = document.querySelector(".itemAmount");
const itemFood = document.querySelector(".aa");
const itemCategory = document.getElementById("category");
const addButton = document.querySelector(".addingButton");
const vegeList = document.querySelector(".items-vegetables");
const fruitsList = document.querySelector(".items-fruits");
var items= [];

var nodeList = document.getElementsByTagName("LI");
var i;
for (i=0; i < nodeList.length; i++){
    var span = document.createElement("SPAN");
    var txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    nodeList[i].appendChild(span);
}
var close = document.getElementsByClassName("close");
var i;
for (i = 0; i < close.length; i++) {
  close[i].onclick = function() {
    var div = this.parentElement;
    div.style.display = "none";
  }
}

function add(list){
    //const addButton = document.querySelector(".addingButton");
    items.push({
                name:itemInput.value,
                amount:itemAmount.value,
                type: itemFood.value,
                category:itemCategory.value,
                checked:false
            })
    // var w= itemInput + " " + itemAmount;
    // var li = document.createElement("li");
    // var rule = document.createTextNode(w);
    // li.appendChild(rule);
    // document.querySelector(".List").appendChild(li);
    console.log(items);
    showList();

    



}

function showList(){
    let row, name;
    vegeList.innerHTML = "";
   
    for (var i=0; i<items.length; i++){
       row = document.createElement("div");
       row.className = "item";
       vegeList.appendChild(row);
       
       // (C2) ITEM NAME
       name = document.createElement("div");
       name.className = "itemName";
       name.innerHTML = "Produkt: " + items[i].name + " Ilość: "  + items[i].amount + " " + items[i].type
       + " Kategoria:" +items[i].category;
       if (items[i].checked) {
         name.classList.add("item-got");
       }
       row.appendChild(name)

       // var removeBtn = document.createElement("input");
       // removeBtn.type = "button";
       // removeBtn.value = "Remove";
       // removeBtn.onclick = remove;
       // row.appendChild(removeBtn);
       //document.getElementById("vegeList").appendChild(cat);

       delbtn = document.createElement("input");
        delbtn.className = "item-del";
        delbtn.type = "button";
        delbtn.value = "Delete";
        delbtn.dataset.id = i;
        delbtn.addEventListener("click", deleteItem);
        row.appendChild(delbtn);

    }
    //deleteButton();
}

function remove(e) {
    var el = e.target;
    el.parentNode.remove();
  }

function deleteItem(){
    
      // items.splice(2, 1);   
      // show();
    // console.log("Delete Task...");
	// 	//Remove the parent list item from the ul
  	// var listItem = this.parentNode;
  	// var ul = listItem.parentNode;
  
  	// ul.removeChild(listItem);
		items.splice(this.dataset.id, 1); 
      showList();
    
}

function deleteButton(){
    var i;
    for (i=0; i < nodeList.length; i++){
    var span = document.createElement("SPAN");
    var txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    nodeList[i].appendChild(span);
    }
    
  
}

    