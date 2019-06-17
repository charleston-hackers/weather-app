<template>
<div>
  <h1>{{ title }}</h1>
  <div class='zipSubmitContainer'>
    <label for='zipCode'>Zip Code</label>
    <input name='zipCode' v-model='zipCode'>
    <button @click='getFiveDay'>Get Forecast</button>

    <div v-if='show' class='tempSwapContainer'>
      <button class='changeTemp' @click='getFiveDayC'>Celcius</button>
      <button class='changeTemp' @click='getFiveDayF'>Farenheit</button>
    </div>
  </div>
  <section if='forecastSection'>
    <p v-if='loading' class='loading'>Loading...</p>
    <div v-if='show' id='forecastContainer'>
      <p>Current Temp: <span v-if='!celcius'>{{ currentTemp }}&#176;F</span><span v-if='celcius'>{{ currentTemp }}&#176;C</span></p>
      <p>Low: <span v-if='!celcius'>{{ minTemp }}&#176;F</span><span v-if='celcius'> {{ minTemp }}&#176;C</span></p>
      <p>High: <span v-if='!celcius'>{{ maxTemp }}&#176;F</span><span v-if='celcius'> {{ maxTemp }}&#176;C</span></p>
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
      currentTemp: 0,
      minTemp: 0,
      maxTemp: 0,
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
    getFiveDay (){
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
          this.sunrise = new Date(response.data.sys.sunrise*1000).toLocaleTimeString("en-GB").slice(0,5);
          this.sunset = new Date(response.data.sys.sunset*1000).toLocaleTimeString("en-GB").slice(0,5);
        })
        .catch(error => {
            console.log(error);
        });
    },
    getFiveDayC (){
      if (this.celcius === true ){
        //do nothing
      } else {
        this.celcius = true;
        this.minTemp = ((this.minTemp - 32) * 5/9).toFixed(2);
        this.maxTemp = ((this.maxTemp - 32) * 5/9).toFixed(2);
        this.currentTemp = ((this.currentTemp - 32) * 5/9).toFixed(1);
      }
    },
    getFiveDayF (){
      if (this.celcius !== true ){
        //do nothing
      } else {
      this.celcius = false;
      this.minTemp =  ((this.minTemp * 9/5) + 32).toFixed(2);
      this.maxTemp =  ((this.maxTemp * 9/5) + 32).toFixed(2);
      this.currentTemp =  ((this.currentTemp * 9/5) + 32).toFixed(1);
      }
    },
    beforeMount() {
      this.getFiveDay();
      this.getFiveDayC();
    }
  }
}
</script>
