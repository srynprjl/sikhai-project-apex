import { Card, CardHeader, CardSubtitle, CardTitle } from "./components/Card";
import {
  Form,
  Button,
  Input,
  FormLink,
  FormGroup,
  FormLabel,
  FormError,
  FormControl,
} from "./components/Form";
import Container from "./components/Container";
import RegisterArt from "../../assets/register-art.svg";
import { useState } from "react";
import api from "../../api";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN } from "../../constants";

export default function Register() {
  const navigate = useNavigate();

  if (localStorage.getItem(ACCESS_TOKEN)) {
    navigate("/dashboard");
  }

  document.title = "Register - Sikhai";
  const [usernameError, setUserNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [first_name, setFname] = useState("");
  const [last_name, setLname] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [page, setPage] = useState(0)

  async function handleSubmit(e) {
    e.preventDefault();

    if (username == "") {
      setUserNameError("Enter a username");
    } else {
      setUserNameError("");
    }

    if (email == "") {
      setEmailError("Enter an email");
    } else {
      setEmailError("");
    }

    if (password == "") {
      setEmailError("Enter an password");
    } else {
      setEmailError("");
    }

    if (password.length < 4) {
      setEmailError("Password must be greater than 8");
    } else {
      setEmailError("");
    }

    if (password != confirmPassword) {
      setConfirmPasswordError("Password doesnt match");
    } else {
      setConfirmPasswordError("");
    }

    try {
      const res = await api.post("/api/user/register/", {
        username,
        email,
        first_name,
        last_name,
        password,
        is_tutor: false,
      });
      console.log(res.data);
      navigate("/login");
    } catch (e) {
      console.log(e);
      setUserNameError("User already exists");
    }
  }

  return (
    <div className="flex">
      <Container id="login-left" className="bg-dark-tertiary">
          <Form className="gap-10" onSubmit={page == 2 ? handleSubmit : ""}>
            <CardHeader id="login-title">
              <CardTitle id="login">SIKHAI</CardTitle>
            </CardHeader>

            <FormControl className="gap-16">

              <FormControl className={page==0 ? "gap-8" : "hidden"}>
                <Input
                  type="text"
                  id="fname"
                  text="Enter your first name"
                  onChange={(e) => setFname(e.target.value)}
                >
                  <FormLabel className="font-semibold">First Name</FormLabel>
                </Input>

                <Input
                  type="text"
                  id="lname"
                  text="Enter your last name"
                  onChange={(e) => setLname(e.target.value)}
                >
                  <FormLabel className="font-semibold">Last Name</FormLabel>
                </Input>
              </FormControl>

              <FormControl className={page==1 ? "gap-8" : "hidden"}>
                <Input
                type="text"
                id="username"
                text="Enter your username"
                onChange={(e) => setUsername(e.target.value)}
              >
                  <FormLabel className="font-semibold">Username</FormLabel>
              </Input>
              <Input
                type="email"
                id="email"
                text="Enter your email"
                onChange={(e) => setEmail(e.target.value)}
              >
                  <FormLabel className="font-semibold">Email</FormLabel>
                
              </Input>
              </FormControl>

              <FormControl className={page==2 ? "gap-8" : "hidden"}>
                <Input
                type="password"
                id="password"
                text="Enter your password"
                onChange={(e) => setPassword(e.target.value)}
              >
                <FormLabel className="font-semibold">Password</FormLabel>
              </Input>

              <Input
                type="password"
                id="confirm_password"
                text="Enter your password again"
                onChange={(e) => setConfirmPassword(e.target.value)}
              >

                  <FormLabel className="font-semibold">
                    Confirm Password
                  </FormLabel>
              </Input>
              </FormControl>

              <FormGroup className="gap-3">
                {page != 0 ? 
              <Button name="Previous" id="prev" onClick={(e) => {
                  e.preventDefault()
                  setPage(prev => prev-1)
              }} divClass="w-full"/>: null}  

              <Button name={page != 2 ? "Next" :"Register"} id="register" onClick={(e) => {
                if(page != 2){
                  e.preventDefault()
                  setPage(prev => prev+1)
                }
              }} divClass="w-full"/>
              </FormGroup>
             
            </FormControl>
             <FormLink link="/login">Already have an account?</FormLink>
          </Form>
      </Container>
            <Container
        id="login-right"
        className="bg-dark-primary flex-col justify-between items-center"
      >
        <div className="text-4xl font-black font-logo text-white">SIKHAI</div>
          <img src={RegisterArt} alt="" className="w-4/5" />
        <div className="font-semibold text-white font-sans">
          &copy; sysnefo {new Date().getFullYear()}
        </div>
      </Container>
    </div>
  );
}
