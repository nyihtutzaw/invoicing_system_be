import InvoiceModel from './../model/invoice'
import { validationResult } from 'express-validator'
class ProductController {
  async index(req, res) {
    res.status(200).json({ invoices: [] })
  }
  async each(req, res) {
    res.status(200).json({ invoice: [] })
  }
  async store(req, res) {
    try {
      const { customer_name, sale_person, note } = req.body
      const result = await InvoiceModel.create({
        customer_name,
        sale_person,
        note: note || '',
      })
      res.status(200).json({ invoices: result })
    } catch (error) {
      console.log(error)
      res.status(500).json({ message: 'Error saving invoice' })
    }
  }
}
export default new ProductController()
