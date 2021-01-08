import CommentEntity from '@/Modules/Comment/comment.entity'
import Route from './route.class'

Route.post('/comments', CommentEntity, 'addOrderComment')
