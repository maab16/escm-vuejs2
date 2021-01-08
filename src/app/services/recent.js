import RecentEntity from '@/Modules/RecentUpdates/recent.entity'
import Route from './route.class'

Route.get('/recent/updates', RecentEntity, 'getRecentUpdates')
Route.post('/recent/updates', RecentEntity, 'addRecentUpdate')
