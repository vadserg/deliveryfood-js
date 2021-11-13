// обертываем весь код в функцию для инкапсуляции в модуль
const menu = () => {
  // блок обертка для всех карточек
  const cardsMenu = document.querySelector('.cards-menu')
  // инициализируем массив данных корзины при входе на страницу
  let cartArray = JSON.parse(localStorage.getItem('cart')) || []

  // подставляем в заголовок параметры выбранного рестарана
  const changeTitle = (restaurant) => {
    const restaurantTitle = document.querySelector('.restaurant-title')
    const restaurantRating = document.querySelector('.rating')
    const restaurantPrice = document.querySelector('.price')
    const restaurantCategory = document.querySelector('.category')

    restaurantTitle.textContent = restaurant.name
    restaurantRating.textContent = restaurant.stars
    restaurantPrice.textContent = restaurant.price
    restaurantCategory.textContent = restaurant.kitchen
  }

  // добавляем в корзину 
  const addToCart = (cartItem) => {
    // проверка наличия аналогичного блюда в корзине
    if (cartArray.some((item) => item.id === cartItem.id)) {
      // если уже есть, то инкрементируем количество
      cartArray.map(item => {
        if (item.id === cartItem.id) {
          item.count++
        }
        return item
      })
    } else {
      // если аналогичного в корзине нет, то добавляем
      cartArray.push(cartItem)
    }
    // запихиваем слепок корзины в localStorage, сериализируя его в JSON
    localStorage.setItem('cart', JSON.stringify(cartArray))
  }

  // рендеринг карточек меню с загруженными из БД параметрами
  const renderItems = (data) => {
    data.forEach(({ description, id, image, name, price }) => {
      // создаем внешнюю обертку для карточки
      const card = document.createElement('div')
      // даем ей класс "card"
      card.classList.add('card')

      // шаблон элемента карточки блюда
      card.innerHTML = `
        <img
          src="${image}"
          alt="${name}"
          class="card-image" 
        />
        <div class="card-text">
          <div class="card-heading">
            <h3 class="card-title card-title-reg">${name}</h3>
          </div>
          <div class="card-info">
            <div class="ingredients">
              ${description}
            </div>
          </div>
          <div class="card-buttons">
            <button class="button button-primary button-add-cart">
              <span class="button-card-text">В корзину</span>
              <span class="button-cart-svg"></span>
            </button>
            <strong class="card-price-bold">${price} ₽</strong>
          </div>
        </div>
      `

      // обработчик нажатия на кнопку "в корзину"
      card.querySelector('.button-card-text').addEventListener('click', () => {
        //const carItem = {
        //  name: name,
        //  price: price,
        //  count: 1
        //}
        cartArray = JSON.parse(localStorage.getItem('cart')) || []

        addToCart({ name, price, id, count: 1 })  // добавляем в корзину еще одно блюдо
      })

      // добавляем в блок карточек новую в виде HTML
      cardsMenu.append(card)
    })
  }
  // вытаскиваем название ресторана из localStorage и распарсиваем его
  const restaurant = JSON.parse(localStorage.getItem('restaurant'))
  // если рестаран выбран, загружаем все его блюда из БД
  if (restaurant) {
    fetch(`https://test-65e8a-default-rtdb.firebaseio.com/db/${restaurant.products}`)
      .then((response) => response.json())
      .then((data) => {
        // рендерим все блюда из меню выбранного рестарана
        renderItems(data)
        // выводим заголовок ресторана
        changeTitle(restaurant)
      })
      .catch((error) => {
        console.log(error)
      })
  } else {
    // если ресторана в localStorage нет, то переходим на главную страницу
    window.location.href = '/'
  }
}

menu()