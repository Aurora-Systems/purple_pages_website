import {z} from "zod"

export const BusinessSchema=z.object({
    name: z.string(),
    email: z.string(),
    contact_number:z.string(),
    street_address:z.string(),
    city:z.string(),
    state: z.string(),
    postal_code: z.string(),
    industry:z.string(),
    description:z.string(),
    country:z.string(),
    user_id:z.string()
})

export type BusinessType = z.infer<typeof BusinessSchema>

export const business_default:BusinessType={
    name:"",
    email:"",
    contact_number:"",
    description:"",
    industry:"",
    street_address:"",
    city:"",
    state:"",
    postal_code:"",
    country:"",
    user_id:""
}