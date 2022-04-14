import { GetServerSideProps} from "next"
import { useRouter } from "next/router"
import { FunctionComponent, useEffect, useState } from "react"
import {Table, Container} from 'react-bootstrap'
import {FileUploader} from 'react-drag-drop-files'
import { read } from "xlsx"
import { TmDataInterface } from "../utilities/textExtraction"


const  App:FunctionComponent  = (props) =>  {
    const [searchRes,   setSearchRes] = useState<TmDataInterface[]>()
    const [xlsFile , setXlsFile] = useState<File>()
    // FileUploader component only gives file as an argument instead  on an element
    const fileUpload =   async (xlsFile:File) => {
        const file = await xlsFile.arrayBuffer()
        const data = read(file)
        const sheetData = data.Sheets['Original']
        const tmClassArr = []
        Object.entries(sheetData).forEach((pair) => {
            const trademark = {}
            if(pair[0].startsWith('E')) {
                const [ , colNum] = pair[0].split('E')
                trademark['tmClass']= sheetData[`D${colNum}`].w
                trademark['trademark'] = pair[1].w
                tmClassArr.push(trademark)
    
            }
              
        })  
        
        const tmSearch = await fetch('/api/fileReader', {method:'POST', body:JSON.stringify(tmClassArr)})
        const result:any[] = await tmSearch.json()
        setSearchRes(result)
    }   
    
    return(
        <>
            <Container className="text-center">
                <h1>Upload Excel File.</h1>
                <FileUploader handleChange={fileUpload}  name="excelFile"  types={['xls', ]}/>
            </Container>
            <Container>
            <Table striped bordered hover size="sm" className="tm-table">
            <thead>
                <tr>
                    <th className="tm-no-col">No.</th>
                    <th className="tm-col">TRADEMARK</th>
                    <th className="tm-details-col">DETAILS</th>
                    <th className="tm-pdf-col">PAGE NO</th>
                    <th className="tm-class-col">CLASS</th>
                    
                </tr>
            </thead>
            <tbody>
                {searchRes ? searchRes.map((tm, i) => {
                    return(
                        <tr key={`${tm.trademark}_${i}`}>
                            <td className="tm-no-col">
                                <div>{i}</div>
                            </td>
                            <td className="tm-col">
                                <div>{tm.trademark}</div>
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
                }) : ''}
                
            </tbody>
          
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