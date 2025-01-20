// API Ker generted from OPEN-Wheather.
const API_KEY = `5f1de0443f13f9d9cb39b9a889c5b31f`;
const search = document.querySelector("#search");
const weather = document.querySelector("#weather");
const checkWeatherButton = document.querySelector("#checkWeather");
const refreshWeatherButton = document.querySelector("#refreshWeather");
const loading = document.querySelector("#loading");
const splashScreen = document.querySelector("#splashScreen");
const main = document.querySelector("main");
const dateTimeDisplay = document.querySelector("#dateTime");

const hideSplashScreen = () => {
    splashScreen.style.display = 'none';
    main.style.display = 'flex';
    displayDateTime(); // Call function to display date and time when main is shown
}

setTimeout(hideSplashScreen, 3000);

// Function to display current date and time
const displayDateTime = () => {
    const now = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true };
    dateTimeDisplay.innerHTML = now.toLocaleDateString('en-US', options);
}

const getWeather = async (city) => {
    loading.style.display = 'flex';
    weather.innerHTML = '';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
    const response = await fetch(url);
    const data = await response.json();
    setTimeout(() => {
        loading.style.display = 'none';
        showWeather(data);
    }, 2000); // Shortened delay for responsiveness
}

const showWeather = (data) => {
    if (data.cod == "404") {
        weather.innerHTML = `<div style="display: flex; align-items: center; flex-direction: column; justify-content: center;">
        <center><img style="margin-top: 20px;margin-right:10px;height:228px;" src="https://ouch-cdn2.icons8.com/5EBBySVnmr_4ctjPeMhchNV-NNZMn00GEdTcRGlM_4M/rs:fit:368:368/czM6Ly9pY29uczgu/b3VjaC1wcm9kLmFz/c2V0cy9zdmcvMTA3/LzNlZjJlMjZhLWI4/YjgtNDgzYS1iZGM0/LTQ0NjE1NTlhYjg1/Mi5zdmc.png" alt=""></center>
        <h4 style="font-size: 18px;margin-top: 20px;margin-right:10px;color: red;text-shadow: 0 0 10px #FFD700, 0 0 20px #FFA500, 0 0 30px #FF6347;">Oops! City location not found.</h4></div>`;
        return;
    }
    weather.innerHTML = `
        <div>
            <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="">
        </div>
        <h4>${data.main.temp} ℃</h4>
        <div>
            <h4>${data.weather[0].main}</h4>
        </div>
    `;
}

checkWeatherButton.addEventListener("click", () => {
    const city = search.value.trim();
    if (city) {
        getWeather(city);
    } else {
        weather.innerHTML = `<h4 style="color: red;font-size:18px;text-shadow: 0 0 10px #FFD700, 0 0 20px #FFA500, 0 0 30px #FF6347;">Please enter a city name.</h4>`;
    }
});

refreshWeatherButton.addEventListener("click", () => {
    weather.innerHTML = '';
    search.value = '';
});
