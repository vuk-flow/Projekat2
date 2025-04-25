import { defineRecipe } from "@chakra-ui/react"

export const buttonRecipe = defineRecipe({
  base: {
    display: "flex",
  },
  variants: {
    visual: {
      solid: { backgroundColor: "white", color: "green" },
      outline: { borderWidth: "1px", borderColor: "red.200" },
    },
    size: {
      sm: { padding: "14px", fontSize: "12px", },
      lg: { padding: "17px", fontSize: "12px" ,borderRadius:"20px", fontWeight:"bold", cursor:"pointer"},
    },
  },
})