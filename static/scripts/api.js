// code voor apiURL (https://codepen.io/deannabosschert/pen/BaLwVEd?editors=0010) van Deanna (student-assistent), ze heeft me erg geholpen in hoe ik moet fetchen en met de API url info kan ophalen

// code voor API documentation https://countrystatecity.in/docs/api/cities-by-state-country/ 
const apiKey = 'UU91cms3ODF1NjFNdjNDTVhVQ0ZoeElpNmRWZU5pS2VXRTlnZ0pPbA=='
const headers = new Headers();
headers.append('X-CSCAPI-KEY', apiKey);
const requestOptions = {
    method: 'get',
    headers: headers,
    redirect: 'follow'
};


// verwijder 'hidden' als js aanstaat, dit moet meteen gebeuren dus bovenaan
document.getElementById('city').removeAttribute('hidden');

// verander de steden naar de steden van de geselecteerde provincie
function changeValue(event) {
    console.log(event)
    
    // event.target.value selecteert de value van de geselecteerde provincie
    const pickedState = event.target.value
    document.getElementById('city').disabled = false

    // API URL 
    const beginURL = ' https://api.countrystatecity.in/v1'
    const country = 'NL'
    const state = pickedState
    const apiURL = `${beginURL}/countries/${country}/states/${state}/cities`
    
    //fetchen
    fetch(apiURL, requestOptions) // fetch data van API
        .then(response => response.json()) // verander de data in een JSON bestand
        .then(data => cleanData(data)) // stuur de data naar de functie cleanData
        .then(option => showInForm(option)) 
        .catch(error => console.log('error', error)); // als er een error is, stuur dat naar de console
}

// voer de functie uit op de goede plek
const province = document.getElementById('province');
console.log(province)
province.addEventListener('change', changeValue)

// maak een selectie van alle code die je kan ophalen naar alleen de naam van de steden met een map()
function cleanData(data) {
    console.log(data)
    const fieldApi = data.map(function (data) {
        const lessData = {
            city: data.name
        }
        return lessData
    })
    return fieldApi
}

// plaats de data van de API in een option tag die je hier aan maakt, maak het weer leeg als de gebruiker een andere provincie selecteerd
function showInForm(data) {
    const city = document.getElementById("city")
   
    city.innerHTML = ``

    return data.map(data => {
        city.innerHTML +=
        `
        <option value="">${data.city}</option>
        `
    })
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

// getData()

// function getData() { // fetch data from the API, parse to usable data, and then pass it on to cleanData(), turn into select elements, and then show in the form
//     // let apiUrl = `${url}?${city}` // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals?retiredLocale=nl

//     fetch(apiURL, requestOptions) // fetch data from the API
//         .then(response => response.json()) // then, parse the data you get/fetch from the API as JSON
//         .then(data => cleanData(data)) // pass the data to function cleanData
//         // .then(cleanedData => turnIntoElements(cleanedData)) // pass the cleaned data to function turnIntoElements
//         .then(selectElements => showInForm(selectElements)) // pass the selects (html) to function showInForm
//         .catch(error => console.log('error', error)); // if there is an error, log it to the console
// }