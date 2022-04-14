import { GetServerSideProps } from "next"
import { FunctionComponent, useState } from "react"
import {Table, Container} from 'react-bootstrap'
import {FileUploader} from 'react-drag-drop-files'
import readXlsxFile from 'read-excel-file'
const  App:FunctionComponent  = (props) =>  {
    const [file, setFile] = useState()
    // FileUploader component only gives file as an argument instead  on an element
    const fileUpload =   async (file:File) => {
        readXlsxFile(file).then(row => console.log(row))
        
        // const form = new FormData
        // form.append('tmNames', file)
        // console.log(file)
        // await fetch('/api/fileReader', {method:'POST',
        // body:form
        
        // })
       
    }   
    return(
        <Container>
            <FileUploader handleChange={fileUpload}  name="excelFile" />
        </Container>
        // <Table striped bordered hover size="sm">
        //     <thead>
        //         <tr>
        //             <th ></th>
        //             <th>Trademark</th>
        //             <th>Page No</th>
        //             <th>Class</th>
        //             <th>Details</th>
        //         </tr>
        //     </thead>
        //     <tbody>
        //         <tr>
        //             <td>1</td>
        //             <td>with two columns</td>
        //             <td>another column</td>
                    
        //         </tr>
        //     </tbody>
          
        // </Table >
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