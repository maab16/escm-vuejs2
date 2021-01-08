import moment from 'moment'

export default [
  {
    id: 1,
    name: 'First organiozation',
    email: 'org1@escm.com',
    created_at: moment().format('YYYY-MM-DD HH:mm:ss'),
    updated_at: moment().format('YYYY-MM-DD HH:mm:ss')
  },
  {
    id: 2,
    name: 'Another Organization',
    email: 'org2@escm.com',
    created_at: moment().format('YYYY-MM-DD HH:mm:ss'),
    updated_at: moment().format('YYYY-MM-DD HH:mm:ss')
  }
]
