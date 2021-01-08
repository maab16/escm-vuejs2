import { required, email, digits, alpha, min } from 'vee-validate/dist/rules'
import { extend } from 'vee-validate'

extend('required', {
  ...required,
  message: 'This field is required'
})

extend('email', {
  ...email,
  message: 'This field must be a valid email'
})

extend('firstname', {
  ...required,
  message: 'First name is required'
})

extend('lastname', {
  ...required,
  message: 'Last name is required'
})

extend('mobile', {
  ...required,
  message: 'Phone number is required'
})

extend('digits', {
  ...digits,
  message: 'Phone number 10 digits is required'
})

extend('alpha', {
  ...alpha,
  message: 'The  field may only contain alphabetic characters'
})

extend('min', {
  ...min,
  message: 'The field must be at least 3 characters'
})
