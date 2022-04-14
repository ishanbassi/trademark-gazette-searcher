import { GetServerSideProps } from "next"

export default function App() {
    return(
        <table>
            <thead>
                <tr>
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
        </table>
    )
}

export const  getServerSideProps:GetServerSideProps = async () => {
    return {
        props:{
            'testing':'ishan bassii'
        }
    }
}
