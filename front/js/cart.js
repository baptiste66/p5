//récupération local storage
let basket = JSON.parse(localStorage.getItem("product"))


let dataList=[];
//récupère les donner de l'api 
//-------------------
async function data() {
  let dataList = [];
  for (let i = 0; i < basket.length; i++) {
    try {
      let useData = await fetch(`http://localhost:3000/api/products/${basket[i].id}`)
        .then((res) => res.json());
      let productData = {
        name: `${useData.name}`,
        img: `${useData.imageUrl}`,
        alt: `${useData.altTxt}`,
        price: `${useData.price}`,
      };
      dataList.push(productData);
    } catch (err) {
      console.log(`Erreur lors de la récupération des données pour le produit ${basket[i].id}: ${err}`);
      return null;
    }
  }
  return dataList;
}

// fonction affichage des produits dans le panier
//----------------------------------------------------------
async function basketDisplay(){ 
  let basket =JSON.parse(localStorage.getItem("product"))
  
if(basket!=null){
  let dataList=await data()
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
        <img src="${dataList[i].img}" alt="${dataList[i].alt}">
      </div>
      <div class="cart__item__content">
        <div class="cart__item__content__description">
          <h2>Nom : ${dataList[i].name}</h2>
          <p>Couleur : ${basket[i].color}</p>
          <p>Prix : ${dataList[i].price}€</p>
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
if(basket===null || basket==undefined){
  document.querySelector(".cart").innerHTML = "<h2>Votre panier est vide :(</h2>";
}
delete_btn()
totalPrice()
totalQuantityProduct()
editQuantity()
}
basketDisplay();



//bouton supprimer
//----------------------------------------
async function delete_btn () {
  let basket = JSON.parse(localStorage.getItem("product"))
  let garbages = document.querySelectorAll(".deleteItem")
  let notDelete=[];
  garbages.forEach((garbage)=>{
    garbage.addEventListener("click",()=>{
      // nombre de produits
      let totalremove = basket.length;
      // si un seul article, tout supprimer
      if(totalremove == 1){
        localStorage.removeItem("product");
        location.href = "cart.html";
      }
      // si plusieurs articles, garder les produits avec des ID et des couleurs différents de celui sélectionné
      else{
        // filtre les éléments non sélectionnés, les isole et supprime le produit sélectionné
        notDelete = basket.filter((item) => {
          if (
            garbage.dataset.id != item.id ||
            garbage.dataset.color != item.color
          ) {
            return true;
          }
        });
        // enregistre les produits non sélectionnés
        localStorage.setItem("product", JSON.stringify(notDelete));
        // actualise la page avec les nouvelles informations
        location.href = "cart.html";
      }
    });
  });
};


// fonction ajout coût total
//--------------------------------------------------------------
async function totalPrice() {
  //tableaux pour y intégrer les prix + calcul(totalpricetabl)
let totalPriceTabl=[];
let totalPrice=[];
let dataList= await data()
//boucle calcul le prix*quantité de chaque produit
for(i=0;i<basket.length;i++){
  //cherche le prix dans basket
  productPrice=dataList[i].price
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
function editQuantity () {
  let most_btn = document.querySelectorAll(".cart__item")
  //explication foreach
  most_btn.forEach((quant)=>{
    // pour chaque changement de quantiter actualise le prix et quantiter total
    quant.addEventListener("change",(eq)=>{
for(i=0;i<basket.length; i++){
  //si id et couleur du basket identique 
if(basket[i].id === quant.dataset.id &&quant.dataset.color === basket[i].color && eq.target.value>=1 && eq.target.value<=100){
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
    else {errorFirstName.innerHTML="le prénom ne doit pas contenir de nombre et doit contenir plus d'un caractère"
      valueFirstName=null
      form()
    }
  })


  lastname.addEventListener("input",(f)=>{
    if(f.target.value.match(/^[a-záàâäãåçéèêëíìîïñóòôöõúùûüýÿæœ\s-]{1,31}$/i)){
      valueLastName= f.target.value
      errorLastName.innerHTML=""
      form()

    }
    else {errorLastName.innerHTML="le nom ne doit pas contenir de nombre et doit contenir plus d'un caractère"
      valueLastName=null
      form()
    }
  })


    address.addEventListener("input",(g)=>{
      //autorise les nombre
      if(g.target.value.match(/^[a-z0-9áàâäãåçéèêëíìîïñóòôöõúùûüýÿæœ\s-]{1,60}$/i)){
        valueAddress= g.target.value
        errorAdress.innerHTML=""
       form ()
      }
      
      else {
         errorAdress.innerHTML="l'adresse ne doit pas contenir de caractère inexistant ?@+ "
        valueAddress=null
        form()
      }
  })


  city.addEventListener("input",(h)=>{
    if(h.target.value.match(/^[a-záàâäãåçéèêëíìîïñóòôöõúùûüýÿæœ\s-]{1,31}$/i)){
      valueCity= h.target.value
      errorCity.innerHTML=""
      form()
    }
    else { 
      errorCity.innerHTML="la ville ne doit pas contenir de nombre/caractère inexistant ?@+ et doit contenir plus d'un caractère"
      valueCity=null
      form()
    }
  })


  email.addEventListener("input",(i)=>{
    //autorise caractère spéciaux
    if(i.target.value.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i)){
      valueEmail= i.target.value
      errorEmail.innerHTML=""
      form()
    }
    //doit contenir @ et .pays
    else if (!i.target.value.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i)){
      errorEmail.innerHTML="l'adresse email n'existe pas ex: kanap@hotmail.fr"
      valueEmail=null
      form()
    }
    else {
      valueEmail=null
      form()
    }
  })
//--------------------------------------------------------------
// envoie donnée du formulaire dans localstorage et les vérifie

function form() {
  let contact = {
    firstName: null,
    lastName: null,
    address: null,
    city: null,
    email: null
  };
  //si respecte regex apparais pas comme null
  if (valueFirstName !== null ) {
    contact.firstName = document.querySelector("#firstName").value;
  }
  if (valueLastName !== null ) {
 
    contact.lastName = document.querySelector("#lastName").value;
  }
  if (valueAddress !== null ) {
    
    contact.address = document.querySelector("#address").value;
  }
  if (valueCity !== null ) {
    
    contact.city = document.querySelector("#city").value;
  }
  if (valueEmail !== null  ) {
    
    contact.email = document.querySelector("#email").value;
  }
  localStorage.setItem("contact", JSON.stringify(contact));
  console.log(contact);
}

form();

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


//--------------------------------------------------------------
// envoie des donnée aux back end pour récupérer info du produit

//function d'envoie qui dirige a la page confimation
 async function confirmForm(){
  let btnForm = document.querySelector("#order")  
  // info formulaire + id
  let foundContact= basket.find(contact=>contact.firstName!=null && contact.lastName!=null &&
    contact.address!=null && contact.city!=null && contact.email!=null)
    await form();
  
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
    //si les valuers contact ne sont pas nul alors envoyer les donner aux serveur 
 if( order.firstName !== null && order.lastName !== null && order.address !== null 
  && order.city !== null && order.email !== null){
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
  window.location.href = `confirmation.html?commande=${data.orderId}`;
}).catch(function (err) {
  console.log(err);
  alert("erreur");
})

}
//si null alors message d'erreur 
 else{
  e.preventDefault()
alert("veuiller remplir le formulaire")

}
  })
}
confirmForm()



// Réinitialiser tous les champs de texte
function resetForm() {
  const formFields = document.querySelectorAll('.cart__order__form__question input');
  formFields.forEach(field => {
    field.value = '';
  });
  localStorage.removeItem('contact');
}

// si page actualise les champ ce vide 
window.addEventListener('load', resetForm);