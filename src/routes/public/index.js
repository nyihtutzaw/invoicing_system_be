import { Validate_Request } from '../../controllers'
import InvoiceController from '../../controllers/InvoiceController'
import ProductController from '../../controllers/ProductController'

import { Invoice_Validation } from '../../validations'
export default (routes) => {
  routes.get('/products', ProductController.index)

  routes.get('/invoices', InvoiceController.index)
  routes.post(
    '/invoices',
    Invoice_Validation,
    Validate_Request,
    InvoiceController.store
  )
  routes.get('/invoice/:id', InvoiceController.each)
}
