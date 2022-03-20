import { createTheme } from "@mui/material/styles"
//https://bareynol.github.io/mui-theme-creator/

export const theme = createTheme({
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: "2px",
                    textShadow: "0px 1px 4px #555",
                },
            },
        },
        MuiPaginationItem: {
            styleOverrides: {
                root: {
                    borderRadius: "2px",
                },
            },
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    borderRadius: "2px",
                },
            },
        },
    },
    // palette: {
    //     mode: "dark",
    //     primary: {
    //         main: "#e2001a",
    //         // light: "#c56466"
    //     },
    //     secondary: {
    //         main: "#0f8e88",
    //     },
    //     background: {
    //         default: "var(--bg-main)",
    //         paper: "var(--box-bg-main)",
    //     },
    //     text: {
    //         primary: "#fff",
    //         secondary: "#fffa",
    //     },

    //     shape: {
    //         borderRadius: 10,
    //     },
    // },
})
