//! Assign To DOM
const allCase = document.querySelector('.all-cases');
const search = document.querySelector('.search');
const resultContainer = document.querySelector('.result-container')
const contentContainer = document.querySelector('.content-container')

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
      countryElement.addEventListener('click',()=>{createCountryCard(country)})
     })
}

//todo CountryCard Render

function createCountryCard(country) {
    resultContainer.innerHTML = ''
    search.value = ''
    contentContainer.innerHTML =   `
        <div class="country-card">       
            <header style='${caseFrequency(country.confirmed,country.population)}'>
                <img src="https://flagcdn.com/48x36/${country.abbreviation.toLowerCase()}.png" alt="">
                <div class="card-title">
                    <h3>${country.country}</h3>
                    <p>${country.capital_city}</p>
                </div>
            </header>
            <main>
                <p>confirmed : ${numeral(country.confirmed).format('0,0')}</p>
                <p>deaths : ${numeral(country.deaths).format('0,0')}</p>
                <p>population : ${numeral(country.population).format('0,0')}</p>
                <p>area : ${numeral(country.sq_km_area).format('0,0')}</p>
                <p>life expectancy : ${numeral(country.life_expectancy).format('0,0')}%</p> 
            </main>
    </div>
`
caseFrequency(country.confirmed,country.population)
}

//* Add Red Color to Header
function caseFrequency(confirmed,population) {
    const frequency = eval((confirmed/population).toFixed(2)) + 0.2
    return `background : rgba(255,0,0,${frequency})`
}