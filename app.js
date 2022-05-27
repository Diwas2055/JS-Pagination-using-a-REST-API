var proxyUrl = "https://jsonplaceholder.typicode.com/"
var baseUrl = "posts"
var data_collection = []
    // var current_page = 1
    // var records_per_page = 10;
var apiUrl = `${proxyUrl}${baseUrl}`;
console.log(apiUrl);

const pageSize = 10;
let curPage = 1;

async function renderTable(page = 1) {
    await getData()

    if (page == 1) {
        prevButton.style.visibility = "hidden";
    } else {
        prevButton.style.visibility = "visible";
    }

    if (page == numPages()) {
        nextButton.style.visibility = "hidden";
    } else {
        nextButton.style.visibility = "visible";
    }

    // create html
    var table_data = "";
    data_collection.filter((row, index) => {
        let start = (curPage - 1) * pageSize;
        let end = curPage * pageSize;
        if (index >= start && index < end) return true;
    }).forEach(data => {
        console.table(data)
        table_data += "<tr>";
        table_data += `<td> ${data.id} </td>`;
        table_data += `<td> ${data.userId}</td>`;
        table_data += `<td> ${data.title} </td>`;
        table_data += `<td> ${data.body}</td>`;
        "<tr>";
    });
    document.getElementById("data").innerHTML = table_data;
}

function previousPage() {
    if (curPage > 1) {
        curPage--;
        renderTable(curPage);
    }
}

function nextPage() {
    if ((curPage * pageSize) < data_collection.length) {
        curPage++;
        renderTable(curPage);
    }
}

renderTable()

function numPages() {
    return Math.ceil(data_collection.length / pageSize);
}

document.querySelector('#nextButton').addEventListener('click', nextPage, false);
document.querySelector('#prevButton').addEventListener('click', previousPage, false);
//Fetch Data from API
async function getData() {
    const response = await fetch(apiUrl)
    const coins = await response.json()
    console.log(coins)
    data_collection = coins
}