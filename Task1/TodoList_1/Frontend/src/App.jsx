import { useState } from 'react'
import Inputtodo from './Components/Inputtodo'
import Listtodo from './Components/Listtodo'
import Searchtodo from './Components/Searchtodo'

function App() {

  return (
    <>
     <Inputtodo />
     <Listtodo/>
     <Searchtodo />
    </>
  )
}

export default App
