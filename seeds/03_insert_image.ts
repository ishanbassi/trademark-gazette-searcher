import { Knex } from "knex"
import { solveCaptcha } from "../utilities/captcha"
import Bluebird from "bluebird"
export async function seed(knex: Knex): Promise<void> {
    
    const table = process.env.NODE_ENV == "production" ? "tm_details" : "tm_detail"
    const query = await knex(table).select('application_no').where({
        trademark:"",
        journal_no:2061,
        

    })
    let counter = 1
    await Bluebird.map(query, async (item) => {
        
        let applNumber:number = item.application_no
        let result =  solveCaptcha(applNumber.toString())
        console.log(counter++)
        return result
    },{concurrency:10}) // concurrency of 3 is good as it leads to less errors
    
        
            
           
            
            
        
            
        
        
    
};