document.addEventListener("DOMContentLoaded", function () {
    const locationInput = document.getElementById("locationInput");
    const getWeatherBtn = document.getElementById("getWeatherBtn");
    const weatherInfo = document.getElementById("weatherInfo");
    const errorMessage = document.getElementById("errorMessage");
    const unitSelect = document.getElementById("unitSelect");

    getWeatherBtn.addEventListener("click", () => {
        const location = locationInput.value;
        const unit = unitSelect.value;

        const apiKey = '9ed6e7ec56ace00c0013e775575fb55a';

        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=${unit}&appid=${apiKey}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Location not found");
                }
                return response.json();
            })
            .then((data) => {
                const temperature = data.main.temp;
                const humidity = data.main.humidity;
                const windSpeed = data.wind.speed;
                const description = data.weather[0].description;

                weatherInfo.innerHTML = `
                    <h2>Weather in ${data.name}</h2>
                    <p>Temperature: ${temperature}°${unit === 'metric' ? 'C' : 'F'}</p>
                    <p>Humidity: ${humidity}%</p>
                    <p>Wind Speed: ${windSpeed} ${unit === 'metric' ? 'm/s' : 'km/h'}</p>
                    <p>Description: ${description}</p>
                `;

                errorMessage.textContent = "";
            })
            .catch((error) => {
                errorMessage.textContent = error.message;
                weatherInfo.innerHTML = "";
            });
    });
});

document.addEventListener("DOMContentLoaded", function () {
    // ...

    // Function to get weather by geolocation
    function getWeatherByGeolocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                const unit = unitSelect.value;

                const apiKey ='9ed6e7ec56ace00c0013e775575fb55a';

                fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${unit}&appid=${apiKey}`)
                    .then((response) => {
                        if (!response.ok) {
                            throw new Error("Location not found");
                        }
                        return response.json();
                    })
                    .then((data) => {
                        const temperature = data.main.temp;
                        const humidity = data.main.humidity;
                        const windSpeed = data.wind.speed;
                        const description = data.weather[0].description;

                        weatherInfo.innerHTML = `
                            <h2>Weather in ${data.name}</h2>
                            <p>Temperature: ${temperature}°${unit === 'metric' ? 'C' : 'F'}</p>
                            <p>Humidity: ${humidity}%</p>
                            <p>Wind Speed: ${windSpeed}${unit === 'metric' ? 'm/s' : 'km/h'}</p>
                            <p>Description: ${description}</p>
                        `;

                        errorMessage.textContent = "";
                    })
                    .catch((error) => {
                        errorMessage.textContent = error.message;
                        weatherInfo.innerHTML = "";
                    });
            }, (error) => {
                errorMessage.textContent = `Error getting geolocation: ${error.message}`;
            });
        } else {
            errorMessage.textContent = "Geolocation is not supported by this browser.";
        }
    }

    // Event listener for geolocation button
    const geolocationBtn = document.getElementById("geolocationBtn");
    geolocationBtn.addEventListener("click", getWeatherByGeolocation);
});