import axios from "axios";
import { useRef, useState } from "react";
import { useEffect } from "react";
import { MessageSquare, Trash } from "react-feather";
import { createChatMessage, deleteAllChatMessage, deleteChatMessage, getChatMessage } from "../../service/chat";
import { dateFormatter } from "../../utils";


const ChatComponent = () => {
    const inputRef = useRef()
    const [chat,setChat]=useState([])

    useEffect(() => {
        getChatMessage()
            .then(({ data }) => setChat(data))
            .catch(err=>console.log(err))
    }, [])
    

    const submitChatHandler = (e) => {
        let dataClone=JSON.parse(JSON.stringify(chat))
        e.preventDefault()
        createChatMessage({ text: inputRef.current.value })
            .then(({ data }) => {
                dataClone.push(data)
                setChat(dataClone)
                inputRef.current.value=''
        })
    }

    const removeChatHandler = (id) => {
        let dataClone = JSON.parse(JSON.stringify(chat))
        deleteChatMessage(id)
        .then(({ data })=> {
            let index = dataClone.findIndex(item => item.id === id)
            if (index > -1) {
                dataClone.splice(index,1)
            }
            setChat(dataClone)
        })
    }
    
    const removeAllChatHandler = () => {
        let promisesArray = chat.map(item => deleteChatMessage(item.id))
        deleteAllChatMessage(promisesArray)
            .then(res => {
                setChat([])
            })
    }

    return <div className="container mt-5">
        <form className="d-flex" onSubmit={(e) => submitChatHandler(e)}>
            <input type="text" className="form-control" ref={inputRef} placeholder="Please Enter Chat" aria-label="Username" aria-describedby="basic-addon1" />
            <button className="mx-2 btn btn-primary" type="submit">Submit</button>
            <button onClick={removeAllChatHandler} className="mx-2 btn btn-danger" type="button">Delete All</button>
        </form>
        <div className="mt-5">
            {chat?.map((item) => <div key={item.id}>
                <hr />
                <div className="d-flex">
                    <MessageSquare className="mt-1 me-2" size={18} />
                    <div className="chat-content ms-1">
                        <p className="m-0"><b>~{item.source}</b></p>
                        <p className="m-0 ">
                            {item.text}
                        </p>
                    </div>
                    <p className="my-0 ms-5">{dateFormatter(item.timestamp)}</p>
                    <div onClick={() => removeChatHandler(item.id)} className="ms-2 delete_button" ><Trash size={15} color={'red'}/></div>
                </div>
                
            </div>)}
        </div>
  </div>;
};

export default ChatComponent;
