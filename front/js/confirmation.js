//------------------------------------------------------------
// fonction affichage numéro de commande et delete donner

main();

function main() {
  displayOrderIdAndPrice();
}

function displayOrderIdAndPrice() {
    //récupération de l'id
  let orderId = JSON.parse(localStorage.getItem("orderId"))
console.log(orderId)
let confirmMess=document.querySelector("#orderId")
confirmMess.innerHTML= orderId
  orderId.innerText = localStorage.getItem("orderId");

  localStorage.clear(); 
}