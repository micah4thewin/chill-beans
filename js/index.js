// Initialize AOS
// AOS.init();
/*
// Initialize typed.js
var typed = new Typed('#element', {
  strings: ['Your text here'],
  smartBackspace: true
});
*/
document.addEventListener("DOMContentLoaded", async function () {

  // Fetch data from JSON files
  const fetchJsonData = async (filename) => {
    const response = await fetch(filename);
    const data = await response.json();
    return data;
  };

  // Function to create card HTML
  const createCardHtml = (item, index, type) =>
    `<div class="col-12 col-md-6 col-lg-4 mb-4">
      <div class="card rounded">
        <img src="${item.photo}" class="card-img-top" alt="${item.name}" data-aos="zoom-in">
        <div class="card-body">
          <h5 class="card-title fs-3">${item.name}</h5>
          <p class="card-text">${item.description}</p>
          <div class="d-flex justify-content-between align-items-center">
            <div class="btn-group" role="group">
              ${item.sizes
                .map(
                  (size, sizeIndex) =>
                    `<button id="size-btn-${type}-${index}-${sizeIndex}" type="button" class="btn btn-secondary" data-item='${JSON.stringify(
                      item
                    )}' data-size-index="${sizeIndex}">${size.size}</button>`
                )
                .join("")}
            </div>
            <p id="price-${type}-${index}" class="card-text"><small class="text-muted fs-3">${item.sizes[0].price}</small></p>
          </div>
        </div>
      </div>
    </div>`;

  // Populate card section
  const populateCardSection = async () => {
    const foodData = await fetchJsonData('food.json');
    const slushyData = await fetchJsonData('slushy.json');
    const coffeeData = await fetchJsonData('coffee.json');
    const cardSection = document.querySelector('#menu-section');
    let foodIndex = 0;
    let slushyIndex = 0;
    let coffeeIndex = 0;

    let htmlContent = '';

    [foodData, slushyData, coffeeData].forEach((data) => {
      data.forEach((item) => {
        let currentIndex;
        let type;
        if (data === foodData) {
          htmlContent += createCardHtml(item, foodIndex, 'food');
          currentIndex = foodIndex;
          type = 'food';
          foodIndex++;
        } else if (data === slushyData) {
          htmlContent += createCardHtml(item, slushyIndex, 'slushy');
          currentIndex = slushyIndex;
          type = 'slushy';
          slushyIndex++;
        } else {
          htmlContent += createCardHtml(item, coffeeIndex, 'coffee');
          currentIndex = coffeeIndex;
          type = 'coffee';
          coffeeIndex++;
        }

        cardSection.addEventListener("click", (event) => {
          if (event.target.tagName === "BUTTON") {
            const [btnType, itemType, currentIndex, sizeIndex] = event.target.id.split("-");
            const item = JSON.parse(event.target.getAttribute("data-item"));
            const newSizeIndex = parseInt(event.target.getAttribute("data-size-index"));
            document.getElementById(`price-${itemType}-${currentIndex}`).innerHTML = `<small class="text-muted fs-3">${item.sizes[newSizeIndex].price}</small>`;
          }
        });
      });
    });

    cardSection.innerHTML = htmlContent;
  };

  // Call function to populate card section
  await populateCardSection();
  AOS.init();
  console.log('6');

})();
