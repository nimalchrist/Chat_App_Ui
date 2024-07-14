import UserData from "./UserData";

export interface Room {
  roomId: string;
  roomName: string;
  createdBy: string;
}

export interface ChatRoomListProps {
  rooms: Room[];
  authData: {
    accessToken: string | null;
    refreshToken: string | null;
    user: UserData | null;
  };
  handleDeleteRoom: (room: Room) => Promise<void>;
  handleLeaveRoom: (room: Room) => Promise<void>;
  handleViewButtonClick: (roomName: string) => void;
}
