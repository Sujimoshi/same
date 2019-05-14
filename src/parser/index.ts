import { readFileSync } from 'fs'
import { parse as parser } from './babel'

export const parseFile = (path: string) => {
  return parser(readFileSync(path).toString())
}

export const parse = parser
