import {storage} from '@/app/services/httpClient.js'
import Address from './address.model'

const ENDPOINT = 'addresses'

class AddressEntity {
  all () {
    return storage.get(ENDPOINT)
  }
  getAddresses () {
    Address.inser({data: this.all()})
  }
}

export default new AddressEntity()
