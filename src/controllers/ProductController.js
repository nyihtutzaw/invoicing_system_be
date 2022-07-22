import ProductModel from './../model/product'
class ProductController {
  async index(req, res) {
    const products = await ProductModel.findAll()
    res.status(200).json({ products: products })
  }
}

export default new ProductController()
