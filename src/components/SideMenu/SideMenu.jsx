import { Button, Divider, Drawer, List, ListItem, ListItemIcon, ListItemText } from "@mui/material"
import { Box } from "@mui/system"
import React, { useState } from "react"
import { MdInbox, MdMail, MdOutlineShoppingCart } from "react-icons/md"
import { FcSalesPerformance, FcShop, FcAlarmClock, FcPortraitMode } from "react-icons/fc"
import { Link } from "react-router-dom"
import styles from "./SideMenu.module.css"
function useSideMenuState() {
    const [isSideMenuOpen, setSideMenuOpen] = useState(false)
    return [isSideMenuOpen, setSideMenuOpen]
}

function SideMenu(props) {
    const [isSideMenuOpen, setSideMenuOpen] = props.state

    const menuList = [
        { text: "Alle Artikel", link: "/items", icon: <FcShop className={styles.NavButton} /> },
        { text: "Artikel verkaufen", link: "/items/new", icon: <FcSalesPerformance className={styles.NavButton} /> },
        { text: "Historie", link: "/items/history", icon: <FcAlarmClock className={styles.NavButton} /> },
    ]

    const list = () => (
        <Box sx={{ width: 250 }} role="presentation" onClick={() => setSideMenuOpen(false)} onKeyDown={() => setSideMenuOpen(false)}>
            <List>
                {menuList.map((entry, index) => (
                    <Link to={entry.link || 404} key={entry.text}>
                        <ListItem button>
                            <ListItemIcon>{entry.icon}</ListItemIcon>
                            <ListItemText primary={entry.text} />
                        </ListItem>
                    </Link>
                ))}
            </List>
        </Box>
    )

    return (
        <div>
            <Drawer anchor={"left"} open={isSideMenuOpen} onClose={() => setSideMenuOpen(false)}>
                {list("left")}
            </Drawer>
        </div>
    )
}

export { useSideMenuState, SideMenu }
