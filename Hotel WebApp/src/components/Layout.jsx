import { Outlet, Link } from "react-router-dom";
import { createContext } from "react";
import { Container } from "@mui/material";
export const UserContext = createContext();
export default function Layout() {
    return (
        <Container sx={{ py: 4 }}>
            <UserContext.Provider value={{ user: "sivaraman" }}>
                <Outlet />
            </UserContext.Provider>
        </Container>
    );
}
