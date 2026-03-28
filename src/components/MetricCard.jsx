import React from "react";

function MetricCard({ title, value }) {
  return (
    <div className="card" tabIndex="0">
      <h3>{title}</h3>
      <p>{value}</p>
    </div>
  );
}

export default React.memo(MetricCard);