import { MoonIcon, SunIcon } from "lucide-react";
import { useEffect, useState } from "react";
import UserPhoto from "../assets/test.png";
import api from "../api";

export default function TopBar() {
  const [darkMode, setDarkMode] = useState(false);
  const [username, setUserName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  async function fetchInfo() {
    try {
      const { data } = await api.get("/api/user/");
      if (data) {
        setUserName(data.username);
        setFirstName(data.firstName);
        setLastName(data.lastName);
      }
    } catch (e) {
      setUserName("undefined");
    }
  }

  useEffect(() => {
    fetchInfo();
  }, []);

  function GetCurrentDate() {
    var date = new Date();
    var time;

    if (date.getHours() >= 5 && date.getHours() < 12) {
      time = "morning";
    } else if (date.getHours() >= 12 && date.getHours() < 17) {
      time = "afternoon";
    } else if (date.getHours() >= 17 && date.getHours() < 21) {
      time = "evening";
    } else {
      time = "night";
    }

    return <span>{time}</span>;
  }

  return (
    <>
      <nav className="flex justify-between p-5">
        <div>
          <p className="font-semibold">
            Good {<GetCurrentDate />},{" "}
            {firstName != undefined || lastName != undefined
              ? firstName + " " + lastName
              : username}
          </p>
        </div>
        <div className="flex gap-5">
          <button onClick={() => setDarkMode((prev) => !prev)}>
            {darkMode ? <SunIcon /> : <MoonIcon />}
          </button>
          <button>
            <img src={UserPhoto} alt="" className="w-8 h-8 rounded-full" />
          </button>
        </div>
      </nav>
    </>
  );
}
