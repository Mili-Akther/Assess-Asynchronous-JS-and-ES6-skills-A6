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
      <figure>
      <img
        src=${pet.image}
        alt="Shoes" />
    </figure>
    <div class="card-body">
      <h2 class="card-title">
        ${pet.name}
        <div class="badge badge-secondary">NEW</div>
      </h2>
      <p>If a dog chews shoes whose shoes does he choose?</p>
      <div class="card-actions justify-end">
        <div class="badge badge-outline">Fashion</div>
        <div class="badge badge-outline">Products</div>
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
 
