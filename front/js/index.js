//récupération des données
fetch("http://localhost:3000/api/products")
  .then((res) => res.json())
  .then((produitData) => {
    console.table(produitData);
  //nom des donnée pour pouvoir les utiliser dans une fonction
  useData(produitData);
  })
  //message d'erreur
  .catch((err) => {
    document.querySelector(".titles").innerHTML = "<h1>erreur 404</h1>";
});


//function pour afficher chaque produits
//-------------------------------------
async function useData(index) {
// déclaration de l'endroit ou implanter les produits
const card = document.querySelector("#items");
// boucle pour chaque produits
for (const produit of index) {
  // modification pour que id soit afficher dans l'url de la page produit
   card.innerHTML += `<a href="./product.html?_id=${produit._id}">
   <article>
      <img src="${produit.imageUrl}" alt="${produit.altTxt}">
      <h3 class="productName">${produit.name}</h3>
      <p class="productDescription">${produit.description}</p>
    </article>
  </a>`
}
   
}

