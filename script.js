const apiKey = "8b85b745";
const subBtn = document.querySelector(".subBtn");
const movieContainer = document.querySelector("#Movie");
let inputTitle = document.querySelector("#inputMovie");
//calling all the functions
subBtn.addEventListener("click", (e) => {
  e.preventDefault();
  submitTitleForm();
  searchMovie(apiKey, movieTitle);
});
// function to submit the value we have entered
function submitTitleForm() {
  movieTitle = inputTitle.value;
}
// function to converting to boolean and making it lowercase
function toLowerCaseBoolean(boolean) {
  return boolean.toLowerCase() === "true";
}

async function searchMovie(key, movieInput) {
  try {
    // checking if the input is empty and if it is throw an error
    if (!movieInput) throw new Error("error no movie entered");
    // making a request to a server for reciving data
    const res = await fetch(
      `http://www.omdbapi.com/?apikey=${key}&t=${movieInput}`
    );
    console.log(res);
    // checking if the status is ok if not throw an error
    if (!res.ok) throw new Error("Something went rong enter another value");
    // parsing the JSON data
    const data = await res.json();
    // checking if the response was valid or not if its not throws an error
    console.log(toLowerCaseBoolean(data.Response) === false);
    if (toLowerCaseBoolean(data.Response) == false)
      throw new Error("Enter a valid input");
    // printing the data
    console.log(data);
    printingData(data);
  } catch (err) {
    // catching if an error was thrown
    console.error(err.message);
    inputTitle.value = "";
  }
}
// creating the html
function htmlCretor(data) {
  return `
  <div class="movie-details">
  <div class="img">
  <img src="${data.Poster}" alt="" />
  </div>
  <div class="title-container">
  <h1>Title:</h1>
  <h2 class="title">${data.Title}</h2>
  </div>
  <div class="release-container">
  <h2>Year released:<p>
  <h3 class="year">${data.Released}</h3>
  </div>
  
  <div class="description-container">
  <p>Description:</p>
  <p class="description">${data.Plot}</p>
  </div>
  </div>
  <div class="movie-options">
  <button class="watched">Watched</button>
  <button class="del">Delete</button>
  </div>
  `;
}
// function to print the data
function printingData(print) {
  div = document.createElement("div");
  div.classList.add("movie-container", "dark-gray");
  div.innerHTML = htmlCretor(print);
  movieContainer.appendChild(div);
  inputTitle.value = "";
  // selecting the watched and del btns
  const watchedBtn = div.querySelectorAll(".watched");
  const delBtn = div.querySelectorAll(".del");
  // adding a watched class to the div
  watchedBtn.forEach((el) => {
    el.addEventListener("click", (event) => {
      console.log("already watch");
      const nearestContainer = event.target.closest(".movie-container");
      nearestContainer.classList.toggle("watched");
    });
  });
  // removing the div
  delBtn.forEach((el) => {
    el.addEventListener("click", (event) => {
      console.log("Delete");
      const nearestContainer = event.target.closest(".movie-container");
      nearestContainer.remove();
    });
  });
}
