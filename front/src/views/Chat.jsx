import Permission from "../components/utils/Permission";
import {SCOPES} from "../utils/permissions-map";
import {useEffect, useRef, useState} from "react";


export default function Chat() {
    const messageSenderRef = useRef(null) ;
    const [messages, setMessages] = useState([]) ;
    const [newMessage, setNewMessage] = useState(false) ;
    useEffect(()=> {
        fetch("http://localhost:4000/api/users/1/messages", {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6IlRlc3QiLCJpYXQiOjE2NTg0MTg2OTUsImV4cCI6MTY4OTk3NjI5NX0.yR-oV71SScGAPay2wOUuRqJVmvrigd9Nna1MYnUY10YpI92n3jZIW49SgO0sMKsUSz9WR63A5GTmxG82wCq8TQ',
                'Content-type': 'application/json',
            }
        })
            .then((data) => {
                return data.status === 304 ? [] : data.json();
            })
            .catch((e) => console.error(e))
            .then((mes) => {
                setMessages(mes);
            });
    },[newMessage]) ;

    function sendMessage() {
        setNewMessage(false) ;
        fetch("http://localhost:4000/api/users/1/messages",{
              method: 'POST',
              headers: {
                  'Authorization': 'Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6IlRlc3QiLCJpYXQiOjE2NTg0MTg2OTUsImV4cCI6MTY4OTk3NjI5NX0.yR-oV71SScGAPay2wOUuRqJVmvrigd9Nna1MYnUY10YpI92n3jZIW49SgO0sMKsUSz9WR63A5GTmxG82wCq8TQ',
                  'Content-type': 'application/json',
              },
            body: JSON.stringify({
                sendToId:2,
                text: messageSenderRef.current.value,
                is_read: false
            })
        }).then((res)=> res.json())
            .then((data)=> {
                setNewMessage(true) ;
                messageSenderRef.current.value = "" ;
            }) ;
    }

    return (
        <>
            <div className={"chat"}>
                <div className={"messages"}>

                    {
                        messages == null ? <h1>Aucun message</h1> :  messages.map((message) => {
                            return <p style={{textAlign: message.authorId === 1 ? 'right' : 'left' }} key={message.id}> {message.text}  </p>
                        })
                    }
                </div>
                <div className={"sendMessage"}>
                    <input ref={messageSenderRef} id={'messageSender'} type="text"/>
                    <button onClick={()=>sendMessage()}>envoyer</button>
                </div>
            </div>
            <Permission scopes={[SCOPES.canView]}>
                <h2>Only users, editors and admin can see this.</h2>
                <small>Edit <b>Permission.jsx:10</b> to "GUEST" to test it</small>
            </Permission>
        </>
    )
}
