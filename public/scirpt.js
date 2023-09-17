document.addEventListener('DOMContentLoaded', () => {
    // Fetch data from the server when the page loads
    const URL = 'http://localhost:8080/api/fetch-data'
    fetchData(URL);
});
const tableBody = document.getElementById('tableBody');

const optionDataAll = document.getElementById('optionDAta');
const topNumbers = document.getElementById('topNumbers');





// fetch data 
const fetchData =  async (url) => {
    try {
        const res = await fetch(url);
        const data = await res.json();
        const sortedTickers = data.sort((a, b) => b.sell - a.sell);

        // Get the top 10 data points
        const top10Data = sortedTickers.slice(0, 10);
        const topData = sortedTickers[1];

        insertDataTableBody(top10Data, topData);
    } catch (error) {
        console.log(error.message)
    }
}


const insertDataTableBody = (data, topData) => {
    let tabledata = '';
    let optionData = '';
    topNumbers.textContent = topData.sell;

    data.map((value,idx) => {
        tabledata += `<tr>
         <td class="col col-1">${idx+1}</td>
         <td class="col col-2"><img src="./img/wazirx1595316329445.png">${value.name}</td>
         <td class="col col-3">&#8377 ${value.last}</td>
         <td class="col col-4">&#8377 ${value.buy} / &#8377 ${value.sell}</td>
         <td class="col col-5">${value.sell - value.last}</td>
         <td class="col col-6">&#8377 ${value.sell - value.buy}</td>
     </tr>
                `
                
            ;

            optionData += `
            
                <option value=${value.base_unit}>${value.base_unit}</option>

            `

            })
            tableBody.innerHTML = tabledata;
            
            optionDataAll.innerHTML = optionData;

}

// ((value.sell - value.last) / Math.abs(value.last)) * 100;