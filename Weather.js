async function getWeather() {
  const location = document.getElementById("locationInput").value.trim();
  const resultDiv = document.getElementById("result");

  if (!location) {
    resultDiv.innerHTML = "<p>Please enter a location.</p>";
    return;
  }

  const apiKey = "7bbb89a71f394f50bcd61750252706";
  const apiUrl = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}&aqi=yes`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error("Location not found or API error.");
    }

    const data = await response.json();
    const temperature = data.current.temp_c;
    const condition = data.current.condition.text;

    resultDiv.innerHTML = `
      <h2>${data.location.name}, ${data.location.country}</h2>
      <p><strong>Temperature:</strong> ${temperature} °C</p>
      <p><strong>Condition:</strong> ${condition}</p>
      <img src="https:${data.current.condition.icon}" alt="${condition}">
    `;
  } catch (error) {
    resultDiv.innerHTML = `<p>Error: ${error.message}</p>`;
  }
}
