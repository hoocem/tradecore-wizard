import { rest } from 'msw'

export const handlers = [
  rest.get('/genres', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(require('./genres.json')))
  }),
  rest.post('/book', (req, res, ctx) => {
    console.log('request body = ', req.body)
    return res(ctx.status(200), ctx.json({ message: 'ok' }))
  }),
]
