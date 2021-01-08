import RequestEntity from '@/Modules/Request/request.entity'
import Route from './route.class'

Route.get('/requests', RequestEntity, 'getRequests')
