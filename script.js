// create loadCategories
const loadCategories = () => {
  // fetch the data
  fetch("https://openapi.programming-hero.com/api/peddy/categories")
    .then((res) => res.json())
    .then((data) => displayCategories(data.categories))
    .catch((err) => console.log(err));
};

// create loadCategories
const loadPets = () => {
  // fetch the data
  fetch(" https://openapi.programming-hero.com/api/peddy/pets")
    .then((res) => res.json())
    .then((data) => DisplayPets(data.pets))
    .catch((err) => console.log(err));
};

const DisplayPets = (pets) => {
  const petsContainer = document.getElementById("pets");
  pets.forEach((pet) => {
    console.log(pet);
    const petContainer = document.createElement("div");
     petContainer.classList.add("card");
     petContainer.innerHTML = `
      <div class="card shadow rounded-lg">
      <figure class= "p-5 py-5"> 
      <img
        src=${pet.image}
        class = "rounded-lg object-cover"
        alt="Shoes" />
    </figure>
    <div class="p-5">
      <h2 class="card-title">${pet.pet_name}</h2>
          <p class="font thin">Breed: ${pet.breed}</p>
          <p>Birth: ${pet.date_of_birth}</p>
          <p>Gender: ${pet.gender}</p>
          <p>Price: ${pet.price}</p>
     <div class="card-actions justify-between">
            <button class="btn text-black text-xl "><i class="fa-regular fa-thumbs-up"></i></button>
            <button class="btn text-teal-600 text-xl">Adopt</button>
            <button class="btn text-teal-600 text-xl">Details</button>
          </div>
    </div>
    </div>`;
     petsContainer.append(petContainer);
  });
};

// create DisplayCategories
const displayCategories = (categories) => {
  const categoryContainer = document.getElementById("categories");
  categories.forEach((item) => {
    console.log(item);
    // create a btn
    const button = document.createElement("button");
    button.classList = "btn"
    button.innerHTML = item.category;
    // add btn to  category container
    categoryContainer.append(button);
  });
};

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
 
