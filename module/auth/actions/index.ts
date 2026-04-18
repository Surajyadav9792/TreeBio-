"use server"

import {db} from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";

 export const OnBoardUser=async()=>{
    try{
        //it is provided by clerk and in user there are very much info id pass etc
     const user = await currentUser();
     if(!user){
        return{
            success:false,error:"No authenticated user found"
        }
     }
     const {id,firstName,lastName,imageUrl,emailAddresses}=user;
//In prisma a upsert method is present which helps we can creat and update 
     const newUser=await db.user.upsert({
        where:{
            clerkId:id
        },
        update:{
            firstName:firstName||null,
            lastName:lastName ||null,
            imageUrl:imageUrl ||null,
            email:emailAddresses[0]?.emailAddress||"",

        },
        create:{
            clerkId:id,
            firstName:firstName||null,
            lastName:lastName ||null,
            imageUrl:imageUrl ||null,
            email:emailAddresses[0]?.emailAddress||"",

        }
       
     })
      return {
            success:true,
            user:newUser,
            message:"user onboarded successfully"
           }
          
    }
    catch(error){
 console.error(" Error onboarding user:",error);
  return {
    success:false,
    error:"Failed to onboard user"
  };

  }
 }