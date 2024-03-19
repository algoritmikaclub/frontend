'use strict'
const canvas = document.querySelector('canvas')
canvas.width = 800
canvas.height = 600

const context = canvas.getContext('2d')

const imagesList = [
    'background_800x600px.png',
    'house_1.png', 'house_2.png',
    'snowman_1.png', 'snowman_2.png', 'snowman_3.png',
    'cloud_1.png', 'cloud_2.png', 'cloud_3.png', 'cloud_4.png',
    'snowflake_1.png', 'snowflake_2.png', 'snowflake_3.png', 'snowflake_4.png', 'snowflake_5.png',
    'tree_1.png', 'tree_2.png', 'tree_3.png',
    'fire_120x200px_24frames.png', 'fire_place.png',
]

let uploadedImageCounter = 0
let images = {}

imagesList.forEach( uploadImage )

function uploadImage(imageName) {
    let img = new Image()
    img.src = './images/' + imageName
    img.onload = imageUploaded
    images[imageName] = img
}

function imageUploaded() {
    uploadedImageCounter++
    if (uploadedImageCounter === imagesList.length) {
        draw()
    }
}

function flipImage(image, flipType='h') {
    const flippedImage = document.createElement('canvas')
    flippedImage.width = image.width
    flippedImage.height = image.height
    const FIContext = flippedImage.getContext('2d')

    switch(flipType) {
        case 'v':
            // scaleX, skewY, skewX, scaleY,  offsetX, offsetY
            FIContext.setTransform(1, 0, 0, -1, 0, 0)
            FIContext.drawImage( image, 0, -flippedImage.height)
            return flippedImage
        case 'vh':
        case 'hv':
            // scaleX, skewY, skewX, scaleY,  offsetX, offsetY
            FIContext.setTransform(-1, 0, 0, -1, 0, 0)
            FIContext.drawImage( image, -flippedImage.width, -flippedImage.height)
            return flippedImage
        default:
            // scaleX, skewY, skewX, scaleY,  offsetX, offsetY
            FIContext.setTransform(-1, 0, 0, 1, 0, 0)
            FIContext.drawImage( image, -flippedImage.width, 0, 0)
            return flippedImage
    }
}

function rotateImage(image, angle = 180) {
    const rotatedImage = document.createElement('canvas')
    const diagonal = Math.sqrt(image.width*image.width + image.height*image.height)
    const radius = diagonal * 0.5
    rotatedImage.width = diagonal
    rotatedImage.height = diagonal
    const RIContext = rotatedImage.getContext('2d')

    // scaleX, skewY, skewX, scaleY,  offsetX, offsetY
    RIContext.setTransform(1, 0, 0, 1, radius, radius)
    // поворачиваем изображение
    RIContext.rotate(angle * Math.PI / 180)
    // рисуем изображение
    RIContext.drawImage(image, -radius, -radius)
    return rotatedImage
}

function draw() {
    context.drawImage(images['background_800x600px.png'], 0, 0)

    context.drawImage(images['cloud_2.png'], -50, 20)
    context.drawImage(images['cloud_3.png'], 250, -20)
    context.drawImage(images['cloud_4.png'], 550, 0)

    context.drawImage(images['tree_2.png'], 50, 250, 115, 154)
    context.drawImage(images['tree_1.png'], 360, 230, 176, 228)

    context.drawImage(images['house_1.png'], 100, 250, 315, 259)

    context.drawImage(images['snowman_3.png'], 420, 420, 72, 109)

    context.drawImage(images['tree_3.png'], 470, 120)

    context.drawImage(images['fire_place.png'], 10, 520)
    context.drawImage(images['fire_120x200px_24frames.png'], 0, 0, 120, 200, 20, 370, 120, 200)

    for(let i = 0; i < 100; i++) {
        const snowflake = images[`snowflake_${i % 5 + 1}.png`]
        const snowflakeX = Math.random() * canvas.width - snowflake.width * 0.5
        const snowflakeY = Math.random() * canvas.height - snowflake.height * 0.5
        context.drawImage(snowflake, snowflakeX, snowflakeY)
    }
}