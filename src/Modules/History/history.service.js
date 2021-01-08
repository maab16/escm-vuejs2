import HistoryEntity from '@/Modules/History/history.entity'

class HistoryService {
  createOrderHistory (user, data) {
    return HistoryEntity.createOrderHistory(user.data)
  }
  add (history) {
    HistoryEntity.add(history)
  }
}

export default new HistoryService()
