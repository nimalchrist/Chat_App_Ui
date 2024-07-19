import UserData from "./UserData";

interface ChatWindowHeaderProps {
  authData: {
    accessToken: string | null;
    refreshToken: string | null;
    user: UserData | null;
  };
  searchTerm: string;
  searchMode: boolean;
  handleSearchToggle: () => void;
  handleSearchInputChange: (
    e: React.ChangeEvent<HTMLInputElement>
  ) => Promise<void>;
  handleSearchApiTrigger: () => Promise<void>;
  handleNextSearchResult: () => void;
}

export default ChatWindowHeaderProps;
