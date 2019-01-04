const form = document.getElementById('addProductForm');
function handleForm(event) { // Prevent page refresh
  event.preventDefault();
  const image = event.target[0].files[0];
  const name = event.target[1].value;
  const price = event.target[2].value;
  const quantity = event.target[3].value;
  const description = event.target[4].value;

  //
  //
  // run separate route for image upload
  //
  //
  //
  // .

  fetchAPI(productsURL,'POST', {image,title: name, price, quantity, description})
    .then((data)=>{
      console.log(data);
    });
}
form.addEventListener('submit', handleForm);
