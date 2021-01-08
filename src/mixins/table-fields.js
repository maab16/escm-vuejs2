export default {
  data () {
    return {
      fields: [{
        key: 'order_number', // Changes By Venkat
        label: 'Order no.',
        sortable: true
      },
      {
        key: 'user',
        label: 'Customer',
        sortable: true
      },
      {
        key: 'manager',
        label: 'Project Manager',
        sortable: true
      },
      {
        key: 'buying_lead',
        label: 'Buying Lead',
        sortable: true
      },
      {
        key: 'address',
        label: 'Delivery Location',
        sortable: true
      },
      {
        key: 'internal_buyer',
        label: 'Internal Buyer',
        sortable: true
      },
      {
        key: 'updated_at',
        label: 'Order Date',
        sortable: true
      },
      {
        key: 'status',
        label: 'Status',
        sortable: false
      },
      {
        key: 'meta',
        label: ''
      },
      { key: 'actions', label: 'Actions' }
      ]
    }
  }
}
