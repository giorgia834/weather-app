const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");
const apiKey = ""

weatherForm.addEventListener("submit", async event =>{
     
    event.preventDefault(); /* to avoid refreshing the form */

    const city = cityInput.value;
    if(city){
        try{
            const weatherData = await getWeatherData(city);
            displayWeatherInfo(weatherData)
            getWeatherIcon(weatherData)

        }catch(error){
            console.log(error);
            displayError(error);

        }

    }else{
        displayError("Please enter a city");
    }

})

async function getWeatherData(city){
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    const response = await fetch(apiUrl);
    console.log(response);

    if (!response.ok){ //checks that response ok object is not true
        throw new Error("Weather data could not be fetched");

    }

    return await response.json();

}

function displayWeatherInfo(data){
    console.log(data)

    const {name:city, main:{temp,humidity},weather:[{description, icon}]} = data;

    const nameH1 = document.createElement("h1");
    nameH1.textContent = city;
    
    const tempH1 = document.createElement("h1");
    tempH1.textContent = city;

    const humidityH1 = document.createElement("p");
    humidityH1.textContent = city;

    const descriptionH1 = document.createElement("p");

}

function getWeatherIcon(data){

    const iconImg = document.createElement("img");
    iconImg.classList.add("weatherIcon");
    document.getElementByClass("weatherIcon").src = `https://openweathermap.org/img/wn/${icon}@2x.png`; //icon URL


}

function displayError(message){
    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = message;
    errorDisplay.classList.add("errorDisplay");
// fix the code below 
    card.textContent = "";
    card.style.display = "flex";
    card.appendChild(errorDisplay);



}