import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Spinner, Table } from "react-bootstrap";
import { db } from "../../dbConnection";
import { TmSearchResInterface } from "..";
export default function Journal() {
    const router = useRouter()
    const {journal} = router.query
    console.log(journal)
    const [entries, setEntries] = useState<TmSearchResInterface[]>()

    useEffect(() => {
        if(journal){
            fetch(`/api/journalData?journal=${journal}` , {method:'GET'})
            .then(res => res.json())
            .then(data => setEntries(data))
        }
    }, [journal])
    return (
        <>
            <div className="mt-5 mb-5">
                <p>Journal No. <strong>{journal}</strong></p>
                {entries ? <p>Total Entries: <strong>{entries.length}</strong></p> : ''}
            </div>
            {entries ? 
            <Table>
                
                <thead>
                    <tr>
                        <th>No.</th>
                        <th>Trademarks</th>
                        <th>Application No.</th>
                        <th>Class</th>
                        <th>Journal No</th>
                    </tr>
                </thead>
                <tbody>
                    {entries.map((entry, i) => {
                        return(
                            <tr key={`${entry.application_no}_${i}`}>
                                <td>
                                    {i+1}
                                </td>
                                <td>
                                    {entry.trademark}
                                </td>
                                <td>
                                    {entry.application_no}
                                </td>
                                <td>
                                    {entry.tm_class}
                                </td>
                                <td>
                                    {entry.journal_no}
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table> :
            <div className="text-center">
                <Spinner animation="border"/>
                <p>Please Wait...</p>
            </div>
            }
        </>

    )
}
