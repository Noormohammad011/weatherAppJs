/*
 * Title: Weather App
 * Description: Weather App Manupulation
 * Author: Noormohammad
 * Date: 29/08/2021
 *
 */

//Private api
const api = {
  key: 'Your Api Key',
  base: 'https://api.openweathermap.org/data/2.5/',
}

//Decalaration
const search = document.getElementById('search')
const btn = document.getElementById('btn')

//Fetchin Data
const fetchData = async (value = 'Dhaka') => {
  try {
    const res = await fetch(
      `${api.base}weather?q=${value}&units=metric&appid=${api.key}`
    )
    const data = await res.json()
    displayData(data)
  } catch (err) {
    console.error(err)
  }
}

fetchData()

//EventListener methods
btn.addEventListener('click', (e) => {
  e.preventDefault()
  // Get search term
  const term = search.value

  // Check for empty
  if (term.trim()) {
    fetchData(search.value)
    search.value = ''
  } else {
    alert('Please enter a search term')
  }
})

function displayData(data) {
  if (data.cod === '404') {
    const error = document.querySelector('.error')
    error.textContent = 'Please enter a valid city'
    search.value = ''
    setTimeout(function () {
      error.textContent = ''
    }, 2000)
  } else {
    const city = document.querySelector('.city')
    city.innerText = `${data.name}, ${data.sys.country}`

    const today = new Date()
    const date = document.querySelector('.date')
    date.innerText = dateFunction(today)

    const temp = document.querySelector('.temp')
    temp.innerHTML = `Temp: ${Math.round(data.main.temp)} <span>°C</span>`

    const weather = document.querySelector('.weather')
    weather.innerText = `Weather: ${data.weather[0].main}`

    const tempRange = document.querySelector('.temp-range')
    tempRange.innerText = `Temp Range: ${Math.round(
      data.main.temp_min
    )}°C / ${Math.round(data.main.temp_max)}°C`

    const weatherIcon = document.querySelector('.weather-icon')
    const iconURL = 'http://openweathermap.org/img/w/'
    weatherIcon.src = iconURL + data.weather[0].icon + '.png'

    search.value = ''
  }
}

function dateFunction(d) {
  let months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'June',
    'July',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ]
  let days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ]

  let day = days[d.getDay()]
  let date = d.getDate()
  let month = months[d.getMonth()]
  let year = d.getFullYear()

  return `${day}, ${date} ${month} ${year}`
}
