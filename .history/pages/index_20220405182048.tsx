import { GetServerSideProps } from "next"
import { FunctionComponent } from "react"
import {Table, Container} from 'react-bootstrap'
import {FileUploader} from 'react-drag-drop-files'

const  App:FunctionComponent  = (props) =>  {

    const fileUpload = (element:Event) => {
        element.preventDefault()
        console.log(element.target)
    }   
    return(
        <Container>
            <FileUploader onChange={fileUpload} />
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
