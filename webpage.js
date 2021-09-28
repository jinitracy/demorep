let carts = document.querySelectorAll('.add-cart');


let products = [
{
	name: 'Pen',
  img :"img_1",
	tag: 'checkedshirts',
	price: 30,
	incart: 0
},

{
	name: 'Glue Stick',
  img :'img_2',
	tag: 'tshirtforgirls',
	price: 10,
	incart: 0

},
{
	name: 'Sketch Pencil',
  img :'img_3',
	tag: 'plainshirts',
	price: 50,
	incart: 0
},
{
	name: 'Tip Pencil',
	tag: 'tshirtforboys',
  img :'img_4',
	price: 60,
	incart: 0
},
{
	name: 'Zip Box',
  img :'img_5',
	tag: 'printedshirts',
	price: 30,
	incart: 0
}

];


for(let i=0; i < carts.length; i++){
	carts[i].addEventListener('click',() =>  {
		cartNumbers(products[i]);
		totalcost(products[i]);

	} )
}

function onLoadCartNumbers(){
	 let productNumbers = localStorage.getItem('cartNumbers');

	 if(productNumbers){
	 	document.querySelector('.cart span').textContent = productNumbers;
	 }
}

function cartNumbers(product)
{
	let productNumbers = localStorage.getItem('cartNumbers');


	productNumbers = parseInt(productNumbers);

	if(productNumbers){
         localStorage.setItem('cartNumbers', productNumbers + 1);
         document.querySelector('.cart span').textContent = productNumbers + 1;
	}
	else {
		localStorage.setItem('cartNumbers',1);
		document.querySelector('.cart span').textContent =1;
	}

    setItems(product);


}

function setItems(product)
 {
    let cartItems= localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);

    if(cartItems != null){
    	if(cartItems[product.tag] == undefined){
    		cartItems =
    		{
    			...cartItems,
    			[product.tag]: product
    		}
    	}
    	cartItems[product.tag].incart += 1;
    } else{
    	product.incart = 1;
	     cartItems = {
		[product.tag] : product
	      }

    }


	localStorage.setItem("productsInCart",JSON.stringify(cartItems)) ;
}

function totalcost(product) {

	let cartcost = localStorage.getItem('totalcost');
	console.log("my cartcost is",cartcost);

	if (cartcost != null){
		cartcost=  parseInt(cartcost);
		localStorage.setItem("totalcost",cartcost+product.price);

	}else{
	       localStorage.setItem("totalcost",product.price);
	}



}

function displayCart()
{
	let cartItems = localStorage.getItem("productsInCart");
	cartItems = JSON.parse(cartItems);
	let productContainer = document.querySelector(".products");
	let cartcost = localStorage.getItem('totalcost');
	console.log(cartItems);

	if( cartItems && productContainer )
    {
		productContainer.innerHTML = '';
        Object.values(cartItems).map(item => {
          productContainer.innerHTML += `
            <div class="product">
              <ion-icon name="close-circle"></ion-icon>
		      <img src="./${item.img}.jpg">
		      <span>${item.name}</span>
		    </div>
		    <div class="price">Rs.${item.price}.00</div>
            <div class="quantity">
		           <ion-icon class= "decrease" name="arrow-dropleft-circle"></ion-icon>
		        <span>${item.incart}</span>
		        <ion-icon class="increase"
		          name="arrow-dropright-circle"></ion-icon>
		    </div>
		    <div class="total">
		      Rs.${item.incart * item.price}.00
		    </div>
          ` ;

        } );
         cartcost1= cartcost*0.95;
        productContainer.innerHTML += `
           <div class ="baskettotalcontainer">
             <h4 class="baskettotaltitle">
                  total
              </h4>

             <h4 class="baskettotal">
                Rs.${cartcost}.00

              </h4>
              </div>
            <div class ="baskettotalcontainer">

              <h4 class="baskettotaltitle">
                   total (including discount)
               </h4>

              <h4 class="baskettotal" >
                Rs.${cartcost1}.00
             </h4>
              </div>

        `;

    }

}


onLoadCartNumbers();
displayCart()
