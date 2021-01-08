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
      legend: { display: false, position: 'top' }
    }
  })
}
