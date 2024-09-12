const apiKey = '6759e46a4148470fb62222208240609';

document.getElementById('WeatherBtn').addEventListener('click', getWeather);

async function getWeather() {
    const city = document.getElementById('cityInput').value.trim();
    const weatherDetails = document.getElementById('weatherDetails');
    const errorMsg = document.getElementById('errorMsg');
    const body = document.body;

    weatherDetails.classList.add('hidden');
    errorMsg.innerHTML = '';

    body.classList.remove('rainy', 'sunny', 'snowy');
    removeWeatherEffects();

    if (!city) {
        errorMsg.innerHTML = 'Please enter a city name.';
        return;
    }

    try {
        const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${encodeURIComponent(city)}&aqi=no`);

        if (!response.ok) {
            throw new Error('City not found');
        }

        const data = await response.json();

        const cityName = data.location.name;
        const temperature = data.current.temp_c;
        const Description = data.current.condition.text;
        const weatherIcon = data.current.condition.icon;

        document.getElementById('cityName').innerText = cityName;
        document.getElementById('temperature').innerText = `Temperature: ${temperature}°C`;
        document.getElementById('Description').innerText = Description;
        document.getElementById('weatherIcon').src = `https:${weatherIcon}`;

        weatherDetails.classList.remove('hidden');

        if (Description.toLowerCase().includes('rain')) {
            body.classList.add('rainy');
            addRainDrops();
        } else if (Description.toLowerCase().includes('sun') || Description.toLowerCase().includes('clear')) {
            body.classList.add('sunny');
            addSunEffect();
        } else if (Description.toLowerCase().includes('snow')) {
            body.classList.add('snowy');
            addSnowflakes();
        }

    } catch (error) {
        errorMsg.innerHTML = error.message;
    }
}

function addRainDrops() {
    const rainEffect = document.createElement('div');
    rainEffect.className = 'rainy weather effect'; 
    document.body.appendChild(rainEffect);

    for (let i = 0; i < 100; i++) {
        const drop = document.createElement('div');
        drop.className = 'rain-drop';
        drop.style.left = `${Math.random() * 100}vw`;
        drop.style.animationDuration = `${Math.random() * 0.5 + 0.5}s`;
        rainEffect.appendChild(drop);
    }
}


function addSnowflakes() {
    const snowEffect = document.createElement('div');
    snowEffect.className = 'snowy weather effect';
    document.body.appendChild(snowEffect);

    for (let i = 0; i < 100; i++) {
        const snowflake = document.createElement('div');
        snowflake.className = 'snowflake';
        snowflake.style.left = `${Math.random() * 100}vw`;
        snowflake.style.animationDuration = `${Math.random() * 2 + 1}s`;
        snowflake.style.animationDelay = `${Math.random() * 2}s`;
        snowEffect.appendChild(snowflake);
    }
}

function addSunEffect() {
    const sunEffect = document.createElement('div');
    sunEffect.className = 'sunny weather effect'; 
    document.body.appendChild(sunEffect);
}

function removeWeatherEffects() {
    document.querySelectorAll('.rain-drop, .snowflake, .sunny').forEach(el => el.remove());
}


function createStars() {
    const space = document.getElementById('space');

    for (let i = 0; i < 100; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.left = `${Math.random() * 100}vw`;
        star.style.top = `${Math.random() * 100}vh`;
        star.style.animationDuration = `${Math.random() * 5 + 1}s`; 
        space.appendChild(star);
    }

    for (let i = 0; i < 50; i++) {
        const movingStar = document.createElement('div');
        movingStar.className = 'moving-star';
        movingStar.style.left = `${Math.random() * 100}vw`;
        movingStar.style.top = `${-Math.random() * 100}vh`; 
        movingStar.style.animationDuration = `${Math.random() * 10 + 5}s`;
        space.appendChild(movingStar);
    }
}

document.addEventListener('DOMContentLoaded', createStars);
