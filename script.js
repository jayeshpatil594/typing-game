
const word = document.getElementById('word')
const text = document.getElementById('text')
const settingsForm = document.getElementById('settings-form')
const selectDifficulty = document.getElementById('difficulty')
const scoreElement = document.getElementById('score')
const timeElelment = document.getElementById('time')
const endgame = document.getElementById('end-game-container')
const settings = document.getElementById('settings')


const words =[
    'admit',
    'academic',
    'access',
    'acid',
    'abandoned',
    'builds',
    'bunch',
    'butter',
    'buzz',
    'cadillac',
    'calculated',
    'cameroon',
    'capture',
    'conventional',
    'destination',
    'detection',
    'dialog',
    'disclosure',
    'ecommerce',
    'sigh',
    'tense',
    'airplane',
    'ball',
    'pies',
    'juice',
    'warlike',
    'bad',
    'north',
    'dependent',
    'steer',
    'silver',
    'highfalutin',
    'superficial',
    'quince',
    'eight',
    'feeble',
    'drag',
    'loving',
]

let randomWord
let score = 0
let time = 10

let difficulty = localStorage.getItem('difficulty') !== null ? localStorage.getItem('difficulty') : 'medium'

selectDifficulty.value = localStorage.getItem('difficulty') !== null ? localStorage.getItem('difficulty') : 'medium'

text.focus()

const timeInterval = setInterval(updateTime, 1000)

function getRandomWord(){
    return words[Math.floor(Math.random() * words.length)]
}

function addWordToDOM() {
    randomWord = getRandomWord();
    word.innerHTML = randomWord;
}

function updateTime(){
    time--;
    timeElelment.innerHTML = time + 's'
    if(time == 0){
        clearInterval(timeInterval)
        gameOver()
    }
}

function updateScore(){
    score++
    scoreElement.innerHTML = score
}

function gameOver(){
    endgame.innerHTML = `
    <h1>Time Over!</h1>
    <p>Your final score is ${score}</p>
    <button onclick="location.reload()" style="width: 120px; border-radius: 5px; height: 50px; font-weight: bolder;">Reload</button>
  `
  endgame.style.display = 'flex'
}

addWordToDOM()

text.addEventListener('input', e => {
    const insertedText = e.target.value

    if(insertedText === randomWord){
        addWordToDOM()
        updateScore()

        e.target.value = ''

        if(difficulty === 'hard'){
            time += 2
        }
        else if(difficulty === 'medium'){
            time += 3
        }
        else if(difficulty === 'easy'){
            time += 4
        }
        else{
            time += 5
        }
        updateTime()
    }
})

settingsForm.addEventListener('change', e => {
    difficulty = e.target.value
    localStorage.setItem('difficulty', difficulty)
})
