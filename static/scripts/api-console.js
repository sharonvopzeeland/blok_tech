// api: https://freegeoip.app/
const url ='https://api.freegeoip.app/json/?apikey=a927e920-b651-11ec-b881-4f248eb4cf1a'


getData()

function getData() {
    fetch(url)
    .then(response => response.json())
    // .then(data => cleanData(data))
    .then(items => showInForm(items))
    .catch(error => console.log('error', error));
}

// function cleanData(data) {
//     console.log(data)
//     const fieldApi = [data].map(function (data) {
//         const lessData = {
//             city: data.region_name,
//             country: data.country_name

//         }
//         return lessData
//     })
//     return fieldApi
// }

function showInForm(data) {
    console.log(data)
    const plaats = document.getElementById("plaats")

    return [data].map(data => {
        plaats.innerHTML +=
        `
        <input value="${data.region_name} "type="text" name="plaats">
        `
    })
}
