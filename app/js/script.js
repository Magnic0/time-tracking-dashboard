// JSON diretory
const URL = "../../data.json";

// Timer HTML Elements
const timerElement = document.getElementsByClassName('timer__inside');

function createTimer() {
    timerElement[0].innerHTML = `
        <div>
          <label>Work</label>
          <a class="timer__inside--button">
            <span></span>
            <span></span>
            <span></span>
          </a>
        </div>
        <div>
          <span>32hrs</span>
          <span>Last Week - 36hrs</span>
        </div>
    `
}

createTimer();

fetch(URL)
    .then(( resp ) => resp.json())
    .then(( json ) => {
        console.log(json[0].timeframes.daily);
    });
