export interface Room {
  roomId: string;
  roomName: string;
  createdBy: string;
}

export default interface SwitchChatProps {
  rooms: Room[];
  handleRoomClick: (roomName: string) => void;
}
