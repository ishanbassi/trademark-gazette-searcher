import { GetServerSideProps} from "next"
import { FunctionComponent, useEffect, useState } from "react"
import {Table, Container, Spinner} from 'react-bootstrap'
import {FileUploader} from 'react-drag-drop-files'
import { CellObject, read, WorkSheet } from "xlsx"
import { TmDataInterface } from "../utilities/textExtraction"
interface TmSearchResInterface extends TmDataInterface{
    loading:boolean
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
        const tmClassArr = []
        const cells = sheetData["!ref"] ? parseInt(sheetData["!ref"].split(':')[1].match(/\d+/)[0]) : null
        
        const alphabets = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
        const tmCellRegExp = /^trade\s?marks?/
        const tmAndClassCell = {}

        alphabets.split('').forEach(alphabet => {
            const cellValue:string =  sheetData[`${alphabet}1`].w.toLowerCase()
            if(tmCellRegExp.test(cellValue)) tmAndClassCell['tm'] = alphabet
            else if(cellValue === 'class') tmAndClassCell['class'] = alphabet
        })
        if(tmAndClassCell['tm'] && tmAndClassCell['class']) {
            
            for(let i=0;i< cells ; i++) {
                tmClassArr.push(
                    {
                        'trademark':sheetData[`${tmAndClassCell['tm']}${i+1}`]?.w,
                        'tmClass':sheetData[`${tmAndClassCell['class']}${i+1}`]?.w
                    }
                )
            }
        }
        
        
        
        // const result =  await fetch('/api/fileReader', {method:'POST', body:JSON.stringify(tmClassArr)})
        // .then(res => res.json())
        // .catch(err => <div>{err}</div>)
        // setSearchRes(result)
        // setLoading(false)
        
    }   
    
    return(
        <>
            <Container className="text-center mt-2">
                <h1>Upload Excel File.</h1>
                <div className="d-flex justify-content-center"><FileUploader handleChange={fileUpload}  name="excelFile"  types={['xls', ]} classes="drag-and-drop-box" maxSize="10"/></div>
               {loading ?  <Spinner animation="border" /> : ''} 
            </Container>
            <Container className="mt-5">
            
                <Table striped bordered hover size="sm" className="tm-table">
            <thead>
                <tr>
                    <th className="tm-no-col">No.</th>
                    <th className="tm-col">TRADEMARK</th>
                    <th className="tm-regTm-col">Registered Trademark</th>
                    <th className="tm-details-col">DETAILS</th>
                    <th className="tm-pdf-col">PAGE NO</th>
                    <th className="tm-class-col">CLASS</th>
                    
                </tr>
            </thead>
            { searchRes ? 
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
                            <td className="tm-pdf-col">
                                <div>{tm.page_no}</div>
                            </td>
                            <td className="tm-class-col">
                                <div>{tm.tm_class}</div>
                            </td>
    
                        </tr>
                    )
                })}
                
            </tbody> : ''
            }
            </Table > 

            
            
            </Container>
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