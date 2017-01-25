import * as server from './backend/server'

server.start(() => {
  console.log('Successfully started service.')
})



