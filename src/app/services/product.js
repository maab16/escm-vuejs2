import ProductEntity from '@/Modules/Product/product.entity'
import Route from './route.class'

Route.get('/products/keywords/:search', ProductEntity, 'getSearchKeywords')
Route.get('/products/filter', ProductEntity, 'getAdvancedSearchProducts')
Route.get('/products/:id', ProductEntity, 'getProduct')
Route.get('/products/check-availability', ProductEntity, 'checkAvailabilty')
Route.get('/products/available/:id', ProductEntity, 'checkAvailable')
