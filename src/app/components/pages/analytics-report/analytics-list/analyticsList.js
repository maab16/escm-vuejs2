import BarChart3 from '../Charts/barChart3'
import BarChart2 from '../Charts/barChart2'
import BarChart from '../Charts/barChart'
import PieChart from '../Charts/pieChart'
import analyticMixin from '@/mixins/analytic'
import Spinner from '@/app/Spinner.vue'

export default {
  middleware: ['auth'],
  mixins: [analyticMixin],
  components: {
    Spinner,
    BarChart3,
    BarChart2,
    BarChart,
    PieChart
  },
  data () {
    return {
      perPage: 6,
      datacollection: {
        labels: ['Sep’19', 'Oct’19', 'Nov’19', 'Dec’19', 'Jan’20', 'Feb’20', 'Mar’20'],
        datasets: [{
          label: 'Unavailable Products',
          data: [10, 14, 13, 8, 5, 14],
          fill: false,
          borderColor: '#2196f3',
          backgroundColor: '#2196f3',
          borderWidth: 1
        }]
      },

      chartOptions: {
        maintainAspectRation: false,
        responsive: false,
        scales: {
          yAxes: [{
            stacked: true,
            gridLines: {
              display: true
            },
            scaleLabel: { display: false, labelString: 'No. of Orders' },
            ticks: {
              beginAtZero: false,
              stepSize: 5
            }
          }],
          xAxes: [{
            gridLines: {
              display: true
            }
          }]
        }
      },

      chartData: {},
      fields: [{
        key: 'name',
        label: 'Customer'
      },
      {
        key: 'total',
        label: 'Total'
      },
      {
        key: 'successful',
        label: 'Successful'
      },
      {
        key: 'sls',
        label: 'Placed With SLS'
      },
      {
        key: 'completed',
        label: 'Completed'
      },
      {
        key: 'pending',
        label: 'Pending'
      },
      {
        key: 'actions',
        label: 'Actions'
      }
      ],
      orders: [],
      customers: [],
      isLoading: false,
      isCustomerOrder: false,
      isPopularProducts: false,
      isCompanyDistributionData: false,
      isUnavailableProducts: false,
      isCompanyDataByBuyer: false,
      ordersTime: 'monthly',
      ordersTimes: [
        'monthly', // display maximum 12 months data
        'yearly' // display maximum 5 months data
      ]
    }
  },
  watch: {
    getCompanyDistributionData () {
      let labels = []
      let data = []
      this.getCompanyDistributionData.forEach(distribution => {
        labels.push(distribution.name)
        data.push(distribution.total)
      })
      this.chartData = {
        labels: labels,
        datasets: [{
          backgroundColor: [
            '#69B7FF',
            '#26A69A',
            '#0E89AC',
            '#5C6BC0',
            '#6AC06D',
            '#F5B953',
            '#7D90A4'
          ],
          data: data,
          cutoutPercentage: 0
        }]
      }
    }
  },
  async created () {
    this.isLoading = true
    this.isCustomerOrder = true
    this.isPopularProducts = true
    this.isCompanyDistributionData = true
    this.isUnavailableProducts = true
    this.isCompanyDataByBuyer = true

    await this.setSuccessfulOrders({})
    await this.setSlsOrders({})
    await this.setCompletedOrders({})
    await this.setPendingOrders({})

    await this.setAnalyticOrders()
    this.isCustomerOrder = false

    console.log(this.customerOrders)

    await this.setPopularProducts()
    this.isPopularProducts = false

    await this.setCompanyDistributionData()
    this.isCompanyDistributionData = false

    await this.setUnavailableProducts()
    this.isUnavailableProducts = false

    await this.setCompanyDataByBuyer()
    this.isCompanyDataByBuyer = false

    this.customers = this.customerOrders
    this.isLoading = false
  },
  methods: {
    viewmore () {
      this.$router.push('/analytics/analtics-detail')
    }
  }
}
