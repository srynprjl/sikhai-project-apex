import { useState } from "react";
import SessionBox from "../../components/SessionBox";
import { Plus } from "lucide-react";
import Test from "../../assets/test.png"

export default function TutorHub() {
  const [count, setCount] = useState(0);
  return (
    <div className="p-8 flex flex-col gap-3">
      <div className="flex justify-between items-center">
        <div className="flex gap-2">
          <h1 className="font-bold text-2xl">Available Session </h1>
          <h1 className="font-bold text-2xl text-gray-600"> ( {count} )</h1>
        </div>
        <div className="btn flex bg-btn p-2 rounded-2xl text-sm font-bold text-white">
          <Plus /> Create Booking{" "}
        </div>
      </div>
      <div className="grid grid-cols-3 gap-6">
        <SessionBox
          img={Test}
          tutor="Jiban Khatri"
          rating={4}
          subject="Database Management System"
        />
                <SessionBox
          img={Test}
          tutor="Jiban Khatri"
          rating={4}
          subject="Database Management System"
        />
                <SessionBox
          img={Test}
          tutor="Jiban Khatri"
          rating={4}
          subject="Database Management System"
        />
                <SessionBox
          img={Test}
          tutor="Jiban Khatri"
          rating={4}
          subject="Database Management System"
        />
                <SessionBox
          img={Test}
          tutor="Jiban Khatri"
          rating={4}
          subject="Database Management System"
        />
                <SessionBox
          img={Test}
          tutor="Jiban Khatri"
          rating={4}
          subject="Database Management System"
        />
      </div>
    </div>
  );
}
