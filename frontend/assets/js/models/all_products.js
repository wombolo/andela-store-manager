class all_products {
  static getProducts(){
    fetchAPI(productsURL,'GET')
      .then((data) =>{
        console.log(data);
        all_products.postToDOM(data);
      });
  }

  static postToDOM(allProducts){
    const html_div = document.getElementById('all_products');
    const productsObject = allProducts.products;

    let iteration = 1;
    let productsDivHtml = '';
    for (let productSingle of productsObject) {
      if (iteration % 4 === 0 || iteration === 1)
        productsDivHtml+='<div class="row big-row">';

      productsDivHtml += `
                    <div class="col-3">
                        <figure class="image-holder">
                            <a href="product_single.html?id=${productSingle.id}">
                                <img src="${productSingle.image}">
                            </a>
                        </figure>
                        <div class="row">
                            <div class="col-3"><span class="pull-left item-price"> $ ${productSingle.price}</span></div>
                            <div class="col-6"><button class="pull-right min-btn btn-primary" data-ld="${productSingle.id}">Add to Cart</button></div>
                        </div>
                        <h3><a href="product_single.html?id=${productSingle.id}">${productSingle.title}</a></h3>
                    </div>`;

       if (iteration % 3 === 0)
          productsDivHtml+='</div>';

      iteration++;
    }
    html_div.innerHTML= productsDivHtml;
  }
}

(async () => {
  await all_products.getProducts();
})();
