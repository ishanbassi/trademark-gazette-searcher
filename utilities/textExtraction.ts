// using the legacy build as the modern build is for browsers
const pdfjsLib = require("pdfjs-dist/legacy/build/pdf.js");

import { promises , createWriteStream }from "fs";
import { TmDataInterface } from "../types";

import { Metaphone} from 'natural'

import {TextItem} from 'pdfjs-dist/types/src/display/api'



function extractJournalData(pageNo:number, journal_no,  textContent:TextContent):TmDataInterface {
  
  let trademark = '', details  ,appDateRegExp = new RegExp(/^\d\d\/\d\d\/\d\d\d\d/) , appDate , appNoRegExp = new RegExp(/(\d{5,7})/) , appNo,  tmClassRegExp = new RegExp(/Class\s+(\d{1,2})/), tmClass , userDetail, associatedTms, proprietorName, proprietorAddress, agentAddress,agentCompany , headOffice
  textContent.items.forEach((data:TextItem,i) => {
    // trademarks have height which falls between 23 and 24 and x position b/w 58 and 59
    
    
    if (tmClassRegExp.test(data.str)) {
      tmClass = data.str.match(tmClassRegExp)[1]
    }
    else if ( data.height >= 23 && data.height <= 24 && data.transform[4] >= 58 && data.transform[4]<= 59){
      trademark += `${data.str.toUpperCase()} `
    }
  
    else if (appNoRegExp.test(data.str) && data.height >= 11 && data.height <= 13 ) {
      appNo = data.str
    }

    // data.transform[4] refers to x position of data
    else if(appDateRegExp.test(data.str) && appNo){
      
      appDate = data.str    

      // data shows the next items is alway proprietor name
      const textItemForProprietor =  textContent.items[i+2] as TextItem
      proprietorName = textItemForProprietor.str
      
      const arrAfterPropName = textContent.items.slice(i+3)
      // address is data b/w proprietor name and data.str which is "proposed to be used" or "Address for service in India" or "used since"
      const indexForAddress = arrAfterPropName.findIndex((item:TextItem) => item.str.includes('Address for service in India') || item.str.includes('Proposed to be Used') || item.str.includes('Used Since'))
      
      proprietorAddress =  arrAfterPropName.slice(0,indexForAddress).map((item:TextItem) => item.str).join('')

    }
    else if(data.str.includes('Address for service in India')) {
      const textItemForagentCompany  = textContent.items[i+2] as TextItem
      agentCompany = textItemForagentCompany.str

      const arrAfterAgentCo = textContent.items.slice(i+3)
      const indexForAgent  = arrAfterAgentCo.findIndex((item:TextItem) => item.str.includes('Proposed to be Used') || item.str.includes('Used Since'))
      agentAddress = arrAfterAgentCo.slice(0,indexForAgent).map((item:TextItem) => item.str).join('')
    }
    
    
    
    else if (data.str.includes('Proposed to be Used') || data.str.includes('Used Since')) {
      userDetail = data.str
    }
   
    else if (data.str.includes('To be associated with')) {
      const textItems = textContent.items.slice(i, i+3) as TextItem[]
      associatedTms = textItems.find((item, i) => {
        return appNoRegExp.test(item.str)
      })?.str
    }
    else if ((data.str === 'MUMBAI' || data.str === 'AHMEDABAD' || data.str === 'KOLKATA' || data.str === 'DELHI' || data.str === 'CHENNAI') && userDetail) {
      
      headOffice = data.str

      details = textContent.items.slice(i+1,).map(item => item.str).join(' ')
    }
    
    
  })
  const tm_phonetics = Metaphone.process(trademark)
  return {
        page_no:pageNo,
        journal_no:parseInt(journal_no),
        trademark:trademark.trim(),
        details:details.slice(0,-3).trim(),
        tm_class:parseInt(tmClass),
        tm_phonetics,
        application_no:parseInt(appNo),
        application_date:appDate,
        user_details: userDetail,
        associated_trademarks:associatedTms,
        proprietor_name:proprietorName,
        proprietor_address:proprietorAddress,      
        agent_name:agentCompany,
        agent_address:agentAddress,
        head_office:headOffice
  }
}
export async function extractPdfText(pdfPath)  {

  const content:TmDataInterface[] = []  
  const pdfRaw = await promises.readFile(pdfPath)
  
  const proxy:PDFDocumentProxy = await (await pdfjsLib.getDocument({data: pdfRaw,})).loadingTask.promise
  let totalPages =  proxy.numPages 
          
    const loadPage  = async (pageNo:number, journal_no:string) => {
      const page = await proxy.getPage(pageNo)
      const textContent  = await page.getTextContent() as TextContent
      const pageNoEmbeded = Number(textContent.items[textContent.items.length -1].str)
      const tmClassRegExp = new RegExp(/Class\s+(\d{1,2})/)
      const isTrademark = textContent.items.some((item:TextItem,i) => tmClassRegExp.test(item.str) )
      
      // const operators = await page.getOperatorList()
      // const isImgTm = operators.fnArray.some((f) => f === pdfjsLib.OPS.paintImageXObject)
      
      if(isTrademark) {
        const journalData = extractJournalData(pageNo, journal_no, textContent)
        
        let  {tm_class,details} = journalData
        if (tm_class == 99) {
          let tmClasses = [...details.matchAll(/Cl.(\d{1,2});/g)]
          
          tmClasses.forEach((tmClassMatchArr,i) => {
              const tmDetails = details.slice(tmClassMatchArr.index, tmClasses[i+1]?.index)
              
              content.push({...journalData, tm_class:parseInt(tmClassMatchArr[1]),details:tmDetails} )
          })
      }else{
          content.push(journalData)
      }
      }
      else if (pageNoEmbeded > 10){
        let pageText = textContent.items.map((item:TextItem) => item.str).join(' ')
        const journalData = content[content.length-1]
        
        let tmClasses = [...pageText.matchAll(/Cl.(\d{1,2});/g)]
          
          tmClasses.forEach((tmClassMatchArr,i) => {
              let tmDetails = pageText.slice(tmClassMatchArr.index, tmClasses[i+1]?.index)
              
              content.push({...journalData, tm_class:parseInt(tmClassMatchArr[1]),details:tmDetails} )
          })
      }
      
      
    }
    const journalNoRegExp = new RegExp(/Trade\s+Marks\s+Journal\s+No:\s+(\d{4})/) ; let journal_no:string

    const page = await proxy.getPage(1)
    const textContent = await page.getTextContent()
    journal_no  = (textContent.items.find((item:TextItem) => journalNoRegExp.test(item.str)) as TextItem).str.match(journalNoRegExp)[1]
    
    
    for(let pageNo = 1; pageNo <= totalPages ; pageNo++) {
      const page = await proxy.getPage(pageNo)
      const textContent = await page.getTextContent()
      const interNationalTm = textContent.items.some((item:TextItem) => item.str.includes('International Registration designating India'))
      if(interNationalTm) break;
        await loadPage(pageNo, journal_no)
      
      
    }
          
    return content     
      
  
  
  
}

export function getProprietor() {

}

export function getAgent(){

}

export function getApplicationNo(){
  
}
export function getClass(){
  
}

export function getJournal(){
  
}
export function getPubTM(){
  
}