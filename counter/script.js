const daysEl = document.getElementById('days');
const hoursEl = document.getElementById('hours');
const minsEl = document.getElementById('mins'); 
const secsEl = document.getElementById('secs');

const neetDate = '4 May 2025';

function countDown(){
    const newDate = new Date(neetDate);
    const currentDate = new Date();

    const seconds = (newDate - currentDate) / 1000;
    const days = Math.floor(seconds / 3600 / 24);
    const hours = Math.floor(seconds / 3600) % 24;
    const minutes = Math.floor(seconds / 60) % 60;
    const secs = Math.floor(seconds) % 60;

    daysEl.innerHTML = days;
    hoursEl.innerHTML = hours;
    minsEl.innerHTML = minutes;
    secsEl.innerHTML = secs;
    
}

countDown();
setInterval(countDown, 1000);