import NavBar from "../../components/landing/NavBar";
import HomeSVG from "../../assets/home.svg";
import ProductComponent from "../../components/landing/ProductComponent";
import ProductivitySVG from "../../assets/productivity.svg";
import {
  MapPin,
  Mail,
  Phone,
  FacebookIcon,
  Instagram,
  Twitter,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import SessionBox from "../../components/landing/SessionBox";
import Test from "../../assets/test.png";
import PremiumExperience from "../../assets/premium-experience.svg";
import StudentTestimony from "../../components/landing/StudentTestimony";
import { Link } from "react-router-dom";
import { ACCESS_TOKEN } from "../../constants";

export default function LandingPage() {
  let navigate = useNavigate();
  return (
    <>
      <div className="flex flex-col gap-24 p-16">
        <NavBar />
        <section id="home" className="flex justify-center items-center max-lg:justify-start max-lg:items-start">
          <div id="home-text" className="flex-col flex gap-5 w-2/3 max-lg:w-full">
            <div className="font-bold text-white text-5xl max-lg:w-full max-lg:text-4xl">
              The best choice for productivity
            </div>
            <div className="text-sm max-md:text-xs text-gray-300 ">
              SIKHAI is a comprehensive EdTech platform designed for Nepali
              students, offering integrated features like notes, exams, and
              tutoring
            </div>
            <div>
              <button
                className="py-2 px-7.5 bg-accent max-lg:w-full"
                onClick={localStorage.getItem(ACCESS_TOKEN) ? () => navigate("/dashboard") : () => navigate("/register")}
              >
                Get Started
              </button>
            </div>
          </div>

          <div id="home-img" className="w-2/3 max-lg:hidden">
            <img src={HomeSVG} alt="" />
          </div>
        </section>

        <div className="flex items-center justify-center ">
          <div className="bg-accent  py-8 px-12  h-full items-center flex justify-between gap-4 max-lg:flex-col max-lg:gap-10">
            <ProductComponent
              img={ProductivitySVG}
              title="Manage for Productivity"
            >
              Organize tasks, notes, and schedules to boost study effectiveness
              and achieve your academic goals.
            </ProductComponent>
            <ProductComponent
              img={ProductivitySVG}
              title="Prepare for Examinations"
            >
              Access practice tests, mock exams, and structured study materials
              to ace your competitive and academic assessments.
            </ProductComponent>
            <ProductComponent
              img={ProductivitySVG}
              title="Learn from professionals"
            >
              Connect with experienced tutors and subject matter experts for
              personalized guidance and in-depth learning sessions.
            </ProductComponent>
          </div>
        </div>

        <hr className="my-12" />

        <section id="our-sessions">
          <h1 className="font-black text-white text-center text-4xl mb-8">Our Sessions</h1>
          <div className="grid grid-cols-3 gap-16 max-lg:grid-cols-1">
            <SessionBox
              img={Test}
              tutor="Prajina Bhattarai"
              rating={5}
              subject="Object Oriented with Java"
            />
            <SessionBox
              img={Test}
              tutor="Rakshya Dhakal"
              rating={4}
              subject="Database Management System"
            />
            <SessionBox
              img={Test}
              tutor="Sanket Pokharel"
              rating={3}
              subject="Introduction to Programming with Python"
            />
          </div>
        </section>

        <hr className="my-12" />

        <section
          id="premium-learning-experience"
          className="flex justify-between"
        >
          <div>
            <img
              src={PremiumExperience}
              alt=""
              className="w-64 h-auto relative bottom-24"
            />
          </div>
          <div className="flex flex-col text-white  gap-6">
            <h1 className="font-black text-5xl w-10/12">
              Premium <span className="text-accent">Learning</span>{" "}
              Experience
            </h1>
            <div className="flex gap-5 items-center">
              <img
                src={ProductivitySVG}
                alt=""
                className="w-14 p-2 bg-accent"
              />
              <div>
                <div className="font-medium text-xl">
                  Fun learning experience
                </div>
                <div className="text-gray-300 text-sm">
                  Benefit from the professional support for effective and
                  enjoyable learning.
                </div>
              </div>
            </div>
            <div className="flex gap-5 items-center">
              <img
                src={ProductivitySVG}
                alt=""
                className="w-14 p-2 bg-accent "
              />
              <div>
                <div className="font-medium text-xl">Easily Accessible</div>
                <div className="text-gray-300 text-sm">
                  Access quality education from any device, anytime, anywhere in
                  Nepal.
                </div>
              </div>
            </div>
          </div>
        </section>

        <hr className="my-12 border-yellow-50" />

        <section id="testimony ">
          <h1 className="text-4xl font-bold text-center mb-5 text-white">
            What students say?{" "}
          </h1>
          <div className="grid grid-cols-3 gap-5 max-md:grid-cols-1">
            <StudentTestimony name="Aabhash Sharma">
              SIKHAI's notes are a lifesaver! I used to spend hours searching,
              but now everything is organized and easy to understand. My grades
              have definitely improved.
            </StudentTestimony>
            <StudentTestimony name="Dipti Upadhaya">
              "Preparing for my entrance exams felt overwhelming until I found
              SIKHAI. The mock tests were crucial, and booking a tutor was
              incredibly simple and effective."
            </StudentTestimony>
            <StudentTestimony name="Pragati Sonam">
              "This platform is a game-changer! From managing my daily tasks to
              accessing quality teachers, SIKHAI has truly streamlined my entire
              study routine. Highly recommend!"
            </StudentTestimony>
          </div>
        </section>

        <hr className="my-12" />

        <section id="contact" className="text-white">
          <div className="flex gap-8 max-lg:flex-col">
            <div className="w-1/2 max-lg:w-full border-r-2 border-dotted max-lg:border-0 ">
              <h1 className="text-4xl font-black text-center">Contact Us</h1>
              <div className="flex flex-col gap-3 justify-center h-full">
                <div className="flex gap-2">
                  <MapPin /> 1261 Devkota Sadak, Mid-Baneshwor, Kathmandu
                </div>
                <div className="flex gap-2">
                  <Mail /> sikhai@sysnefo.com
                </div>
                <div className="flex gap-2">
                  <Phone /> +977-9849025027
                </div>
                <hr className="w-24" />
                <div className="flex gap-2">
                  <FacebookIcon /> sikhaiapp
                </div>
                <div className="flex gap-2">
                  <Instagram /> sikhaiapp
                </div>
                <div className="flex gap-2">
                  <Twitter /> sikhaiapp
                </div>
              </div>
            </div>
            <hr className="max-lg:block hidden"/>
            <div className="w-1/2 max-lg:w-full ">
              <h1 className="text-4xl font-black mb-5 text-center">
                Send us a Message
              </h1>
              <form action="" className="flex flex-col gap-4">
                <div className="flex-col flex">
                  <label htmlFor="" className="font-semibold">
                    Name
                  </label>
                  <input type="text" name="" id="" className="bg-dark-input p-4 text-black" />
                </div>
                <div className="flex-col flex">
                  <label htmlFor="" className="font-semibold">
                    Email
                  </label>
                  <input type="email" name="" id="" className="bg-dark-input p-4 text-black" />
                </div>

                <div className="flex-col flex">
                  <label htmlFor="" className="font-semibold">
                    Message
                  </label>
                  <textarea
                    name=""
                    rows="8"
                    id=""
                    className="bg-dark-input text-black p-4"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="bg-accent text-black font-medium p-4 "
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </section>
      </div>
      <footer className="bg-accent px-[5rem] py-[2rem] ">
        <div className="flex justify-between">
          <div className="w-64 max-md:w-full">
            SIKHAI is a comprehensive EdTech platform designed for Nepali
            students, offering integrated features like notes, exams, and
            tutoring
          </div>
          <div className="max-md:hidden">
            <h1 className="font-bold">Company</h1>
            <ul>
              <li>About Us</li>
              <li>Career</li>
            </ul>
          </div>
          <div className="max-md:hidden">
            <h1 className="font-bold">Support</h1>
            <ul>
              <li>FAQ</li>
              <li>Help Center</li>

            </ul>
          </div>
          <div className="max-md:hidden">
            <h1  className="font-bold">Legal</h1>
            <ul>
              <li>Terms of Services</li>
              <Link to="/privacy/">Privacy Policy</Link>
            </ul>
          </div>
        </div>

        <div className="text-center py-5">&copy; Sikhai {new Date().getFullYear()}</div>
      </footer>
    </>
  );
}
