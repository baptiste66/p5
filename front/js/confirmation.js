//------------------------------------------------------------
// fonction affichage numéro de commande et delete donner

main();

function main() {
  displayOrderIdAndPrice();
}

function displayOrderIdAndPrice() {
    //récupération de l'id
    
let orderId=document.querySelector("#orderId")
orderId.textContent=localStorage.getItem("orderId");
  clear()
}
function clear(){
  localStorage.clear(); 
}