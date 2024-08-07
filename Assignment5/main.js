/*
Name:Brayson Baldwin
Date: August 09 2024
File: main.js
Javascript code for html code*/


const showHideBtn = document.querySelector('.show-hide');
const commentWrapper = document.querySelector('.comment-wrapper');

//Hide the comments section
commentWrapper.style.display = 'none';
showHideBtn.setAttribute('aria-expanded', 'false');

// Function to toggle visibility of the comments section
function toggleComments() {
  let isExpanded = showHideBtn.getAttribute('aria-expanded') === 'true';

  if (!isExpanded) {
    showHideBtn.textContent = 'Hide comments';
    commentWrapper.style.display = 'block';
    showHideBtn.setAttribute('aria-expanded', 'true');
  } else {
    showHideBtn.textContent = 'Show comments';
    commentWrapper.style.display = 'none';
    showHideBtn.setAttribute('aria-expanded', 'false');
  }
}

// toggle button click event, couldnt get button to work on click, even with the show.Hidebtn.addEventListener
showHideBtn.onclick = function() {


// accessible via keyboard 
showHideBtn.onkeypress = function(event) {
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    toggleComments();
  }
}};

// adding a new comment via the comments form
const form = document.querySelector('.comment-form');
const nameField = document.querySelector('#name');
const commentField = document.querySelector('#comment');
const list = document.querySelector('.comment-container');

form.onsubmit = function(e) {
  e.preventDefault();
  submitComment();
};

function submitComment() {
  const listItem = document.createElement('li');
  const namePara = document.createElement('p');
  const commentPara = document.createElement('p');
  const nameValue = nameField.value;
  const commentValue = commentField.value;

  namePara.textContent = nameValue;
  commentPara.textContent = commentValue;

  list.appendChild(listItem);
  listItem.appendChild(namePara);
  listItem.appendChild(commentPara);

  // clearing the comment field after submission
  nameField.value = '';
  commentField.value = '';
}


