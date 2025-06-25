export default function NavBar() {
  return (
    <nav className="flex justify-between items-center font-sans">
      <div className="font-bold text-4xl">SIKHAI</div>
      <div className="flex space-x-24 items-center">
        <ul className="flex list-none space-x-8 text-sm font-semibold">
          <li>Home</li>
          <li>About Us</li>
          <li>Courses</li>
          <li>Our Services</li>
          <li>Contact Us</li>
        </ul>
        <div className="flex gap-1.5 font-bold">
          <button className="py-2 px-8.5 bg-btn rounded-full text-white">
            Sign In
          </button>
          <button className="py-2 px-7.5 bg-btn rounded-full text-white">
            Register
          </button>
        </div>
      </div>
    </nav>
  );
}
