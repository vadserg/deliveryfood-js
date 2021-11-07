const restaurant = 2

const restaurantName = document.querySelector('.restaurant-title')
const restaurantRating = document.querySelector('.rating')
const restaurantPrice = document.querySelector('.price')
const restaurantCategory = document.querySelector('.category')

const renderItems = (data) => {
  for (let key in data) {
    console.log(key, ":", data[key])
  }

  restaurantName.textContent = data.name
  restaurantRating.textContent = data.stars
  restaurantPrice.textContent = "от " + data.price + " руб"
  restaurantCategory.textContent = data.kitchen
}

fetch(`https://test-65e8a-default-rtdb.firebaseio.com/db/partners/${restaurant}.json`)
  .then((response) => response.json())
  .then((data) => {
    renderItems(data)
  })
  .catch((error) => {
    console.log(error)
  })
