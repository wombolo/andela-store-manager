class all_products {
  static getProducts(id){
    fetchAPI(`${productsURL}/${id}`,'GET')
      .then((data) =>{
        console.log(data);
        all_products.postToDOM(data);
      });
  }

  static postToDOM(allProducts){
    const productsSingle = allProducts.product;

    const product_title = document.getElementsByClassName('product_title');
    for (let single of product_title){
      single.innerHTML += productsSingle.title;
    }

    const item_price = document.getElementsByClassName('item-price')[0];
    item_price.innerText += productsSingle.price;

    const qty_available = document.getElementById('qty-available');
    qty_available.innerText += productsSingle.quantity;


    const product_desc = document.getElementById('item-desc');
    product_desc.innerText+=productsSingle.description;

    const min_qty_available = document.getElementById('min-qty-available');

    const image = document.getElementsByTagName('img')[0];
    image.src = productsSingle.image;
  }
}

(async () => {
  const url_string = new URL(window.location.href);
  const userId = url_string.searchParams.get('id');
  await all_products.getProducts(userId);
})();
