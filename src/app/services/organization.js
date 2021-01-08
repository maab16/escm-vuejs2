import OrganizationEntity from '@/Modules/Organization/organization.entity'
import Route from './route.class'

Route.get('/organizations/verify/:email', OrganizationEntity, 'verifyOrganization')
