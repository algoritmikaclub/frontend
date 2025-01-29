'use strict'

// контейнер, для добавления товаров
const catalog = document.getElementById("catalog")

// число товаров в корзине
const cartProductCounter = document.getElementById("cart-product-counter")

// проверяем, заканчивается путь текущего URL на 'cart.html'
// isCart = true - значит мы в корзине (cart.html)
const isCart = window.location.pathname.endsWith('cart.html')

// отслеживаем изменения в поле ввода поискового запроса
if (isCart === false) {
    const searchInput = document.getElementById("search")
    const searchButton = document.getElementById("search-button")
    searchButton.onclick = () => checkSearchInput( searchInput.value.trim() )
}

// функция обработки поика
function checkSearchInput( searchValue ) {
    const phones = catalog.querySelectorAll(".phone-card")

    if (searchValue === '') {
        // фильтр сброшен - показываем все карточки товаров
        phones.forEach( phone => phone.style.display = 'block')
        return
    }

    const searchText = searchValue.toLowerCase()
    phones.forEach( phone => {
        const phoneText = phone.textContent.toLowerCase()
        if (phoneText.indexOf(searchText) > -1) {
            phone.style.display = 'block'
        } else {
            phone.style.display = 'none'
        }
    })
}

function recalculateOrderSum() { 
    let sum = 0
    const phones = catalog.querySelectorAll(".phone-card")
    phones.forEach( phone => {
        const countSpan = phone.querySelector(".order-counter")
        const count = +countSpan.innerText

        const priceDiv = phone.querySelector(".price")
        const priceSpan = priceDiv.querySelector("span")
        const price = +priceSpan.innerText

        if (price > 0 && count > 0) {
            sum += price * count
        }
    })

    const orderTotalSum = document.getElementById("order-total-sum")
    orderTotalSum.innerText = sum + ' $'
}

// проверяем заказ в local storage
let order = {}
let storageData = localStorage.getItem('order')
if (storageData) {
    order = JSON.parse(storageData)

    if (isCart === false) {
        // считаем товары в корзине
        let count = 0
        for(let productName in order) {
            count += order[productName]
        }
        cartProductCounter.innerText = count
    }
}

// сохранение текущих заказов
function updateLocalStorage() {
    const storageData = JSON.stringify(order)
    localStorage.setItem('order', storageData)
}

// обновление счетчика корзины
function updateCartCounter(value) {
    if (isCart === true) {
        return
    }

    const count = +cartProductCounter.innerText
    cartProductCounter.innerText = count + value
}

// добавление товара к заказу
function orderAdd(productKey) {
    if (productKey in order) {
        order[productKey]++
    } else {
        order[productKey] = 1
    }
    updateLocalStorage()
    updateCartCounter(1)
    return order[productKey]
}

// удаление товара из заказа
function orderRemove(productKey) {
    if (productKey in order === false) {
        return 0
    }

    order[productKey]--
    updateCartCounter(-1)

    const count = order[productKey]
    if (count === 0) {
        delete order[productKey]
    }

    updateLocalStorage()
    return count
}

// запрашиваем загрузку JSON - файла
// после загрузки передаем данные в функцию uploadProducts
fetch("./data/products.json").then( uploadProducts )

function uploadProducts(data) {
    // считываем данные (объект с товарами) из файла в формате JSON
    // и передаем их в функцию getProducts, уже в виде обычного JS-объекта
    data.json().then( getProducts )
}

// добавление товаров в каталог после загрузки из JSON-файла
function getProducts(data) {
    for(let phoneName in data) {
        if (isCart === true) {
            if (phoneName in order) {
                const phoneData = data[phoneName]
                const phoneCard = getProductCard(phoneName, phoneData)
                catalog.append(phoneCard)
            }
        } else {
            const phoneData = data[phoneName]
            const phoneCard = getProductCard(phoneName, phoneData)
            catalog.append(phoneCard)
        }
    }

    if (isCart === true) {
        recalculateOrderSum()
    }
}

// создание карточки товара
function getProductCard(phoneName, phoneData) {
    // создаем контейнер карточки товара
    const phoneCard = document.createElement('div')
    phoneCard.className = "phone-card"

    // название товара
    const cardTitle = document.createElement('h4')
    cardTitle.innerText = phoneName
    phoneCard.append(cardTitle) // добавляем в контейнер

    // изображения 
    const cardImagesSlider = getImagesSlider(phoneData.images)
    phoneCard.append(cardImagesSlider)

    // описание
    const descriptionDiv = getDescriptionDiv(phoneName, phoneData)
    phoneCard.append(descriptionDiv)

    return phoneCard
}

// создание слайдера с изображениями товара
function getImagesSlider(imagesList) {
    // создаем контейнер слайдов
    const imagesSlider = document.createElement('div')
    imagesSlider.className = 'slider-wrapper'

    // добавляем изображения в контейнер
    for(let i = 0; i < imagesList.length; i++) {
        const image = new Image()
        image.src = './images/' + imagesList[i]
        if (i === 0) {
            image.className = 'slide-image visible'
        } else {
            image.className = 'slide-image'
        }
        imagesSlider.append(image)
    }

    // создаем кнопки для переключения изображений
    if (imagesList.length > 1) {
        const arrowForward = new Image()
        arrowForward.src = './icons/arrow_forward.svg'
        arrowForward.className = "arrow forward"
        arrowForward.onclick = () => showForwardImage(imagesSlider)
        imagesSlider.append(arrowForward)

        const arrowBack = new Image()
        arrowBack.src = './icons/arrow_back.svg'
        arrowBack.className = "arrow back"
        arrowBack.onclick = () => showBackImage(imagesSlider)
        imagesSlider.append(arrowBack)
    }

    return imagesSlider
}

