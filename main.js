const inputUsername = document.getElementById('username');
const avatarImg = document.getElementById('avatarImg');

inputUsername.addEventListener('input', function() {
  const username = inputUsername.value;
  const apiUrl = `https://ui-avatars.com/api/?name=${username}&background=random`;

  fetch(apiUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.blob();
    })
    .then(blob => {
      const objectURL = URL.createObjectURL(blob);
      avatarImg.src = objectURL;
    })
    .catch(error => {
      console.error('There has been a problem with your fetch operation:', error);
    });
});