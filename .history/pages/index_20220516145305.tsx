import { GetServerSideProps} from "next"
import Head from 'next/head'
import { FunctionComponent, useEffect, useRef, useState } from "react"
import {Table, Container, Spinner, Button, Form, Row, Col} from 'react-bootstrap'
import {FileUploader} from 'react-drag-drop-files'
import { CellObject, read, WorkSheet } from "xlsx"
import { TmDataInterface } from "../utilities/textExtraction"
interface TmSearchResInterface extends TmDataInterface{
    regtm :string
}

const  App:FunctionComponent  = (props) =>  {
    const [searchRes,   setSearchRes] = useState<TmSearchResInterface[]>()
    const [isTMFile , setIsTMFile] = useState(true)
    const [loading ,setLoading ] = useState(false)
    const [journals, setJournals] = useState([])

    const tmClassArr = useRef([])
    const journalRef = useRef(null)
    const subListRef = useRef({start:0 , end:1000})
    useEffect(() => {
        fetch('/api/fileReader', {method:'GET'})
        .then(res => res.json())
        .then(data =>setJournals(data))
    }, [])
    useEffect( () => {
        
        if(loading) {
            
            const journal_no = journalRef.current.selectedOptions[0].value
            const urlPath = `/api/fileReader?journal=${journal_no}`
            fetch(urlPath, {method:'POST', body:JSON.stringify(tmClassArr.current.slice(subListRef.current.start,subListRef.current.end))})
            .then(res => res.json())
            .then(data =>{
                setSearchRes(prev => prev.concat(data))
                setLoading(false)
            })
            .catch(err =>{
                setLoading(false)
            })
           subListRef.current = {
               start:subListRef.current.start + 1000,
               end:subListRef.current.end + 1000
           } 
        }
    },[loading]
    
    )
    // FileUploader component only gives file as an argument instead  on an element
    const fileUpload =   async (xlsFile:File) => {
        setSearchRes([])
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
                                    'tmClass':tmClass.w
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
            <Head>
                <title>Trademark Searcher</title>
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
                    <Form.Select id="journals" size="sm"  disabled={loading ? true : false} ref={journalRef} onChange={() => subListRef.current = {start:0 , end:1000}}>
                        {journals.map((journal, i) => {
                            let journal_no = journal.journal_no
                            return(
                                <option value={journal_no} key={`${journal_no}_${i}`}>{journal_no}</option>
                            )
                        })}
                        
                    </Form.Select>
                    <Button 
                        onClick={() => searchRes ? 
                              setLoading(true): null}
                         size="sm" 
                         variant="primary"
                         disabled={ loading ? true : false}
                         >{loading ? "Searching..."  : "Search"}</Button>
                </div>        
                    </Col>
                </Row>
                
               
            </Container>
            
            { !isTMFile ?
                <div>
                    <p>The Excel file you uploaded does not have trademarks in it.</p>
                </div>
            :''}
            { searchRes.length > 0 ? 
            <Container className="mt-5" fluid>
                
                <Table striped bordered hover size="md" className="tm-table">
            <thead>
                <tr>
                    <th className="tm-no-col">No.</th>
                    <th className="tm-col">Published Trademark</th>
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
            <Container className="mt-5 text-center pb-5" fluid>
                {loading ?  
                <Container fluid="md" className="text-center mt-2">
                <Spinner animation="border" />
                </Container> : ''} 
                { subListRef.current.start < tmClassArr.current.length ? 
                <Button
                onClick={() => loading ? null : setLoading(true) }
                disabled = {loading ?  true : false}

                >{loading ? "Searching..." : "Search More"}
                </Button> : ''}
            </Container>
            
            </Container> : ''}

            
        </>
        
    )
}

export default App