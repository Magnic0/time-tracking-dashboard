// JSON diretory
const URL = "data.json";

// Functions
function createTimer(label, currentTimeFrame, time, lastTime) {
    var formattedLabel = label.toLowerCase().replace(/\s+/g, '');

    // Specify and format timeframes
    var formattedTimeFrame = '';
    if(currentTimeFrame == "Daily") {
        formattedTimeFrame = "Yesterday";
    } else if(currentTimeFrame == "Weekly") {
        formattedTimeFrame = "Last Week"
    } else if(currentTimeFrame == "Monthly") {
        formattedTimeFrame = "Last Month";
    }

    mainElement.innerHTML += `
        <section class="timer container">
            <div class="timer__bg timer__bg--${formattedLabel}">
            </div>
            <div class="timer__inside">
                <div>
                <h2>${label}</h2>
                <a class="timer__inside--button">
                    <span></span>
                    <span></span>
                    <span></span>
                </a>
                </div>
                <div>
                <span>${time}hrs</span>
                <span>${formattedTimeFrame} - ${lastTime}hrs</span>
                </div>
            </div>
        </section>
    `;
};

function fillTimerInfo(json, currentTimeFrame) {
    for(let i = 0; i < json.length; i++) {
        var label = json[i].title;
        var time = json[i].timeframes.daily.current;
        var lastTime = json[i].timeframes.daily.previous;
        
        for(let i = 0; i < timeFrameSelectors.length; i++) {
            timeFrameSelectors[i].removeAttribute('style');
        }

        if(currentTimeFrame == 'Daily') {
            time = json[i].timeframes.daily.current;
            lastTime = json[i].timeframes.daily.previous;
            timeFrameSelectors[0].style.color = 'whitesmoke';
        }
        if(currentTimeFrame == 'Weekly') {
            time = json[i].timeframes.weekly.current;
            lastTime = json[i].timeframes.weekly.previous;
            timeFrameSelectors[1].style.color = 'whitesmoke';
        }
        if(currentTimeFrame == "Monthly") {
            time = json[i].timeframes.monthly.current;
            lastTime = json[i].timeframes.weekly.previous;
            timeFrameSelectors[2].style.color = 'whitesmoke';
        }

        createTimer(label, currentTimeFrame, time, lastTime);
    }
}

// HTML elements
const mainElement = document.getElementsByTagName('main')[0];
const timeFrameSelectors = document.getElementsByClassName('category')[0]
    .getElementsByTagName('nav')[0]
    .getElementsByTagName('li');

fetch(URL)
    .then(( resp ) => resp.json())
    .then(( json ) => {

        // Default active timeframe
        var currentTimeFrame = 'Weekly';

        fillTimerInfo(json, currentTimeFrame);
        
        for(let j = 0; j < timeFrameSelectors.length; j++) {
            timeFrameSelectors[j].addEventListener("click", () => {
                currentTimeFrame = timeFrameSelectors[j].innerText;
                
                mainElement.innerHTML = ``;
                
                fillTimerInfo(json, currentTimeFrame);
            });
        }
    }
);
