document.addEventListener('DOMContentLoaded', function () {
    const factButton = document.getElementById('fetchFactButton');
    const imageButton = document.getElementById('fetchImageButton');

    // Add event listener for fetching cat facts
    factButton.addEventListener('click', fetchCatFact);

    // Add event listener for fetching cat images
    imageButton.addEventListener('click', fetchCatImage);
});

let catFactsHistory = [];

function fetchCatFact() {
    fetch('https://catfact.ninja/fact')
        .then(response => response.json())
        .then(data => {
            const catFact = data.fact;
            catFactsHistory.push({ type: 'fact', content: catFact });
            updateHistory(); // Only update history when a fact is fetched
            document.body.classList.add('fact-displayed'); // Add the class
        })
        .catch(error => {
            console.error('Error fetching cat fact:', error);
            displayCatContent('<div class="card error">Failed to fetch cat fact. Please try again.</div>');
        });
}


function fetchCatImage() {
    fetch('https://aws.random.cat/meow')
        .then(response => response.json())
        .then(data => {
            const catImage = `<div class="card"><img src="${data.file}" alt="Cat Image" /><p>Image Source: ${data.file}</p></div>`;
            catFactsHistory.push({ type: 'image', content: catImage });
            updateHistory(); // Only update history when an image is fetched
        })
        .catch(error => {
            console.error('Error fetching cat image:', error);
            displayCatContent('<div class="card error">Failed to fetch cat image. Please try again.</div>');
        });
}

function updateHistory() {
    const historyElement = document.getElementById('catHistory');
    historyElement.innerHTML = '<h2>History</h2>';
    catFactsHistory.forEach((item, index) => {
        historyElement.innerHTML += `<div class="card">${index + 1}. ${item.content}</div>`;
    });
}

function displayCatContent(content) {
    document.getElementById('catContent').innerHTML = content;
}