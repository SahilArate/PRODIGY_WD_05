const apiKey = "d718e77a13e1eced2e4cd7d7a773476f"; 

async function getWeather() {
    const location = document.getElementById('location-input').value;
    if (!location) {
        alert("Please enter a location.");
        return;
    }

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`;
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        console.error('Error fetching weather data:', error);
        alert("Could not retrieve weather data.");
    }
}

async function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;

            const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
            try {
                const response = await fetch(apiUrl);
                const data = await response.json();
                displayWeather(data);
            } catch (error) {
                console.error('Error fetching weather data:', error);
                alert("Could not retrieve weather data.");
            }
        });
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

function displayWeather(data) {
    const locationElem = document.getElementById('location');
    const temperatureElem = document.getElementById('temperature');
    const descriptionElem = document.getElementById('description');
    const iconElem = document.getElementById('icon');
    const weatherDisplay = document.getElementById('weather-display');

    locationElem.textContent = `Location: ${data.name}, ${data.sys.country}`;
    temperatureElem.textContent = `Temperature: ${data.main.temp} °C`;
    descriptionElem.textContent = `Condition: ${data.weather[0].description}`;

    const iconCode = data.weather[0].icon;
    iconElem.src = `http://openweathermap.org/img/wn/${iconCode}@2x.png`;

    weatherDisplay.classList.add('visible');
}
