import {z} from "zod"

export const UserSchema = z.object({
    first_name:z.string(),
    last_name:z.string(),
    date_of_birth:z.string(),
    contact_number:z.string(),
    email:z.string(),
    country:z.string(),
    user_id:z.string()  
})

export type UserType = z.infer<typeof UserSchema>

export const user_default:UserType = {
    first_name:"",
    last_name:"",
    date_of_birth:"",
    contact_number:"",
    email:"",
    country:"",
    user_id:"" 
}