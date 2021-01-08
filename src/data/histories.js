import moment from 'moment'

export default [
  {
    id: 1,
    order_id: 1,
    user_id: 1,
    message: '<strong>Order placed</strong>',
    created_at: moment().format('YYYY-MM-DD HH:mm:ss'),
    updated_at: moment().format('YYYY-MM-DD HH:mm:ss')
  },
  {
    id: 2,
    order_id: 1,
    user_id: 2,
    message: 'Internal Buyer assigned: <strong>Sudhakar Reddy</strong>',
    created_at: moment().format('YYYY-MM-DD HH:mm:ss'),
    updated_at: moment().format('YYYY-MM-DD HH:mm:ss')
  },
  {
    id: 3,
    order_id: 1,
    user_id: 3,
    message: 'Project Manager assigned: <strong>Rakesh</strong>',
    created_at: moment().format('YYYY-MM-DD HH:mm:ss'),
    updated_at: moment().format('YYYY-MM-DD HH:mm:ss')
  },
  {
    id: 4,
    order_id: 1,
    user_id: 3,
    message: '<strong>PR No. updated</strong>',
    created_at: moment().format('YYYY-MM-DD HH:mm:ss'),
    updated_at: moment().format('YYYY-MM-DD HH:mm:ss')
  },
  {
    id: 5,
    order_id: 1,
    user_id: 3,
    message: 'PR No. Updated: Product 1',
    created_at: moment().format('YYYY-MM-DD HH:mm:ss'),
    updated_at: moment().format('YYYY-MM-DD HH:mm:ss')
  },
  {
    id: 6,
    order_id: 1,
    user_id: null,
    message: 'Your order request for the product 8952-16-3 has been successfully placed by SLS team.',
    created_at: moment().format('YYYY-MM-DD HH:mm:ss'),
    updated_at: moment().format('YYYY-MM-DD HH:mm:ss')
  }
]
