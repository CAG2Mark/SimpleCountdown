/* jshint esversion:6 */

var daysContainer = document.getElementById("day-value");
var hoursContainer = document.getElementById("hour-value");
var minsContainer = document.getElementById("min-value");
var secsContainer = document.getElementById("sec-value");

var daysText = document.getElementById("day-text");
var hoursText = document.getElementById("hour-text");
var minsText = document.getElementById("min-text");
var secsText = document.getElementById("sec-text");

var eventName;
var unixTimeUtc;

// decode url params
var url = new URL(window.location.href);
var encoded_json = url.searchParams.get("countdown");
if (encoded_json) {
    let timerPage = document.getElementById("timer-page");
    timerPage.style.display = "block";

    var decoded = JSON.parse(atob(encoded_json));
    document.getElementById("event-name-value").innerHTML = decoded.eventName;
    unixTimeUtc = decoded.unix;

    updateTime(Date.now(), unixTimeUtc);
    
    // wait x ms
    let ms = unixTimeUtc % 1000;
    setTimeout(() => {
        setInterval(() => updateTime(Date.now(), unixTimeUtc), 1000);
    }, ms);

}
else {
    let setupPage = document.getElementById("setup-page");
    setupPage.style.display = "block";
}

// returns [Days, Hours, Minutes, Seconds]
function updateTime(t1, t2) {
    let delta = Math.floor((t2 - t1)/1000);
    if (delta <= 0) return false;

    let days = daysContainer.innerHTML = Math.floor(delta / 86400);
    delta %= 86400;
    daysText.innerHTML = days == 1 ? "day" : "days";

    let hours = hoursContainer.innerHTML = Math.floor(delta / 3600);
    delta %= 3600;

    let mins = minsContainer.innerHTML = Math.floor(delta / 60);
    delta %= 60;

    let secs = secsContainer.innerHTML = Math.floor(delta);

    return true;
}


function getInput(name) {
    return document.getElementById(name + "-input");
}

// confirm button event lister
var confirmButton = document.getElementById("confirm-button");
confirmButton.addEventListener("click", onConfirm);

// share link event listener
var shareButton = document.getElementById("share-icon");
shareButton.addEventListener("click", function () {
    var shareWrap = document.getElementById("share-link-wrap");
    var shareContainer = document.getElementById("share-link-container");

    shareWrap.style.display = "inline-block";

    shareContainer.value = window.location.href;

    /* Select the text field */
    shareContainer.select();
    shareContainer.setSelectionRange(0, 99999); /* For mobile devices */

    /* Copy the text inside the text field */
    document.execCommand("copy");

    // display tooltip
    
});

// set initial values
let d_ = new Date();

getInput("day").value = d_.getUTCDate();
getInput("month").value = d_.getUTCMonth() + 1;
getInput("year").value = d_.getUTCFullYear() - 2000;

getInput("hour").value = d_.getUTCHours();
getInput("minute").value = d_.getUTCMinutes(); 

function onConfirm() {
    eventName = getInput("event-name").value;

    let day = getInput("day").value;
    let mon = getInput("month").value;
    let yr = getInput("year").value;

    let hr = getInput("hour").value;
    let mn = getInput("minute").value;

    let isUtc = getInput("utc").checked;

    let d = new Date();
    let utcOffset = d.getTimezoneOffset();
    let date = new Date(Date.UTC(parseInt(yr) + 2000, mon-1, day, hr, mn, 0, 0));

    let unix = date*1 + (!isUtc * utcOffset * 60000);
    
    // create json
    let obj = {
        'eventName': eventName,
        'unix': unix,
        'createdAt': d*1
    };

    let json = JSON.stringify(obj);
    let encoded = encodeURIComponent(btoa(json));

    let baseurl = window.location.origin+window.location.pathname;
    window.location.href = baseurl + "?countdown=" + encoded;
}