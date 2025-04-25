'use client'

import { ChakraProvider, defaultSystem } from '@chakra-ui/react'
import { ThemeProvider } from 'next-themes'
import { system } from '@/themes/theme'

export function Provider(props) {
  return (
    <ChakraProvider value={system}>
      <ThemeProvider attribute={"class"} disableTransitionOnChange>
          {props.children}
      </ThemeProvider>
    </ChakraProvider>
  )
}
