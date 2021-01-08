import { Bar } from 'vue-chartjs'
import analyticMixin from '@/mixins/analytic'

export default {
  extends: Bar,
  mixins: [analyticMixin],
  data: () => ({
    chartdata: {},
    options: {
      scales: {
        xAxes: [{ barPercentage: 0.2 }],
        yAxes: [{ id: 'Dataset1',
          position: 'left',
          type: 'linear',
          scaleLabel: { display: true, labelString: 'No. of Orders' } }]
      },
      responsive: true,
      maintainAspectRatio: false,
      legend: { display: true, position: 'top' }
    }
  }),

  async created () {
    await this.setOrdersByMonth()
    let labels = []
    let completed = {
      label: 'Completed',
      backgroundColor: '#68BC4A',
      data: []
    }
    let sls = {
      label: 'Partially completed',
      backgroundColor: '#F39200',
      data: []
    }
    this.getOrdersByMonth.forEach(order => {
      labels.push(order.month)
      completed.data.push(order.completed.length)
      sls.data.push(order.sls.length)
    })
    this.chartdata = {
      labels: labels,
      datasets: [
        completed,
        sls
      ]
    }
    this.renderChart(this.chartdata, this.options)
  }
}
