'use strict'

const canvas = document.querySelector('canvas')
canvas.width = innerWidth
canvas.height = innerHeight
const context = canvas.getContext('2d')

let isDrawing = false

canvas.onmousedown = startDrawing
canvas.onmousemove = draw
canvas.onmouseup = stopDrawing

function startDrawing(event) {
    isDrawing = true
    context.beginPath()
    draw(event)
}

function draw(event) {
    if (!isDrawing) return

    let x = event.offsetX
    let y = event.offsetY

    context.lineTo(x, y)
    context.stroke()
}

function stopDrawing() {
    isDrawing = false
}