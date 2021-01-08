import {storage} from '@/app/services/httpClient.js'
// import emailjs from 'emailjs-com'
// emailjs.init('user_JwIHhf5su4OZ9muYnGiuQ')

const ENDPOINT = 'notifications'

class NotificationEntity {
  all () {
    return storage.get(ENDPOINT)
  }
  store (data) {
    return storage.post(ENDPOINT, data)
  }
  async send (type, data) {
    // let template = ''
    // switch (type) {
    //   case 'otp':
    //     template = 'otp_template_6aymo19'
    //     break
    //   case 'general_notification':
    //     template = 'general_notification'
    //     break
    // }
    // await emailjs.send(
    //   'service_kk1pvue',
    //   template,
    //   data
    // )
  }
}

export default new NotificationEntity()
