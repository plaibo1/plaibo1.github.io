

const searchBtn = document.querySelector('.btn-search');
const cityInput = document.querySelector('.city');

const city = document.querySelector('.weather__card__city');
const tempeture = document.querySelector('.weather__card__temp');
const desc = document.querySelector('.weather__card__desc');
const weatherIcon = document.querySelector('.weather__card__icon');
const windSpeed = document.querySelector('.weather__card__windSpeed span');
const matchList = document.querySelector('.wrapper__searchResults');
const fl = document.querySelector('.weather__card__fl span');

let createIcon = new Image(100, 100);



const api_key = 'e37cc85281635594613c36d8ef86778d';
let city_name = 'New York';

let fetchRequest = '';

// ============== geopos ============== //
const successCallback = pos => {

	let lat = pos.coords.latitude;
	let lon = pos.coords.longitude;

	fetchRequest = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}`;
	updateData(fetchRequest);

}

const errorCallback = err => {
	fetchRequest = `https://api.openweathermap.org/data/2.5/weather?q=${city_name}&appid=${api_key}`;
	updateData(fetchRequest);
}

navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
// ============== geopos ============== //



// ===================== get data ================== //
const updateData = (request = `https://api.openweathermap.org/data/2.5/weather?q=${city_name}&appid=${api_key}`) => {
	fetch(request)
	.then( function (resp) {return resp.json()} )
	.then(function (data){
		//console.log(data);
	
		city.innerHTML = `${data.name}, <span>${data.sys.country}</span>`;
		tempeture.innerHTML = Math.round(data.main.temp) - 273 + '&deg;';
		fl.innerHTML = Math.round(data.main.feels_like) - 273 + '&deg;';
		desc.innerText = data.weather[0].description;
		windSpeed.innerText = data.wind.speed + ' m/s';
		
		createIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
		weatherIcon.append(createIcon)
	
	})
	.catch(function() {
		city.innerHTML = 'Город не найден'
	})
}
// updateData();
// ===================== get data ================== //




// ===================== searching ================== //
const searchStates = async searchText => {

	if (cityInput.value.length >= 3) {

		const res = await fetch(`https://raw.githubusercontent.com/plaibo1/openweathermap-city-list/main/city.list.min.json`);
		const states = await res.json();

		let matches = states.filter(state => {
			const regex = new RegExp(`^${searchText}`, 'gi');
			return state.name.match(regex)
		})

		
	
		outputHtml(matches);
	
		let results = [...document.querySelectorAll('.searchResult')];
		results.forEach(elem => {
			elem.addEventListener('click', () => {
				city_name = elem.children[0].innerText;
				cityInput.value = elem.children[0].innerText;
				matches = [];
				matchList.innerHTML = '';
				matchList.style.display = 'none';
				updateData();
			})
		});

	}

	if (searchText.length <= 2) {
		matches = [];
		matchList.innerHTML = '';
		matchList.style.display = 'none';
	}else {
		matchList.style.display = 'block';
	}

}
cityInput.addEventListener('input', () => searchStates(cityInput.value))
// ===================== searching ================== //





// ====================== output ======================== //
const outputHtml = matches => {
	if(matches.length > 0) {
		const html = matches.map(match => `
			<div class="searchResult">
				<div class="searchResult__city">${match.name}</div>
				<div class="searchResult__country">${match.country}</div>
			</div>
		`)
		.slice(0, 10)
		.join('')

		matchList.innerHTML = html;
	}
}
// ====================== output ======================== //




// ===================== click ================== //
searchBtn.addEventListener('click', () => {
	city_name = cityInput.value;
	matches = [];
	matchList.innerHTML = '';
	matchList.style.display = 'none';
	updateData();
})


window.addEventListener('keyup', (e) => {
	if (e.keyCode === 13) {
		city_name = cityInput.value;
		matches = [];
		matchList.innerHTML = '';
		matchList.style.display = 'none';
		updateData();
	}
})
// ===================== click ================== //
