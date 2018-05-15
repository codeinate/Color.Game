var numSquares = 6;
var colors = [];
var pickedColor;
var squares = document.querySelectorAll(".square"); //select all the divs with class square
var colorDisplay = document.getElementById("colorDisplay"); //grabs the span with id colorDisplay
var messageDisplay = document.querySelector("#message"); //grabs the span with id message to display if the selection was correct or wrong. 
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var modeButtons = document.querySelectorAll(".mode");

init();

function init(){
	//mode button listeners
	setUpModeButtons();
	setUpSquares();
	reset();
};

function setUpModeButtons () {
	for (var i=0; i < modeButtons.length; i++) {
		modeButtons[i].addEventListener("click", function() {
			modeButtons[0].classList.remove("selected");
			modeButtons[1].classList.remove("selected");
			this.classList.add("selected");	
			this.textContent === "Easy" ? numSquares = 3: numSquares =6;
			reset();
		});
	}
};

function setUpSquares() {
	for(var i=0; i < squares.length; i++) {
		//add click listener to squares
		squares[i].addEventListener("click", function(){
		//grab color of clicked square
		var clickedColor = this.style.backgroundColor;
		//compare color to pickedColor
		if (clickedColor === pickedColor) {
      		messageDisplay.textContent = "Correct!";
      		changeColors(pickedColor);
      		h1.style.backgroundColor = pickedColor;
      		resetButton.textContent = "Play Again?";
      	} else {
			this.style.backgroundColor = "#232323";
			messageDisplay.textContent = "Try Again";
		}
	})}
};

function reset() {
	//generate all new colors
	colors = generateRandomColors(numSquares);
	//pick new random color from array
	pickedColor = pickColor();
	//change colorDisplay ot match picked Color
	colorDisplay.textContent = pickedColor;
	resetButton.textContent = "New Colors";
	messageDisplay.textContent = "";
	//change colors of squares on page
	for(var i=0; i < squares.length; i++) {
		if (colors[i]) {
			squares[i].style.display = "block"; 
			squares[i].style.backgroundColor = colors[i]
		} else {
			squares[i].style.display = "none";
		}
	}
	h1.style.background = "steelblue";
};

resetButton.addEventListener("click", function() {
	reset();
});

function changeColors(color){
	//loop through all squares
	for(var i=0; i < squares.length; i++) {
		//change color to match give color
        squares[i].style.backgroundColor = color;
    }
	
}

function pickColor() {
	//pick random number
	var random = Math.floor(Math.random() * colors.length);
	return colors[random];
}

function generateRandomColors(num) {
	//make array
	var arr = []
	//add num random colors to aray, repeat num times
	for(var i = 0; i <num; i++) {
	//get random color and push into array
	arr.push(randomColor());
	}
	//return that array
	return arr;
}

function randomColor() {
	function rando() {
		return Math.floor(Math.random() * 256);
	}
	//pick a "red" from 0 to 255
	var r = rando();
	//pick green 0 to 255
	var g = rando();
	//pick blue
	var b = rando();
	return `rgb(${r}, ${g}, ${b})`;
};