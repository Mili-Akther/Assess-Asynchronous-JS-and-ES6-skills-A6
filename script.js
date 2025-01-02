// Fetch and load all pet categories
const loadCategories = () => {
  fetch("https://openapi.programming-hero.com/api/peddy/categories")
    .then((res) => res.json())
    .then((data) => displayCategories(data.categories))
    .catch((err) => console.error(err));
};

// Fetch all pets
const loadPets = () => {
  fetch("https://openapi.programming-hero.com/api/peddy/pets")
    .then((res) => res.json())
    .then((data) => {
      displayPets(data.pets);
    })
    .catch((err) => console.error(err));
};


// detail btn click korle details dekhabe
const loadDetails = async (petId) => {
  const uri =`https://openapi.programming-hero.com/api/peddy/pet/${petId}`;
  const res = await fetch(uri);
  const data = await res.json();
  console.log(data);
  displayDetails(data.petData);
};

// Display pet details
const displayDetails = (pet) => {
    console.log(pet); 
  const detailsContainer = document.getElementById("modal-content");
  detailsContainer.innerHTML = `
    <img src="${pet.image}" class = "w-full" />
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
    <p class="">${pet.pet_details}</p>
    </div>
  `;
  // document.getElementById("showModalData").click();
  document.getElementById("customModal").showModal();
};

// Display pets dynamically
const displayPets = (pets) => {
  const petsContainer = document.getElementById("pets");
  petsContainer.innerHTML = ""; 
   if (pets.length == 0) {
     petsContainer.classList.remove("grid");
     petsContainer.innerHTML = `
    <div class="flex flex-col gap-5 justify-center items-center min-h-[300px]"> <img src="images/error.webp" class="" alt="empty">
    <h2 class="text-center text-5xl font-bold">No Information Available</h2>
     <p class="text-black text-center mb-6">
          It's a well-known fact that readers are often distracted by a page's
          layout, as the visual arrangement <br />draws more attention than the
          actual content.
        </p>
    </div>`;
     return;
   } else {
     petsContainer.classList.add("grid");
   }
  pets.forEach((pet) => {
    const petContainer = document.createElement("div");
    petContainer.classList.add("card");
    petContainer.innerHTML = `
      <div class="card shadow rounded-lg">
        <figure class="p-5 py-5">
          <img
            src="${pet.image}"
            class="rounded-lg object-cover"
            alt="" />
        </figure>
        <div class="p-5">
          <h2 class="card-title">${pet.pet_name}</h2>
          <p>Breed: ${pet.breed}</p>
          <p>Birth: ${pet.date_of_birth}</p>
          <p>Gender: ${pet.gender}</p>
          <p>Price: $${pet.price}</p>
          <div class="card-actions justify-between">
            <button class="btn text-black text-xl"><i class="fa-regular fa-thumbs-up"></i></button>
            <button class="btn text-teal-600 text-xl">Adopt</button>
           <button onclick="loadDetails('${pet.petId}')" class="btn text-teal-600 text-xl">Details</button>

          </div>
        </div>
      </div>`;
    petsContainer.append(petContainer);
  });
};

// Filter pets based on category
const filterPetsByCategory = (category) => {
  fetch("https://openapi.programming-hero.com/api/peddy/pets")
    .then((res) => res.json())
    .then((data) => {
      const filteredPets = data.pets.filter((pet) => pet.category === category);
      displayPets(filteredPets);
    })
    .catch((err) => console.error(err));
    
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


loadCategories();
loadPets();

// card demo
// const cardDemo = {
//     petId: 1, breed: 'Golden Retriever', category: 'Dog', date_of_birth: '2023-01-15', price: 1200, …}
// breed
// :
// "Golden Retriever"
// category
// :
// "Dog"
// date_of_birth
// :
// "2023-01-15"
// gender
// :
// "Male"
// image
// :
// "https://i.ibb.co.com/p0w744T/pet-1.jpg"
// petId
// :
// 1
// pet_details
// :
// "This friendly male Golden Retriever is energetic and loyal, making him a perfect companion for families. Born on January 15, 2023, he enjoys playing outdoors and is especially great with children. Fully vaccinated, he's ready to join your family and bring endless joy. Priced at $1200, he offers love, loyalty, and a lively spirit for those seeking a playful yet gentle dog."
// pet_name
// :
// "Sunny"
// price
// :
// 1200
// vaccinated_status
// :
// "Fully"
