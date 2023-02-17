// récupération donnée du localstorage 
let basket =JSON.parse(localStorage.getItem("product"))
console.table(basket)

// fonction affichage des produits dans le panier
//----------------------------------------------------------
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

//bouton supprimer
//----------------------------------------
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
       (localStorage.removeItem("product"))
        location.href = "cart.html";
      }
      //si plusieur garder les produit avec id et couleur différent de celui sélectionner
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

// fonction ajout coût total
//--------------------------------------------------------------
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

// fonction nombre d'article total
//--------------------------------------------------------------
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


// fonction changer quantité dans le panier 
//--------------------------------------------------------------
async function editQuantity () {
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


//--------------------------------------------------------------
// regex du formulaire

  //variable formulaire
  let firstname=document.querySelector("#firstName")
  let lastname=document.querySelector("#lastName")
  let address=document.querySelector("#address")
  let city =document.querySelector("#city")
  let email =document.querySelector("#email")
  //variable error
  let errorFirstName=document.querySelector("#firstNameErrorMsg")
  let errorLastName=document.querySelector("#lastNameErrorMsg")
  let errorAdress = document.querySelector("#addressErrorMsg")
  let errorCity = document.querySelector("#cityErrorMsg")
  let errorEmail= document.querySelector("#emailErrorMsg")
  //variable valeur
  let valueAddress, valueCity, valueEmail, valueFirstName, valueLastName
  
  //condition du fomulaire
  firstname.addEventListener("input",(e)=>{
    //autorise - et ^à 
    if(e.target.value.match(/^[a-záàâäãåçéèêëíìîïñóòôöõúùûüýÿæœ\s-]{1,31}$/i)){
      valueFirstName= e.target.value
      errorFirstName.innerHTML=""
      //fonction actualise le formulaire en tant réel
      form()
    }
    //pas de nombre ou caractère spéciaux et limite de 1 à 31
    else if(!e.target.value.match(/^[a-záàâäãåçéèêëíìîïñóòôöõúùûüýÿæœ\s-]{1,31}$/i)){
      errorFirstName.innerHTML="le prénom ne doit pas contenir de nombre et doit contenir plus d'un caractère"
      valueFirstName=null
    }
  })


  lastname.addEventListener("input",(f)=>{
    if(f.target.value.match(/^[a-záàâäãåçéèêëíìîïñóòôöõúùûüýÿæœ\s-]{1,31}$/i)){
      valueLastName= f.target.value
      errorLastName.innerHTML=""
      form()

    }
    else if(!f.target.value.match(/^[a-záàâäãåçéèêëíìîïñóòôöõúùûüýÿæœ\s-]{1,31}$/i)){
      errorLastName.innerHTML="le nom ne doit pas contenir de nombre et doit contenir plus d'un caractère"
      valueLastName=null
    }
  })


    address.addEventListener("input",(g)=>{
      //autorise les nombre
      if(g.target.value.match(/^[a-z0-9áàâäãåçéèêëíìîïñóòôöõúùûüýÿæœ\s-]{1,60}$/i)){
        valueAddress= g.target.value
        errorAdress.innerHTML=""
        form()
      }
      else if(!g.target.value.match(/^[a-z0-9áàâäãåçéèêëíìîïñóòôöõúùûüýÿæœ\s-]{1,60}$/i)){
        errorAdress.innerHTML="l'adresse ne doit pas contenir de caractère inexistant ?@+ "
       valueAddress=null 
      }
  })


  city.addEventListener("input",(h)=>{
    if(h.target.value.match(/^[a-záàâäãåçéèêëíìîïñóòôöõúùûüýÿæœ\s-]{1,31}$/i)){
      valueCity= h.target.value
      errorCity.innerHTML=""
      form()
    }
    else if(!h.target.value.match(/^[a-záàâäãåçéèêëíìîïñóòôöõúùûüýÿæœ\s-]{1,31}$/i)){
      errorCity.innerHTML="la ville ne doit pas contenir de nombre/caractère inexistant ?@+ et doit contenir plus d'un caractère"
      valueCity=null
    }
  })


  email.addEventListener("input",(i)=>{
    //autorise caractère spéciaux
    if(i.target.value.match(/^[a-z0-9æœ.!#$%&’*+/=?^_`{|}~"(),:;<>@[\]-]{1,60}$/i)){
      valueEmail= i.target.value
      errorEmail.innerHTML=""
    
    }
    if(i.target.value.match(/^[a-zA-Z0-9æœ.!#$%&’*+/=?^_`{|}~"(),:;<>@[\]-]+@([\w-]+\.)+[\w-]{2,4}$/i)){
      valueEmail= i.target.value
      errorEmail.innerHTML=""
      form()
    }
    //doit contenir @ et .pays
    else if (!i.target.value.match(/^[a-zA-Z0-9æœ.!#$%&’*+/=?^_`{|}~"(),:;<>@[\]-]+@([\w-]+\.)+[\w-]{2,4}$/i)){
      errorEmail.innerHTML="l'adresse email n'existe pas ex: kanap@hotmail.fr"
      valueEmail=null
    }
  })

  //--------------------------------------------------------------
 // envoie donnée du formulaire dans localstorage
 function form(){
  let contact={
    firstName: document.querySelector("#firstName").value,
      lastName: document.querySelector("#lastName").value,
      address: document.querySelector("#address").value,
      city: document.querySelector("#city").value,
      email:document.querySelector("#email").value, 
   }
 localStorage.setItem("contact",JSON.stringify(contact))
 console.log(contact)
}

//--------------------------------------------------------------
// envoie id des produit dans tableaux
let basketId=[]
function basketid(){
  let basket =JSON.parse(localStorage.getItem("product"))
  for (i=0;i<basket.length;i++) {
    basketId.push(basket[i].id);
  }
}
basketid()
// on récupère products
 products=basketId

// envoie des donnée aux back end pour récupérer info du produit
//--------------------------------------------------------------
  //function d'envoie qui dirige a la page confimation
   function confirm(){
    let btnForm = document.querySelector("#order")  
    // info formulaire + id
    let foundContact= basket.find(contact=>contact.firstName!=null && contact.lastName!=null &&
      contact.address!=null && contact.city!=null && contact.email!=null)
    btnForm.addEventListener("click",(e)=>{
      
    let order =JSON.parse(localStorage.getItem("contact"))
let contact={
  firstName:order.firstName,
      lastName:order.lastName,
      address:order.address,
      city:order.city,
      email:order.email,
}
let formBasket={
  contact,
  products
}
      form()
      //si les valuers contact ne sont pas nul alors envoyer les donner aux serveur 
   if(foundContact==undefined){
   e.preventDefault() 
   //envoie des donner au serveur pour récupérer id de commande et information du produit
   fetch("http://localhost:3000/api/products/order", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formBasket),
  })
  //récupération de l'order id
  .then((res) => res.json())
  .then((data) => {
    // numéro de commande dans le local storage 
    localStorage.setItem("orderId", data.orderId)
    //traitement des donnée et envoie vers la page confirmation avec numéro de commande dans l'url
    window.location.href = `/front/html/confirmation.html?commande=${data.orderId}`;
  }).catch(function (err) {
    console.log(err);
    alert("erreur");
  })
}
//si null alors message d'erreur 
   else{
alert("veuiller remplir le formulaire")
  }
    })
  }
  confirm()
  

