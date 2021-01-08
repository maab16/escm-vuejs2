// import http from '@/app/services/httpClient.js'
import NotificationEntity from '@/Modules/Notification/notification.entity'

class NotificationService {
  async send (type, data) {
    NotificationEntity.send(type, data)
  }
}

export default new NotificationService()
