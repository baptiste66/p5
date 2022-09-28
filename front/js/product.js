//récupération de l'id 
//-----------------------------------------------------------
//récupération de l'url + supression de ?_id=
let id= window.location.search.split("?_id=").join("");

//demande id
console.log(id);

//fonction récupération des données
//-----------------------------------------------------------
async function data () {
  await fetch(`http://localhost:3000/api/products/${id}`)
    .then((res) => res.json())
    .then((productData) => {
      console.table(productData);
    //nom des donnée 
    useData=productData;
    })
    //message d'erreur
    .catch((err) => {
      document.querySelector(".item").innerHTML = "<h1>erreur 404</h1>";
  });}

//affichage du produit
//---------------------------------------------------
//déclaration tableaux vide modifier par la fonctions suivantes

//ouverture du tableaux pour le panier
let productBasket ={};
productBasket.id=id
//fonction pour affichage du produit

async function productDisplay () {
//déclaration des constantes pour  implanter les éléments 
const imageAlt = document.querySelector(".item__img");
const title = document.getElementById("title");
const price = document.getElementById("price");
const description = document.getElementById("description");
const colors = document.getElementById("colors");
// récupération du tableau de donner de la fonction data 
  await data();
  //affichage des produits
  imageAlt.innerHTML=`<img src="${useData.imageUrl}" alt="${useData.altTxt}">`;
  title.textContent = `${useData.name}`;
  price.textContent = `${useData.price}`;
  description.textContent = `${useData.description}`;
  //récupération du prix dans le panier
  productBasket.price=`${useData.price}`
  //boucle pour couleurs disponible
  for (let couleur of useData.colors) {
    colors.innerHTML += `<option value="${couleur}">${couleur}</option>` ;
  }
};
productDisplay();


//couleur et quantité dynanimique + ajout à la console 
//----------------------------------------------------
let addColor = document.querySelector("#colors");
let productColor;
  addColor.addEventListener("input", (c) => {
  //isolation du paramètre couleur
  productColor = c.originalTarget.value;
  //récupération de la couleur dans le panier
  productBasket.color=productColor
  //reset si on change la couleur pour recommander
  document.getElementById("addToCart").style.color = "white";
  document.getElementById("addToCart").textContent = "Ajouter au panier";
});

let quantity = document.getElementById("quantity");
let productQuantity;
quantity.addEventListener("input", (q) => {
  productQuantity = q.data;
  productBasket.quantity=productQuantity
  document.getElementById("addToCart").style.color = "white";
  document.getElementById("addToCart").textContent = "Ajouter au panier";
});


// conditions + message d'erreur
//------------------------------------------------------------------------
// déclaration variable
let addProduct= document.getElementById("addToCart");
// condition pour ajouter au panier
addProduct.addEventListener("click", () => {
  //message d'erreur si >ou<100
  if (productQuantity < 1 || productQuantity > 100 ||productQuantity === undefined ){
    alert("veuiller saisir une quantité entre 1 et 100")
  }
  // si couleur pas remplis
  if(productColor === undefined){
    alert("veuiller choisir une couleur")
  }
  // sinon produit ajouter
  else{
    addOtherProduct();
    console.log("produit ajouté");
    addProduct.style.color = "green";
    addProduct.textContent="produit ajouté"
    alert("Votre produit à bien été enregistré")
  }})

//----------------------------------------------
//local storage 
//fonction ajout d'un produit 

function addProductBasket(){
    // variable pour récupérer le product du basket dans localstorage 
    let basket = JSON.parse(localStorage.getItem("product"));
//si panier vide ajoute article dans le panier
    if (basket==null) {
      //ouverture tableaux a modifier
      basket = [];
      basket.push(productBasket)
      //envoie les informations des productBasket dans product
      localStorage.setItem("product",JSON.stringify(basket)); 
    }
  }

//si produit pas vide at aucun id identique pousse le produit dans un nuveaux objet
function classementProduct(){
  let basket = JSON.parse(localStorage.getItem("product"));
  basket.push(productBasket)
  // classe les objet par id et si id identique par quantité 
  basket.sort(function triage(a, b) {
    if (a._id < b._id) return -1;
    if (a._id > b._id) return 1;
    if (a._id = b._id){
      if (a.quantity < b.quantity) return -1;
      if (a.quantity > b.quantity) return 1;
    }
    return 0;
  });
    localStorage.setItem ("product",JSON.stringify(basket));
}



  function addOtherProduct(){
    let basket = JSON.parse(localStorage.getItem("product"));
    //si panier pas nul 
     if (basket!=null){  
      for(let product of basket){
       //cherche dans le basket si id et color identique
        let foundProduct= basket.find(product=>product.id==id && product.color==productBasket.color)
         //et si les id et couleur identique alord additionner la quantiter du produit avec le produit deja existant
        if(foundProduct!=undefined){
          let additionQuantité = parseInt(product.quantity) + parseInt(productQuantity);
          product.quantity = JSON.stringify(additionQuantité);
         return localStorage.product= JSON.stringify(basket);
        } 
        // si différent retourne a la fonction 
        else if (foundProduct==undefined){
          return classementProduct();
          
        }
      }
      
    }
    // si le panier est vide seul cette fonction s'effectuera 
    return addProductBasket();
} 
  

