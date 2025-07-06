import { Card, CardHeader, CardSubtitle, CardTitle } from './components/Card'
import { Form, Button, Input, FormLink, FormGroup, FormLabel, FormError, FormControl} from './components/Form'
import Container from './components/Container'
import RegisterArt from '../../assets/register-art.svg';
import { useState } from 'react';
import api from "../../api";
import { useNavigate } from "react-router-dom";



export default function Register() {
const navigate = useNavigate()

    if(localStorage.getItem(ACCESS_TOKEN)){
        navigate("/dashboard")
    }
    
    document.title = "Register - Sikhai"
    const [usernameError, setUserNameError] = useState("")
    const [emailError, setEmailError] = useState("")
    const [confirmPasswordError, setConfirmPasswordError] = useState("")

    
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [first_name, setFname] = useState("");
  const [last_name, setLname] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("")


    async function handleSubmit(e){
        e.preventDefault();

        if(username == ""){
            setUserNameError("Enter a username")
        } else {
            setUserNameError("")
        }

        if(email == ""){
            setEmailError("Enter an email")
        } else {
            setEmailError("")
        }

        if(password == ""){
            setEmailError("Enter an password")
        } else {
            setEmailError("")
        }

        if(password.length < 4){
            setEmailError("Password must be greater than 8")
        } else {
            setEmailError("")
        }
 
        if(password != confirmPassword){
            setConfirmPasswordError("Password doesnt match")
        } else {
            setConfirmPasswordError("")
        }


        try{
            const res = await api.post("/api/user/register/", {username, email, first_name, last_name, password})
            console.log(res.data)
            navigate("/login")
        }catch(e){
            console.log(e)
            setUserNameError("User already exists")
        } 
    }


    return (
        <div className="flex">

            <Container id="login-right" className="bg-light-secondary flex-col justify-between">
                <div className='text-5xl font-black'>SIKHAI</div>
                <div><img src={RegisterArt} alt="" /></div>
                <div className='font-semibold'>&copy; sysnefo {new Date().getFullYear()}</div>
            </Container>


            <Container id="login-left" className="bg-light-base">
                <Card id="login">
                    <Form className="gap-10" onSubmit={handleSubmit}>
                        <CardHeader id="login-title">
                            <CardTitle id="login">Register to SIKHAI</CardTitle>
                            <CardSubtitle id="login">Already have an account? <FormLink link="/login ">Login here</FormLink></CardSubtitle>
                        </CardHeader>

                        <FormControl className="gap-3" >

                            <FormGroup className="gap-3">
                                <Input type="text" id="fname" text="Enter your first name" onChange={(e) => setFname(e.target.value)}>
                                    <FormLabel className="font-semibold">First Name</FormLabel>
                                </Input>

                                <Input type="text" id="lname" text="Enter your last name"  onChange={(e) => setLname(e.target.value)}>
                                    <FormLabel className="font-semibold">Last Name</FormLabel>
                                </Input>
                            </FormGroup>

                            <Input type="text" id="username" text="Enter your username"  onChange={(e) => setUsername(e.target.value)}>
                                {usernameError == "" ? <FormLabel className="font-semibold">Username</FormLabel> : (<FormError>{usernameError}</FormError>)}
                            </Input>
                            <Input type="email" id="email" text="Enter your email"  onChange={(e) => setEmail(e.target.value)}>
                                {emailError == "" ? <FormLabel className="font-semibold">Email</FormLabel> : <FormError>{emailError}</FormError>}
                            </Input>

                            <Input type="password" id="password" text="Enter your password"  onChange={(e) => setPassword(e.target.value)} >
                                <FormLabel className="font-semibold">Password</FormLabel>
                            </Input>

                            <Input type="password" id="confirm_password" text="Enter your password again"  onChange={(e) => setConfirmPassword(e.target.value)}>
                                {confirmPasswordError == "" ? <FormLabel className="font-semibold">Confirm Password</FormLabel> : <FormError>{confirmPasswordError}</FormError>}
                            </Input>

                            <Button name="Register" id="register"/>
                        </FormControl>
                    </Form>
                </Card>
            </Container>



        </div>
    )
}

