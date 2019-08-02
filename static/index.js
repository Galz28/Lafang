const searchForm = document.querySelector('form');
const rTemp = document.querySelector('template');
const resultArea = document.querySelector('#restaurant-results');

searchForm.addEventListener('submit', async e => {
  e.preventDefault();
  resultArea.innerHTML = '';

  const query = e.target.querySelector('#restaurant-name').value;
  if (query === '') {
    hideLoadingSign();
    hideRestoList();
    return
  }

  e.target.querySelector('#restaurant-name').value = '';
  hideRestoList();
  const res = await fetch('/search', {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    method: 'POST', body: `q=${query}`
  })

  const json = await res.json();
  populateData(json.restaurants);
  hideLoadingSign();
  showRestoList();
});

function populateData(results) {
  results.forEach(result => {
    const newResult = rTemp.content.cloneNode(true);
    newResult.querySelector('.result-thumbnail').src = result.thumbnail;
    newResult.querySelector('.result-name').innerText = result.name;
    newResult.querySelector('.result-address').innerText = result.location.address;
    newResult.querySelector('.result-locality').innerText = result.location.locality;
    newResult.querySelector('.result-ratings').innerText = result.rating;
    newResult.querySelector('.result-votes').innerText = result.votes + " votes";
    newResult.querySelector('.result-phonenum').innerText = result.phonenum;
    newResult.querySelector('.result-menu').href = result.menu;
    newResult.querySelector('.result-url').href = result.url;
	  resultArea.appendChild(newResult);
    // newResult.querySelector('.result-price').innerText = '$'.repeat(result.price);
    // newResult.querySelector('.result-website').href = result.url;
  });
}

function hideLoadingSign(){
  var load = document.getElementById("load");
  load.style.display = "none";
}

function hideRestoList() {
  var list = document.getElementById("restaurant-list");
  list.style.display = "none";
}

function showRestoList() {
  var list = document.getElementById("restaurant-list");
  list.style.display = "block";
}