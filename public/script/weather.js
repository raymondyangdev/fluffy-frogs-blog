getWeatherData();
    async function getWeatherData() {
        const response = await fetch(
            'https://api.openweathermap.org/data/2.5/weather?q=auckland&appid=7c847e7d971891af4f1b38d08263e48d&units=metric'
        );
        const json = await response.json();
        const temp = json.main.temp;
        const city = json.name;
        const weather = json.weather[0].main;
        const icon = json.weather[0].icon;
        const result = document.querySelector('#result');
        result.innerHTML = `
              <img src="https://openweathermap.org/img/w/${icon}.png">
              ${city} Weather: <br>${weather} | ${temp}° C`;
    }

