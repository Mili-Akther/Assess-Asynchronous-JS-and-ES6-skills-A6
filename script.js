// Fetch and load all pet categories
const loadCategories = () => {
  fetch("https://openapi.programming-hero.com/api/peddy/categories")
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      displayCategories(data.categories);
    })
    .catch((err) => console.error(err));
};

// Fetch all pets
const loadPets = () => {
  console.log("Loading all pets...");
  fetch("https://openapi.programming-hero.com/api/peddy/pets")
    .then((res) => res.json())
    .then((data) => {
      displayPets(data.pets);
    })
    .catch((err) => console.error(err));
};

// Display pets dynamically
const displayPets = (pets) => {
  const petsContainer = document.getElementById("pets");
  petsContainer.innerHTML = "";

  if (pets.length === 0) {
    petsContainer.classList.remove("grid");
    petsContainer.innerHTML = `
      <div class="flex flex-col gap-5 justify-center items-center min-h-[300px]">
        <img src="images/error.webp" alt="empty" />
        <h2 class="text-center text-5xl font-bold">No Information Available</h2>
        <p class="text-black text-center mb-6">
          It's a well-known fact that readers are often distracted by a page's layout.
        </p>
      </div>`;
    return;
  }

  petsContainer.classList.add("grid");
  pets.forEach((pet) => {
    const petContainer = document.createElement("div");
    petContainer.classList.add("card");
  
    petContainer.innerHTML = `
      <div class="card shadow rounded-lg">
        <figure class="p-5 py-5">
          <img src="${pet.image}" class="rounded-lg object-cover" alt="" />
        </figure>
        <div class="p-5">
          <h2 class="card-title">${pet.pet_name}</h2>
          <p>Breed: ${pet.breed}</p>
          <p>Birth: ${pet.date_of_birth}</p>
          <p>Gender: ${pet.gender}</p>
          <p>Price: ${pet.price}</p>
          <div class="card-actions justify-between">
            <button onclick="markAsImage('${pet.image}')" class="btn text-black text-xl">
              <i class="fa-regular fa-thumbs-up"></i>
            </button>


           <button   onclick="adoptPet(this)" class="btn adopt-btn text-teal-600 text-xl">Adopt</button>

            
            <button onclick="loadDetails('${pet.petId}')" class="btn text-teal-600 text-xl">Details</button>
          </div>
        </div>
      </div>`;
    petsContainer.appendChild(petContainer);
  });

  document.getElementById("spinner").style.display = "none";
};


// Function to show the notification popup
const showNotification = () => {
  const notification = document.getElementById("notification");
  notification.classList.remove("hidden");
};

// Function to handle the "Adopt" button click
const adoptPet = (button) => {
  showNotification();

  const countdownDisplay = document.getElementById("countdownDisplay");
  let countdown = 3;

  button.disabled = true;

  const countdownInterval = setInterval(() => {
    if (countdown > 0) {
      countdownDisplay.textContent = countdown; 
      countdown--;
    } else {
      clearInterval(countdownInterval);
      button.textContent = "Adopted";
      button.classList.add("adopted");
      setTimeout(() => {
        const notification = document.getElementById("notification");
        notification.classList.add("hidden"); 
      }, 2000); 
    }
  }, 1000);
};




// Filter pets based on category with a 2-second spinner delay
const filterPetsByCategory = (category) => {
  const spinner = document.getElementById("spinner");
  const petsContainer = document.getElementById("pets");

  // Show the spinner and clear the container
  spinner.style.display = "block";
  petsContainer.innerHTML = "";

  // Delay data fetching by 2 seconds
  setTimeout(() => {
    fetch("https://openapi.programming-hero.com/api/peddy/pets")
      .then((res) => res.json())
      .then((data) => {
        const filteredPets = data.pets.filter((pet) => pet.category === category);
        displayPets(filteredPets);
      })
      .catch((err) => console.error(err))
      .finally(() => {
        spinner.style.display = "none"; // Hide spinner after fetching
      });
  }, 2000);
};

// Attach event listeners to category buttons
document.getElementById("dogs-btn").addEventListener("click", () => {
  filterPetsByCategory("Dog");
});
document.getElementById("cats-btn").addEventListener("click", () => {
  filterPetsByCategory("Cat");
});
document.getElementById("rabbits-btn").addEventListener("click", () => {
  filterPetsByCategory("Rabbit");
});
document.getElementById("birds-btn").addEventListener("click", () => {
  filterPetsByCategory("Bird");
});
// Mark image as favorite
const markAsImage = (image) => {
  const markAsImageContainer = document.getElementById("markAsImageContainer");
  const div = document.createElement("div");
  div.innerHTML = `
    <img src="${image}" class="rounded-lg object-cover" alt="" />
  `;
  markAsImageContainer.appendChild(div);
};

// Load pet details
const loadDetails = async (petId) => {
  const uri = `https://openapi.programming-hero.com/api/peddy/pet/${petId}`;
  const res = await fetch(uri);
  const data = await res.json();
  displayDetails(data.petData);
};

// Display pet details
const displayDetails = (pet) => {
  const detailsContainer = document.getElementById("modal-content");
  detailsContainer.innerHTML = `
    <img src="${pet.image}" class="w-full" />
    <h2 class="card-title">${pet.pet_name}</h2>
    <div class="grid grid-cols-2 gap-2 text-sm">
      <p>Birth: ${pet.date_of_birth}</p>
      <p>Breed: ${pet.breed}</p>
      <p>Gender: ${pet.gender}</p>
      <p>Vaccinated: ${pet.vaccinated_status}</p>
      <p>Price: $${pet.price}</p>
    </div>
    <div class="mt-5">
      <h3 class="text-sm font-semibold">Details Information</h3>
      <p>${pet.pet_details}</p>
    </div>
  `;
  document.getElementById("customModal").showModal();
};



// Select all "Adopt" buttons
const adoptButtons = document.querySelectorAll('.adopt-btn');


// Smooth scroll to "Adopt Your Best Friend" section
document.getElementById("viewMoreBtn").addEventListener("click", () => {
  const adoptSection = document.getElementById("adoptSection");
  adoptSection.scrollIntoView({ behavior: "smooth" });
});


loadCategories();
loadPets();
