import BarCommon from '@/mixins/bar-common'

export default {
  extends: BarCommon,
  async created () {
    await this.setUnavailableOrdersByMonth()
    let labels = []
    let data = []

    this.getUnavailableProductsByMonth.forEach(product => {
      labels.push(product.month)
      data.push(product.orders.length)
    })

    this.chartdata = {
      labels: labels,
      datasets: [
        {
          label: 'Unavailable',
          backgroundColor: '#00205C',
          data: data
        }
      ]
    }
    this.renderChart(this.chartdata, this.options)
  }
}
