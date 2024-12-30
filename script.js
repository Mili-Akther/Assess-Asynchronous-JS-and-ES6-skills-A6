
// create loadCategories
const loadCategories = () => {
  // fetch the data
  fetch("https://openapi.programming-hero.com/api/peddy/categories")
    .then((res) => res.json())
    .then((data) => console.log(data))
    .catch((err) => console.log(err));
};

loadCategories ()