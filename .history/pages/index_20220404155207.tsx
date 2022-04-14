import { GetServerSideProps } from "next"

export default function App() {
    return(
        <table>
            <thead>
                <tr>
                    <th colSpan={3}>this is a table head</th>
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

        }
    }
}
