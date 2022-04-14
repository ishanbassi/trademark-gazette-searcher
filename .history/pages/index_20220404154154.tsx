import { GetServerSideProps } from "next"
export default function App() {
    return(
        <table>
            <thead>
                <tr>
                    <th>this is a table head</th>
                </tr>
            </thead>
        </table>
    )
}

export const  getServerSideProps:GetServerSideProps = async () => {
    return {
        props:{

        }
    }
}
