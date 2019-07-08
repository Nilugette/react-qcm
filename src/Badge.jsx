import React from "react";

const Badge = ({ value }) => {
  // Utilise les classes de bootstrap pour afficher un badge
  return <span className="badge badge-primary badge-pill">{value}</span>;
};

export default Badge;
