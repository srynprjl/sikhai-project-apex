import {useNavigate} from 'react-router-dom'
import { ACCESS_TOKEN } from '../../constants';
export default function NavBar() {
  let navigate = useNavigate() 

  const loggedIn = localStorage.getItem(ACCESS_TOKEN)

  return (
    <nav className="flex justify-between items-center font-sans">
      <div className="font-bold text-4xl">SIKHAI</div>
      <div className="flex space-x-24 items-center">
        <ul className="flex list-none space-x-8 text-sm font-semibold">
          <a href='#home'><li>Home</li></a>
          <li>About Us</li>
          <li>Courses</li>
          <a href='#our-sessions'><li>Our Sessions</li></a>
          <a href='#contact'><li>Contact Us</li></a>
        </ul>
        <div className="flex gap-1.5 font-bold">
          {
            loggedIn ? <><button className="py-2 px-8.5 bg-btn rounded-full text-white" onClick={() => navigate('/dashboard')}>
            Dashboard
          </button></> : <><button className="py-2 px-8.5 bg-btn rounded-full text-white" onClick={() => navigate('/login')}>
            Sign In
          </button>
          <button className="py-2 px-7.5 bg-btn rounded-full text-white " onClick={() => navigate('/register')}>
            Register
          </button></>
          }
        </div>
      </div>
    </nav>
  );
}
