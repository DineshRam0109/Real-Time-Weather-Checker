async function searchWeather() {
    const city = document.getElementById("city-input").value.trim();
    if (!city) {
        alert("Please enter a city name!");
        return;
    }

    document.getElementById("results").innerHTML = "<p>Fetching weather...</p>";

    try {
        const apiKey = config.WEATHER_API_KEY; // Use the secure API key
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
        const response = await fetch(url);
        const data = await response.json();

        if (data.cod !== 200) {
            document.getElementById("results").innerHTML = `<p style="color: red;">City not found! ❌</p>`;
            return;
        }

        displayResults(data);
    } catch (error) {
        console.error("Error fetching weather:", error);
        document.getElementById("results").innerHTML = `<p style="color: red;">Error fetching data! ❌</p>`;
    }
}

function displayResults(data) {
    const resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = "";

    const cityElement = document.createElement("div");
    cityElement.className = "city";

    const weatherIcon = data.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${weatherIcon}@2x.png`;

    cityElement.innerHTML = `
        <strong>${data.name}, ${data.sys.country}</strong><br>
        <img src="${iconUrl}" class="weather-icon" alt="Weather icon"><br>
        🌡️ Temperature: ${data.main.temp}°C <br>
        🌡️ Feels Like: ${data.main.feels_like}°C <br>
        🌤️ Weather: ${data.weather[0].description} <br>
        💨 Wind Speed: ${data.wind.speed} m/s <br>
        💧 Humidity: ${data.main.humidity}% <br>
        🌍 Pressure: ${data.main.pressure} hPa <br>
    `;

    resultsDiv.appendChild(cityElement);
}
