import NavBar from "./components/NavBar";
import HomeSVG from "../assets/home.svg";
import ProductComponent from "./components/ProductComponent";
import ProductivitySVG from "../assets/productivity.svg";
import { useNavigate } from "react-router-dom";
import SessionBox from "./components/SessionBox";
import Test from "../assets/test.png";
import PremiumExperience from "../assets/premium-experience.svg"

export default function LandingPage() {
    let navigate = useNavigate()
    return (
        <>
            <div className="landingpage-container flex flex-col gap-24">
                <NavBar />

                <section id="home" className="flex justify-center items-center ">
                    <div id="home-text" className="flex-col flex gap-5 w-2/3">
                        <div className="font-bold text-5xl">
                            The best choice for productivity
                        </div>
                        <div className="text-sm text-gray-600 ">
                            SIKHAI is a comprehensive EdTech platform designed for Nepali
                            students, offering integrated features like notes, exams, and
                            tutoring
                        </div>
                        <div>
                            <button className="py-2 px-7.5 bg-btn rounded-full text-white" onClick={() => navigate('/register')}>
                                Get Started
                            </button>
                        </div>
                    </div>

                    <div id="home-img" className="w-2/3">
                        <img src={HomeSVG} alt="" />
                    </div>
                </section>

                <div className="flex items-center justify-center">
                    <div className="bg-btn rounded-2xl py-6 px-12  h-48 items-center flex justify-between gap-4">
                        <ProductComponent img={ProductivitySVG} title="Manage for Productivity">
                            Organize tasks, notes, and schedules to boost study effectiveness and achieve your academic goals.
                        </ProductComponent>
                        <ProductComponent img={ProductivitySVG} title="Prepare for Examinations">
                            Access practice tests, mock exams, and structured study materials to ace your competitive and academic assessments.
                        </ProductComponent>
                        <ProductComponent img={ProductivitySVG} title="Learn from professionals" >
                            Connect with experienced tutors and subject matter experts for personalized guidance and in-depth learning sessions.
                        </ProductComponent>
                    </div>
                </div>


                <hr className="my-12" />

                <section id="our-services">
                    <h1 className="font-black text-center text-4xl mb-8">Our Services</h1>
                    <div className="grid grid-cols-3 gap-16">
                        <SessionBox img={Test} tutor="Prajina Bhattarai" rating={5} subject="Object Oriented with Java" />
                        <SessionBox img={Test} tutor="Jiban Khatri" rating={4} subject="Database Management System" />
                        <SessionBox img={Test} tutor="Aabash Sharma" rating={3} subject="Introduction to Programming with Python" />
                    </div>
                </section>

                <hr className="my-12" />

                <section id="premium-learning-experience" className="flex justify-between">
                    <div>
                        <img src={PremiumExperience} alt="" className="w-64 h-auto relative bottom-24" />
                    </div>
                    <div className="flex flex-col gap-6">
                        <h1 className="font-black text-5xl w-10/12">Premium <span className="text-orange-400">Learning</span> Experience</h1>
                        <div className="flex gap-5 items-center">
                            <img src={ProductivitySVG} alt="" className="w-14 p-2 bg-btn rounded-xl" />
                            <div>
                                <div className="font-medium text-xl">Fun learning experience</div>
                                <div className="text-gray-600 text-sm">Benefit from the professional support for effective and enjoyable learning.</div>
                            </div>
                        </div>
                        <div className="flex gap-5 items-center">
                            <img src={ProductivitySVG} alt=""  className="w-14 p-2 bg-btn rounded-xl"  />
                            <div>
                                <div className="font-medium text-xl">Easily Accessible</div>
                                <div className="text-gray-600 text-sm">Access quality education from any device, anytime, anywhere in Nepal.</div>
                            </div>
                        </div>
                    </div>
                </section>


                <hr className="my-12" />

            </div>
        </>
    );
}
