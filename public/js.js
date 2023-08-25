document.addEventListener("DOMContentLoaded", function() {
    const getLocationBtn = document.getElementById("test");

    getLocationBtn.addEventListener("click", function() {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(function(position) {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;

                // Create a JSON object with latitude and longitude values
                const locationJSON = {
                    latitude: latitude,
                    longitude: longitude
                };

                // Send the JSON to the server
                fetch('https://validate-data.onrender.com/api/save-json', { // Replace with your server's URL
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(locationJSON)
                })
                .then(response => {
                    // Handle the server response (e.g., a success confirmation)
                })
                .catch(error => {
                    console.error('Error while sending JSON to the server:', error);
                });
            }, function(error) {
                switch(error.code) {
                    case error.PERMISSION_DENIED:
                        alert("Permission denied to access location.");
                        break;
                    case error.POSITION_UNAVAILABLE:
                        alert("Location information is not available.");
                        break;
                    case error.TIMEOUT:
                        alert("The request for location has timed out.");
                        break;
                    default:
                        alert("An unknown error occurred while obtaining location.");
                }
            });
        } else {
            alert("Your browser does not support geolocation.");
        }
    });
});
