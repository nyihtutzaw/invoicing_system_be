class ProductController {
  index(req, res) {
    res.status(200).json({ success: true, products: [] })
  }
}

export default new ProductController()
