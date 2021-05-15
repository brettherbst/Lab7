// script.js

import { router } from './router.js'; // Router imported so you can use it to manipulate your SPA app here
const setState = router.setState;

// Make sure you register your service worker here too

document.addEventListener('DOMContentLoaded', () => {
  let counter = 1;
  fetch('https://cse110lab6.herokuapp.com/entries')
    .then(response => response.json())
    .then(entries => {
      entries.forEach(entry => {
        let newPost = document.createElement('journal-entry');
        newPost.entry = entry;
        newPost.num = counter;
        newPost.addEventListener('click',() => {
          setState({location: 'entry', entryNum: newPost.num});
        });
        document.querySelector('main').appendChild(newPost);

        counter++;
      });
    });
});

// IMPLEMENTS SETTINGS BUTTON
document.querySelector('header img').addEventListener('click', () => {
  setState({location: 'settings'});
});

//IMPLEMENTS CLICKING HEADER -> GO TO HOMEPAGE 
document.querySelector('header h1').addEventListener('click', () => {
    setState({location: 'homepage'});
});


//IMPLEMENTS BACK BUTTON
window.addEventListener('popstate', (event) => {
  setState(event.state);
});