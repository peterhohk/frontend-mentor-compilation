"use strict";

// utility methods
function isLeap(year) {
  if (year % 400 === 0) {return true;}
  if (year % 100 === 0) {return false;}
  if (year % 4 === 0) {return true;}
  return false;
}
function daysInMonth(year, month) {
  switch (month) {
    case 1: case 3: case 5: case 7: case 8: case 10: case 12:
      return 31;
    case 4: case 6: case 9: case 11:
      return 30;
    case 2:
      return (isLeap(year) ? 29 : 28);
  }
}

// get the necessary HTML elements
const input = document.getElementById("input");
const inputDayContainer = document.getElementById("input-day-container");
const inputMonthContainer = document.getElementById("input-month-container");
const inputYearContainer = document.getElementById("input-year-container");
const inputDay = document.getElementById("input-day");
const inputMonth = document.getElementById("input-month");
const inputYear = document.getElementById("input-year");
const inputDayErrorMsg = document.getElementById("input-day-errormsg");
const inputMonthErrorMsg = document.getElementById("input-month-errormsg");
const inputYearErrorMsg = document.getElementById("input-year-errormsg");
const outputYear = document.getElementById("output-year");
const outputMonth = document.getElementById("output-month");
const outputDay = document.getElementById("output-day");

// functions to validate each input field
function validateDay() {
  const day = parseInt(inputDay.value);
  if (isNaN(day)) {return "This field is required";}
  if (day < 1 || day > 31) {return "Must be a valid day";}
  return "";
}
function validateMonth() {
  const month = parseInt(inputMonth.value);
  if (isNaN(month)) {return "This field is required";}
  if (month < 1 || month > 12) {return "Must be a valid month";}
  return "";
}
function validateYear() {
  const year = parseInt(inputYear.value);
  if (isNaN(year)) {return "This field is required";}
  if (year > new Date().getFullYear()) {return "Must be in the past";}
  return "";
}

// function to vaidate whole input date (e.g. invalidate 31/04/1991 because there are 30 days in April)
function validateDate() {
  const day = parseInt(inputDay.value) || 0;
  const month = parseInt(inputMonth.value) || 0;
  const year = parseInt(inputYear.value) || 0;
  const parsedDate = new Date(year, month-1, day);
  const parsedDay = parsedDate.getDate();
  const parsedMonth = parsedDate.getMonth()+1;
  const parsedYear = parsedDate.getFullYear();
  if (day !== parsedDay || month !== parsedMonth || year !== parsedYear) {return "Must be a valid date";}
  if (new Date(year, month-1, day) > new Date()) {return "Must be in the past";}
  return "";
}

// function to update form
function calculate(e) {
  e.preventDefault();
  const dayValidity = validateDay();
  const monthValidity = validateMonth();
  const yearValidity = validateYear();
  const dateValidity = validateDate();

  // get valdaity of each input field, return if any is invalid
  if (dayValidity === "") {
    inputDayContainer.classList.remove("error");
    inputDayErrorMsg.textContent = "";
  } else {
    inputDayContainer.classList.add("error");
    inputDayErrorMsg.textContent = dayValidity;
  }
  if (monthValidity === "") {
    inputMonthContainer.classList.remove("error");
    inputMonthErrorMsg.textContent = "";
  } else {
    inputMonthContainer.classList.add("error");
    inputMonthErrorMsg.textContent = monthValidity;
  }
  if (yearValidity === "") {
    inputYearContainer.classList.remove("error");
    inputYearErrorMsg.textContent = "";
  } else {
    inputYearContainer.classList.add("error");
    inputYearErrorMsg.textContent = yearValidity;
  }
  if (dayValidity !== "" || monthValidity !== "" || yearValidity !== "") {return;}

  // get validity of whole input date, return if invalid
  if (dateValidity === "") {
    inputDayContainer.classList.remove("error");
    inputMonthContainer.classList.remove("error");
    inputYearContainer.classList.remove("error");
  } else {
    inputDayContainer.classList.add("error");
    inputMonthContainer.classList.add("error");
    inputYearContainer.classList.add("error");
    inputDayErrorMsg.textContent = dateValidity;
  }
  if (dateValidity !== "") {return;}

  // if this is reached, input date is valid, calculate age
  const year = parseInt(inputYear.value);
  const month = parseInt(inputMonth.value);
  const day = parseInt(inputDay.value);
  const thisYear = new Date().getFullYear();
  const thisMonth = new Date().getMonth()+1;
  const thisDay = new Date().getDate();
  let yearDiff = thisYear - year;
  let monthDiff = thisMonth - month;
  let dayDiff = thisDay - day;
  if (dayDiff < 0) {
    dayDiff += daysInMonth(thisYear, thisMonth);
    monthDiff -= 1;
  }
  if (monthDiff < 0) {
    monthDiff += 12;
    yearDiff -= 1;
  }
  outputYear.textContent = yearDiff;
  outputMonth.textContent = monthDiff;
  outputDay.textContent = dayDiff;
}

// add event listener to calculate age
input.addEventListener("submit", calculate);