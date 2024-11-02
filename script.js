// Function to display date and time for a specific element and time zone
function displayTime(elementId, timeZone) {
    const element = document.getElementById(elementId);
    const dateElement = element.querySelector(".date");
    const timeElement = element.querySelector(".time");
    const currentTime = moment().tz(timeZone);

    dateElement.innerHTML = currentTime.format("D MMMM YYYY");
    timeElement.innerHTML = `${currentTime.format("H:mm:ss")} <small>${currentTime.format("A")}</small>`;
}

// Update times every second for each city
const updateIntervals = {
    "doha": setInterval(() => displayTime("doha", "Asia/Qatar"), 1000),
    "new-york": setInterval(() => displayTime("new-york", "America/New_York"), 1000),
    "tokyo": setInterval(() => displayTime("tokyo", "Asia/Tokyo"), 1000)
};

// Handle select element to display a chosen city
document.getElementById("city-select").addEventListener("change", function() {
    const selectedCity = this.value;

    if (selectedCity) {
        const selectedCityElement = document.createElement("div");
        selectedCityElement.className = "city"; // Add the city class for styling
        selectedCityElement.id = selectedCity; // Set the ID to the city name
        selectedCityElement.innerHTML = `
            <div>
                <h3>${selectedCity.replace('_', ' ')}</h3>
                <div class="date">${moment().tz(selectedCity).format("D MMMM YYYY")}</div>
            </div>
            <div class="time">${moment().tz(selectedCity).format("H:mm:ss")} <small>${moment().tz(selectedCity).format("A")}</small></div>`;
        document.querySelector(".container").appendChild(selectedCityElement);

        // Start a new interval for the selected city if it doesn't already exist
        if (!updateIntervals[selectedCity]) {
            updateIntervals[selectedCity] = setInterval(() => displayTime(selectedCity, selectedCity), 1000);
        }

        // Show homepage link if a city is selected
        document.getElementById("homepage-link").style.display = "block";
    }
});

// Display current user location date and time
function displayUserLocationTime() {
    const userLocation = document.getElementById("user-location");
    const dateElement = userLocation.querySelector(".date");
    const timeElement = userLocation.querySelector(".time");
    const currentTime = moment();

    dateElement.innerHTML = currentTime.format("D MMMM YYYY");
    timeElement.innerHTML = `${currentTime.format("H:mm:ss")} <small>${currentTime.format("A")}</small>`;
}

// Update the user's local time every second
setInterval(displayUserLocationTime, 1000);
displayUserLocationTime();

// Search for a city and display its time
function searchCity() {
    const cityName = document.getElementById("city-search").value;
    if (cityName) {
        try {
            const cityTime = moment.tz(cityName).format("D MMMM YYYY, H:mm:ss A");

            // Check if the timezone is valid
            if (cityTime !== "Invalid date") {
                // Create a new city element
                const searchCityElement = document.createElement("div");
                searchCityElement.className = "city"; // Style it like other city elements
                searchCityElement.id = `time-${cityName}`; // Set a unique ID for the time

                // Set the initial time
                searchCityElement.innerHTML = `
                    <div>
                        <h3>${cityName}</h3>
                        <div class="date">${moment.tz(cityName).format("D MMMM YYYY")}</div>
                    </div>
                    <div class="time">${moment.tz(cityName).format("H:mm:ss")} <small>${moment.tz(cityName).format("A")}</small></div>`;

                document.querySelector(".container").appendChild(searchCityElement);

                // Start an interval for the new city
                updateIntervals[cityName] = setInterval(() => {
                    const currentTime = moment.tz(cityName);
                    document.getElementById(`time-${cityName}`).querySelector(".time").innerHTML = `${currentTime.format("H:mm:ss")} <small>${currentTime.format("A")}</small>`;
                }, 1000);
                
                // Clear the input field after displaying the time
                document.getElementById("city-search").value = "";
            } else {
                alert("City not found. Please enter a valid city name.");
            }
        } catch (error) {
            alert("An error occurred. Please try another city.");
        }
    } else {
        alert("Please enter a city name to search.");
    }
}
