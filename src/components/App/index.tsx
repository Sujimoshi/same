import React from 'react'
import { parseFile } from '@same/parser'

export default function App () {
  const FILE = '/Users/sujimoshi/Projects/same/front/src/styled/Link/index.tsx'
  let tree = parseFile(FILE)
  return (
    <pre>
      {JSON.stringify(tree, null, 2)}
    </pre>
  )
}
