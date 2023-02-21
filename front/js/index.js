//récupération des données
 function data(){
  fetch("http://localhost:3000/api/products")
  .then((res) => res.json())
  .then((productData) => {
    console.table(productData);
     //nom des données
  useData(productData);
  })
  //message d'erreur
  .catch((err) => {
    document.querySelector(".titles").innerHTML = "<h2>erreur 404</h2>";
});}
data();

//function pour afficher chaque produits
//-------------------------------------
function useData(productData) {
  
// déclaration de l'endroit ou implanter les produits
let card = document.querySelector("#items");
// boucle pour chaque produits
for(let product of productData)
  // modification pour que id soit afficher dans l'url de la page produit
   card.innerHTML += `<a href="./product.html?id=${product._id}">
   <article>
      <img src="${product.imageUrl}" alt="${product.altTxt}">
      <h3 class="productName">${product.name}</h3>
      <p class="productDescription">${product.description}</p>
    </article>
  </a>`
}

