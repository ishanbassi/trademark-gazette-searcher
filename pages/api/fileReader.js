
import { fullTmSearch } from "../../utilities/tmSearcher";


export default async function handler(req, res) {
    
    if(req.method === 'POST') {
        
        const tms = JSON.parse(req.body)
        
        
        const result =  await  fullTmSearch(tms, 'tm_details')
        
        res.send(result)
    }
}