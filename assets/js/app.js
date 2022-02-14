const allCase = document.querySelector('.all-cases');

//? GET Data From Api
document.addEventListener('DOMContentLoaded',getAllCases)
function getAllCases() {
    axios
    .get('https://covid-api.mmediagroup.fr/v1/cases')
//     .get('assets/js/cases.json')
    .then(res => {
        const AllData = res.data;
        console.log(AllData);
        countingCases(AllData.Global.All.confirmed,8000,allCase)
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