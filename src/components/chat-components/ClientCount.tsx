import React from "react";

interface Props {
  total: number;
}

const ClientCount: React.FC<Props> = ({ total }) => {
  return <h3 className="clients-total">Total Clients: {total}</h3>;
};

export default ClientCount;
