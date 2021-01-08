import FaqEntity from '@/Modules/Faq/faq.entity'
import Route from './route.class'

Route.get('/faqs', FaqEntity, 'all')
