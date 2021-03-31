 /*
<div class="list-group-item d-flex justify-content-between align-items-center cart-item">
  <span>عنوان محصول</span>
  <div>
    <button class="btn inc-quantity" data-product-id="ایدی محصول">+</button>
    <span>تعداد محصول برای خرید</span>
    <button class="btn dec-quantity" data-product-id="ایدی محصول">-</button>
  </div>
</div>
 */
let strings = [];
if(localStorage.cart !== undefined){
  strings = JSON.parse(localStorage.cart);
}
function renderProducts(products) {
  const productList = document.getElementById('product-list');

  const productsHTML = products
    .map(
      product =>
        `<div class="product col-lg-4 col-md-6 mb-4">
		<div class="card h-100">
			<a href="#"
				><img
					class="card-img-top"
					src="${product.image}"
					alt="${product.title}"
			/></a>
			<div class="card-body">
				<h4 class="card-title">
				    ${product.title}
				</h4>
				<h5 class="product-price">${formatMoney(product.price)} تومان</h5>
				<p class="card-text">
				    ${product.description}
				</p>
			</div>
			<div class="card-footer">
				<button class="btn btn-light add-to-cart" data-product-id="${product.id}">
					افزودن به سبد خرید
				</button>
			</div>
		</div>
	</div>`
    )
    .join('');

  productList.innerHTML = productsHTML;
}

function formatMoney(amount, decimalCount = 0, decimal = '.', thousands = ',') {
  try {
    decimalCount = Math.abs(decimalCount);
    decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

    const negativeSign = amount < 0 ? '-' : '';

    let i = parseInt(
      (amount = Math.abs(Number(amount) || 0).toFixed(decimalCount))
    ).toString();
    let j = i.length > 3 ? i.length % 3 : 0;

    return (
      negativeSign +
      (j ? i.substr(0, j) + thousands : '') +
      i.substr(j).replace(/(\d{3})(?=\d)/g, '$1' + thousands) +
      (decimalCount
        ? decimal +
          Math.abs(amount - i)
            .toFixed(decimalCount)
            .slice(2)
        : '')
    );
  } catch (e) {
    console.log(e);
  }
}

let products = [];
window
  .fetch('http://localhost:3000/products')
  .then(res => res.json())
  .then(result => {
    products = result;
    renderProducts(products);

  });

/*function addingHandlers(){
  $("button[data-product-id]").click(function (){
    strings[$(this).attr("data-product-id") - 1] = products[$(this).attr("data-product-id") - 1];
    strings[$(this).attr("data-product-id") - 1]["quantity"] = 1;
    localStorage.cart = JSON.stringify(strings);
  });
}

 const buyingList = document.querySelector("#cart-list");
 let array = [];
$("button[data-toggle='modal']").click(function(){
  if(localStorage.cart !== undefined){
    let storage = JSON.parse(localStorage.cart);
    for(let i = 0,j = 0;i < storage.length;i++){
      if(storage[i] !== null){
        array[j] = storage[i];
        j++;
      }
    }
  }
  buyingList.innerHTML = "";

  buyingList.innerHTML = array.map(array =>
    `<div class="list-group-item d-flex justify-content-between align-items-center cart-item">
                <span>${array.title}</span>
                    <div>
                    <button class="btn inc-quantity" data-product-id="${array.id}">+</button>
                    <span>${array.quantity}</span>
                    <button class="btn dec-quantity" data-product-id="${array.id}">-</button>
                </div>
            </div>`
  ).join('');


});

$("button .inc-quantity").click(function (){
  console.log("enter");
});


 $(".btn.inc-quantity").click(function (){
   for(let i = 0; i < array.length; i++){
     if($(this).attr("data-product-id") == array[i]["id"]){
       array[i]["quantity"] += 1;
       strings[$(this).attr("data-product-id") - 1]["quantity"] += 1;
       localStorage.cart = JSON.stringify(strings);
       buyingList.innerHTML = array.map(array =>
           `<div class="list-group-item d-flex justify-content-between align-items-center cart-item">
                <span>${array.title}</span>
                    <div>
                    <button class="btn inc-quantity" data-product-id="${array.id}">+</button>
                    <span>${array.quantity}</span>
                    <button class="btn dec-quantity" data-product-id="${array.id}">-</button>
                </div>
            </div>`
       ).join('');
       break;
     }
   }
 });*/

function cartRendering(cart){
  const buyingList = document.querySelector("#cart-list");

  if(cart.length === 0){
    return;
  }

  buyingList.innerHTML = cart.map(array =>
  `<div class="list-group-item d-flex justify-content-between align-items-center cart-item">
  <span>${array.title}</span>
  <div>
    <button class="btn inc-quantity" data-product-id=${array.id}>+</button>
    <span>${array.quantity}</span>
    <button class="btn dec-quantity" data-product-id=${array.id}>-</button>
  </div>
</div>`
  ).join('');
}

function addingObject(productID,products,buyingList){
  const addingProduct = products.filter(array => array.id == productID)[0];

  let isProductIDInBuyingList = buyingList.find(array => array.id == productID);

  if(isProductIDInBuyingList != undefined){
    return buyingList.map(array =>
      array.id == productID ? {...array,quantity: array.quantity + 1} : array
    );
  }

  return [...buyingList, {...addingProduct, quantity: 1}];

}

function removingFromBuyingList(productId,buyingList){
  const productInCart = buyingList.find(item => item.id == productId);

  if (productInCart.quantity == 1) {
    return buyingList.filter(item => item.id != productId);
  } else {
    return buyingList.map(item =>
        item.id == productId ? {...item, quantity: item.quantity - 1} : item
    );
  }
}

 let buyingList = [];

 buyingList = renewBuyingList();

 cartRendering(buyingList);


document.addEventListener('click', function (e) {
   if (e.target && e.target.classList.contains('add-to-cart')) {
     const productId = e.target.getAttribute('data-product-id');
     buyingList = addingObject(productId, products, buyingList);
     cartRendering(buyingList);
     writingToLocalStorage(buyingList);
   } else if (e.target && e.target.classList.contains('inc-quantity')) {
     const productId = e.target.getAttribute('data-product-id');
     buyingList = addingObject(productId, products, buyingList);
     cartRendering(buyingList);
     writingToLocalStorage(buyingList);
   } else if (e.target && e.target.classList.contains('dec-quantity')) {
     const productId = e.target.getAttribute('data-product-id');
     buyingList = removingFromBuyingList(productId, buyingList);
     cartRendering(buyingList);
     writingToLocalStorage(buyingList);
   }
 });


function writingToLocalStorage(buyingList){
  localStorage.cart =  JSON.stringify(buyingList);
}

function renewBuyingList() {
   if (window.localStorage.getItem('cart')) {
     return JSON.parse(window.localStorage.getItem('cart'));
   } else {
     return [];
   }
 }
