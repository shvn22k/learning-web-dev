const secondHand = document.querySelector('.second-hand');
const minHand = document.querySelector('.min-hand');
const hourHand = document.querySelector('.hour-hand');
const hr = document.querySelector('.numhrs');
const min = document.querySelector('.nummins');
const sec = document.querySelector('.numsecs');


const setDate = () => {
    const now = new Date();
    
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    hr.innerHTML = `<span class="numhrs">${hours % 12}</span>`
    min.innerHTML = `<span class="nummins">${minutes}</span>`
    sec.innerHTML = `<span class="numsecs">${seconds}</span>`

    const secondDegrees = ((seconds / 60) * 360) + 90;
    const minuteDegrees = ((minutes / 60) * 360) + ((seconds / 60)*6) + 90;
    const hourDegrees = ((hours % 12) / 12) * 360 + ((minutes / 60) * 30) + 90;
    
    
    secondHand.style.transform = `rotate(${secondDegrees}deg)`;
    minHand.style.transform = `rotate(${minuteDegrees}deg)`;
    hourHand.style.transform = `rotate(${hourDegrees}deg)`;
}

setInterval(setDate, 1000);
setDate();