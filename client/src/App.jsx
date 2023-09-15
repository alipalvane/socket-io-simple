import { useEffect } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:3001");

const App = () => {

  const sendMessage = () => {
    //Send Message to Server
    socket.emit("send_message", { message: "hello" });
  };

  useEffect(()=>{
    //Get Message from Server
    socket.on("receive_message", (data)=>{
      alert(data.message)

    })
  },[socket]) 

  return (
    <div>
      <input type="text" placeholder="message" />
      <button onClick={sendMessage}>Send Message</button>
    </div>
  );
};

export default App;
