import fetch from "node-fetch";
const PLANETS = [
    "mercury",
    "venus",
    "mars",
    "jupiter",
    "saturn",
    "uranus",
    "neptune"
];

async function interactionWithAPI(endpoint, method, body = null) {
    const response = await fetch(`https://api.le-systeme-solaire.net/rest.php${endpoint}`, {
        method,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: method !== 'GET' && body ? JSON.stringify(body) : undefined,
    });

    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return await response.json();
}

async function challenge1() {
    try {
        //Retrieving Sun data
        const sunData = await interactionWithAPI('/bodies/sun', 'GET');
        //Calculating difference
        const pin = sunData.equaRadius - sunData.meanRadius;
        return pin;
    } catch (error) {
        console.error("Error:", error);
    }
}

async function challenge2() {
    try {
        //Retrieving Earth data and declaring a variable for Earths axial tilt
        const earthData = await interactionWithAPI('/bodies/earth', 'GET');
        const earthAxialTilt = earthData.axialTilt;

        //Declaring variables for the result
        let closestPlanet = '';
        let closestTiltDifference = Infinity;

        //Making a loop to run through all planets except earth, using const array PLANETS on top of code
        for (let planet of PLANETS) {
            //Every iteration runs though the api info for each planet using "planet"
            let planetData = await interactionWithAPI(`/bodies/${planet}`, 'GET');
            //Declaring a variable for the planets axial tilt
            let planetAxialTilt = planetData.axialTilt;

            //Calculating difference
            let tiltDifference = Math.abs(earthAxialTilt - planetAxialTilt);

            //Reassigning the result variables to the new closest planet
            if (tiltDifference < closestTiltDifference) {
                closestPlanet = planet;
                closestTiltDifference = tiltDifference;
            }
        }
        
        return closestPlanet;

    } catch (error) {
        console.error("Error:", error);
    }
}

async function challenge3() {
    //Much of the same thought process from Challenge 2
    try {
        let planetWithShortestDay = '';
        let shortestDayLength = Infinity;

        for (let planet of PLANETS) {
            let planetData = await interactionWithAPI(`/bodies/${planet}`, 'GET');
            let planetDayLength = Math.abs(planetData.sideralRotation);
            
            if (planetDayLength < shortestDayLength) {
                shortestDayLength = planetDayLength;
                planetWithShortestDay = planet;
            }
        }

        console.log(planetWithShortestDay);
        return planetWithShortestDay;

    } catch (error) {
        console.error("Error:", error);
    }
}

async function challenge4() {
    try {
        //Retrieving Jupiter data and declaring a variable for Jupiter's moons
        const jupiterData = await interactionWithAPI('/bodies/jupiter', 'GET');
        const jupiterMoons = jupiterData.moons;
        //Returning the length of the list of moons
        return jupiterMoons.length;

    } catch (error) {
        console.error("Error:", error);
    }
}

async function challenge5() {
    try {
        //Retrieving Jupiter data and declaring a variable for Jupiter's moons
        const jupiterData = await interactionWithAPI('/bodies/jupiter', 'GET');
        const jupiterMoons = jupiterData.moons;

        //Declaring variables for the result
        let largestMoon = '';
        let largestMoonSize = 0;

        //Every iteration runs though the API info for each moon using "jupiterMoons", and removing all whitespace correctly access the API info for the moons
        for (let moon of jupiterMoons) {
            let moonData = await interactionWithAPI(`/bodies/${moon.rel.split('/').pop()}`, 'GET');
            //Declaring a variable for the moons size using its mean radius
            let moonSize = moonData.meanRadius;

            //Reassigning the result variables to the new biggest moon
            if (moonSize > largestMoonSize) {
                largestMoonSize = moonSize;
                largestMoon = moon.moon;
            }
        }

        return largestMoon;

    } catch (error) {
        console.error("Error:", error);
    }
}

async function challenge6() {
    try {
        //Retrieving Pluto data and declaring a variable for Pluto's classification
        const plutoData = await interactionWithAPI('/bodies/pluto', 'GET');
        const plutoClassification = plutoData.bodyType;

        //Returning Pluto's Classification
        return plutoClassification;

    } catch (error) {
        console.error("Error:", error);
    }
}