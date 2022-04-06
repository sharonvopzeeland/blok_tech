// const {
//     response
// } = require("express");

const headers = new Headers();
headers.append("X-CSCAPI-KEY", "UU91cms3ODF1NjFNdjNDTVhVQ0ZoeElpNmRWZU5pS2VXRTlnZ0pPbA==");

const url = 'https://api.countrystatecity.in/v1/countries/IN/states/MH/cities'
const requestOptions = {
    method: 'get',
    headers: headers,
    redirect: 'follow'
};

// TODO: wannneer je je omgeving hebt aangegeven (en dus op een option binnen de select "omgeving" hebt geklikt)
// ..dan moet je de juiste data ophalen van de API (en dus getData() uitvoeren) enzovoorts

// stap 1: wanneer je op die option hebt geklikt, voer dan getData() uit, waarbij je ook meegeeft welke omgeving je hebt gekozen
// wanneerjeopdeoptionklikt.addEventlistener etc
getData()

function getData() { // fetch data from the API, parse to usable data, and then pass it on to cleanData(), turn into select elements, and then show in the form
    // let apiUrl = `${url}?${city}` // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals?retiredLocale=nl

    fetch(url, requestOptions) // fetch data from the API
        .then(response => response.json()) // then, parse the data you get/fetch from the API as JSON
        .then(data => cleanData(data)) // pass the data to function cleanData
        // .then(cleanedData => turnIntoElements(cleanedData)) // pass the cleaned data to function turnIntoElements
        .then(selectElements => showInForm(selectElements)) // pass the selects (html) to function showInForm
        .catch(error => console.log('error', error)); // if there is an error, log it to the console
}

// step 1: clean the data
function cleanData(data) {
    console.log(data)
    const firstFieldApi = data.map(function (data) {
        const lessData = {
            id: data.id,
            city: data.name, 
            state: data.state,
            country: data.country,
            cities: data.cities
        }

        return lessData
    })


    return firstFieldApi
    // const eersteFieldUitAPI = // TODO: map the data to a new array
    // TODO: return daarna de data (daarmee returnt 'ie het .then() die erna komt (dus gewoon: return eersteFieldUitAPI))
}


// step 3: show the data in the form
function showInForm(data) {
    console.log(data)
    const plaats = document.getElementById("plaats")

    return data.map(data => {
        plaats.innerHTML +=
        `
        <option value="name">${data.city}
        `
    })
    // TODO: voeg de select-elementen toe aan de form
    // hint: iets doen met innerHTML of https://developer.mozilla.org/en-US/docs/Web/API/Element/insertAdjacentHTML
}





// UITLEG/VOORBEELDJES VAN HOE DIE .then() FUNCTIE WERKT
// fetch("url")
//     .then(dataUitDeApi => dataUitDeApi.json()) // dataUitDeApi is de data die we krijgen van de API
//     .then(deDataDieGeparsedIs => console.log(deDataDieGeparsedIs)) // pakt de data die gereturned wordt uit de vorige functie, weer arrow function, zodat we de data kunnen gebruiken in de console.log
//     .then(dezelfdeDataAlsHierboven => console.log(dezelfdeDataAlsHierboven))

// // UITLEG/VOORBEELDJES VAN HOE ARROW FUNCTIONS WERKEN
// fetch("url")
//     .then(function (dataUitDeApi) {  // dataUitDeApi is de data die we krijgen van de API
//             return dataUitDeApi.json(); // parsed die data als JSON
//         })
//     .then(function (deDataDieGeparsedIs) { // pakt de data die gereturned wordt uit de vorige functie, weer arrow function, zodat we de data kunnen gebruiken in de console.log
//             return console.log(deDataDieGeparsedIs); // console logt de data die gereturned wordt uit de vorige functie
//         }) 
//     .then(function (dezelfdeDataAlsHierboven) { // pakt ook weer de data die gereturned wordt uit de vorige functie
//             return console.log(dezelfdeDataAlsHierboven);
//         })

// UITLEG/VOORBEELDJES VAN HOE .map GEBRUIKT WORDT OM JE DATA TE CLEANEN (/beperken)
// function cleanData(data) {
//     console.log('cleaning api data')

//     const deDataDeIkWilGebruiken = data.map(function (data) {
//         const minderData = {
//           id: data.id,
//           url: data.urls.regular,
//           width: data.width,
//           height: data.height,
//           color: data.color,
//           alt: data.alt_description,
//           photographer: data.user.name,
//           location: data.location.title
//         }

//         return minderData
//       })

//     return deDataDeIkWilGebruiken
//   }



// OLD STUFF
// fetch(url, requestOptions)
//     .then((response) => {
//         return response.json();
//     })
//     .then((data) => {
//         let inputType = data;
//     })


// .then(result => console.log(result))
// .catch(error => console.log('error', error));
// async function loadApi() {
//     return await res.json();
// }
// loadApi().then(data => {
//     console.log(data)
// })