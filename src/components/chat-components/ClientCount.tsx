import React from "react";
import ClientCountProps from "../../interface/ClientCountProps";

const ClientCount: React.FC<ClientCountProps> = ({ total }) => {
  return <h3 className="clients-total">Total Clients: {total}</h3>;
};

export default ClientCount;
