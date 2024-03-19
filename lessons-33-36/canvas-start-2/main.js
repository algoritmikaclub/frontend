'use strict'
const canvas = document.querySelector('canvas')
canvas.width = 800
canvas.height = 600

const context = canvas.getContext('2d')

// фон
context.fillStyle = '#00ffff'
context.fillRect(0, 0, canvas.width, canvas.height * 0.5)
context.fillStyle = '#00ff00'
context.fillRect(0, canvas.height * 0.5, canvas.width, canvas.height * 0.5)

// солнце
context.fillStyle = '#ffff00'
context.beginPath()
context.arc(515, 80, 50, 0, Math.PI * 2, false)
context.fill()

// облака
function drawCloud(x, y) {
    const radiusX = 60
    const radiusY = 30
    const points = [
        {x: x, y: y - radiusY},
        {x: x, y: y + radiusY},
        {x: x - radiusX, y: y},
        {x: x + radiusX, y: y},
    ] 
    context.fillStyle = '#ffffff'
    for (let i = 0; i < points.length; i++) {
        context.beginPath()
        context.ellipse(points[i].x, points[i].y, radiusX, radiusY, 0, 0, Math.PI * 2, false)
        context.fill()
    }
}
drawCloud(285, 55)
drawCloud(620, 90)

// деревья
function drawTree(x, y) {
    const radius = 50
    const trunkWidth = 20
    const trunkHeight = 130
    context.fillStyle = '#663333'
    context.fillRect(x - trunkWidth * 0.5, y, trunkWidth, trunkHeight)

    context.fillStyle = '#33cc33'
    const points = [
        {x: x, y: y - radius},
        {x: x - radius * 0.5, y: y},
        {x: x + radius * 0.5, y: y},
    ]
    for (let i = 0; i < points.length; i++) {
        context.beginPath()
        context.arc(points[i].x, points[i].y, radius, 0, Math.PI * 2, false)
        context.fill()
    }
}
drawTree(360, 220)
drawTree(535, 280)
drawTree(700, 200)

// дом
const windowSize = 30
const windowOffset = 10
const doorHeight = 60
context.fillStyle = '#e6e6e6'
context.fillRect(100, 120, 130, 260)
context.fillStyle = '#0000ff'
for (let y = 120 + windowOffset * 2; y < 120 + 260; y += windowOffset * 3 + windowSize) {
    for (let x = 100 + windowOffset; x < 100 + 130; x += windowOffset + windowSize) {
        context.fillRect(x, y, windowSize, windowSize)
    }
}
context.fillRect(
    100 + windowOffset * 2 + windowSize,
    120 + windowOffset * 11 + windowSize * 3,
    windowSize, doorHeight
)

// дорога
context.fillStyle = '#999999'
context.fillRect(0, 430, canvas.width, 130)
const lineWidth = 100
const lineHeight = 10
const lineOffset = 50
context.fillStyle = '#ffffff'
for (let x = lineOffset; x < canvas.width; x += lineOffset + lineWidth) {
    context.fillRect(x, 430 + 60, lineWidth, lineHeight)
}

// автомобили
function drawCar(x, y, color) {
    const bodyWidth = 150
    const bodyHeight = 30
    const bodyX = x - bodyWidth * 0.5

    const roofWidth = 120
    const roofHeight = 40
    const roofX = bodyX + roofWidth * 0.5

    const windowWidth = 70
    const windowHeight = 30
    const windowX = roofX + roofWidth * 0.5 - windowWidth * 0.5 - 5

    const wheelRadius = 20
    const wheelY = y + bodyHeight
    const wheelX1 = bodyX + wheelRadius + 10
    const wheelX2 = bodyX + bodyWidth - wheelRadius - 10
    // roof
    context.fillStyle = color
    context.beginPath()
    context.ellipse(roofX, y, roofWidth * 0.5, roofHeight * 0.5, 0, 0, Math.PI * 2, false)
    context.fill()
    // window
    context.fillStyle = '#ffffff'
    context.beginPath()
    context.ellipse(windowX, y, windowWidth * 0.5, windowHeight * 0.5, 0, 0, Math.PI * 2, false)
    context.fill()
    // body
    context.fillStyle = color
    context.fillRect(bodyX, y, bodyWidth, bodyHeight)
    // wheels
    context.fillStyle = '#000000'
    context.beginPath()
    context.arc(wheelX1, wheelY, wheelRadius, 0, Math.PI * 2, false)
    context.fill()
    context.beginPath()
    context.arc(wheelX2, wheelY, wheelRadius, 0, Math.PI * 2, false)
    context.fill()
}
drawCar(280, 420, '#ff0000')
drawCar(650, 480, '#0000ff')