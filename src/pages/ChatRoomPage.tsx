import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuthenticatedUser from "../hooks/useAuthenticatedUser";
import useAuthentication from "../hooks/useAuthentication";
import "../assets/styles/ChatRoom.css";

const ChatRoomPage = () => {
  const navigate = useNavigate();
  const [createRoomName, setCreateRoomName] = useState("");
  const [joinRoomName, setJoinRoomName] = useState("");
  const { auth, logout } = useAuthentication();
  useAuthenticatedUser();

  // handlers
  const handleCreateRoom = () => {
    if (createRoomName) {
      console.log("Creating room:", createRoomName);
      navigate(`/home/${createRoomName}`);
      setCreateRoomName("");
    }
  };
  const handleJoinRoom = async () => {
    if (joinRoomName) {
      console.log("Joining room: ", joinRoomName);
      try {
        const response = await fetch(
          `http://localhost:4200/api/v1/rooms/${joinRoomName}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${auth.accessToken}`,
            },
          }
        );

        if (response.ok) {
          navigate(`/home/${joinRoomName}`);
          setJoinRoomName("");
        } else {
          alert(
            "The entered room is not available. Try creating a new room or Enter a valid room name"
          );
          setJoinRoomName("");
        }
      } catch (error) {
        alert(error);
      }
    }
  };
  const handleLogout = async () => {
    await logout();
  };
  return (
    <div
      className="chat-room"
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        width: "80%",
        flexWrap: "wrap",
        border: "1px solid black",
        margin: "100px auto",
        borderRadius: "12px",
      }}>
      <h1 className="title" style={{ width: "100%" }}>
        Chatify
      </h1>
      <div>
        <div>
          <button
            style={{
              outline: "none",
              border: "none",
              padding: "10px 20px",
              margin: "20px 0px",
              backgroundColor: "#3d68f3",
              color: "white",
            }}
            onClick={() => {
              handleLogout();
            }}>
            Logout
          </button>
        </div>
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
    </div>
  );
};

export default ChatRoomPage;
