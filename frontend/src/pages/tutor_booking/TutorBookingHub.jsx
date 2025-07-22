import { useState } from "react";
import SessionBox from "../../components/landing/SessionBox";
import { Plus } from "lucide-react";
import Test from "../../assets/test.png";
import DashboardView from "../../components/layouts/DashboardView";
import DashboardLayout from "../../components/layouts/DashboardLayout";

export default function TutorHub() {
  const [count, setCount] = useState(0);
  const [tutors, setTutors] = useState([]);
  return (
    <DashboardLayout>
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
    </DashboardLayout>
  );
}
