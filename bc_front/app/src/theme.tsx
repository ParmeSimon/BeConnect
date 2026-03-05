'use client'
import { createTheme } from '@mui/material/styles'

// mettre la font adapté
// const font = localFont({
//     src: ''
// })

// 4. Création du thème vide
const theme = createTheme({
  // typography: {
  //     fontFamily: font.style.fontFamily
  // },
  palette: {
    // Tout est vidé pour le moment
  },
  components: {},
  shape: {
    borderRadius: 8 // Valeur par défaut neutre
  }
})

export default theme
