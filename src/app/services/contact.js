import ContactEntity from '@/Modules/Contact/contact.entity'
import Route from './route.class'

Route.get('/contacts', ContactEntity, 'send')
