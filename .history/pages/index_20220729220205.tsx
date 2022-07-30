import { GetServerSideProps} from "next"
import {db} from '../dbConnection'
import Head from 'next/head'
import Image from "next/image"
import { FunctionComponent, useEffect, useRef, useState } from "react"
import {Table, Container, Spinner, Button, Form, Row, Col} from 'react-bootstrap'
import {FileUploader} from 'react-drag-drop-files'
import { CellObject, read, WorkSheet } from "xlsx"
import { TmDataInterface } from "../utilities/textExtraction"
interface TmSearchResInterface extends TmDataInterface{
    regtm :string
}

const  App  = ({journals}) =>  {
    const [searchRes,   setSearchRes] = useState<TmSearchResInterface[]>([])
    
    const [loading ,setLoading ] = useState(false)
    
    
    const [tmClass , setTmClass] = useState(1)
    const tmClassArr = useRef([])
    const [journalNo,setJournalNo]   = useState<string>(journals[0].journal_no)
    
    const createURL = (imgBuffer) => {
        
        let imgsrc = "data:image/png;base64," + btoa(String.fromCharCode.apply(null, imgBuffer));
        return imgsrc
    }
    useEffect( () => {
        
        if(loading && tmClassArr.current.length > 0) {
            let tmsToSearch = tmClassArr.current.filter(tm => tm.tmClass === tmClass).map(tm => tm.trademark)
            
            
            const urlPath = `/api/fileReader?journal=${journalNo}&tmClass=${tmClass}`
            fetch(urlPath, {method:'POST', body:JSON.stringify(tmsToSearch)})
            .then(res => res.json())
            .then(data =>{
                setSearchRes(data)
                
            })
            .catch(err =>{
              console.log(err)
            })
            .finally(() => setLoading(false))
           
        }else{
            setTimeout(() =>setLoading(false)  , 1000)
            
            
        }
    },[loading]
    
    )
    
    // FileUploader component only gives file as an argument instead  on an element
    const fileUpload =   async (xlsFile:File) => {
        
        tmClassArr.current = []
        const file = read(await xlsFile.arrayBuffer())
    
        
        const tmCellRegExp = /^trade\s?marks?$/
        const tmClassCellRegExp = /^classe?s?$/
        
        for(let sheets of file.SheetNames){
            const tmCell = {}
            // total no of rows using regex
            const excelRows = file.Sheets[sheets]["!ref"] ? parseInt(file.Sheets[sheets]["!ref"].split(':')[1].match(/\d+/)[0]) : null

            // iterating on all sheets
            for(let cell of Object.entries(file.Sheets[sheets])) {
                const cellValue = cell[1].w?.toLowerCase()

                // finding the column having trademarks and class
                if(tmCellRegExp.test(cellValue)) tmCell['tm'] = cell[0].match(/[A-Z]+/)[0]
                else if(tmClassCellRegExp.test(cellValue)) tmCell['class'] = cell[0].match(/[A-Z]+/)[0]
                
                if(tmCell['tm'] && tmCell['class']){
                    for(let i=1;i <= excelRows ; i++) {
                        let tm =  file.Sheets[sheets][`${tmCell['tm']}${i}`] , tmClass = file.Sheets[sheets][`${tmCell['class']}${i}`]

                        if( tm && tm.w.length > 2 && tmClass) {
                            tmClassArr.current.push(
                                {
                                    'trademark':tm.w.toUpperCase(),
                                    'tmClass':parseInt(tmClass.w)
                                }
                            )
                        }
                        
                    }
                    break;
                }
            }

        }
        
        setLoading(true)
    }   
    
    return(
        <>
        
            <Head>
                <title>Trademark Searcher</title>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link href="https://fonts.googleapis.com/css2?family=Open+Sans&display=swap" rel="stylesheet" /> 
            </Head>
            <Container fluid="md" className="text-center mt-2">
                <h3>Search Trademarks published in the weekly trademark gazette</h3>
                <p>Please upload the excel file containing trademarks</p>
                <Row>
                    <Col>        
                        <div className="d-flex justify-content-center"><FileUploader handleChange={fileUpload}  name="excelFile"  types={['xls', ]} classes="drag-and-drop-box" maxSize="10"/></div>
                    </Col>
                    <Col>
                    <div>
                    <label htmlFor="journals">Select Journal:</label>
                    <Form.Select id="journals" size="sm"  disabled={loading ? true : false}  onChange={(e) => setJournalNo(e.target.value)} value={journalNo}>
                        {journals.map((journal, i) => {
                            let journal_no = journal.journal_no
                            return(
                                <option value={journal_no} key={`${journal_no}_${i}`}>{journal_no}</option>
                            )
                        })}
                        
                    </Form.Select>
                    <label htmlFor="tm-class">Select Class:</label>
                    <Form.Select id="tm-class" size="sm"  disabled={loading ? true : false} onChange={(e)=>  setTmClass(parseInt(e.target.value))} value={tmClass}>
                        {
                            Array.from({length: 45}, (_, i) => i + 1).map((tmClass,i) => {
                                return (
                                    <option value={tmClass} key={`${tmClass}_${i}`}>{tmClass}</option>
                                )
                            })
                        }
                    </Form.Select>
                    
                    <Button 
                        onClick={() =>setLoading(true) }
                         size="sm" 
                         variant="primary"
                         disabled={   loading ||  tmClassArr.current.length == 0 ? true : false}
                         >{loading ? "Searching..."  : "Search"}</Button>
                </div>        
                    </Col>
                </Row>
                
               
            </Container>
            {loading ?  
            <Container className="mt-5 text-center pb-5" fluid>
                
                <Container fluid="md" className="text-center mt-2">
                <Spinner animation="border" />
                </Container> 
                
            </Container> : ''}
            { searchRes.length > 0 ? 
            <Container className="mt-5" fluid>
                
                <Table striped bordered hover size="md" className="tm-table">
            <thead>
                <tr>
                    <th className="tm-no-col">No.</th>
                    <th className="tm-col">
                        Published Trademark
                        
                        </th>
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
                                <div><b>{tm.trademark}</b></div>
                                {tm.image ? <div>
                                    <Image src={createURL(tm.image.data)} width="500" height="400" />
                                </div> : ''}
                               
                            </td>
                            <td className="tm-regTm-col">
                                <div><b>{tm.regtm}</b></div>
                            </td>
                            <td className="tm-details-col">
                                <div><p>{tm.details}</p></div>
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
            
            </Container> :
            ''
            }
            
            {
                !loading && searchRes.length == 0  && tmClassArr.current.length > 0 ?
                <Container  className="text-center" fluid>
                    <h4>No matching trademark found</h4>
                </Container>
                :''
            }
            
        </>
        
    )
}

export async function getServerSideProps() {
    const journals  = await db('tm_details')
        .distinct('journal_no')
        .orderBy('journal_no', 'desc')
    return {
        props:{
            journals
        }
    }
}
export default App