import { MoonIcon, SunIcon } from "lucide-react";
import { useState } from "react";
import UserPhoto from "../../assets/test.png";

export default function TopBar() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <>
      <nav className="flex justify-between p-5">
        <div>
          <p className="font-semibold">Good morning, Shreyan Parajuli</p>
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
