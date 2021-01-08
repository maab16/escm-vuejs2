import UserEntity from '@/Modules/User/user.entity'
import Route from './route.class'

Route.get('/internal/verify/:email', UserEntity, 'verifyInternalUser')
Route.get('/users/verify/:email', UserEntity, 'verifyCustomerUser')
Route.post('/register', UserEntity, 'create')
// Route.post('/otp/send', UserEntity, 'sendOTP')
Route.post('/otp/login', UserEntity, 'login')
Route.get('/users/fetch', UserEntity, 'getUserByToken')
