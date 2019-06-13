<template>
<div class='mainBody'>
  <section>
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
  </section>

  <section id='forecastSection'>
    <p v-if='loading' class='loading'>Loading...</p>
    <div v-if='show' v-for='day in forecasts' class='hourForecast'>
      <div>

      </div>
      <p style='width: 100%; margin: 0px; font-weight: bold;'>{{ new Date(day.dt * 1000).toLocaleString() }}</p>
      <p class='forecastTemp top'>Low: {{ day.main.temp_min }}<span v-if='!celcius'>&#176;F</span><span v-if='celcius'>&#176;C</span> <span class='description'>{{ day.weather[0].description }}</span></p>
      <hr>
      <p class='forecastTemp bottom'>High: {{ day.main.temp_max }}<span v-if='!celcius'>&#176;F</span><span v-if='celcius'>&#176;C</span></p>
    </div>
  </section>


</div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'FiveDayForecast',
  data () {
    return {
      title: '5 Day Forecast',
      show: false,
      loading: false,
      celcius: false,
      zipCode: '',
      apiKey: '6d4b44ccad1f2520a63a7d7c42719e45',
      urlPartial: 'https://api.openweathermap.org/data/2.5/forecast?zip=',
      forecasts: []
    }
  },
  methods: {
    getFiveDayF (){
      this.loading = true;
      this.show = false;
      const zipCode = this.zipCode;
      const apiKey = this.apiKey;
      const urlPartial = this.urlPartial;
      const urlString = this.urlPartial + this.zipCode + '&units=imperial&APPID=' + this.apiKey;

      this.show = true;

      axios
        .get(urlString)
        .then(response => {
          this.show = true;
          this.loading = false;
          this.celcius = false;
          var list = response.data.list.length;
          this.forecasts = response.data.list;
          console.log(this.forecasts);
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
      const urlString = this.urlPartial + this.zipCode + '&units=metric&APPID=' + this.apiKey;

      this.show = true;

      axios
        .get(urlString)
        .then(response => {
          this.show = true;
          this.loading = false;
          this.celcius = true;
          var list = response.data.list.length;
          this.forecasts = response.data.list;
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
