let currentQuestion = 0;
let correctAnswers = 0;

showQuestion();

document.querySelector('.scoreArea button').addEventListener('click', resetEvent)


function showQuestion() {
    if (questions[currentQuestion]) {
        let q = questions[currentQuestion];

        let pct = Math.floor((currentQuestion / questions.length) * 100)

        document.querySelector('.scoreArea').style.display = 'none'
        document.querySelector('.questionArea').style.display = 'block'

        document.querySelector('.question').innerHTML = q.question

        document.querySelector('.options').innerHTML = '';

        let optionsHtml = ''

        for (let i in q.options) {
            optionsHtml += `<div data-op="${i}" class="option"><span>${parseInt(i) + 1}</span>${q.options[i]}</div>`
        }

        document.querySelector('.options').innerHTML = optionsHtml;

        document.querySelectorAll('.options .option').forEach(item => {
            item.addEventListener('click', optionClickEvent);
        })

        document.querySelector('.progress--bar').style.width = `${pct}%`
    } else {
        finishQuiz();
    }
}

function optionClickEvent(e) {
    let clickedOption = parseInt(e.target.getAttribute('data-op'))

    if (questions[currentQuestion].answer === clickedOption) {
        correctAnswers++
        document.querySelector('.progress--bar').style.backgroundColor = `#00FF00`
    } else {
        document.querySelector('.progress--bar').style.backgroundColor = `red`
    }
    currentQuestion++
    showQuestion()
}

function finishQuiz() {
    let points = Math.floor((correctAnswers / questions.length) * 100)
    let scoreText1 = '';
    let scorePct = ''

    if (points < 30) {
        scoreText1 = 'Tá ruim em?!'
        scorePct = '#FF0000'
    } else if (points >= 30 && points < 70) {
        scoreText1 = 'Muito bom!'
        scorePct = '#FFFF00'
    } else {
        scoreText1 = 'Parabéns!!'
        scorePct = '#0D630D'
    }

    document.querySelector('.scoreText1').innerHTML = scoreText1;
    document.querySelector('.scorePct').style.color = scorePct;

    document.querySelector('.scorePct').innerHTML = `Acertou ${points}%`
    document.querySelector('.scoreText2').innerHTML = `Você respondeu ${questions.length} questões e acertou ${correctAnswers}.`


    document.querySelector('.scoreArea').style.display = 'block'
    document.querySelector('.questionArea').style.display = 'none'
    document.querySelector('.progress--bar').style.width = `100%`


}

function resetEvent() {
    correctAnswers = 0
    currentQuestion = 0
    showQuestion();
}