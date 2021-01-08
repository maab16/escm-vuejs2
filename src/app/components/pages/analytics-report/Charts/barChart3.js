import BarCommon from '@/mixins/bar-common'

export default {
  extends: BarCommon,
  async created () {
    await this.setInternalBuyerOrdersByMonth()
    let labels = ['']
    let data = [0]

    this.getInternalBuyerOrdersByMonth.forEach(buyer => {
      labels.push(buyer.name)
      data.push(buyer.orders.length)
    })

    this.chartdata = {
      labels: labels,
      datasets: [
        {
          label: 'Orders',
          backgroundColor: '#68BC4A',
          data: data
        }
      ]
    }
    this.renderChart(this.chartdata, this.options)
  }
}
