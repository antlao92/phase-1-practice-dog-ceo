const imgUrl = "https://dog.ceo/api/breeds/image/random/4";
const breedUrl = "https://dog.ceo/api/breeds/list/all";

// Fetch dog images and render them
fetch(imgUrl)
  .then(response => response.json())
  .then(data => {
    data.message.forEach(image => {
      const imgElement = document.createElement('img');
      imgElement.src = image;
      // Add any additional attributes or styles to the img element if needed
      document.getElementById('dog-image-container').appendChild(imgElement);
    });
  })
  .catch(error => {
    console.error('Error:', error);
  });

const allBreeds = []; // Store all dog breeds for filtering

// Fetch dog breeds and render them
fetch(breedUrl)
  .then(response => response.json())
  .then(data => {
    const breeds = Object.keys(data.message);
    breeds.forEach(breed=>allBreeds.push(breed))
    renderBreeds(breeds);
    addEventListeners();
  })
  .catch(error => {
    console.error('Error:', error);
  });
  const ul = document.getElementById('dog-breeds');
  
function renderBreeds(breeds) {
  const ul = document.getElementById('dog-breeds');

  breeds.forEach((breed, index) => {
    const li = document.createElement('li');
    li.innerText = breed;
    li.id = `breed-${index}`;
    ul.appendChild(li);
  });
}

function addEventListeners() {
  const breeds = document.getElementsByTagName('li');

  for (let i = 0; i < breeds.length; i++) {
    breeds[i].addEventListener('click', function() {
      this.style.color = 'red';
    });
  }
}


//filter the list by dropdown menu
const filterDropdown = document.getElementById('breed-dropdown');
console.log(filterDropdown);

filterDropdown.addEventListener('change', function() {
  const selectedLetter = filterDropdown.value;
  ul.innerHTML = "";

  if (selectedLetter === 'all') {
    renderBreeds(allBreeds);
  } else {
    const filteredBreeds = allBreeds.filter(breed => breed.startsWith(selectedLetter));
    renderBreeds(filteredBreeds);
    console.log(filteredBreeds);
  }
});

//fetchDogBreeds(); // Fetch and display all dog breeds initially

