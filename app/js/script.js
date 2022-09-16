// JSON diretory
const URL = "../../data.json";

// Timer HTML Elements
const mainElement = document.getElementsByTagName('main');
const bgElementType = document.getElementsByClassName('timer__bg');

function createTimer(label, time, lastTime) {
    var formattedLabel = label.toLowerCase().replace(/\s+/g, '');

    mainElement[0].innerHTML += `
        <section class="timer container">
            <div class="timer__bg timer__bg--${formattedLabel}">
            </div>
            <div class="timer__inside">
                <div>
                <label>${label}</label>
                <a class="timer__inside--button">
                    <span></span>
                    <span></span>
                    <span></span>
                </a>
                </div>
                <div>
                <span>${time}hrs</span>
                <span>Last Week - ${lastTime}hrs</span>
                </div>
            </div>
        </section>

    `;

    console.log(formattedLabel)
}

fetch(URL)
    .then(( resp ) => resp.json())
    .then(( json ) => {
        for(let i = 0; i < json.length; i++) {
            var label = json[i].title;
            var time = json[i].timeframes.weekly.current;
            var lastTime = json[i].timeframes.weekly.previous;

            createTimer(label, time, lastTime);
        }
    });
