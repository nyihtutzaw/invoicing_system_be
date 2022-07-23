import InvoiceController from '../../controllers/InvoiceController'
import ProductController from '../../controllers/ProductController'
export default (routes) => {
  routes.get('/products', ProductController.index)

  routes.get('/invoices', InvoiceController.index)
  routes.post('/invoices', InvoiceController.store)
  routes.get('/invoice/:id', InvoiceController.each)
}
