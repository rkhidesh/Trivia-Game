const api_url = "https://opentdb.com/api.php?amount=10&difficulty=easy&type=boolean";
const triviaQ = document.getElementById("triviaQuestion")
let score = 0
let question_array = []
let correctAnswer = []
let c = 0
let disabled = false

var decodeEntities = (function() {
    var element = document.createElement('div');
  
    function decodeHTMLEntities (str) {
      if(str && typeof str === 'string') {
        str = str.replace(/<script[^>]*>([\S\s]*?)<\/script>/gmi, '');
        str = str.replace(/<\/?\w(?:[^"'>]|"[^"]*"|'[^']*')*>/gmi, '');
        element.innerHTML = str;
        str = element.textContent;
        element.textContent = '';
      }
  
      return str;
    }
  
    return decodeHTMLEntities;
})();

async function getAPI(api_url) {
    const response = await fetch(api_url);

    var data = await response.json();
    for (let n = 0; n <= 9; n++) {
        question_array.push(decodeEntities(data.results[n].question))
        correctAnswer.push(data.results[n].correct_answer)        
    }
    triviaQ.textContent = question_array[0];
}

function checkAnswer(response) {
    if(disabled == true) return;
    disabled = true;
    if(correctAnswer[c] == response)
    { 
        let updated_score = score += 1
        document.getElementById("score").innerHTML = `Score: ${updated_score}/10`
        document.getElementById("flashcard").style.backgroundColor = "#00FF00"
    }
    else document.getElementById("flashcard").style.backgroundColor = "#FF0000"
    
    var myTimeout = setTimeout(function () {
        document.getElementById("flashcard").style.backgroundColor = "white"
        triviaQ.textContent = question_array[c];
        disabled = false
    }, 2000)

    if (c == 9) {
        setTimeout(function () {
            document.getElementById('trueBtn').disabled = true;
            document.getElementById('falseBtn').disabled = true;
            document.getElementById("score").innerHTML = " "
            triviaQ.textContent = `🎉 Final Score: ${score} 🎉`
            document.getElementById("flashcard").style.backgroundColor = "white"
            document.getElementById("restart").style.visibility = "visible";
            document.getElementById("restart").innerHTML = "Play Again"
            clearTimeout(myTimeout)
            disabled = false
        }, 2000)

    }
    c++
}


getAPI(api_url)










