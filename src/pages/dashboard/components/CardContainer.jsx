import React from "react";
import "../styles/cardStyle.scss";

export default function CardContainer({ title, icon, children,style={} ,iconColor}) {
  return (
    <div className="card-container" style={style}>
      <div
        className="card-container__top-icon-continer"
        style={{background:iconColor}}
      >
        {icon}
      </div>
      <p className="card-container__title">{title}</p>

      <div className="card-container__content">
        <div>{children}</div>
      </div>
    </div>
  );
}
