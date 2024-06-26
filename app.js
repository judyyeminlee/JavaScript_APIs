"use strict";

// Program State
const GIPHY_URL = "https://api.giphy.com/v1/gifs/translate";
const GIPHY_KEY = "b2b13a9108e3cf76c41ae789eb083321";

// Select the elements
let feedbackEle = document.querySelector("#feedback");
let searchInput = document.querySelector("#searchWord");
let searchBtn = document.querySelector("#submitSearch");
let gifEle = document.querySelector("#imageContainer > img");

// Event Handler - Async/Await
searchBtn.addEventListener("click", (event) => {
  getGif(searchInput.value);
});

async function getGif(searchTerm) {
  try {
    let res = await fetch(`${GIPHY_URL}?api_key=${GIPHY_KEY}&s=${searchTerm}`);
    console.log(res);
    let body = await res.json();

    if (body.meta.status === 200) {
      // Show the gif on the DOM
      gifEle.src = body.data.images.original.url;
      searchInput.value = "";
      feedbackEle.textContent = "";
    } else {
      feedbackEle.textContent = body.meta.msg;
    }
  } catch (err) {
    console.error(err);
    // Show the error message on the DOM
    feedbackEle.textContent = err.message;
  }
}
