import {Table} from 'react-bootstrap'
import { useRouter } from 'next/router'
export default function TmTable() {
    return(
        <Table striped bordered hover size="sm">
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
                    <td>1</td>
                    <td>with two columns</td>
                    <td>another column</td>
                    
                </tr>
            </tbody>
          
        </Table >
    )
}