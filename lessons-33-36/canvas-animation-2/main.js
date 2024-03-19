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
    'fire_place.png', 'fire_120x200px_24frames.png',
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
        generateClouds()
        generateSnow()
        generateFire( images['fire_120x200px_24frames.png'], 120, 200, 24 )
        
        requestAnimationFrame( updateScreen )
    }
}

const clouds = []
const cloudsNumber = 8

function generateClouds() {
    for(let i = 0; i < cloudsNumber; i++) {
        const imageName = `cloud_${(i % 4) + 1}.png`
        const cloudImage = images[imageName]
        
        const cloud = {
            x: Math.floor(Math.random() * (canvas.width + cloudImage.width)) - cloudImage.width,
            y: Math.floor(Math.random() * (canvas.height * 0.5)) - cloudImage.height * 0.5,
            image: cloudImage,
            speed: 0.02 + Math.random() * 0.01,
        }
        
        clouds.push(cloud)
    }
}

function updateCloud(cloud) {
    cloud.x += cloud.speed * deltaTime
    if (cloud.x > canvas.width) {
        cloud.x = -cloud.image.width
        cloud.speed = 0.02 + Math.random() * 0.01
    }
    context.drawImage(cloud.image, cloud.x, cloud.y)
}

const snowflakes = []
const snowflakesNumber = 200

function generateSnow() {
    for(let i = 0; i < snowflakesNumber; i++) {
        const scale = 0.5 + Math.random() * 0.5
        const offsetX = (20 + Math.floor(Math.random() * 10)) * scale
        const image = images[`snowflake_${Math.ceil(Math.random() * 5)}.png`]
        const size = image.width * scale
        const x = Math.floor(Math.random() * (canvas.width + image.width)) - image.width
        const y = Math.floor(Math.random() * (canvas.height + image.height)) - image.height
        const speed = 0.03 + Math.random() * 0.02
        const minX = x - offsetX
        const maxX = x + offsetX
        const isToLeft = Math.random() < 0.5
        const snowflake = { x, y, size, offsetX, image, speed, minX, maxX, isToLeft }
        snowflakes.push(snowflake)
    }
}

function updateSnowflake(snowflake) {
    const speed = snowflake.speed * deltaTime
    snowflake.y += speed
    if (snowflake.isToLeft) {
        snowflake.x -= speed * 0.25
        if (snowflake.x < snowflake.minX) {
            snowflake.isToLeft = false
        }
    } else {
        snowflake.x += speed * 0.25
        if (snowflake.x > snowflake.maxX) {
            snowflake.isToLeft = true
        }
    }
    if (snowflake.y > canvas.height) {
        snowflake.y = -snowflake.image.height
    }
    context.drawImage(snowflake.image, snowflake.x, snowflake.y, snowflake.size, snowflake.size)
}

const fire = {
    x: 20,
    y: 360,
    fps: 30 + Math.floor(Math.random() * 31),
}
function generateFire(image, frameWidth, frameHeight, framesNumber) {
    fire.placeX = fire.x - 10,
    fire.placeY = fire.y + 150,

    fire.frame = 0
    fire.frames = []
    for (let stepY = 0; stepY < image.height; stepY += frameHeight) {
        for (let stepX = 0; stepX < image.width; stepX += frameWidth) {
            fire.frames.push({x: stepX, y: stepY}) 
        }
    }

    if (fire.frames.length > framesNumber) {
        fire.frames.length = framesNumber
    }

    fire.fps = 1000 / fire.fps
    fire.timeStamp = 0
}

function updateFire() {
    fire.timeStamp += deltaTime
    if (fire.timeStamp >= fire.fps) {
        fire.timeStamp -= fire.fps
        fire.frame++
        if (fire.frame === fire.frames.length) {
            fire.frame = 0
            const fps = 30 + Math.floor(Math.random() * 31)
            fire.fps = 1000 / fps
        }
    }
    
    context.drawImage(images['fire_place.png'], fire.placeX, fire.placeY)
    context.drawImage(
        images['fire_120x200px_24frames.png'],
        fire.frames[fire.frame].x, fire.frames[fire.frame].y, 120, 200,
        fire.x, fire.y, 120, 200
    )
}

let lastTimeStamp = 0
let deltaTime = 0

function updateScreen( timeStamp ){
    deltaTime = timeStamp - lastTimeStamp
    lastTimeStamp = timeStamp

    draw()

    requestAnimationFrame( updateScreen )
}

function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height)

    context.drawImage(images['background_800x600px.png'], 0, 0)

    clouds.forEach( updateCloud )

    context.drawImage(images['tree_2.png'], 50, 250, 115, 154)
    context.drawImage(images['tree_1.png'], 360, 230, 176, 228)

    context.drawImage(images['house_1.png'], 100, 250, 315, 259)

    context.drawImage(images['snowman_3.png'], 420, 420, 72, 109)

    context.drawImage(images['tree_3.png'], 470, 120)

    updateFire()

    snowflakes.forEach(updateSnowflake)
}