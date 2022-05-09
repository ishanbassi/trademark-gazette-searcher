import { GetServerSideProps} from "next"
import { FunctionComponent, useEffect, useRef, useState } from "react"
import {Table, Container, Spinner, Button} from 'react-bootstrap'
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
    const [searchRes,   setSearchRes] = useState<TmSearchResInterface[]>([])
    const [isTMFile , setIsTMFile] = useState(true)
    const [loading ,setLoading ] = useState(false)
    const tmClassArr = useRef([])
    console.log(tmClassArr)
    useEffect( () => {
        if(loading) {
            
            fetch('/api/fileReader', {method:'POST', body:JSON.stringify(tmClassArr.current.splice(0,1000))})
            .then(res => res.json())
            .then(data =>{
                setSearchRes(prevState=> prevState.concat(data))
                setLoading(false)
            })
            .catch(err => err)
            
        }
    },[loading])
    // FileUploader component only gives file as an argument instead  on an element
    const fileUpload =   async (xlsFile:File) => {
        
        const file = read(await xlsFile.arrayBuffer())
    
        
        const tmCellRegExp = /^trade\s?marks?$/
        const tmClassCellRegExp = /^classe?s?$/
        
        for(let sheets of file.SheetNames){
            const tmCell = {}    
            const excelRows = file.Sheets[sheets]["!ref"] ? parseInt(file.Sheets[sheets]["!ref"].split(':')[1].match(/\d+/)[0]) : null

            for(let cell of Object.entries(file.Sheets[sheets])) {
                const cellValue = cell[1].w?.toLowerCase()
                if(tmCellRegExp.test(cellValue)) tmCell['tm'] = cell[0].match(/[A-Z]+/)[0]
                else if(tmClassCellRegExp.test(cellValue)) tmCell['class'] = cell[0].match(/[A-Z]+/)[0]
                
                if(tmCell['tm'] && tmCell['class']){
                    for(let i=1;i <= excelRows ; i++) {
                        
                        if(file.Sheets[sheets][`${tmCell['tm']}${i}`] && file.Sheets[sheets][`${tmCell['class']}${i}`]) {
                            tmClassArr.current.push(
                                {
                                    'trademark':file.Sheets[sheets][`${tmCell['tm']}${i}`].w,
                                    'tmClass':file.Sheets[sheets][`${tmCell['class']}${i}`].w
                                }
                            )
                        }
                        
                    }
                    break;
                }
            }

        }
        
        if(tmClassArr.current.length > 0) setLoading(true)
    }   
    
    return(
        <>
            <Container fluid="sm" className="text-center mt-2">
                <h3>Search Trademarks published in the weekly trademark gazette</h3>
                <p>Please upload the excel file containing trademarks</p>
                <div className="d-flex justify-content-center"><FileUploader handleChange={fileUpload}  name="excelFile"  types={['xls', ]} classes="drag-and-drop-box" maxSize="10"/></div>
               {loading ?  <Spinner animation="border" /> : ''} 
            </Container>
            
            { !isTMFile ?
                <div>
                    <p>The Excel file you uploaded does not have trademarks in it.</p>
                </div>
            :''}
            { searchRes.length > 0 ? 
            <Container className="mt-5" fluid="sm">
            
                <Table striped bordered hover size="sm" className="tm-table">
            <thead>
                <tr>
                    <th className="tm-no-col">No.</th>
                    <th className="tm-col">Published Trademark</th>
                    <th className="tm-regTm-col">Registered Trademark</th>
                    <th className="tm-details-col">DETAILS</th>
                    <th className="tm-pdf-col">Journal</th>
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
                            <td className="tm-pdf-col">
                                <div>{tm.page_no}</div>
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
            {tmClassArr.current.length > 0 ? 
             <Container  fluid="sm" className="text-center mt-2">
                <Button
                 onClick={loading ? null : () => setLoading(true)}
                 disabled={loading}
                 >{loading ? 'loading...' : 'Search More'}</Button>
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