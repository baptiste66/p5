//------------------------------------------------------------
// fonction affichage numéro de commande et delete donner
  displayOrderIdAndPrice();

function displayOrderIdAndPrice() {
//récupération de l'id
let orderId=document.querySelector("#orderId")
orderId.textContent=localStorage.getItem("orderId");
  clear()
}

//reset
function clear(){
  localStorage.clear(); 
}