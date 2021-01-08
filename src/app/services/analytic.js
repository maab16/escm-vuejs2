import AnalyticEntity from '@/Modules/Analytic/analytic.entity'
import Route from './route.class'

Route.get('/analytic/orders', AnalyticEntity, 'getAnalyticOrders')
Route.get('/analytic/popular/products', AnalyticEntity, 'getPopularProducts')
Route.get('/analytic/orders-by-month', AnalyticEntity, 'getOrdersByMonth')
Route.get('/analytic/company-distribution-data', AnalyticEntity, 'getCompanyDistributionData')
Route.get('/analytic/unavailable-orders', AnalyticEntity, 'getUnavailableOrdersByMonth')
Route.get('/analytic/buyer-orders', AnalyticEntity, 'getInternalBuyerOrdersByMonth')
Route.get('/analytic/unavailable-products', AnalyticEntity, 'getUnavailableProducts')
Route.get('/analytic/successful-orders', AnalyticEntity, 'getOrdersByStatus')
Route.get('/analytic/sls-products', AnalyticEntity, 'getOrdersByStatus')
Route.get('/analytic/completed-products', AnalyticEntity, 'getOrdersByStatus')
Route.get('/analytic/pending-products', AnalyticEntity, 'getOrdersByStatus')
