import { GetServerSideProps} from "next"
import { FunctionComponent, useEffect, useState } from "react"
import {Table, Container, Spinner} from 'react-bootstrap'
import {FileUploader} from 'react-drag-drop-files'
import { CellObject, read, WorkSheet } from "xlsx"
import { TmDataInterface } from "../utilities/textExtraction"
interface TmSearchResInterface extends TmDataInterface{
    
    regtm :string
}
interface XlsxSheetInterface {

}
const  App:FunctionComponent  = (props) =>  {
    const [searchRes,   setSearchRes] = useState<TmSearchResInterface[]>()
    const [loading ,setLoading ] = useState(false)
    
    // FileUploader component only gives file as an argument instead  on an element
    const fileUpload =   async (xlsFile:File) => {
        setLoading(true)
        const file = read(await xlsFile.arrayBuffer())
        const sheetData = file.Sheets['Original']
        console.log(file)
        const tmClassArr = []
        const excelRows = sheetData["!ref"] ? parseInt(sheetData["!ref"].split(':')[1].match(/\d+/)[0]) : null
        
        const tmCellRegExp = /^trade\s?marks?$/
        const tmClassCellRegExp = /^classe?s?$/
        const tmCell = {}
        for(let sheets of file.SheetNames){
            for(let cell of Object.entries(file.Sheets[sheets])) {
                const cellValue = cell[1].w?.toLowerCase()
                if(tmCellRegExp.test(cellValue)) tmCell['tm'] = cell[0].match(/[A-Z]+/)[0]
                else if(tmClassCellRegExp.test(cellValue)) tmCell['class'] = cell[0].match(/[A-Z]+/)[0]
                
                if(tmCell['tm'] && tmCell['class']){
                    for(let i=1;i <= excelRows ; i++) {
                        
                        if(sheetData[`${tmCell['tm']}${i}`] && sheetData[`${tmCell['class']}${i}`]) {
                            tmClassArr.push(
                                {
                                    'trademark':sheetData[`${tmCell['tm']}${i}`].w,
                                    'tmClass':sheetData[`${tmCell['class']}${i}`].w
                                }
                            )
                        }
                        
                    }
                    break;
                }
            }

        }
        
        

        
        
        const result =  await fetch('/api/fileReader', {method:'POST', body:JSON.stringify(tmClassArr)})
        .then(res => res.json())
        .catch(err => <div>{err}</div>)
        setSearchRes(result)
        setLoading(false)
        
    }   
    
    return(
        <>
            <Container fluid="sm" className="text-center mt-2">
                <h3>Search Trademarks published in the weekly trademark gazette</h3>
                <p>Please upload the excel file containing trademarks</p>
                <div className="d-flex justify-content-center"><FileUploader handleChange={fileUpload}  name="excelFile"  types={['xls', ]} classes="drag-and-drop-box" maxSize="10"/></div>
               {loading ?  <Spinner animation="border" /> : ''} 
            </Container>
            { searchRes ? 
            <Container className="mt-5" fluid="sm">
            
                <Table striped bordered hover size="sm" className="tm-table">
            <thead>
                <tr>
                    <th className="tm-no-col">No.</th>
                    <th className="tm-col">TRADEMARK</th>
                    <th className="tm-regTm-col">Registered Trademark</th>
                    <th className="tm-details-col">DETAILS</th>
                    <th className="tm-pdf-page-col">Page no</th>
                    <th className="tm-journal-no-col">Journal</th>
                    <th className="tm-class-col">CLASS</th>
                    
                </tr>
            </thead>
            
            <tbody>
                {searchRes.map((tm, i) => {
                    return(
                        <tr key={`${tm.trademark}_${i+1}`}>
                            <td className="tm-no-col">
                                <div>{i+1}</div>
                            </td>
                            <td className="tm-col">
                                <div>{tm.trademark}</div>
                            </td>
                            <td className="tm-regTm-col">
                                <div>{tm.regtm}</div>
                            </td>
                            <td className="tm-details-col">
                                <div>{tm.details}</div>
                            </td>
                            <td className="tm-pdf-page-col">
                                <div>{tm.page_no}</div>
                            </td>
                            <td className="tm-journal-no">
                                <div>{tm.journal_no}</div>
                            </td>
                            <td className="tm-class-col">
                                <div>{tm.tm_class}</div>
                            </td>
    
                        </tr>
                    )
                })}
                
            </tbody>
            
            </Table > 

            
            
            </Container> : ''}
        </>
        
    )
}

export const  getServerSideProps:GetServerSideProps = async () => {
    return {
        props:{
            'testing':'ishan bassii'
        }
    }
}
export default App