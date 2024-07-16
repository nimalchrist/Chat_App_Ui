export interface Room {
  roomId: string;
  roomName: string;
  createdBy: string;
}

export default interface SwitchChatProps {
  roomId: string;
  rooms: Room[];
  handleRoomClick: (roomName: string) => void;
}
