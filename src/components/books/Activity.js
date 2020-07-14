import React from "react";
import {useLazyQuery, useQuery} from "@apollo/client";
import {GET_LOGS} from "../../queries";
import {Table} from "react-bootstrap";

const getDateFromMillis = (time) => {
    const date = new Date(Number(time))
    return  date.getHours()+':'+
            date.getMinutes()+' '+
            date.getDay()+'/'+
            date.getMonth()+'/'+
            date.getFullYear()
}

const Activity = () => {
    const {data, loading, error} = useQuery(GET_LOGS,  {
        pollInterval: 5000,
    })
    if(loading || !data) return <div>Loading activity...</div>
    if(error) return <div>An error has occured</div>
    let count = 1
    const logs = data.allLogs
    return (
        <Table striped hover variant="dark">
            <tbody>
                <tr>
                    <th>#</th>
                    <th>type</th>
                    <th>User</th>
                    <th>Book</th>
                    <th>Time</th>
                </tr>
                {
                    logs.map(log => <tr key={log._id}>
                        <td>{count++}</td>
                        <td>{log.type}</td>
                        <td>{log.user.username}</td>
                        <td>{(log.book)? log.book.title: "N/A"}</td>
                        <td>{getDateFromMillis(log.time)}
                        </td>
                    </tr>)
                }
            </tbody>
        </Table>
    )
}

export default Activity
