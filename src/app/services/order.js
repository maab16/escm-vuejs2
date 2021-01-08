import OrderEntity from '@/Modules/Order/order.entity'
import Route from './route.class'

Route.get('/orders/:id', OrderEntity, 'getOrder')
Route.get('/orders', OrderEntity, 'getOrders')
Route.post('/orders', OrderEntity, 'createOrder')
Route.put('/orders/:id', OrderEntity, 'updateOrder')
Route.put('/orders/lines/:id', OrderEntity, 'updateProductLines')

Route.get('buying-lead/buyers/:id', OrderEntity, 'getInternalBuyers')
