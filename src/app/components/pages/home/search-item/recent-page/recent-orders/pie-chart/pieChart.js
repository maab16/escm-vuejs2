import { Doughnut } from 'vue-chartjs'
export default {
  extends: Doughnut,
  props: ['data', 'options'],
  mounted () {
    this.renderChart(this.data, {
      borderWidth: '1px',
      hoverBackgroundColor: 'green',
      hoverBorderWidth: '5px'
    })
  }
}
