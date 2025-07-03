import { Card, CardHeader, CardSubtitle, CardTitle } from './components/Card'
import { Form, Button, Input, FormLink, FormGroup, FormLabel, FormError, FormControl, Checkbox } from './components/Form'
import Container from './components/Container'
import LoginArt from '../../assets/login-art.svg';
import { useState } from 'react';

export default function Login() {
    document.title = "Login - Sikhai"
    const [user, setUser] = useState(
        {
            username: "",
            password: "",
            rememberMe: ""
        }
    )
    const [ usernameError, setUsernameError ] = useState("");
    const [ passwordError, setPasswordError ] = useState("");

    const testData = {
        email: "dummy@sikhai.com",
        password: "1234"
    }

    function handleChange(event){
        const {name, value} = event.target;
        setUser((prev) => ({
            ...prev, 
            [name]: value
        }))
    }


    function formSubmit(event){
        event.preventDefault();

        if(user.username == ""){
            setUsernameError("Enter your username")
        } else if(user.username != testData.email){
            setUsernameError("Incorrect username")
        } else {
            setUsernameError("")
        }

        if(user.password == ""){
            setPasswordError("Enter your password")
        } else if(user.password != testData.password){
            setPasswordError("Incorrect password")
        } else {
            setPasswordError("")
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

                            <Input type="text" id="username" text="Enter your Username" onChange={handleChange}>
                                {usernameError == "" ? <FormLabel className="font-semibold">Username / Email</FormLabel> : <FormError>{usernameError}</FormError>}
                            </Input>

                            <Input type="password" id="password" text="Enter your password" onChange={handleChange}>
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

