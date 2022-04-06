const headers = new Headers();
headers.append("X-CSCAPI-KEY", "UU91cms3ODF1NjFNdjNDTVhVQ0ZoeElpNmRWZU5pS2VXRTlnZ0pPbA==");

const url = 'https://api.countrystatecity.in/v1/countries/IN/states/MH/cities'
const inputType = document.querySelector(".profiel main form select:nth-of-type(2)")

const requestOptions = {
 method: 'get',
 headers: headers,
 redirect: 'follow'
};

fetch(url, requestOptions)
.then((response) => {
    return response.json();
})
.then((data) => {
    let inputType = data;
})

// .then(result => console.log(result))
// .catch(error => console.log('error', error));


// async function loadApi() {
//     return await res.json();
// }

// loadApi().then(data => {
//     console.log(data)
// })

