//récupération de l'id 
//-----------------------------------------------------------
//récupération de l'url + supression de ?_id=
let id= window.location.search.split("?id=").join("");
//demande id
console.log(id);

//fonction récupération des données
//-----------------------------------------------------------
async function data () {
  await fetch(`http://localhost:3000/api/products/${id}`)
    .then((res) => res.json())
    .then((productData) => {
    //nom des donnée 
    useData=productData;
    })
    //message d'erreur
    .catch((err) => {
      document.querySelector(".item").innerHTML = "<h2>erreur 404</h2>";
  });}
data()


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
  imageAlt.innerHTML=`<img src="${useData.imageUrl}" alt="${useData.altTxt}">`;
  title.textContent = `${useData.name}`;
  price.textContent = `${useData.price}`;
  description.textContent = `${useData.description}`;
  //boucle pour couleurs disponible
  for (let color of useData.colors) {
    colors.innerHTML += `<option value="${color}">${color}</option>` ;
  }
};
productDisplay();


//choix couleur et quantité 
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
//remet la valeur 0 quand ont actualise lapage empêche le bug de la quantiter deja selectionner 
quantity.value = 0
quantity.addEventListener("input", (q) => {
  productQuantity =q.data;
  console.log(productQuantity)
  productBasket.quantity=productQuantity
  document.getElementById("addToCart").style.color = "white";
  document.getElementById("addToCart").textContent = "Ajouter au panier";
});



// conditions de la selection du produit + message d'erreur
//------------------------------------------------------------------------

// déclaration variable
let addProduct= document.getElementById("addToCart");
// condition pour ajouter au panier
addProduct.addEventListener("click", () => {
  //message d'erreur si <1ou>100 /pas de couleur 
  if (productQuantity<1 || productQuantity > 100 ||productQuantity === undefined ||
     productColor === undefined||productColor== ""|| productColor==null){
    alert("veuiller saisir une quantité entre 1 et 100 et/ou une couleur")
  }
  // sinon produit ajouter
  else{
    addProductBasket();
    console.log("produit ajouté");
    addProduct.style.color = "green";
    addProduct.textContent="produit ajouté"
    alert("Votre produit à bien été enregistré")
  }})

//local storage
//----------------------------------------------
// fonction si panier vide injecte un premier produit
function addProductBasket(){
  let basket = JSON.parse(localStorage.getItem("product"));
//si panier vide ajoute article dans le panier
if (basket!=null){
  return addOtherProduct()}
  if (basket==null) {
    //ouverture tableaux a modifier
    basket = [];
    basket.push(productBasket)
    //envoie les informations des productBasket dans product
    localStorage.setItem("product",JSON.stringify(basket)); 
  }
}


//si produit deja existant change quantiter + crée nouveaux produit
  function addOtherProduct(){
    // variable pour récupérer le product du basket dans localstorage
   let basket = JSON.parse(localStorage.getItem("product"));
    for(let product of basket){
     //cherche dans le basket si id et color identique
      let foundProduct= basket.find(product=>product.id==id && product.color==productBasket.color)
       //et si les id et couleur identique alors additionner la quantiter du produit avec le produit deja existant
      if(foundProduct!=undefined){
        let additionQuantité = parseInt(product.quantity) + parseInt(productQuantity);
        product.quantity = JSON.stringify(additionQuantité);
       return localStorage.product= JSON.stringify(basket);
      } 
      // si différent crée nouveaux produits
      else if (foundProduct==undefined){
      return classementProduct()
      }
  }
}

//si produit pas vide at aucun id identique pousse le produit dans un nuveaux objet
function classementProduct(){
  let basket = JSON.parse(localStorage.getItem("product"));
  basket.push(productBasket)
  // classe les objet par du même id les un a la suite des autres
  basket.sort(function triage(a, b) {
    if (a.id < b.id) return -1;
    if (a.id > b.id) return 1;
    return 0;
  })
    localStorage.setItem("product",JSON.stringify(basket));
    
}


