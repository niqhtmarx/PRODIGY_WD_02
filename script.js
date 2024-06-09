// script.js

let startTime;
let updatedTime;
let difference;
let timerInterval;
let running = false;
let lapTimes = [];

const display = document.getElementById('display');
const startStopBtn = document.getElementById('startStopBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const laps = document.getElementById('laps');

function startStop() {
    if (!running) {
        startTime = new Date().getTime() - (difference || 0);
        timerInterval = setInterval(updateDisplay, 10);
        startStopBtn.textContent = 'Stop';
        startStopBtn.classList.remove('start');
        startStopBtn.classList.add('stop');
        running = true;
    } else {
        clearInterval(timerInterval);
        difference = new Date().getTime() - startTime;
        startStopBtn.textContent = 'Start';
        startStopBtn.classList.remove('stop');
        startStopBtn.classList.add('start');
        running = false;
    }
}

function reset() {
    clearInterval(timerInterval);
    display.textContent = '00:00:00.00';
    startStopBtn.textContent = 'Start';
    startStopBtn.classList.remove('stop');
    startStopBtn.classList.add('start');
    difference = 0;
    running = false;
    lapTimes = [];
    laps.innerHTML = '';
}

function lap() {
    if (running) {
        const lapTime = new Date().getTime() - startTime;
        lapTimes.push(lapTime);
        const lapDiv = document.createElement('div');
        lapDiv.textContent = formatTime(lapTime);
        laps.appendChild(lapDiv);
    }
}

function updateDisplay() {
    updatedTime = new Date().getTime() - startTime;
    display.textContent = formatTime(updatedTime);
}

function formatTime(time) {
    const hours = Math.floor(time / 3600000);
    const minutes = Math.floor((time % 3600000) / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    const milliseconds = Math.floor((time % 1000) / 10);

    return `${pad(hours, 2)}:${pad(minutes, 2)}:${pad(seconds, 2)}.${pad(milliseconds, 2)}`;
}

function pad(number, length) {
    let str = '' + number;
    while (str.length < length) {
        str = '0' + str;
    }
    return str;
}

startStopBtn.addEventListener('click', startStop);
resetBtn.addEventListener('click', reset);
lapBtn.addEventListener('click', lap);
