"use server";

import {db} from "@/lib/db"
import { currentUser } from "@clerk/nextjs/server"
import { getAvailableUsernameSuggestons } from "../utils"
export const checkProfileUsernameAvailability =async (username:string)=>{
    if(!username) return {available:false,suggestions:[]}

    const user =await db.user.findUnique({
        where:{
            username:username
           } 
         })
        if(!user){
            return {available:true};  
        }
   const suggestions=await getAvailableUsernameSuggestons(username,3,10)

   return {
    available:false,
    suggestions
   }
}

export const claimUsername=async (username:string) => {
    const loggedUser=await currentUser();

    if(!loggedUser) return {
        success:false,error:"No authenticated user found"
    }
    const user = await db.user.update({
        where:{
          clerkId:loggedUser.id   
        },
        data:{
           username:username
        }
    })
    if(!user) return {
        success:false,error:"No authenticated user found"
    }
    return{sucess:true};
}

export const getCurrentUsername=async() =>{
    const user=await currentUser();

    const cuurentUsername=await db.user.findUnique({
        where:{
            clerkId:user?.id
        },
        select:{
            username:true,
            bio:true,
        }
    })
    return cuurentUsername;
}