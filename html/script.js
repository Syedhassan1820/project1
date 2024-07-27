const secondHand = document.getElementById('second-hand');
const minuteHand = document.getElementById('minute-hand');
const hourHand = document.getElementById('hour-hand');

function clockTick() {
    const date = new Date();
    const seconds = date.getSeconds() / 60;
    const minutes = (seconds + date.getMinutes()) / 60;
    const hours = (minutes + date.getHours()) / 12;

    rotateClockHand(secondHand, seconds);
    rotateClockHand(minuteHand, minutes);
    rotateClockHand(hourHand, hours);
}
function rotateClockHand(element, rotation){
    element.style.setProperty('--rotate', rotation * 360); 
}

setInterval(clockTick, 1000);

// Function to update clock and date
function updateClock() {
    let now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();

    // Pad single digit minutes and seconds with a leading zero
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;

    let timeString = hours + ':' + minutes;

    document.getElementById('time').textContent = timeString;

    // Islamic Date (Static for example)
    let islamicDate = "20 Muharram (1) 1446";
    // Gregorian Date
    let dateString = now.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

    document.getElementById('date').innerHTML = islamicDate + "<br>" + dateString;
}

// Update the clock every second
setInterval(updateClock, 1000);

let events = [
    { name: "Fajr Azan", time: "4:45:00" },
    { name: "Fajr Jamaat", time: "5:15:00" },
    { name: "Zuhr Azan", time: "13:00:00" },
    { name: "Zuhr Jamaat", time: "13:30:00" },
    { name: "Asr Azan", time: "17:30:00" },
    { name: "Asr Jamaat", time: "18:10:00" },
    { name: "Maghrib Azan", time: "19:00:00" },
    { name: "Maghrib Jamaat", time: "19:03:00" },
    { name: "Isha Azan", time: "20:20:00" },
    { name: "Isha Jamaat", time: "20:40:00" }
];

let eventIndex = 0;
let countdownInterval;

    function updateTableForFriday() {
        let today = new Date().getDay();
        if (today === 5) { // Friday
            events[2] = { name: "Jumah Azan", time: "13:00:00" };
            events[3] = { name: "Jumah Jamaat", time: "14:00:00" };
    
            document.querySelector("tbody").innerHTML = `
                <tr>
                    <td>Fajr</td>
                    <td>4:45</td>
                    <td>5:15</td>
                    <td>4:45</td>
                </tr>
                <tr>
                    <td>Jumah</td>
                    <td>1:00</td>
                    <td>2:00</td>
                    <td>1:00</td>
                </tr>
                <tr>
                    <td>Asr</td>
                    <td>5:30</td>
                    <td>6:10</td>
                    <td>5:30</td>
                </tr>
                <tr>
                    <td>Maghrib</td>
                    <td>7:00</td>
                    <td>7:03</td>
                    <td>7:00</td>
                </tr>
                <tr>
                    <td>Isha</td>
                    <td>8:20</td>
                    <td>8:40</td>
                    <td>8:20</td>
                </tr>
                <tr>
                    <td>Shurooq</td>
                    <td>6:05</td>
                    <td>-</td>
                    <td>6:05</td>
                </tr>
            `;
        }
    }

    function getNextEventIndex() {
        let now = new Date();
        for (let i = 0; i < events.length; i++) {
            let eventTime = new Date();
            let [hours, minutes, seconds] = events[i].time.split(':');
            eventTime.setHours(hours, minutes, seconds);
    
            if (eventTime > now) {
                return i;
            }
        }
        return 0; // If all events are past, start with the first event
    }

    function startCountdown() {
        clearInterval(countdownInterval);
    
    let eventTime = new Date();
    let [hours, minutes, seconds] = events[eventIndex].time.split(':');
    eventTime.setHours(hours, minutes, seconds);

    countdownInterval = setInterval(function() {
        let now = new Date().getTime();
        let distance = eventTime - now;

        // Time calculations for hours, minutes, and seconds
        let hoursLeft = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutesLeft = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        let secondsLeft = Math.floor((distance % (1000 * 60)) / 1000);

        // Display the result in the element with id="countdown-timer"
        let countdownDisplay = events[eventIndex].name + " in ";
        if (hoursLeft > 0) countdownDisplay += hoursLeft + "h ";
        if (minutesLeft > 0 || hoursLeft > 0) countdownDisplay += minutesLeft + "min ";
        countdownDisplay += secondsLeft + "s ";
        document.getElementById("countdown-timer").innerHTML = countdownDisplay;

        // If the countdown is finished, switch to the next event
        if (distance < 0) {
            clearInterval(countdownInterval);
            document.getElementById("countdown-timer").innerHTML = events[eventIndex].name + " has started!";
            setTimeout(function() {
                eventIndex = (eventIndex + 1) % events.length;
                startCountdown();
            }, 5000); // Display the "started" message for 5 seconds
        }
    }, 1000);
}

// Start the first countdown

updateTableForFriday();
eventIndex = getNextEventIndex();
startCountdown();
