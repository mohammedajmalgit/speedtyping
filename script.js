const RANDOM_QUOTE_API_URL = 'http://api.quotable.io/random'
const quoteDisplayElement = document.getElementById('quoteDisplay')
const quoteInputElement = document.getElementById('quoteInput')
const timerElement = document.getElementById('timer')
const scoreDisplay = document.getElementById('score')

let correct = true
let score = 0;

document.getElementById('next').addEventListener('click', renderNextQuote)

quoteInputElement.addEventListener('input', ()=>{
    const arrayQuote = quoteDisplayElement.querySelectorAll('span')
    const arrayValue = quoteInputElement.value.split('')
    arrayQuote.forEach((characterSpan, index)=>{
        const character = arrayValue[index]
        if(character == null){
            characterSpan.classList.remove('incorrect')
            characterSpan.classList.remove('correct')
            correct = false
        }else if(character === characterSpan.innerText  ){
            characterSpan.classList.add('correct')
            characterSpan.classList.remove('incorrect')
        }else{
            characterSpan.classList.remove('correct')
            characterSpan.classList.add('incorrect')
            correct = false
        }
    })
    if(correct) (addScore(), renderNextQuote())
    // if(correct) renderNextQuote()
})

function addScore(){
    scoreDisplay.innerText ="Score: "+ ++score;
    console.log("Score: "+score)
}

function getRandomQuote(){
    return fetch(RANDOM_QUOTE_API_URL)
    .then(response => response.json())
    .then(data => data.content)
}

async function renderNextQuote(){
    const quote = await getRandomQuote()
    quoteDisplayElement.innerHTML = ''
    quote.split('').forEach(character => {
        const characterSpan = document.createElement('span')        
        characterSpan.innerText = character
        quoteDisplayElement.appendChild(characterSpan)
    });
    quoteInputElement.value=null
    // scoreDisplay.innerText ="Score: "+ score++
    startTimer()
}

let startTime
function startTimer(){
    timerElement.innerText = 0
    startTime = new Date()  
    setInterval(() => {
        timer.innerText = getInterval()
    }, 1000);
}

function getInterval(){
    return Math.floor((new Date()-startTime)/1000)
}
renderNextQuote()