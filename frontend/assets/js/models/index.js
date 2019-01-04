const form = document.getElementById('loginForm');
function handleForm(event) { // Prevent page refresh
  event.preventDefault();
  const email = document.getElementById('email').value;
  const passwd = document.getElementById('password').value;
  callApiLogin({ email, password: passwd });
}
form.addEventListener('submit', handleForm);


function passHtmlError(message) {
  const div = document.getElementById('errorDiv');
  let errorMsg = message;

  if (typeof message === 'object' && message.length) {
    errorMsg = message.map(single => `${single.msg} in ${single.param} `);
  }
  div.innerHTML = errorMsg;
}


function callApiLogin(inputObject) {
  fetchAPI(loginURL,'POST', inputObject)
    .then((data) => {
      // console.log(JSON.stringify(data));
      // console.log(data.json());
      const responseJSON = data;

      console.log(responseJSON);

      if (!responseJSON.token) {
        passHtmlError(responseJSON.errors || responseJSON.message);
      } else {
        console.log(responseJSON.token);
        localStorage.setItem('access-token', responseJSON.token);
        window.location = 'dashboard.html';
      }
    })
    .catch((error) => {
      passHtmlError(error);
    });
}
