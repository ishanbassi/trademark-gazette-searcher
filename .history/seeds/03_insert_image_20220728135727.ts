import { Knex } from "knex"
import { solveCaptcha } from "../utilities/captcha"

export async function seed(knex: Knex): Promise<void> {
    
    const table = process.env.NODE_ENV == "production" ? "tm_details" : "tm_detail"
    const query = await knex(table).select('application_no').where({
        trademark:"",
        journal_no:2062,
        

    })
    
    for(let entry of query) {
        
        let applNumber:number = entry.application_no
        await solveCaptcha(applNumber.toString())
        
        
    }
        
        
            
           
            
            
        
            
        
        
    
};