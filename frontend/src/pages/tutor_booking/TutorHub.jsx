import { useState } from "react";
import SessionBox from "../../components/SessionBox";
import { Plus } from "lucide-react";
import Test from "../../assets/test.png";
import DashboardView from "../../components/DashboardView";

export default function TutorHub() {
  const [count, setCount] = useState(0);
  const [tutors, setTutors] = useState([]);
  return (
    <DashboardView searchVisible titleVisible  firstContainer btnName="Booking" btnSrc="/tutors/create" btnVisible title="All Bookings" count={count}>
      
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
    </DashboardView>
  );
}
