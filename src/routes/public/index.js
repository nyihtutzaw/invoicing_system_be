import ProductController from '../../controllers/ProductController'
export default (routes) => {
  routes.get('/products', ProductController.index)
}
