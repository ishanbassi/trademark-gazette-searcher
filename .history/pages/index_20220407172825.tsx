import { GetServerSideProps } from "next"
import { FunctionComponent, useState } from "react"
import {Table, Container} from 'react-bootstrap'
import {FileUploader} from 'react-drag-drop-files'
import { read } from "xlsx"
const  App:FunctionComponent  = (props) =>  {
    const [file, setFile] = useState<File>()
    
    // FileUploader component only gives file as an argument instead  on an element
    const fileUpload =   async (xlsFile:File) => {
        const file = await xlsFile.arrayBuffer()
        const data = read(file)
        const tms = Object.entries(data.Sheets['Original']).filter(pair => {
            return pair[0].startsWith("E")
        })
        console.log(tms)
    
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