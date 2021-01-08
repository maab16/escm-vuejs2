import moment from 'moment'

export default [
  {
    id: 1,
    name: 'First organiozation',
    email: 'org1@escm.com',
    buying_lead_id: 7,
    created_at: moment().format('YYYY-MM-DD HH:mm:ss'),
    updated_at: moment().format('YYYY-MM-DD HH:mm:ss')
  },
  {
    id: 2,
    name: 'Another Organization',
    email: 'org2@gmail.com',
    buying_lead_id: 8,
    created_at: moment().format('YYYY-MM-DD HH:mm:ss'),
    updated_at: moment().format('YYYY-MM-DD HH:mm:ss')
  }
]
