'use client'
import { createTheme } from '@mui/material/styles'

// mettre la font adapté
// const font = localFont({
//     src: ''
// })

declare module '@mui/material/styles' {
  interface TypeBackground {
    purple: string
    white: string
    black: string
    yellow: string
  }
}

// 4. Création du thème vide
const theme = createTheme({
  // typography: {
  //     fontFamily: font.style.fontFamily
  // },
  palette: {
    background: {
      purple: '#9368B0',
      white: '#FFFFFF',
      black: '#000000',
      yellow: '#FED36D'
    }
  },
  components: {},
  shape: {
    borderRadius: 8 // Valeur par défaut neutre
  }
})

export default theme
