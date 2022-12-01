const questions = [
	{
		question: "Which language works in browser?",
		answers: ["Java", "C", "Python", "JavaScript"],
		correct: 4,
	},
	{
		question: "What does CSS mean?",
		answers: [
			"Central Style Sheets",
			"Cascading Style Sheets",
			"Cascading Simple Sheets",
			"Cars SUVs Sailboats",
		],
		correct: 2,
	},
	{
		question: "What does HTML mean?",
		answers: [
			"Hypertext Markup Language",
			"Hypertext Markdown Language",
			"Hyperloop Machine Language",
			"Helicopters Terminals Motorboats Lamborginis",
		],
		correct: 1,
	},
	{
		question: "In what year JS was created?",
		answers: ["1996", "1995", "1994", "все ответы неверные"],
		correct: 2,
	},
];

//Find elements
const headerContainer = document.querySelector('#header');
const listContainer = document.querySelector('#list');
const submitBtn = document.querySelector('#submit');

//Game vars
let score = 0; //Quantity of the right answers
let questionIndex = 0; //Current question

clearPage()
showQuestion()
submitBtn.onclick = checkAnswer;

function clearPage(){
	headerContainer.innerHTML = '';
	listContainer.innerHTML = '';
}

function showQuestion(){

	const headerTemplate = `<h2 class="title">%title%</h2>`
	const title = headerTemplate.replace('%title%', questions[questionIndex]['question'])

	headerContainer.innerHTML = title;

	let answerNumber = 1;

	for (answerText of questions[questionIndex]['answers']){
		
		
		const questionTemplate = `
			<li>
				<label>
					<input value="%number%" type="radio" class="answer" name="answer" />
					<span>%answer%</span>
				</label>
			</li>
			`;

		const answerHTML = questionTemplate.replace('%answer%', answerText).replace('%number%', answerNumber);

		listContainer.innerHTML += answerHTML;

		answerNumber++;
	}

}

function checkAnswer(){

	//Find the chosen radio button
	const checkedRadio = listContainer.querySelector('input[type="radio"]:checked');
	
	//If answer isn't chosen, end the function
	if (!checkedRadio){
		submitBtn.blur();
		return
	}

	const userAnswer = parseInt(checkedRadio.value);

	//Check the answer is right
	if (userAnswer === questions[questionIndex]['correct']){
		score++;
	}

	if (questionIndex !== questions.length - 1){
		questionIndex++;
		clearPage();
		showQuestion();
		return;
	} else {
		clearPage();
		showResults();
	}
	
	}

function showResults(){
	console.log('Show results')

	const resultsTemplate = `<h2 class="title">%title%</h2>
	<h3 class="summary">%message%</h3>
	<p class="result">%result%</p>`

	if (score === questions.length){
		title = 'Congratulations!';
		message = 'You answered all right!';
	} else if ((score * 100) / questions.length >= 50){
		title = 'Not bad';
		message = 'You answered half of questions';
	} else {
		title = 'You should try again';
		message = 'You got less than half of right answers'
	}

	//Result

	let result = `${score} of ${questions.length}`

	//Final message, send data into template

	const finalMessage = resultsTemplate.replace('%title%',title).replace('%message%',message).replace('%result%', result);
	headerContainer.innerHTML = finalMessage;

	//Change button to start again

	submitBtn.blur();
	submitBtn.innerHTML = 'Start again';
	submitBtn.onclick = () => history.go();
}
	