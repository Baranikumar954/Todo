import React from "react";
import { TodayTime } from "./TodayTime";
import { Weather } from "./Weather";
export const Header = () => {
  

  

  return (
    <header className="header-container">
      <TodayTime/>
      <div className="head-titleContainer" style={{alignItems:"center"}}>
        <h2>To Do List</h2>
      </div>
      <Weather/>
    </header>
  );
};
