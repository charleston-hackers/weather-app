<template>
<div>
  <h1>{{ title }}</h1>
  <div class='zipSubmitContainer'>
    <label for='zipCode'>Zip Code</label>
    <input name='zipCode' v-model='zipCode'>
    <button @click='getFiveDayF'>Get Forecast</button>

    <div v-if='show' class='tempSwapContainer'>
      <button class='changeTemp' @click='getFiveDayC'>Celcius</button>
      <button class='changeTemp' @click='getFiveDayF'>Farenheit</button>
    </div>
  </div>
  <section if='forecastSection'>
    <p v-if='loading' class='loading'>Loading...</p>
    <div v-if='show' id='forecastContainer'>
      <p>Current Temp: {{currentTemp}}<span v-if='!celcius'>&#176;F</span><span v-if='celcius'>&#176;C</span></p>
      <p>Low: {{minTemp}}<span v-if='!celcius'>&#176;F</span><span v-if='celcius'>&#176;C</span></p>
      <p>High: {{maxTemp}}<span v-if='!celcius'>&#176;F</span><span v-if='celcius'>&#176;C</span></p>
      <p>Current: Conditions: <img v-bind:src="icon" alt='weather icon' > {{description}}</p>
      <p>Wind Speed: {{wind}}</p>
      <p>Sun Rise: {{sunrise}}</p>
      <p>Sun Set: {{sunset}}</p>
    </div>
  </section>
</div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'CurrentForecast',
  data () {
    return {
      title: 'Current Forecast',
      show: false,
      loading: false,
      zipCode: '',
      celcius: false,
      apiKey: '6d4b44ccad1f2520a63a7d7c42719e45',
      urlPartial: "https://api.openweathermap.org/data/2.5/weather?zip=",
      currentTemp: '',
      minTemp: '',
      maxTemp:'',
      sunrise: '',
      sunset: '',
      pressure: '',
      humidity: '',
      wind: '',
      description: '',
      icon: ''
    }
  },
  methods: {
    getFiveDayF (){
      this.show = false;
      this.loading = true;
      const zipCode = this.zipCode;
      const apiKey = this.apiKey;
      const urlPartial = this.urlPartial;
      const urlString = this.urlPartial + this.zipCode + "&units=imperial&APPID=" + this.apiKey;

      console.log(urlString);

      axios
        .get(urlString)
        .then(response => {
          this.show = true;
          this.celcius = false;
          this.loading = false;
          console.log(response.data);
          this.show = true;
          this.currentTemp = response.data.main.temp;
          this.minTemp = response.data.main.temp_min;
          this.maxTemp = response.data.main.temp_max;
          this.pressure = response.data.main.pressure;
          this.humidity = response.data.main.humidity + '%';
          this.wind = response.data.wind.speed + 'm/s';
          this.description = response.data.weather[0].description;
          this.icon = 'http://openweathermap.org/img/w/' + response.data.weather[0].icon + '.png';
          this.sunrise = new Date(response.data.sys.sunrise*1000).toLocaleTimeString("en-GB").slice(0,4);
          this.sunset = new Date(response.data.sys.sunset*1000).toLocaleTimeString("en-GB").slice(0,4);
        })
        .catch(error => {
            console.log(error);
        });
    },
    getFiveDayC (){
      this.show = false;
      this.loading = true;
      const zipCode = this.zipCode;
      const apiKey = this.apiKey;
      const urlPartial = this.urlPartial;
      const urlString = this.urlPartial + this.zipCode + "&units=metric&APPID=" + this.apiKey;

      console.log(urlString);

      axios
        .get(urlString)
        .then(response => {
          this.show = true;
          this.loading = false;
          this.celcius = true;
          console.log(response.data);
          this.show = true;
          this.currentTemp = response.data.main.temp;
          this.minTemp = response.data.main.temp_min;
          this.maxTemp = response.data.main.temp_max;
          this.pressure = response.data.main.pressure;
          this.humidity = response.data.main.humidity + '%';
          this.wind = response.data.wind.speed + 'm/s';
          this.description = response.data.weather[0].description;
          this.icon = 'http://openweathermap.org/img/w/' + response.data.weather[0].icon + '.png';
          this.sunrise = new Date(response.data.sys.sunrise*1000).toLocaleTimeString("en-GB").slice(0,4);
          this.sunset = new Date(response.data.sys.sunset*1000).toLocaleTimeString("en-GB").slice(0,4);
        })
        .catch(error => {
            console.log(error);
        });
    },
    beforeMount() {
    this.getFiveDayF();
    this.getFiveDayC();
  }
  }
}
</script>
