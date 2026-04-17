const API_KEY = "dd7cbd7960e231fa301d2cec41ee8e22";
const GEO_URL = "https://api.openweathermap.org/geo/1.0/direct";
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";
const AIR_POLLUTION_URL = "https://api.openweathermap.org/data/2.5/air_pollution";

const searchForm = document.getElementById("searchForm");
const cityInput = document.getElementById("cityInput");
const locationBtn = document.getElementById("locationBtn");
const statusText = document.getElementById("statusText");

const cityName = document.getElementById("cityName");
const weatherDesc = document.getElementById("weatherDesc");
const tempValue = document.getElementById("tempValue");
const windValue = document.getElementById("windValue");
const humidityValue = document.getElementById("humidityValue");
const feelsLikeValue = document.getElementById("feelsLikeValue");
const ozoneValue = document.getElementById("ozoneValue");

function setStatus(message = "", type = "") {
  statusText.textContent = message;
  statusText.className = "status";

  if (type) {
    statusText.classList.add(type);
  }
}

function formatTemperature(value) {
  return `${Math.round(value)}°`;
}

function resetWeatherUI() {
  cityName.textContent = "도시명";
  weatherDesc.textContent = "날씨 정보를 불러와 주세요.";
  tempValue.textContent = "15°";
  windValue.textContent = "0 m/s";
  humidityValue.textContent = "0%";
  feelsLikeValue.textContent = "0°C";
  ozoneValue.textContent = "0 μg/m³";
  setStatus("");
}

function updateWeatherUI(data, ozone = null) {
  const city = data.name || "도시명";
  const country = data.sys?.country ? `, ${data.sys.country}` : "";
  const description = data.weather?.[0]?.description || "날씨 정보 없음";
  const main = data.main || {};
  const wind = data.wind || {};

  cityName.textContent = `${city}${country}`;
  weatherDesc.textContent = description;
  tempValue.textContent = formatTemperature(main.temp ?? 0);
  windValue.textContent = `${(wind.speed ?? 0).toFixed(2)} m/s`;
  humidityValue.textContent = `${main.humidity ?? 0}%`;
  feelsLikeValue.textContent = `${Math.round(main.feels_like ?? 0)}°C`;
  ozoneValue.textContent = ozone !== null ? `${Math.round(ozone)} μg/m³` : "정보 없음";
}

async function fetchOzoneByCoords(lat, lon) {
  const url = `${AIR_POLLUTION_URL}?lat=${lat}&lon=${lon}&appid=${API_KEY}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("대기질 정보를 불러오지 못했습니다.");
  }

  const data = await response.json();
  return data?.list?.[0]?.components?.o3 ?? null;
}

async function fetchWeatherByCity(city) {
  if (!city) {
    setStatus("도시명을 먼저 입력해 주세요.", "error");
    return;
  }

  if (API_KEY === "YOUR_OPENWEATHER_API_KEY") {
    setStatus("API 키를 먼저 입력해 주세요.", "error");
    return;
  }

  setStatus("날씨 정보를 불러오는 중입니다...", "loading");

  try {
    const geoResponse = await fetch(
      `${GEO_URL}?q=${encodeURIComponent(city)}&limit=1&appid=${API_KEY}`
    );

    if (!geoResponse.ok) {
      const geoError = await geoResponse.json().catch(() => null);
      throw new Error(geoError?.message || "도시 좌표 정보를 불러오지 못했습니다.");
    }

    const geoData = await geoResponse.json();

    if (!Array.isArray(geoData) || geoData.length === 0) {
      throw new Error("검색한 도시를 찾을 수 없습니다.");
    }

    const { lat, lon, name, country, state } = geoData[0];

    const weatherResponse = await fetch(
      `${BASE_URL}?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=kr`
    );

    if (!weatherResponse.ok) {
      const weatherError = await weatherResponse.json().catch(() => null);
      throw new Error(weatherError?.message || "날씨 정보를 불러오지 못했습니다.");
    }

    const data = await weatherResponse.json();
    const ozone = await fetchOzoneByCoords(lat, lon);

    if (name) {
      data.name = state ? `${name}, ${state}` : name;
    }

    if (data.sys && country) {
      data.sys.country = country;
    }

    updateWeatherUI(data, ozone);
    setStatus("조회가 완료되었습니다.");
  } catch (error) {
    const message = String(error.message || "").toLowerCase();

    if (
      message.includes("401") ||
      message.includes("invalid api key") ||
      message.includes("api key")
    ) {
      setStatus("API 키가 없거나 올바르지 않습니다. 발급받은 키를 정확히 넣어 주세요.", "error");
      return;
    }

    setStatus(error.message || "날씨 정보를 불러오지 못했습니다.", "error");
  }
}

async function fetchWeatherByCoords(lat, lon) {
  if (API_KEY === "YOUR_OPENWEATHER_API_KEY") {
    setStatus("API 키를 먼저 입력해 주세요.", "error");
    return;
  }

  setStatus("현재 위치의 날씨 정보를 불러오는 중입니다...", "loading");

  try {
    const weatherResponse = await fetch(
      `${BASE_URL}?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=kr`
    );

    if (!weatherResponse.ok) {
      const weatherError = await weatherResponse.json().catch(() => null);
      throw new Error(weatherError?.message || "현재 위치의 날씨 정보를 가져오지 못했습니다.");
    }

    const data = await weatherResponse.json();
    const ozone = await fetchOzoneByCoords(lat, lon);

    updateWeatherUI(data, ozone);
    setStatus("현재 위치 날씨 조회가 완료되었습니다.");
  } catch (error) {
    const message = String(error.message || "").toLowerCase();

    if (
      message.includes("401") ||
      message.includes("invalid api key") ||
      message.includes("api key")
    ) {
      setStatus("API 키가 없거나 올바르지 않습니다. 발급받은 키를 정확히 넣어 주세요.", "error");
      return;
    }

    setStatus(error.message || "현재 위치 날씨 정보를 불러오지 못했습니다.", "error");
  }
}

searchForm.addEventListener("submit", function (event) {
  event.preventDefault();
  fetchWeatherByCity(cityInput.value.trim());
});

cityInput.addEventListener("focus", function () {
  cityInput.value = "";
  resetWeatherUI();
});

locationBtn.addEventListener("click", function () {
  if (!navigator.geolocation) {
    setStatus("이 브라우저에서는 위치 기능을 지원하지 않습니다.", "error");
    return;
  }

  navigator.geolocation.getCurrentPosition(
    function (position) {
      const { latitude, longitude } = position.coords;
      fetchWeatherByCoords(latitude, longitude);
    },
    function () {
      setStatus("위치 권한이 거부되어 현재 위치를 확인할 수 없습니다.", "error");
    },
    {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0
    }
  );
});