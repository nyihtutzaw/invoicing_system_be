import dayjs from 'dayjs'

export function getPaginationAttribute(req, totalCount) {
  let limit = 10
  let offset = 0
  let page = 1
  if (req.query.page) {
    page = Number(req.query.page)
    if (page > 1) {
      offset = (page - 1) * limit
    }
  }

  let totalPage = Math.ceil(totalCount / limit)
  if (totalPage < 1) totalPage = 1

  return {
    limit,
    offset,
    page,
    totalPage,
  }
}

30

export function getLast7Days() {
  var result = []
  for (var i = 0; i < 7; i++) {
    var d = new Date()
    d.setDate(d.getDate() - i)
    result.push(dayjs(d).format('YYYY-MM-DD'))
  }

  return result
}
