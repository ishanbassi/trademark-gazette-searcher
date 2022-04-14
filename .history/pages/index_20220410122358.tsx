import { GetServerSideProps } from "next"
import { FunctionComponent, useState } from "react"
import {Table, Container} from 'react-bootstrap'
import {FileUploader} from 'react-drag-drop-files'
import { read } from "xlsx"
import { TmDataInterface } from "../utilities/textExtraction"


const  App:FunctionComponent  = (props) =>  {
    const [searchRes,   setSearchRes] = useState<TmDataInterface[]>()
    
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
            <Table striped bordered hover size="sm">
            <thead>
                <tr>
                    <th ></th>
                    <th>Trademark</th>
                    <th colSpan={2}>Details</th>
                    <th>PDF page no</th>
                    <th>Class</th>
                    
                </tr>
            </thead>
            <tbody>
                {searchRes ? searchRes.map((tm, i) => {
                    return(
                        <tr key={`${tm.trademark}_${i}`}>
                            <td>{i}</td>
                            <td>{tm.trademark}</td>
                            <td>{tm.details}</td>
                            <td>{tm.page_no}</td>
                            <td>{tm.tm_class}</td>
    
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