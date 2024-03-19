'use strict'
const canvas = document.querySelector('canvas')
canvas.width = 800
canvas.height = 600

const context = canvas.getContext('2d')

context.beginPath()
context.strokeStyle = '#00ff00'
context.lineWidth = 1
const step = 50

for (let y = step; y < canvas.height; y += step) {
    context.moveTo(0, y)
    context.lineTo(canvas.width, y)
}

for (let x = step; x < canvas.width; x += step) {
    context.moveTo(x, 0)
    context.lineTo(x, canvas.height)
}
context.stroke()

function drawSide(p1, p2, p3, p4, lineWidth, color) {
    context.strokeStyle = color
    context.lineWidth = lineWidth

    context.beginPath()
    context.moveTo(p1.x, p1.y)
    context.lineTo(p2.x, p2.y)
    context.lineTo(p3.x, p3.y)
    context.lineTo(p4.x, p4.y)
    context.closePath()
    context.stroke()
}

function drawLine(p1, p2, lineWidth, color) {
    context.strokeStyle = color
    context.lineWidth = lineWidth

    context.beginPath()
    context.moveTo(p1.x, p1.y)
    context.lineTo(p2.x, p2.y)
    context.stroke()
}

let side = step * 6
let sideD = step * 3
// front
let pFrontTopLeft = {x: step * 3, y: step * 5}
let pFrontTopRight = {x: pFrontTopLeft.x + side, y: pFrontTopLeft.y}
let pFrontBottomRight = {x: pFrontTopLeft.x + side, y: pFrontTopLeft.y + side}
let pFrontBottomLeft = {x: pFrontTopLeft.x, y: pFrontTopLeft.y + side}
// top
let pTopLeft = {x: pFrontTopLeft.x + sideD, y: pFrontTopLeft.y - sideD}
let pTopRight = {x: pFrontTopRight.x + sideD, y: pFrontTopRight.y - sideD}
//right
let pRightTop = {x: pFrontTopRight.x + sideD, y: pFrontTopRight.y - sideD}
let pRightBottom = {x: pFrontBottomRight.x + sideD, y: pFrontBottomRight.y - sideD}
// back
let pBackBottomLeft = {x: pFrontBottomLeft.x + sideD, y: pFrontBottomLeft.y - sideD}

drawLine(pFrontBottomLeft, pBackBottomLeft, 1, '#ffff00')
drawLine(pBackBottomLeft, pTopLeft, 1, '#ffff00')
drawLine(pBackBottomLeft, pRightBottom, 1, '#ffff00')

drawSide(pFrontTopLeft, pFrontTopRight, pFrontBottomRight, pFrontBottomLeft, 3, '#ffff00')
drawSide(pFrontTopLeft, pTopLeft, pTopRight, pFrontTopRight, 3, '#ffff00')
drawSide(pFrontTopRight, pRightTop, pRightBottom, pFrontBottomRight, 3, '#ffff00')