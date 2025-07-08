import { Card, CardHeader, CardSubtitle, CardTitle } from './components/Card'
import { Form, Button, Input, FormLink, FormGroup, FormLabel, FormError, FormControl, Checkbox } from './components/Form'
import Container from './components/Container'
import LoginArt from '../../assets/login-art.svg';
import { useState } from 'react';
import api from "../../api";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../../constants";

export default function Login() {
    document.title = "Login - Sikhai"
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [ usernameError, setUsernameError ] = useState("");
    const [ passwordError, setPasswordError ] = useState("");
    const navigate = useNavigate()

    if(localStorage.getItem(ACCESS_TOKEN)){
        navigate("/dashboard")
    }

    async function formSubmit(event){
        event.preventDefault();
        
        if(username == ""){
            setUsernameError("Enter your username")
            return
        } else {
            setUsernameError("")
        }

        if(password == ""){
            setPasswordError("Enter your password")
            return
        } else {
            setPasswordError("")
        }

        try{
            const res = await api.post("/api/token/", { username, password })

            localStorage.setItem(ACCESS_TOKEN, res.data.access);
            localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
            navigate("/dashboard")
        }catch(e){
            console.log(e)
            setUsernameError("Incorrect details")
        } 
    }

    
    return (
        <div className="flex">
            <Container id="login-left" className="bg-light-base">
                <Card id="login">
                    <Form className="gap-16" onSubmit={formSubmit}>
                        <CardHeader id="login-title">
                            <CardTitle id="login">Login to SIKHAI</CardTitle>
                            <CardSubtitle id="login">Don't have an account? <FormLink link="/register">Register here</FormLink></CardSubtitle>
                        </CardHeader>

                        <FormControl className=" gap-7 ">

                            <Input type="text" id="username" text="Enter your Username" onChange={(e) => setUsername(e.target.value)}>
                                {usernameError == "" ? <FormLabel className="font-semibold">Username / Email</FormLabel> : <FormError>{usernameError}</FormError>}
                            </Input>

                            <Input type="password" id="password" text="Enter your password" onChange={(e) => setPassword(e.target.value)}>
                                <FormGroup>
                                    {passwordError == "" ? <FormLabel className="font-semibold">Password</FormLabel> : <FormError>{passwordError}</FormError>}
                                    <FormLink>Forgot your password?</FormLink>
                                </FormGroup>
                            </Input>


                            <Checkbox id="remember_me">
                                <FormLabel className="text-sm font-medium">Remember Me</FormLabel>
                            </Checkbox>

                            <Button name="Login" id="login" />
                        </FormControl>
                    </Form>
                </Card>
            </Container>


            <Container id="login-right" className="bg-light-secondary flex-col justify-between ">
                <div className='text-5xl font-black'>SIKHAI</div>
                <div><img src={LoginArt} alt="" /></div>
                <div className='font-semibold'>&copy; sysnefo {new Date().getFullYear()}</div>
            </Container>
        </div>
    )
}

