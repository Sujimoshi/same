import { parse as babelParse } from '@babel/parser'

export const parse = (code: string) => {
  return babelParse(code, { plugins: [ 'jsx', 'typescript' ], sourceType: 'unambiguous' })
}