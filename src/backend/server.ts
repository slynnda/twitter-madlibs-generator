import * as express from 'express'

const app = express()
const port = 1729

type VoidCallback = () => void

app.get('/', (req, res, next) => {
  console.log('Got the request on path: /')
  res.send('Hello, world!')
})

export function start(callback:VoidCallback) {
  app.listen(port, () => {
    console.log(`App is running on port ${port}`)
    callback()
  })
}
