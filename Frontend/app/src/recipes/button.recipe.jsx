import { defineRecipe } from "@chakra-ui/react";

export const buttonRecipe = defineRecipe({
    base:{
        display:"flex",
    },
    variants:{
        visual:{
            solid: {backgroundColor:"red", color: "white"},
            outline: {borderWidth:"20px" ,borderColor: "red.200"},
        },
        size: {
            sm: {padding:"4", fontSize: "20px"},
            lg: {padding: "8", fontSize: "24px"},
        },
    },
})

