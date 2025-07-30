import {useNavigate} from 'react-router-dom'
import { ACCESS_TOKEN } from '../../constants';
import { Menu } from 'lucide-react';
import DropdownMenu from '../modals/Dropdown';
export default function NavBar() {
  let navigate = useNavigate() 
  const loggedIn = localStorage.getItem(ACCESS_TOKEN)
  return (
    <nav className="flex justify-between items-center font-sans text-white ">
      <div className="font-bold text-4xl font-logo">SIKHAI</div>
              <DropdownMenu trigger={
                <div className='max-lg:block hidden'><Menu /></div>
              }>
               {
            loggedIn ? <><button className=" text-white w-full" onClick={() => navigate('/dashboard')}>
            Dashboard
          </button></> : <div className='flex flex-col gap-3 items-start'><button className="  text-white" onClick={() => navigate('/login')}>
            Sign In
          </button>
          <button className="  text-white" onClick={() => navigate('/register')}>
            Register
          </button></div>
          }
            </DropdownMenu>
      <div className="flex space-x-24 items-center max-lg:hidden">
        <ul className="flex list-none space-x-8 text-sm font-semibold max-lg:hidden">
          <a href='#home'><li>Home</li></a>
          <li>About Us</li>
          <li>Courses</li>
          <a href='#our-sessions'><li>Our Sessions</li></a>
          <a href='#contact'><li>Contact Us</li></a>
        </ul>
        <div className="flex gap-1.5 text-sm max-lg:hidden">
          {
            loggedIn ? <><button className="py-2 px-8.5 bg-accent  text-black" onClick={() => navigate('/dashboard')}>
            Dashboard
          </button></> : <><button className="py-2 px-8.5 bg-accent  text-black" onClick={() => navigate('/login')}>
            Sign In
          </button>
          <button className="py-2 px-7.5 bg-accent text-black" onClick={() => navigate('/register')}>
            Register
          </button></>
          }
        </div>
      </div>
    </nav>
  );
}
