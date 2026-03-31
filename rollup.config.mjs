import path from 'path'
import { fileURLToPath } from 'url'
import babel from '@rollup/plugin-babel'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'

import pkg from './package.json' with { type: "json" }

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const baseDeps = [
  ...Object.keys(pkg.dependencies || {}),
  ...Object.keys(pkg.peerDependencies || {})
]

function makeConfig({ iconless, themed }) {
  const parts = [themed && 'themed', iconless && 'iconless'].filter(Boolean)
  const suffix = parts.length ? `_${parts.join('_')}` : ''
  const externalDeps = themed ? baseDeps : baseDeps.filter(p => p !== 'styled-components')

  return {
    input: 'src/index.js',
    output: [
      { file: `dist/index${suffix}.cjs.js`, format: 'cjs' },
      { file: `dist/index${suffix}.esm.js`, format: 'esm' }
    ],
    plugins: [
      iconless && {
        name: 'iconless-resolver',
        resolveId(source) {
          if (source.endsWith('defaultIcons'))
            return path.resolve(__dirname, 'src/defaultIcons.iconless.js')
        }
      },
      babel({
        babelHelpers: 'runtime',
        plugins: ['@babel/transform-runtime']
      }),
      resolve(),
      commonjs()
    ],
    external: (id) =>
      externalDeps.some(p => id === p || id.startsWith(p + '/')) ||
      /@babel\/runtime/.test(id)
  }
}

export default [
  makeConfig({ iconless: false, themed: false }),
  makeConfig({ iconless: true,  themed: false }),
  makeConfig({ iconless: false, themed: true  }),
  makeConfig({ iconless: true,  themed: true  })
]
