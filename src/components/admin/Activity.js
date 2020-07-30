import React from "react";
import {useQuery} from "@apollo/client";
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
const parseType = (type) => {
    switch (type) {
        case "BOOK_RESERVE": return <div style={{color:"#03cefc"}}>Book Reserved</div>
        case "USER_REGISTERED": return <div style={{color:"#a103fc"}}>User Registered</div>
        case "SET_AVAILABLE": return <div style={{color:"#07fc03"}}>Set Available</div>
        case "NEW_BOOK": return <div style={{color:"#fc8c03"}}>New Book Added</div>
        default: return <div>Unknown</div>
    }
}
const Activity = () => {
    const {data, loading, error} = useQuery(GET_LOGS,  {
        pollInterval: 5000,
    })
    if(loading || !data) return <div>Loading activity...</div>
    if(error) return <div>An error has occurred</div>
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
                        <td>{parseType(log.type)}</td>
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
