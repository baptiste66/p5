let addProduct =JSON.parse(localStorage.getItem("product"))
console.table(addProduct)




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
    else if (basket!=null){  
          
      for(let product of basket){
        if(product.id===id && product.color===productColor){
          let additionQuantité = parseInt(product.quantity) + parseInt(productQuantity);
          product.quantity = JSON.stringify(additionQuantité);
         localStorage.setItem ("product",JSON.stringify(basket));
        }
        if(product.id===id && product.color!=productColor){
          basket.push(productBasket)
          localStorage.setItem ("product",JSON.stringify(basket))
        }
          
        
      }

    }
} 

