export interface TmDataInterface {
    page_no:number,
    journal_no:number,
    trademark:string,
    details:string,
    tm_class:number,
    tm_phonetics:string,
    application_no:number,
    image?:any,
    application_date:string,
    user_details:string,
    associated_trademarks?:string,
    proprietor_name:string,
    proprietor_address:string,      
    agent_name?:string,
    agent_address?:string,
    head_office:string
}