import { body } from 'express-validator'

export const Invoice_Validation = [
  body('customer_name').isLength(1),
  body('sale_person').isLength(1),
]