// предыдущее изображение в слайдере товара
function showBackImage(slider) {
    const images = slider.querySelectorAll('.slide-image')
    let index = 0
    while (index < images.length) {
        if(images[index].classList.contains('visible')) {
            images[index].classList.remove('visible')
            if (index > 0) {
                images[index - 1].classList.add('visible')
            } else {
                images[images.length - 1].classList.add('visible')
            }
            index = images.length
        }
        index++
    }
}

// следующее изображение в слайдере товара
function showForwardImage(slider) {
    const images = slider.querySelectorAll('.slide-image')
    let index = 0
    while (index < images.length) {
        if(images[index].classList.contains('visible')) {
            images[index].classList.remove('visible')
            if (index === images.length - 1) {
                images[0].classList.add('visible')
            } else {
                images[index + 1].classList.add('visible')
            }
            index = images.length
        }
        index++
    }
}

// создание блока с описанием товара
function getDescriptionDiv(phoneName, phoneData) {
    const descriptionDiv = document.createElement('div')
    descriptionDiv.className = "description"

    const brand = getDescriptionP('Бренд', phoneData.brand)
    descriptionDiv.append(brand)

    const model = getDescriptionP('Модель', phoneData.model)
    descriptionDiv.append(model)

    const OS = getDescriptionP('Операционная система', phoneData.OS)
    descriptionDiv.append(OS)

    const screenSizeInfo = phoneData.screen.diagonal + '" '
        + phoneData.screen.width + "x" + phoneData.screen.height
        + ' ' + phoneData.screen.type
    const screenSize = getDescriptionP('Экран', screenSizeInfo)
    descriptionDiv.append(screenSize)

    const screenUpdateRate = getDescriptionP('Частота обновления экрана', phoneData.screen.updateRate + ' Гц')
    descriptionDiv.append(screenUpdateRate)

    const RAM_ROM = getDescriptionP('Память ОЗУ/ПЗУ', phoneData.RAM + '/' + phoneData.ROM + ' ГБ')
    descriptionDiv.append(RAM_ROM)

    const camera = getDescriptionP('Камера', phoneData.camera + ' Мпкс.')
    descriptionDiv.append(camera)

    const battery = getDescriptionP('Батарея', phoneData.battery + ' мА/ч.')
    descriptionDiv.append(battery)

    const simSlots = getDescriptionP('Число симкарт', phoneData.simSlots)
    descriptionDiv.append(simSlots)

    const priceDiv = document.createElement('div')
    priceDiv.className = "price"
    priceDiv.innerHTML = `Цена: <span>${phoneData.price}</span> $`
    descriptionDiv.append(priceDiv)

    /*
    const addToCartButton = document.createElement('button')
    addToCartButton.innerText = 'В КОРЗИНУ'
    descriptionDiv.append(addToCartButton)
    */
    const productOrderDiv = getProductOrderDiv(phoneName)
    descriptionDiv.append(productOrderDiv)

    return descriptionDiv
}

// создание текстового поля с описанием товара
function getDescriptionP(label, text) {
    const descriptionP = document.createElement('p')
    descriptionP.innerHTML = `${label}: <span>${text}</span>`
    return descriptionP
}

// создание кнопок заказа и счетчика товара
function getProductOrderDiv(phoneName) {
    const orderDiv = document.createElement('div')
    orderDiv.className = 'order'

    // кнопка добавления в корзину первого товара
    const firstButton = document.createElement('button')
    firstButton.innerText = 'В КОРЗИНУ'
    firstButton.onclick = () => {
        const counter = orderAdd(phoneName)
        // обновляем кнопки заказа и счетчик
        updateProductOrderDiv(firstButton, removeButton, counterSpan, counter, addButton)
    }
    orderDiv.append(firstButton)
        
    // кнопка удаления товара из корзины
    const removeButton = document.createElement('button')
    removeButton.className = 'change-order-button'
    removeButton.innerText = '-'
    removeButton.onclick = () => {
        const counter = orderRemove(phoneName)
        // обновляем кнопки заказа и счетчик
        updateProductOrderDiv(firstButton, removeButton, counterSpan, counter, addButton)
    }
    orderDiv.append(removeButton)

    // счетчик заказанных товаров
    const counterSpan = document.createElement('span')
    counterSpan.className = 'order-counter'
    counterSpan.innerText = 0
    orderDiv.append(counterSpan)

    // кнопка добавления товара в корзину
    const addButton = document.createElement('button')
    addButton.className = 'change-order-button'
    addButton.innerText = '+'
    addButton.onclick = () => {
        const counter = orderAdd(phoneName)
        // обновляем кнопки заказа и счетчик
        updateProductOrderDiv(firstButton, removeButton, counterSpan, counter, addButton)
    }
    orderDiv.append(addButton)

    // обновляем кнопки заказа и счетчик
    let counter = 0
    if (phoneName in order) {
        counter = order[phoneName]
    }
    updateProductOrderDiv(firstButton, removeButton, counterSpan, counter, addButton)

    return orderDiv
}

// обновление кнопок заказа и счетчика товара
function updateProductOrderDiv(firstButton, removeButton, counterSpan, counter, addButton) {
    counterSpan.innerText = counter

    if (counter > 0) {
        firstButton.style.display = 'none'
        removeButton.style.display = 'inline'
        counterSpan.style.display = 'inline'
        addButton.style.display = 'inline'
    } else {
        firstButton.style.display = 'inline'
        removeButton.style.display = 'none'
        counterSpan.style.display = 'none'
        addButton.style.display = 'none'
    }

    if (isCart === true) {
        recalculateOrderSum()
    }
}