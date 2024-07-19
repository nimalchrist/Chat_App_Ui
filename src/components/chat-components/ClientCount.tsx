import React from "react";
import ClientCountProps from "../../interface/ClientCountProps";
import useThemeToggle from "../../hooks/useThemeToggle";

const ClientCount: React.FC<ClientCountProps> = ({ total }) => {
  // theme toggler hook to toggle between dark and light theme
  const { theme } = useThemeToggle();
  return (
    <h4 className="clients-total" style={{ color: theme.palette.text.primary }}>
      Active clients: {total}
    </h4>
  );
};

export default ClientCount;
