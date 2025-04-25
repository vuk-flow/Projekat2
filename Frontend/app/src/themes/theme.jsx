import { createSystem,  defaultConfig, defineConfig, defaultBaseConfig } from "@chakra-ui/react";

const customConfig = defineConfig({
    globalCss: {
        "html, body":{
            backgroundColor:"green",
            fontFamily:"monospace",
            fontSize:"medium",
        }
    },
    theme: {
        tokens: {
            colors: {
                brand: {
                    50: "#FFF5F5",
                    100: "#FED7D7",
                    200: "#FEB2B2",
                    300: "#FC8181",
                    400: "#F56565",
                    500: "#E53E3E",
                    600: "#C53030",
                    700: "#9B2C2C",
                    800: "#822727",
                    900: "#63171B",
                },
            button_bgcolor: {
                value:"yellow",
            },
            input_bgcolor: {
                value: "white",
            },
            input_color: {
                value: "red",
            },
                
                
            },
            

            
            }

        }
    },
)

export const system = createSystem(defaultConfig, customConfig)

