// récupération donnée du localstorage 
let basket =JSON.parse(localStorage.getItem("product"))
console.table(basket)


//----------------------------------------------------------
// fonction affichage des produits dans le panier
async function basketDisplay(){ 
  let basket =JSON.parse(localStorage.getItem("product"))
if(basket!=null){
  let productPosition=document.querySelector("#cart__items")
  productDisplay=[]
  // tant que i n'as pas le même nombre que le nombre de produit dans le panier continuer la boucle
  for (i=0;i<basket.length;i++) {
      productDisplay = 
      //reprise des produits de l'ancienne boucle + nouvelle boucle
      productDisplay +
      // copie de cart.html
      `<article class="cart__item" data-id="${basket[i].id}" data-color="${basket[i].color}">
      <div class="cart__item__img">
        <img src="${basket[i].image}" alt="${basket[i].alt}">
      </div>
      <div class="cart__item__content">
        <div class="cart__item__content__description">
          <h2>Nom : ${basket[i].name}</h2>
          <p>Couleur : ${basket[i].color}</p>
          <p>Prix : ${basket[i].price}€</p>
        </div>
        <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                      <p>Qté :</p>
                      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${basket[i].quantity}">
                    </div>
                    <div class="cart__item__content__settings__delete">
                      <p class="deleteItem"data-id="${basket[i].id}" data-color="${basket[i].color}">Supprimer</p>
                    </div>
                  </div>
                </div>
              </article>`
    }
    // quand la boucle est finis affichage des produit
  if(i==basket.length){
      productPosition.innerHTML=productDisplay
    }
}
//si produit vide message error
if (basket===null){
  document.querySelector(".cart").innerHTML = "<h1>Votre panier est vide :(</h1>";
}
}
basketDisplay();


//----------------------------------------
//bouton supprimer
async function delete_btn (basketDisplay) {
  await basketDisplay;
  // 2 variable en une pour récupérer id et couleur du produit
  let basket =JSON.parse(localStorage.getItem("product"))
 let garbages = document.querySelectorAll(".deleteItem")
 let notDelete=[]

   garbages.forEach((garbage)=>{
    garbage.addEventListener("click",()=>{
      console.log(garbage)
      // nombre de produit
      let totalremove=basket.length
      //si un seul article tous supprimer
      if(totalremove==1){
        return (localStorage.removeItem("product"))
      }
      //si plusieur supprimer garder les produit avec id et couleur différent 
      else{
        //filtre les élément non sélectionner les isole et supprimme le produit sélectionner
        notDelete = basket.filter((basket) => {
          if (
            garbage.dataset.id != basket.id ||
            garbage.dataset.color != basket.color
          ) {
            return true;
          }
        });
        //enregistre les produit non sélectionner
        localStorage.setItem("product", JSON.stringify(notDelete));
        //actualise la page avec information
        totalPrice();
        totalQuantityProduct()
        location.href = "cart.html";
      }
    });
  });
  return;
};
delete_btn()


//--------------------------------------------------------------
// fonction ajout coût total
function totalPrice() {
  //tableaux pour y intégrer les prix + calcul(totalpricetabl)
let totalPriceTabl=[];
let totalPrice=[];
//boucle calcul le prix*quantité de chaque produit
for(i=0;i<basket.length;i++){
  //cherche le prix dans basket
  productPrice=basket[i].price
  productQuantity=basket[i].quantity
  //calcul du prix total de chaque produit
  totalPriceMath= productPrice*productQuantity
  //on stock les résultat dans le tableaux réserver pour les calculs
  totalPriceTabl.push(totalPriceMath)
} 
//permet d'additionner tous les nombre stocker dans totalpricetabl
let reducer=( accumulator , currentValue) => accumulator+currentValue
totalPrice= totalPriceTabl.reduce(reducer,0)
  document.getElementById("totalPrice").textContent = totalPrice;
}
 totalPrice();


//--------------------------------------------------------------
// fonction nombre d'article total
function totalQuantityProduct(){
let totalQuantity=[];

//boucle calcul le prix*quantité de chaque produit
for(m=0;m<basket.length;m++){
  productQuantity=basket[m].quantity
  totalQuantityMath=productQuantity*1
  totalQuantity.push(totalQuantityMath)
} 
let reducer=( accumulator , currentValue) => accumulator+currentValue
 total= totalQuantity.reduce(reducer)
 document.getElementById("totalQuantity").textContent = total;
}
totalQuantityProduct();



//--------------------------------------------------------------
// fonction changer quantité dans le panier 
async function editQuantity (basketDisplay) {
  await basketDisplay;
 
  let most_btn = document.querySelectorAll(".cart__item")
  //explication foreach
  most_btn.forEach((quant)=>{
    // pour chaque changement de quantiter actualise le prix et quantiter total
    quant.addEventListener("change",(eq)=>{
for(i=0;i<basket.length; i++){
  //si id et couleur du basket identique 
if(basket[i].id === quant.dataset.id &&quant.dataset.color === basket[i].color){
   // quantité basket identique au changement effectuer dans le panier
    basket[i].quantity= eq.target.value,
    localStorage.setItem("product",JSON.stringify(basket)),
    // actualise la quantiter et prix total
    totalQuantityProduct()
    totalPrice()
}
 }
    })
})
  }
editQuantity()