import { GetServerSideProps} from "next"
import {db} from '../dbConnection'
import Head from 'next/head'
import Image from "next/image"
import { FunctionComponent, useEffect, useRef, useState } from "react"
import {Table, Container, Spinner, Button, Form, Row, Col} from 'react-bootstrap'
import {FileUploader} from 'react-drag-drop-files'
import { CellObject, read, WorkSheet } from "xlsx"
import { TmDataInterface } from "../utilities/textExtraction"
import {createURL, fileReaderAPI} from '../utilities/imageGenerator'
export interface TmSearchResInterface extends TmDataInterface{
    regtm :string

}

const  App  = ({journals}) =>  {
    const [searchRes,   setSearchRes] = useState<TmSearchResInterface[]>([])
    
    const [loading ,setLoading ] = useState(false)
    
    
    const [tmClass , setTmClass] = useState(1)
    const tmClassArr = useRef([])
    const [journalNo,setJournalNo]   = useState<string>(journals[0].journal_no)
    
    
    useEffect( () => {
        
        if(loading && tmClassArr.current.length > 0) {
            let watermark = 200
            let tmsToSearch = tmClassArr.current.filter(tm => tm.tmClass === tmClass).map(tm => tm.trademark)
            
            
            const urlPath = `/api/fileReader?journal=${journalNo}&tmClass=${tmClass}`
            fetch(urlPath, {method:'POST', body:JSON.stringify(tmsToSearch.slice(0,watermark))})
            .then(res => res.json())
            .then(data =>{
                setSearchRes(data);
                (function fetchAgain() {
                    if (tmsToSearch.length > watermark) {
                        
                        fetch(urlPath, {method:'POST', body:JSON.stringify(tmsToSearch.slice(watermark,watermark + 200))})
                        .then(res => res.json())
                        .then(data => setSearchRes(prevState => prevState.concat(data)))
                        .finally( () => {
                            watermark += 200
                            fetchAgain()
                        })
                    }
                    else{
                        setLoading(false)
                    }
                })()
                
            })
            .catch(err =>{
              console.log(err)
              setLoading(false)
            })
            
           
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
            
            { searchRes.length > 0 ? 
            <Container className="mt-5" fluid>
                <div className="text">See Journal entries: <a href={`/journal/${searchRes[0].journal_no}`} target="_blank" rel="noopener noreferrer">{searchRes[0].journal_no}</a></div>
                <hr/>
                <ol>
                  {searchRes.map((tm , i) => {
                      return(
                          
                          <li key={`${tm.trademark}_${i}`} className='m-3 mt-5'>
                              <Row>
                              {tm.image || tm.img_url ? 
                                  <Col md="4">
                                      

                                    <div>    
                                        <Image src={tm.image ? createURL(tm.image.data) : tm.img_url} height="200" width="200"></Image>
                                    </div>
                                    
                                    </Col>:''}
                                    <Col>
                                        <Row className="srch-res-details">
                                           <Col className="mt-3" md='4'>
                                                <span>Matching Trademark:</span> 
                                                <div className="res-tm">
                                                        <b>{tm.trademark}</b>
                                                </div>
                                            </Col>
                                            <Col className="mt-3" md='4'>
                                                <span>Registered Trademark:</span>
                                                <div className="res-tm">
                                                    <b>{tm.regtm}</b>
                                                </div>
                                            </Col >
                                            

                                            <Col md='4' className="mt-3">
                                                <span>Trademark Class: </span>
                                                <div>
                                                    <b>{tm.tm_class}</b>
                                                </div>
                                            </Col>
                                            

                                            <Col md='4' className="mt-3">
                                                 <span>Published In:</span>
                                                 <div>
                                                 <b>Page No. {tm.page_no} of Journal No. {tm.journal_no}</b>
                                                 </div>
                                            </Col>
                                            
                                            <Col md='4' className="mt-3">
                                                <span>Application date</span>
                                                <div>
                                                    <b>{tm.application_date}</b>
                                                </div>
                                            </Col>
                                            <Col md='4' className="mt-3">
                                                <span>Application No. :</span> 
                                                <div>
                                                    <b>{tm.application_no}</b>
                                                </div>
                                            </Col>
                                            <Col md='4' className="mt-3">
                                                <span>Trademark Type</span>
                                                <div>
                                                    <b>{tm.image || tm.img_url ? 'Image Mark' : 'Word Mark'}</b>
                                                </div>
                                            </Col>
                                            <Col md='4' className="mt-3">
                                                <span>Proprietor Name</span>
                                                <div>
                                                    <b>{tm.proprietor_name}</b>
                                                </div>
                                            </Col>
                                            <Col md='4' className="mt-3">
                                                <span>Proprietor Address</span>
                                                <div>
                                                    <b>{tm.proprietor_address}</b>
                                                </div>
                                            </Col>
                                            {tm.agent_name ? 
                                                <Col md='4' className="mt-3">
                                                    <span>Agent Name</span>
                                                    <div>
                                                        <b>{tm.agent_name}</b>
                                                    </div>
                                                </Col>
                                            :''}
                                            
                                            {tm.agent_address ? 
                                                <Col md='4' className="mt-3">
                                                    <span>Agent Address</span>
                                                    <div>
                                                        <b>{tm.agent_address}</b>
                                                    </div>
                                                </Col>
                                            :''}
                                            <Col md='4' className="mt-3">
                                                <span>Head Office</span>
                                                <div>
                                                    <b>{tm.head_office}</b>
                                                </div>
                                            </Col>
                                            
                                            {
                                                tm.associated_trademarks ? 
                                                <Col md='4' className="mt-3">
                                                <span>Associated Trademarks</span>
                                                <div>
                                                    <b>{tm.associated_trademarks}</b>
                                                </div>
                                                </Col>
                                                :''
                                            }
                                            <Col md='4' className="mt-3">
                                                <span>Currently Using</span>
                                                <div>
                                                    <b>{tm.user_details}</b>
                                                </div>
                                            </Col>
                                            
                                        </Row>
                                    
                                  </Col>
                                  <Col xs='12'>
                                        <div className="mt-3 tm-details">
                                      <b>Details:</b> {tm.details}
                                        </div>
                                  </Col>

                              </Row>
                              <hr />
                              
                          </li>    
                      )
                  })}        
                </ol>
                
            </Container> :
            ''
            }
            {loading ?  
            <Container className="mt-5 text-center pb-5" fluid>
                
                <Container fluid="md" className="text-center mt-2">
                <Spinner animation="border" />
                <p>Searching...</p>
                </Container> 
                
            </Container> : ''}
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