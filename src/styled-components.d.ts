import 'styled-components'

declare module 'styled-components' {
  export interface DefaultTheme {
    borderRadius: string

    colors: {
      background: string
      background2: string
      background3: string
    }
    font: {
      color: string
      family: string
      size: string
    }
  }
}