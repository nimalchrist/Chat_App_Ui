import { useRef, useState } from "react";
import Message from "../interface/Message";
import useSnackBar from "./useSnackBar";
import axios from "axios";

const useChatSearch = (roomKey: string) => {
  const [searchMode, setSearchMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<Message[]>([]);
  const [currentSearchIndex, setCurrentSearchIndex] = useState(0);
  const messageContainerRef = useRef<HTMLUListElement>(null);
  const { showMessage } = useSnackBar();

  const handleSearchToggle = () => {
    setSearchMode(!searchMode);
    setSearchTerm("");
    setSearchResults([]);
    setCurrentSearchIndex(0);
  };

  const handleSearchInputChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchTerm(e.target.value);
  };

  const scrollToSearchResult = (index: number) => {
    const messageElements = messageContainerRef.current?.children;
    if (messageElements && searchResults[index]) {
      const messageElement = Array.from(messageElements).find(
        (el) =>
          el.textContent &&
          el.textContent.includes(searchResults[index].message)
      );
      if (messageElement) {
        messageElement.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const handleNextSearchResult = () => {
    if (searchResults.length > 0) {
      const nextIndex = (currentSearchIndex + 1) % searchResults.length;
      setCurrentSearchIndex(nextIndex);
      scrollToSearchResult(nextIndex);
    }
  };

  const handleSearchApiTrigger = async () => {
    if (roomKey && searchTerm) {
      try {
        const response = await axios.post(
          "http://localhost:4200/api/v1/rooms/search",
          {
            roomId: roomKey,
            searchTerm: searchTerm,
          }
        );
        setSearchResults(response.data);
        setCurrentSearchIndex(0);
      } catch (error: any) {
        if (error.response) {
          showMessage(
            "Something went wrong. Please try again later",
            "warning"
          );
        }
      }
    }
    };
    
  return {
    searchMode,
    searchTerm,
    searchResults,
    currentSearchIndex,
    handleSearchToggle,
    handleSearchInputChange,
    handleSearchApiTrigger,
    handleNextSearchResult,
    messageContainerRef,
  };
};

export default useChatSearch;
