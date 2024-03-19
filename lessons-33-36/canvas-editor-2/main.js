'use strict'

const canvas = document.querySelector('canvas')
canvas.width = innerWidth
canvas.height = innerHeight
const context = canvas.getContext('2d')

let isDrawing = false

const toolsWidth = 120
const paletteColorSize = 45

context.font = '16px Arial, sans-serif'
context.fillText('[+] Add size', 15, 460)
context.fillText('[-] Subtract', 15, 480)
context.fillText('[S] Save', 15, 500)

context.lineCap = "round"
context.lineJoin = "round"

const palette = [
    { color:'#000000', x: 10, y: 120 + 55 * 0, },
    { color:'#ffffff', x: 65, y: 120 + 55 * 0, },
    { color:'#ff0000', x: 10, y: 120 + 55 * 1, },
    { color:'#ffff00', x: 65, y: 120 + 55 * 1, },
    { color:'#00ff00', x: 10, y: 120 + 55 * 2, },
    { color:'#00ffff', x: 65, y: 120 + 55 * 2, },
    { color:'#0000ff', x: 10, y: 120 + 55 * 3, },
    { color:'#ff00ff', x: 65, y: 120 + 55 * 3, },
]

function createTools() {
    context.strokeStyle = '#000000'
    context.moveTo(toolsWidth, 0)
    context.lineTo(toolsWidth, canvas.height)
    context.stroke()

    for(let i = 0; i < palette.length; i++) {
        context.fillStyle = palette[i].color
        context.fillRect(palette[i].x, palette[i].y, paletteColorSize, paletteColorSize)
        context.strokeRect(palette[i].x, palette[i].y, paletteColorSize, paletteColorSize)
    }

    setCurrentColor( '#000000' )

    setLineWidth( false )
}

createTools()

function setCurrentColor( color ) {
    let currentLineWidth = context.lineWidth

    context.lineWidth = 1
    context.strokeStyle = '#000000'
    context.fillStyle = color
    context.fillRect(10, 10, 100, 100)
    context.strokeRect(10, 10, 100, 100)
    context.strokeStyle = color

    context.lineWidth = currentLineWidth
}

function checkColorSelect(x, y) {
    for(let i = 0; i < palette.length; i++) {
        if (x > palette[i].x && x < palette[i].x + paletteColorSize
        && y > palette[i].y && y < palette[i].y + paletteColorSize) {
            setCurrentColor( palette[i].color )
            return
        }
    }
}

canvas.onmousedown = startDrawing
canvas.onmousemove = draw
canvas.onmouseup = stopDrawing

function startDrawing(event) {
    let x = event.offsetX
    let y = event.offsetY

    if (x > toolsWidth) {
        isDrawing = true
        context.beginPath()
        draw(event)
    } else {
        checkColorSelect(x, y)
    }
}

function draw(event) {
    if (!isDrawing) return

    let x = event.offsetX
    let y = event.offsetY

    if (x <= toolsWidth) return

    context.lineTo(x, y)
    context.stroke()
}

function stopDrawing() {
    isDrawing = false
}

document.onkeydown = getKeyDown
document.onkeyup = getKeyUp

function getKeyDown(event) {
    switch(event.code) {
        case 'KeyS':
            saveImage()
        break;
    }

    console.log(event)
}

function getKeyUp(event) {
    switch(event.code) {
        case 'NumpadAdd':
        case 'Equal':
            setLineWidth( true )
        break;

        case 'Minus':
        case 'NumpadSubtract':
            setLineWidth( false )
        break;
    }
}

function setLineWidth( isAdd = true ) {
    if (isAdd) {
        if (context.lineWidth < 100) {
            context.lineWidth++
        }
    } else {
        if (context.lineWidth > 1) {
            context.lineWidth--
        }
    }

    let currentLineWidth = context.lineWidth
    let currentStrokeStyle = context.strokeStyle

    context.clearRect(10, 340, 100, 100)

    context.beginPath()
    context.arc(60, 390, currentLineWidth * 0.5, 0, Math.PI * 2)
    context.fillStyle = '#000000'
    context.fill()

    context.lineWidth = 1
    context.strokeStyle = '#000000'
    
    context.strokeRect(10, 340, 100, 100)
    context.fillStyle = '#777777'
    context.fillText(`Pen size: ${currentLineWidth}`, 13, 356)

    context.lineWidth = currentLineWidth
    context.strokeStyle = currentStrokeStyle
}

function saveImage() {
    const offsetWithLine = toolsWidth + 1
    const canvasImage = document.createElement('canvas')
    canvasImage.width = canvas.width - offsetWithLine
    canvasImage.height = canvas.height
    const canvasImageContext = canvasImage.getContext('2d')
    canvasImageContext.drawImage(canvas, -offsetWithLine, 0)
    const image = canvasImage.toDataURL("image/png")

    const link = document.createElement("a")
    link.href = image
    link.download = "image.png"
    link.click()
}