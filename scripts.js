const buttonStartGame = document.querySelector('.startGame')
const screensArr = document.querySelectorAll('.screen')
const buttonTimer = document.querySelector('.screen-container_btn')
const board = document.querySelector('.board')
const circle = document.createElement('img')
circle.setAttribute('src', 'HED.png')

let timeGame = 0;
let countVh = 0
let score = 0

let setIntervalCountTime;

const {min, max} = {min: 20, max: 70}

buttonStartGame.addEventListener('click', (event) =>{
	if (countVh != -100) {
		countVh = -100
	}
	screensArr.forEach((item) => item.style.transform = `translateY(${countVh}vh)`)
}, {once: true})

buttonTimer.addEventListener('click', initGame)

function initGame(event) {
	if (countVh != -200) {
		countVh = -200
	}
	if (event.target.closest('.btn')) {
		timeGame = parseInt(event.target.closest('.btn').dataset.time)
		screensArr.forEach((item) => item.style.transform = `translateY(${countVh}vh)`)
		buttonTimer.removeEventListener('click', initGame)
		startGame()
	}
}

function startGame() {
	score = 0
	drawCircle()
	setIntervalCountTime = setInterval(timeGameLine, 1000)
}
function timeGameLine() {
	if (timeGame >= 10) {
		screensArr[2].querySelector('span').innerHTML = `00:${timeGame}`
	} else {
		screensArr[2].querySelector('span').innerHTML = `00:0${timeGame}`
	}
	
	timeGame--
	if (timeGame < 0) {
		clearInterval(setIntervalCountTime)
		finishGame()
	}
}
function circleClick(event) {
	event.preventDefault()
	score++
	randomize(min, max)
}
function drawCircle() {

	randomize(min, max, true)

	circle.addEventListener('click', circleClick)	
}
function randomSize(min, max) {
	return Math.round(Math.random() * (max - min) + min)
}
function randomLocation(randomSizes) {
	const {width, height} = board.getBoundingClientRect()
	let randomX = Math.round((width - randomSizes) * Math.random())
	let randomY = Math.round((height - randomSizes) * Math.random())
	return [randomX, randomY]
}
function randomize(min, max, flag = false) {
	let randomSizes = randomSize(min, max)
	let arrLocation = randomLocation(randomSizes)
	let randomX = arrLocation[0]
	let randomY = arrLocation[1]
	circle.style.cssText = `
	width: ${randomSizes}px; height: ${randomSizes}px;
	top: ${randomY}px;
	left: ${randomX}px;
	`
	if (flag) {
		board.append(circle)
	}
}
function finishGame() {
	board.innerHTML = `
	<h2 class="count_score">Счёт: <span>${score}</span></h2>
	<h3>Играть</h3>
	`
	circle.removeEventListener('click', circleClick)
	board.querySelector('h3').addEventListener('click', () => {
		countVh = -100
		board.innerHTML = ``
		buttonTimer.addEventListener('click', initGame)
		screensArr.forEach((item) => item.style.transform = `translateY(${countVh}vh)`)
	}, {once: true})
}
