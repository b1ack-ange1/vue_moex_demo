<template>
  <div>
    <p>MOOGLE</p>

    <b-input-group prepend="Тикер для поиска" style="width: 500px;margin: auto;">
      <b-form-input v-model="query" @keyup.enter.prevent="find"></b-form-input>
      <b-input-group-append>
        <b-btn variant="info" @click="find">Поиск</b-btn>
      </b-input-group-append>
    </b-input-group>

    <b-card v-if="found" title="Информация"
            tag="article"
            style="max-width: 20rem;margin: auto;margin-top: 20px;"
            class="mb-2">
      <div class="card-text">
        <p>Тикер: {{ data[0] }}</p>
        <p>Название:{{ data[2] }}</p>
        <p>Цена: {{ data[3] }}</p>
      </div>
    </b-card>

    <b-card v-if="found" title="Цена акции"
            tag="article"
            style="max-width: 800px;margin: auto;margin-top: 20px;"
            class="mb-2">
      <line-chart :chart-data="chartData" :chart-labels="chartLabels"></line-chart>
    </b-card>
  </div>
</template>

<script>
  import axios from 'axios'
  import LineChart from '@/components/LineChart'

  export default {
    components: {
      LineChart
    },
    name: 'Find',
    data () {
      return {
        query: '',
        endpoint:
          'http://iss.moex.com/iss/engines/stock/markets/shares/boards/TQBR/securities/',
        data: [],
        chartData: [1, 2, 4],
        chartLabels: ['one', 'two', 'three'],
        found: false
      }
    },
    methods: {
      find: function () {
        console.log(this.endpoint + this.query + '.json')
        axios
          .get(this.endpoint + this.query + '.json')
          .then(response => {
            console.log(response.data)
            this.data = response.data.securities.data[0]
            this.found = true

            console.log(this.found)
            if (this.found) {
              this.chartData = []
              this.chartLabels = []
              axios
                .get(this.endpoint + this.query + '/candles.json')
                .then(response => {
                  console.log(response.data)
                  for (let item of response.data.candles.data) {
                    this.chartLabels.push(item[6].split(' ')[0])
                    this.chartData.push(item[0])
                  }
                  console.log(this.chartData)
                  console.log(this.chartLabels)
                })
                .catch(error => {
                  console.log('ERROR GETTING JSON: ' + error)
                })
            }
          })
          .catch(error => {
            console.log('ERROR: ' + error)
          })
      }
    }
  }
</script>
