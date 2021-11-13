const cart = () => {

  const buttonCart = document.getElementById("cart-button");
  const modalCart = document.querySelector('.modal-cart')
  const close = modalCart.querySelector('.close')
  const buttonClearCart = modalCart.querySelector('.clear-cart')
  const modalClear = document.querySelector('.modal-clear')
  const buttonAccept = modalCart.querySelector('.button-accept')
  const cartBody = document.querySelector('.modal-body')

  const incrementCount = (id) => {
    const cartArray = JSON.parse(localStorage.getItem('cart'))

    cartArray.map((item) => {
      if (item.id === id) {
        item.count++
      }
      return item
    })

    localStorage.setItem('cart', JSON.stringify(cartArray))
    renderItems(cartArray)
  }

  const decrementCount = (id) => {
    const cartArray = JSON.parse(localStorage.getItem('cart'))

    cartArray.map((item) => {
      if (item.id === id) {
        item.count = item.count > 0 ? item.count - 1 : 0
      }
      return item
    })

    localStorage.setItem('cart', JSON.stringify(cartArray))
    renderItems(cartArray)
  }

  const renderItems = (data) => {
    cartBody.innerHTML = ``
    data.forEach(({ name, price, id, count }) => {

      const cartElement = document.createElement('div')

      cartElement.classList.add('food-row')

      cartElement.innerHTML = `
        <span class="food-name">${name}</span>
            <strong class="food-price">${price} ₽</strong>
            <div class="food-counter">
              <button class="counter-button btn-dec">-</button>
              <span class="counter">${count}</span>
              <button class="counter-button btn-inc">+</button>
            </div>
      `
      cartBody.append(cartElement)

      cartElement.querySelector('.btn-dec').addEventListener('click', () => {
        decrementCount(id)
      })

      cartElement.querySelector('.btn-inc').addEventListener('click', () => {
        incrementCount(id)
      })
    });
  }

  buttonCart.addEventListener('click', () => {
    const cart = JSON.parse(localStorage.getItem('cart'))

    if (cart) {
      renderItems(cart)
      modalCart.classList.add('is-open')
    }
  })

  close.addEventListener('click', () => {
    modalCart.classList.remove('is-open')
  })

  buttonClearCart.addEventListener('click', () => {

    const buttonClearAccept = modalClear.querySelector('.button-clear')
    const buttonEscape = modalClear.querySelector('.button-escape')

    modalCart.classList.remove('is-open')
    modalClear.classList.add('is-open')

    buttonClearAccept.addEventListener('click', () => {

      localStorage.removeItem('cart')
      modalClear.classList.remove('is-open')
      modalCart.classList.remove('is-open')
    })

    buttonEscape.addEventListener("click", () => {

      modalClear.classList.remove('is-open')
      modalCart.classList.add('is-open')
    })
  })

  buttonAccept.addEventListener('click', () => {

  })
}

cart()
