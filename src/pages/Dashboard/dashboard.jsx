import React, { useState, useEffect } from "react";
import "./dashboard.css";
import NotifIcon from "../../assets/notifIcon";
import SettingIcon from "../../assets/settingIcon";

const CramDashboard = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);



  return (
    <div
      id="dashboard"
      className={isVisible ? "overlay-visible" : "overlay-hidden"}
      style={{
        margin: 0,
        padding: 0,
        width: "100vw",
        height: "100vh",
      }}
    >
      {isVisible ? (
        <div id="overlay-content">
          <h2>cRam</h2>
          <p>Setting up your dashboard</p>
        </div>
      ) : (
        <div id="dashboard-content">

          <div className="panel" id="top">
            <div id="top-header">
              <h2>cRam</h2>
              <div id="accounts">
                <NotifIcon color={'white'}></NotifIcon>
                <SettingIcon color={'white'}></SettingIcon>
                <p>profile</p>
              </div>
            </div>
            <div id="top-main">
              <div id="top-main-left">
                <h1>Hello User!👋</h1>
                <div id="top-date">
                  <div id="date">
                    10
                  </div> 
                  <div id="day-week">
                    
                  </div>               
                </div>
              </div>
              <div id="top-main-right">
                
              </div>
            </div>
          </div>

          <div className="panel" id="main">

          main
      

          </div>





        </div>
      )}
    </div>
  );
};

export default CramDashboard;
