import React, { useState } from "react";
import "../assets/styles/ChatRoom.css";
import { useNavigate } from "react-router-dom";
import useAuthenticatedUser from "../hooks/useAuthenticatedUser";

const ChatRoom = () => {
  const navigate = useNavigate();
  const [createRoomName, setCreateRoomName] = useState("");
  const [joinRoomName, setJoinRoomName] = useState("");
  useAuthenticatedUser();

  // handlers
  const handleCreateRoom = () => {
    if (createRoomName) {
      console.log("this is called so useEffect needs to change");
      console.log("Creating room:", createRoomName);
      navigate(`/home/${createRoomName}`);
      setCreateRoomName("");
    }
  };

  const handleJoinRoom = () => {
    // Logic for joining a room
    console.log("Joining room:", joinRoomName);
  };

  return (
    <div className="chat-room">
      <h1 className="title">Chatify</h1>
      <div className="create-room">
        <input
          type="text"
          placeholder="Enter room name to create"
          value={createRoomName}
          onChange={(e) => setCreateRoomName(e.target.value)}
        />
        {createRoomName && !joinRoomName && (
          <div>
            <button onClick={handleCreateRoom}>Create Room</button>
            <button onClick={() => setCreateRoomName("")}>Cancel</button>
          </div>
        )}
      </div>
      <div className="join-room">
        <input
          type="text"
          placeholder="Enter room name to join"
          value={joinRoomName}
          onChange={(e) => setJoinRoomName(e.target.value)}
        />
        {joinRoomName && !createRoomName && (
          <div>
            <button onClick={handleJoinRoom}>Join Room</button>
            <button onClick={() => setJoinRoomName("")}>Cancel</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatRoom;
