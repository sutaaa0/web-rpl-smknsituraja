"use client";
import { logout } from "@/app/actions/auth"
import { Button } from "./ui/button"

const BtnLogout = () => {

    return (
        <Button onClick={ () => logout()}>
            Logout
        </Button>
    )
}

export default BtnLogout;