import InvoiceModel from './../model/invoice'
import { validationResult } from 'express-validator'
import InvoiceProductModel from '../model/invoice_product'
import ProductModel from '../model/product'
import { getPaginationAttribute } from '../utli'
class ProductController {
  async index(req, res) {
    const invoiceTotalCount = await InvoiceModel.count()
    let { limit, offset, page, totalPage } = getPaginationAttribute(
      req,
      invoiceTotalCount
    )
    const invoices = await InvoiceModel.findAll({
      limit: limit,
      offset: offset,
      include: [
        {
          model: ProductModel,
          as: 'products',
        },
      ],
    })

    invoices.page = page

    res.status(200).json({
      invoices: {
        data: invoices,
        page: page,
        count: invoiceTotalCount,
        totalPage: totalPage,
      },
    })
  }
  async each(req, res) {
    const invoice = await InvoiceModel.findOne({
      where: {
        id: req.params.id,
      },
      include: [
        {
          model: ProductModel,
          as: 'products',
        },
      ],
    })
    if (!invoice) {
      res.status(404).json({ message: 'Invoice Not Found' })
    }
    res.status(200).json({ invoice: invoice })
  }
  async store(req, res) {
    try {
      const { customer_name, sale_person, note, product_ids, total } = req.body
      const result = await InvoiceModel.create({
        customer_name,
        sale_person,
        total,
        note: note || '',
      })

      for (var i in product_ids) {
        await InvoiceProductModel.create({
          product_id: product_ids[i]['id'],
          price: product_ids[i]['price'],
          amount: product_ids[i]['amount'],
          invoice_id: result.id,
        })
      }

      res.status(200).json({ invoices: result })
    } catch (error) {
      console.log(error)
      res.status(500).json({ message: 'Error saving invoice' })
    }
  }
}
export default new ProductController()
