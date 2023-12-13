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

console.log("Typed is here.", typedElement);
  const fetchJsonData = async (filename) => {
    const response = await fetch(filename);
    const data = await response.json();
    return data;
  };
  const updatePrice = (type, index, sizeIndex, item) => {
    const priceElement = document.querySelector(`#price-${type}-${index}`);
    priceElement.textContent = `$${item.sizes[sizeIndex].price}`;
    priceElement.classList.add('card-text');
    priceElement.classList.add('text-muted');
    priceElement.classList.add('fs-3');
  };
  const addSizeButtonListeners = (type, index, item) => {
    item.sizes.forEach((_, sizeIndex) => {
      const button = document.querySelector(`#size-btn-${type}-${index}-${sizeIndex}`);
      button.addEventListener('click', () => {
        updatePrice(type, index, sizeIndex, item);
      });
    });
  };
  const createCardHtml = (item, index, type) =>
    `<div class="col-12 col-md-6 col-lg-4 mb-4" data-aos="fade-up">
      <div class="card rounded" data-aos="zoom-in">
        <img src="${item.photo}" class="card-img-top" alt="${item.name}">
        <div class="card-body">
          <h5 class="card-title fs-3" data-aos="fade-up">${item.name}</h5>
          <p class="card-text" data-aos="fade-up">${item.description}</p>
          <div class="d-flex justify-content-between align-items-center">
            <div class="btn-group" role="group">
              ${item.sizes
                .map(
                  (size, sizeIndex) =>
                    `<button id="size-btn-${type}-${index}-${sizeIndex}" type="button" class="btn btn-secondary" data-item='${JSON.stringify(
                      item
                    )}' data-size-index="${sizeIndex}" data-aos="fade-up">${size.size}</button>`
                )
                .join("")}
            </div>
            <p id="price-${type}-${index}" class="card-text" data-aos="fade-up"><small class="text-muted fs-3">$${item.sizes[0].price}</small></p>
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

  /*
    const foodData = [
      {
        "name": "Bagel",
        "description": "Freshly baked bagel",
        "photo": "assets/images/bagel.webp",
        "sizes": [
          {
            "size": "Single",
            "price": 2.50,
            "calories": 245
          }
        ]
      },
    ];
    const slushyData = [
      {
        "name": "Blue Raspberry Slushy",
        "description": "Refreshing blue raspberry flavored slushy",
        "photo": "assets/images/blueras.webp",
        "sizes": [
          {
            "size": "12oz",
            "price": 3.00,
            "calories": 180
          },
          {
            "size": "16oz",
            "price": 4.00,
            "calories": 240
          },
          {
            "size": "24oz",
            "price": 5.00,
            "calories": 360
          }
        ]
      },
    ];
    const coffeeData = [
      {
        "name": "Coffee",
        "description": "Rich and aromatic coffee",
        "photo": "assets/images/coffee.webp",
        "sizes": [
          {
            "size": "12oz",
            "price": 2.50,
            "calories": 5
          },
          {
            "size": "16oz",
            "price": 3.00,
            "calories": 10
          },
          {
            "size": "24oz",
            "price": 4.00,
            "calories": 15
          }
        ]
      },

        ];

          */
    const cardSection = document.querySelector('#menu-section');


    let htmlContent = '';

    [foodData, slushyData, coffeeData].forEach((data, dataIndex) => {
      data.forEach((item, index) => {
        let type;
        if (dataIndex === 0) {
          type = 'food';
        } else if (dataIndex === 1) {
          type = 'slushy';
        } else {
          type = 'coffee';
        }
        htmlContent += createCardHtml(item, index, type);
      });
    });

    cardSection.innerHTML = htmlContent;

    [foodData, slushyData, coffeeData].forEach((data, dataIndex) => {
      data.forEach((item, index) => {
        let type;
        if (dataIndex === 0) {
          type = 'food';
        } else if (dataIndex === 1) {
          type = 'slushy';
        } else {
          type = 'coffee';
        }
        addSizeButtonListeners(type, index, item);
      });
    });
  };


  // Call function to populate card section
  await populateCardSection();
  AOS.init();
  console.log('14');

});
