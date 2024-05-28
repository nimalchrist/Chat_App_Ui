import React, { useEffect, useState } from "react";
import "../assets/styles/ChatRoom.css";
import { useNavigate } from "react-router-dom";
import useAuthenticatedUser from "../hooks/useAuthenticatedUser";
import useAuthentication from "../hooks/useAuthentication";

const ChatRoomPage = () => {
  const navigate = useNavigate();
  const [createRoomName, setCreateRoomName] = useState("");
  const [joinRoomName, setJoinRoomName] = useState("");
  const { logout } = useAuthentication();
  const [availableRooms, setAvailableRooms] = useState<[] | null>(null);
  useAuthenticatedUser();

  // handlers
  const handleCreateRoom = () => {
    if (createRoomName) {
      console.log("Creating room:", createRoomName);
      navigate(`/home/${createRoomName}`);
      setCreateRoomName("");
    }
  };
  const handleJoinRoom = () => {
    if (joinRoomName) {
      console.log("Joining room:", joinRoomName);
      navigate(`/home/${joinRoomName}`);
      setJoinRoomName("");
    }
  };
  const handleLogout = async () => {
    await logout();
  };
  useEffect(() => {
    const fetchAvailableRooms = async () => {
      try {
        const response = await fetch("http://localhost:4200/rooms");
        if (response.ok) {
          const data = await response.json();
          setAvailableRooms(data.availableRooms);
        }
      } catch (error) {
        setAvailableRooms(null);
      }
    };
    fetchAvailableRooms();
  }, []);

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
        <h1>Live rooms</h1>
        {availableRooms && availableRooms.length > 0 ? (
          availableRooms.map((room, index) => (
            <h2 key={index} style={{ fontWeight: 400 }}>
              {index + 1}. {room}
            </h2>
          ))
        ) : (
          <h2 style={{ fontWeight: 400 }}>No rooms available at the moment</h2>
        )}
      </div>
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
            disabled={!availableRooms || availableRooms.length === 0}
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
