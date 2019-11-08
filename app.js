const qwerty = document.querySelector('#qwerty');
const phrase = document.querySelector('#phrase');
const overlay = document.querySelector('#overlay');
const enter = document.querySelector('.btn__reset');
const phraseUL = document.querySelector('#phrase ul');
const keyboard = document.querySelector('#qwerty');
const heartList = document.querySelector('#scoreboard ol');
const heartArray = document.querySelectorAll('.tries img');
const heart = document.querySelector('.tries img');

let missed = 0;
let phrases =
  ['all present and correct','hoist with your own petard',
    'lions led by donkeys','kilroy was here',
    'fifth column','steal a march',
    'rank and file','moaning minnie',
    'loose lips sink ships','give no quarter'];

enter.addEventListener('click', () => {
	if (enter.textContent === 'Enter the Western Front') {
		startGame();
		overlay.style.display = 'none';
	} else {
		resetGame();
		startGame();
		overlay.style.display = 'none';
	}
});

function getRandomPhraseAsArray(arr) {
	const randomNumber = Math.floor(Math.random() * arr.length);
	const randomPhrase = arr[randomNumber];
	const characters = randomPhrase.split('');
	return characters;
}

function addPhraseToDisplay(arr) {
	for (let i = 0; i < arr.length; i++) {
		const li = document.createElement('li');
		li.textContent = arr[i];
		phraseUL.append(li);
		const letters = /^[0-9a-zA-Z]+$/;
		if (li.textContent.match(letters)) {
			li.className = 'letter';
		} else {
			li.className = '';
			li.style.margin = '1em';
		}
	}
}

keyboard.addEventListener('click', (e) => {
	if (e.target.tagName === 'BUTTON') {
		const button = e.target;
		button.className = 'chosen';
		button.setAttribute('disabled', '');
		const letter = button.textContent;
		const letterFound = checkLetter(letter);

		if (letterFound === null) {
			heartArray[missed].src = 'images/lostHeart.png';
			button.className = 'wrong';
			missed++;
		}
	}
	checkWin();
})

function checkLetter(letter) {
	const letters = document.querySelectorAll('.letter');
	let matchingLetter;
	let matchCounter = 0;

	for (let i = 0; i < letters.length; i++) {
		if (letter === letters[i].textContent) {
			letters[i].className += ' show';
			matchingLetter = letter;
			matchCounter++;
		}
	}
	if (matchCounter > 0) {
		return matchingLetter;
	} else {
		return null;
	}
}

function checkWin() {
	const totalLetters = document.querySelectorAll('.letter');
	const shownLetters = document.querySelectorAll('.show');
	const h3 = document.createElement('h3');

	if (shownLetters.length === totalLetters.length) {
		removeShowClass();
		overlay.className = 'win';
		overlay.style.display = 'flex';
    overlay.appendChild(h3);
    overlay.appendChild(enter);
		enter.textContent = 'Play Again';
		h3.textContent = 'You Advanced by Bounds!';
		showCorrectPhrase();
	} else if (missed >= 5) {
		removeShowClass();
		overlay.className = 'lose';
		overlay.style.display = 'flex';
		overlay.appendChild(h3);
		overlay.appendChild(enter);
		enter.textContent = 'Try Again';
		h3.textContent = 'You Died In Battle!';
		showCorrectPhrase();
	}
}

function removeShowClass() {
	for (let i = 0; i < phraseUL.children.length; i++) {
		phraseUL.children[i].classList.remove('show');
	}
}

function startGame() {
	const phraseArray = getRandomPhraseAsArray(phrases);
	addPhraseToDisplay(phraseArray);
}

function resetGame() {
	missed = 0;

	while (phraseUL.firstChild) {
		phraseUL.removeChild(phraseUL.firstChild);
	}

	const h3 = document.querySelector('h3');
	h3.parentNode.removeChild(h3);

	for (let i = 0; i < heartArray.length; i++) {
		heartArray[i].src = 'images/liveHeart.png';
	}

	const keyboardButton = document.querySelectorAll('#qwerty button');
	for (let i = 0; i < keyboardButton.length; i++) {
		keyboardButton[i].classList.remove('chosen');
		keyboardButton[i].classList.remove('wrong');
		keyboardButton[i].removeAttribute('disabled');
	}
}