import ProductModel from './../model/product'
import { Op } from 'sequelize'
class ProductController {
  async index(req, res) {
    let query = {}
    if (req.query.search) {
      query.name = {
        [Op.like]: `%${req.query.search}%`,
      }
    }
    const products = await ProductModel.findAll({ where: query })
    res.status(200).json({ products: products })
  }
}

export default new ProductController()
