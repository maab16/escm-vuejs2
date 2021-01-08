import AddressEntity from '@/Modules/Address/address.entity'
import Route from './route.class'

Route.get('/addresses', AddressEntity, 'all')
