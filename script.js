/* jshint esversion:6 */

var eventName;
var unixTimeUtc;

let setupPage = document.getElementById("setup-page");
setupPage.style.display = "block";

function getInput(name) {
    return document.getElementById(name + "-input");
}

var confirmButton = document.getElementById("confirm-button");
confirmButton.addEventListener("click", onConfirm);

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

    console.log((!isUtc * utcOffset));

    let unix = date*1 + (!isUtc * utcOffset * 60000);

    console.log(unix);
}