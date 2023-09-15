import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:3001");

const App = () => {
  const [message, setMessage] = useState("");
  const [messageReceived, setMessageReceived] = useState("");

  const sendMessage = () => {
    //Send Message to Server
    socket.emit("send_message", { message });
  };

  useEffect(() => {
    //Get Message from Server
    socket.on("receive_message", (data) => {
      setMessageReceived(data.message);
    });
  }, [socket]);

  return (
    <div>
      <input
        type="text"
        placeholder="message"
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Send Message</button>
      <h2>Messages:</h2>
      <p>{messageReceived}</p>
    </div>
  );
};

export default App;
