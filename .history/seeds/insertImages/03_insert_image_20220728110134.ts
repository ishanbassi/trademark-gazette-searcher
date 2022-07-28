import { Knex } from "knex"
import { solveCaptcha } from "../../utilities/captcha"

export async function seed(knex: Knex): Promise<void> {
    
    const table = process.env.NODE_ENV == "production" ? "tm_details" : "tm_detail"
    const query = await knex(table).select('application_no').where('journal_no', '=', 2062)
    let count = 1
    for(let entry of query) {
        console.log(`${count++} entry`)
        let applNumber:number = entry.application_no
        await solveCaptcha(applNumber.toString())
        
        console.log(` update done for ${applNumber}`)
    }
        
        
            
           
            
            
        
            
        
        
    
};