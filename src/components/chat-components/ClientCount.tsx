import React from "react";
import ClientCountProps from "../../interface/ClientCountProps";

const ClientCount: React.FC<ClientCountProps> = ({ total }) => {
  return <h4 className="clients-total">Active clients: {total}</h4>;
};

export default ClientCount;
