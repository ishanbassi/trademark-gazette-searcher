import { GetServerSideProps } from "next"
import {Table} from 'react-bootstrap'
export default function App(props) {
    return(
        <Table>
            <thead>
                <tr>
                    <th ></th>
                    <th>Trademark</th>
                    <th>Page No</th>
                    <th>Class</th>
                    <th>Details</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>The table body</td>
                    <td>with two columns</td>
                    <td>another column</td>
                    
                </tr>
            </tbody>
          
        </Table >
    )
}

export const  getServerSideProps:GetServerSideProps = async () => {
    return {
        props:{
            'testing':'ishan bassii'
        }
    }
}
