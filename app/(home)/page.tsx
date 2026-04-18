import { OnBoardUser } from "@/module/auth/actions";
import React from "react";
const HomePage= async ()=>{
    await OnBoardUser();
    return(
        <>
        <div>HomePage</div>
        </>
    )
}
export default HomePage;  