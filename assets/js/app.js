//! Assign To DOM
const allCase = document.querySelector('.all-cases');
const search = document.querySelector('.search');
const resultContainer = document.querySelector('.result-container')

//? GET Data From Api
document.addEventListener('DOMContentLoaded',getAllCases)
function getAllCases() {
    axios
    .get('https://covid-api.mmediagroup.fr/v1/cases')
//     .get('assets/js/cases.json')
    .then(res => {
        const AllData = res.data;
        countingCases(AllData.Global.All.confirmed,8000,allCase)
        search.addEventListener('input',()=>{searchCases(AllData)})
    })
}

//* Count All Cases
function countingCases(number,delay,element) {
     let count = number - delay
     const intCount = setInterval(() => {
         if(count >= number) clearInterval(intCount)
         count+= 100
         element.innerHTML = numeral(count).format('0,0')
     }, 50);
}

function searchCases(AllData) {
     const searchValue = search.value.toLowerCase() 
     const searchResults = []
     for (const data in AllData) {
         const country = AllData[data]['All']
         if(country.hasOwnProperty("country") && country.country.toLowerCase().includes(searchValue)){
             searchResults.push(country)
         } 
     }
     createSearchResult(searchResults,searchValue);
 }
 function createSearchResult(searchResults,searchValue) {
     if(searchValue.length <= 1){
         resultContainer.innerHTML = ''
         return
     }
     resultContainer.innerHTML = ''
     searchResults.forEach(country => {
       const countryElement = document.createElement('div');
       countryElement.classList.add('search-result');
       countryElement.innerHTML = `
         <img src="https://flagcdn.com/20x15/${country.abbreviation.toLowerCase()}.png" alt="">
         <p>${country.country}</p>
       `
       resultContainer.appendChild(countryElement)
     })
 }
 