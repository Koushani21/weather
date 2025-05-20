const url = 'https://api.openweathermap.org/data/2.5/weather';
const apiKey = 'f00c38e0279b7bc85480c3fe775d518c';

$(document).ready(function () {
  weatherFn('Kolkata');
});

async function weatherFn(cName) {
  const temp = `${url}?q=${cName}&appid=${apiKey}&units=metric`;
  try {
    const res = await fetch(temp);
    const data = await res.json();
    if (res.ok) {
      weatherShowFn(data);
    } else {
      alert('City not found. Please try again.');
    }
  } catch (error) {
    console.error('Error fetching weather data:', error);
  }
}

function weatherShowFn(data) {
  $('#city-name').text(data.name);
  $('#date').text(moment().format('MMMM Do YYYY, h:mm:ss a'));
  $('#temperature').html(`${data.main.temp}°C`);
  $('#description').text(data.weather[0].description);
  $('#humidity').html(`Humidity: ${data.main.humidity}%`);
  $('#wind-speed').html(`Wind Speed: ${data.wind.speed} m/s`);
  $('#weather-icon').attr('src', `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`);
  $('#weather-info').fadeIn();

  // Background switching based on day/night
  const iconCode = data.weather[0].icon;
  let bg = '';
  if (iconCode.includes('n')) {
    bg = "url('https://images.unsplash.com/photo-1503264116251-35a269479413?auto=format&fit=crop&w=1400&q=80')";
  } else {
    bg = "url('https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.vecteezy.com%2Ffree-photos%2Fbeautiful-weather&psig=AOvVaw3Q7TV70QmnwEc0QqomZ9_e&ust=1747494171480000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCMCEuKChqI0DFQAAAAAdAAAAABAE')";
  }
  $('body').css('background-image', bg);
}
