"use strict";

const url = "https://api.adviceslip.com/advice";

// get the necessary HTML elements
const adviceId = document.getElementById("advice-id");
const adviceContent = document.getElementById("advice-content");
const adviceGenerate = document.getElementById("advice-generate");

// function to get a random advice slip from the API
async function getAdvice() {
  const res = await fetch(url);
  const jsonData = await res.json();
  const slip = await jsonData.slip;
  adviceId.textContent = `Advice #${slip.id}`;
  adviceContent.textContent = slip.advice;
}

// automatically get an advice on page load
getAdvice();

// add event listener to get an advice
adviceGenerate.addEventListener("click", getAdvice);