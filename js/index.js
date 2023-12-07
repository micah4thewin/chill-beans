// Initialize AOS
// AOS.init();
/*
// Initialize typed.js
var typed = new Typed('#element', {
  strings: ['Your text here'],
  smartBackspace: true
});
*/
document.addEventListener("DOMContentLoaded", function() {

  // Fetch data from JSON files
  const fetchJsonData = async (filename) => {
    const response = await fetch(filename);
    const data = await response.json();
    return data;
  };

  // Function to create card HTML
  const createCardHtml = (item) => `
    <div class="col-12 col-md-6 col-lg-4 mb-4">
      <div class="card rounded">
        <img src="${item.photo}" class="card-img-top" alt="${item.name}" data-aos="zoom-in">
        <div class="card-body" data-aos="fade-up">
          <h5 class="card-title fs-3">${item.name}</h5>
          <p class="card-text">${item.description}</p>
          <div class="d-flex justify-content-between align-items-center">
            <div class="btn-group" role="group">
              ${item.sizes.map(size => `<button type="button" class="btn btn-secondary">${size.size}</button>`).join('')}
            </div>
            <p class="card-text"><small class="text-muted fs-3">$${item.sizes[0].price}</small></p>
          </div>
        </div>
      </div>
    </div>
  `;

  // Populate card section
  const populateCardSection = async () => {
    const foodData = await fetchJsonData('food.json');
    const slushyData = await fetchJsonData('slushy.json');
    const coffeeData = await fetchJsonData('coffee.json');
    const cardSection = document.querySelector('#menu-section'); // Changed to your actual card section selector

    // Append cards to card section
    [foodData, slushyData, coffeeData].forEach(data => {
      data.forEach(item => {
        cardSection.innerHTML += createCardHtml(item);
      });
    });
  };

  // Call function to populate card section
  populateCardSection();
  AOS.init();

});
