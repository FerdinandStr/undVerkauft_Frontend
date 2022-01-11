import { Button, Divider, Drawer, List, ListItem, ListItemIcon, ListItemText } from "@mui/material"
import { Box } from "@mui/system"
import React, { useState } from "react"
import { MdInbox, MdMail } from "react-icons/md"
import { Link } from "react-router-dom"

function useSideMenuState() {
    const [isSideMenuOpen, setSideMenuOpen] = useState(false)
    return [isSideMenuOpen, setSideMenuOpen]
}

function SideMenu(props) {
    const [isSideMenuOpen, setSideMenuOpen] = props.state

    const list = () => (
        <Box sx={{ width: 250 }} role="presentation" onClick={() => setSideMenuOpen(false)} onKeyDown={() => setSideMenuOpen(false)}>
            <List>
                {["Artikel verkaufen", "Laufende Auktionen", "Historie", "Artikel Liste"].map((text, index) => (
                    <Link to="/items/new" key={text}>
                        <ListItem button>
                            <ListItemIcon>{index % 2 === 0 ? <MdInbox /> : <MdMail />}</ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItem>
                    </Link>
                ))}
            </List>
            <Divider />
            <List>
                {["All mail", "Trash", "Spam"].map((text, index) => (
                    <ListItem button key={text}>
                        <ListItemIcon>{index % 2 === 0 ? <MdInbox /> : <MdMail />}</ListItemIcon>
                        <ListItemText primary={text} />
                    </ListItem>
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
