import { useEffect } from "react";

export const TodayTime = () => {
    const currentTime = () => {
        const now = new Date();
        const day = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
        const date = now.getDate();
        const month = now.getMonth();
        const year = now.getFullYear();
        const hours = now.getHours();
        const minutes = now.getMinutes();
        const hours12 = hours % 12 || 12;
        const AmOrPm = hours >= 12 ? "PM" : "AM";
        const greeting =
          hours < 12
            ? "Good Morning!"
            : hours < 18
            ? "Good Afternoon!"
            : hours < 21
            ? "Good Evening!"
            : "Good Night!";
        document.getElementById("currentTime").innerText = `${hours12}:${minutes
          .toString()
          .padStart(2, "0")} ${AmOrPm}`;
        document.getElementById("currentDate").innerText = `${date}-${month+1}-${year}`;
        document.getElementById("currentDay").innerText = day[now.getDay()];
        document.getElementById("timeWish").innerText = greeting;
      };
    
      useEffect(() => {
        currentTime(); // Immediate time update
        const internal = setInterval(currentTime, 60000);
        return () => clearInterval(internal);
      }, []);
  return (
    <div className="head-timeContainder">
        <div className="Day-Wish">
            <p id="currentDay"></p>
            <p id="timeWish"></p>
        </div>

        <div className="Time-Date">
            <p id="currentTime"></p>
            <p id="currentDate"></p>
        </div>
        
    </div>
  )
}
