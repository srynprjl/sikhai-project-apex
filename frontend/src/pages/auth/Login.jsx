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
            <Container id="login-left" className="bg-dark-tertiary">
                    <Form className="gap-24" onSubmit={formSubmit}>
                        <CardHeader id="login-title">
                            <CardTitle id="login">SIKHAI</CardTitle>
                        </CardHeader>
                        <FormControl className=" gap-7 ">
                            <Input type="text" id="username" text="Enter your Username" onChange={(e) => setUsername(e.target.value)}>
                                <FormLabel className="font-semibold">Username / Email</FormLabel>
                            </Input>
                            <Input type="password" id="password" text="Enter your password" onChange={(e) => setPassword(e.target.value)}>
                                <FormGroup>
                                    <FormLabel className="font-semibold">Password</FormLabel>
                                </FormGroup>
                            </Input>

                            <Button name="Login" id="login" />
                            <FormGroup>
                                <FormLink>Forget your password</FormLink>
                                <FormLink link="/register">Dont have an account?</FormLink>
                            </FormGroup>
                        </FormControl>
                    </Form>
            </Container>


            <Container id="login-right" className="bg-dark-primary flex-col justify-between ">
                <div className='text-5xl text-white font-logo'>SIKHAI</div>
                <div><img src={LoginArt} alt="" /></div>
                <div className='font-semibold text-white'>&copy; sysnefo {new Date().getFullYear()}</div>
            </Container>
        </div>
    )
}

