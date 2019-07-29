const searchForm = document.querySelector('form');
const rTemp = document.querySelector('template');
const resultArea = document.querySelector('#restaurant-results');

searchForm.addEventListener('submit', async e => {
  e.preventDefault();
  resultArea.innerHTML = '';
  const query = e.target.querySelector('#restaurant-name').value;
  if (query === '') {
    return
  }
  e.target.querySelector('#restaurant-name').value = '';
  const res = await fetch('/search', {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    method: 'POST', body: `q=${query}`
  })
  const json = await res.json();
  populateData(json.restaurants);
});

function populateData(results) {
  results.forEach(result => {
    const newResult = rTemp.content.cloneNode(true);
    newResult.querySelector('.result-thumbnail').src = result.thumbnail;
    newResult.querySelector('.result-name').innerText = result.name;
    newResult.querySelector('.result-address').innerText = result.location.address;
    newResult.querySelector('.result-locality').innerText = result.location.locality;
    newResult.querySelector('.result-ratings').innerText = result.rating;
    newResult.querySelector('.result-votes').innerText = result.votes;
	resultArea.appendChild(newResult);
    // newResult.querySelector('.result-price').innerText = '$'.repeat(result.price);
    // newResult.querySelector('.result-website').href = result.url;
  });
}