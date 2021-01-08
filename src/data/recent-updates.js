import moment from 'moment'

export default [
  {
    id: 1,
    user_id: 4,
    order_id: 1,
    type: 'order',
    description: '',
    created_at: moment().format('YYYY-MM-DD HH:mm:ss'),
    updated_at: moment().format('YYYY-MM-DD HH:mm:ss')
  },
  {
    id: 2,
    user_id: 4,
    order_id: 1,
    type: 'comment',
    description: 'Product 1234-3-23 is not available right now. It will take some time to be delivered.',
    created_at: moment().format('YYYY-MM-DD HH:mm:ss'),
    updated_at: moment().format('YYYY-MM-DD HH:mm:ss')
  },
  {
    id: 3,
    user_id: 7,
    order_id: 1,
    type: 'comment',
    description: 'User 3 comment on order 1.',
    created_at: moment().format('YYYY-MM-DD HH:mm:ss'),
    updated_at: moment().format('YYYY-MM-DD HH:mm:ss')
  },
  {
    id: 4,
    user_id: 7,
    order_id: 2,
    type: 'comment',
    description: 'User 3 comment on order 2.',
    created_at: moment().format('YYYY-MM-DD HH:mm:ss'),
    updated_at: moment().format('YYYY-MM-DD HH:mm:ss')
  }
]
