
/*
Name:Brayson Baldwin
Date: August 02 2024
File: main.js
Javascript code for image gallery - Part 2*/


const displayedImage = document.querySelector('.displayed-img');
const thumbBar = document.querySelector('.thumb-bar');

const btn = document.querySelector('button');
const overlay = document.querySelector('.overlay');

//Declare the array of image filenames and alt texts
const imageFilenames = ['pic1.jpg', 'pic2.jpg', 'pic3.jpg', 'pic4.jpg', 'pic5.jpg'];
const altTexts = [
  'Closeup of a human eye',
  'Rock Landform',
  'Flowers in bloom',
  'Egyptian Painting',
  'Moth'
];

//Loop through images
for (let i = 0; i < imageFilenames.length; i++) {
  const newImage = document.createElement('img');
  newImage.setAttribute('src', `images/${imageFilenames[i]}`);
  newImage.setAttribute('alt', altTexts[i]);
  thumbBar.appendChild(newImage);

  //click event listener to each thumbnail image
  newImage.addEventListener('click', function() {
    displayedImage.setAttribute('src', newImage.getAttribute('src'));
    displayedImage.setAttribute('alt', newImage.getAttribute('alt'));
  });
}

//Darken/Lighten button 
btn.addEventListener('click', function() {
  const currentClass = btn.getAttribute('class');
  
  if (currentClass === 'dark') {
    btn.setAttribute('class', 'light');
    btn.textContent = 'Lighten';
    overlay.style.backgroundColor = 'rgb(0 0 0 / 50%)';
  } else {
    btn.setAttribute('class', 'dark');
    btn.textContent = 'Darken';
    overlay.style.backgroundColor = 'rgb(0 0 0 / 0%)';
  }
});
