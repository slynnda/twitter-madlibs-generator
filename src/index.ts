import * as server from './backend/server'
import { generateMadLib } from './backend/mad-libs'

server.start(() => {
  console.log('Successfully started service.')

  console.log('Sad pandas are sad.', generateMadLib('Sad pandas are sad.', { probabilityBlank: 0.5 }))
  console.log('Quick pandas are happy, and foxes are cool.', generateMadLib('Quick pandas are happy, and foxes are cool.', { probabilityBlank: 0.5 }))
  console.log('You\'re a \'"panda"\'.', generateMadLib('You\'re a \'"panda"\'.', { probabilityBlank: 0.5 }))
})



