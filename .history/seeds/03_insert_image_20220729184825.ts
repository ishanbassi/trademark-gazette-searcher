import { Knex } from "knex"
import { solveCaptcha } from "../utilities/captcha"
import Bluebird from "bluebird"
export async function seed(knex: Knex): Promise<void> {
    
    const table = process.env.NODE_ENV == "production" ? "tm_details" : "tm_detail"
    const query = await knex(table).select('application_no').where({
        trademark:"",
        journal_no:2061,
        

    })
    await Bluebird.map(query, async (item) => {
        let applNumber:number = item.application_no
        return  solveCaptcha(applNumber.toString())
    },{concurrency:2}) // concurrency of 3 is good as it leads to less errors
    
        
            
           
            
            
        
            
        
        
    
};