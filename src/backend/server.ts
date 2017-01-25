import * as express from 'express'
import { generateMadLib } from './mad-libs'

const app = express()
const port = 1729

type VoidCallback = () => void

app.get('/', (req, res, next) => {
  console.log('Got the request on path: /')
  res.send(generateMadLib('The quick brown fox jumps over the lazy dog.'))
})

export function start(callback:VoidCallback) {
  app.listen(port, () => {
    console.log(`App is running on port ${port}`)
    callback()
  })
}

