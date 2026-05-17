let cards = [15, 15, 20, 20, 200, 200, 45, 45, 47, 47, 30, 30];
let shuffledCards;
let selectedid = null;
let gamediv = document.querySelector(`.game`);
let halt = false;
let timer;
let mode = 0, turn = 0, s1 = 0, s2 = 0;
let sizediv = document.querySelector("#size");
let maxdiv = document.querySelector("#maxnum");
let mindiv = document.querySelector("#minnum");

/*
Handles the click on a card.
selection and comparison.
*/
function selectToggle(id){
	if (halt) return;
	if(id === "c"+selectedid) return;
	if(document.querySelector(`#${id}`).classList.value.includes("correct")) return;
	let target = document.querySelector(`#${id}`);
	target.classList.toggle("selected");
	if(selectedid === null)
		selectedid = parseInt(id.substr(1));
	else{
		if(shuffledCards[selectedid]===shuffledCards[parseInt(id.substr(1))]){
			document.querySelector(`#${id}`).classList.add("correct");
			document.querySelector(`#${id} div div p`).innerHTML = document.querySelector(`#${id} div div p`).innerHTML + "<br>= " + shuffledCards[selectedid];
			document.querySelector(`#c${selectedid}`).classList.add("correct");
			document.querySelector(`#c${selectedid} div div p`).innerHTML = document.querySelector(`#c${selectedid} div div p`).innerHTML + "<br>= " + shuffledCards[selectedid];
			selectedid = null;
		}else{
			halt = true;
			timer = setTimeout(()=>{
				halt = false;
				document.querySelector(`#${id}`).classList.toggle("selected");
				document.querySelector(`#c${selectedid}`).classList.toggle("selected");
				selectedid = null;
			}, 2000);
		}
	}
}

function shuffle(input) {
	return input.sort(()=>Math.random()-0.5);
}

function start(forced){
	selectedid = null;
	halt = false;
	clearTimeout(timer);
	gamediv.innerHTML="";

	if(!forced){
		let size = parseInt(sizediv.value);
		let max = parseInt(maxdiv.value);
		let min = parseInt(mindiv.value);
		if(!sizediv.checkValidity()||!mindiv.checkValidity()||!maxdiv.checkValidity())
			return console.log("RETURNING???");;
		cards = generateArray(size===NaN?6:size, min===NaN?1:min, max===NaN?100:max);
	}
	
	shuffledCards = shuffle(cards);

	for (var i = 0; i < shuffledCards.length; i++) {
		gamediv.innerHTML+=`<div class="flip-card" id="c${i}" onclick="selectToggle('c${i}')">
  				<div class="flip-card-inner">
    				<div class="flip-card-front">
    				</div>
    				<div class="flip-card-back">
    					<p>${randomExpression(cards[i])}</p>
    				</div>
  				</div>
			</div>`
	}
}

// force game to start upon loading script
start(true);

/*
Generates a string containing a mathmatical expression that equals to value

value : number = the value that the expression equals to.
returns string

example : value = 2
returns "1+1"
*/
function randomExpression(value){
	let firstNum, secondNum;
	let keep = 0;
	if(Math.random()>0.5){
		firstNum = Math.floor(Math.random()*300);
		secondNum = value - firstNum;
		return secondNum>0?`${firstNum} + ${secondNum}`:`${firstNum} - ${-secondNum}`;
	}else{
		for (let i = Math.ceil(value/2); i>1 ; i--) {
			if(value%i === 0)
			{
				keep = `${Math.round(value/i)} x ${i}`
				if(Math.random()<0.35)
					return keep;
			}
		}
		if(keep) return keep;
	}
	firstNum = Math.ceil(Math.random()*20);
	return `${firstNum*value} / ${firstNum}`;
}


/* 
Generates an array of numbers, each number appears twice

size : number = the half size of the array.
rangeMin : number = the minimum possible value
rangeMax : number = the maximum possible value
returns number[size*2]
*/
function generateArray(size, rangeMin = 1, rangeMax = 100){
	let tempArray = [];
	let doubleArray = [];
	for (let i = 0; i < size; i++) {
		let tempNum = Math.floor(Math.random()*(rangeMax-rangeMin+1)+rangeMin);
		while(tempArray.includes(tempNum)){
			tempNum++;
		}
		tempArray.push(tempNum);
	}
	doubleArray = [...tempArray];
	for (let i = 0; i < tempArray.length; i++) {
		doubleArray.push(tempArray[i]);		
	}
	return doubleArray;
}

