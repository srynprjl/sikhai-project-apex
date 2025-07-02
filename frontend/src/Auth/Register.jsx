import { Card, CardHeader, CardSubtitle, CardTitle } from './components/Card'
import { Form, Button, Input, FormLink, FormGroup, FormLabel, FormError, FormControl} from './components/Form'
import Container from './components/Container'
import RegisterArt from './assets/register-art.svg';
import { useState } from 'react';

export default function Register() {
    document.title = "Register - Sikhai"
    const [usernameError, setUserNameError] = useState("")
    const [emailError, setEmailError] = useState("")
    const [confirmPasswordError, setConfirmPasswordError] = useState("")

    const testData = {
        username: "sikhai",
        email: "dummy@sikhai.com",
        password: "password"
    }

    const [user, setUser] = useState(
        {
            fname: "",
            lname: "",
            username: "",
            email: "",
            password: "",
            confirm_password: "",
        }
    )

    function handleChange(event){
        const {name, value} = event.target;
        setUser((prev) => ({
            ...prev, 
            [name]: value
        }))
    }

    function handleSubmit(e){
        e.preventDefault();

        console.log(user)

        if(user.username == testData.username){
            setUserNameError("Username is already taken")
        } else {
            setUserNameError("")
        }

        if(user.email == testData.email){
            setEmailError("Email is already used")
        } else {
            setEmailError("")
        }
 
        if(user.password != user.confirm_password){
            setConfirmPasswordError("Password doesnt match")
        } else {
            setConfirmPasswordError("")
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
                                <Input type="text" id="fname" text="Enter your first name" onChange={handleChange}>
                                    <FormLabel className="font-semibold">First Name</FormLabel>
                                </Input>

                                <Input type="text" id="lname" text="Enter your last name"  onChange={handleChange}>
                                    <FormLabel className="font-semibold">Last Name</FormLabel>
                                </Input>
                            </FormGroup>

                            <Input type="text" id="username" text="Enter your username"  onChange={handleChange}>
                                {usernameError == "" ? <FormLabel className="font-semibold">Username</FormLabel> : (<FormError>{usernameError}</FormError>)}
                            </Input>
                            <Input type="email" id="email" text="Enter your email"  onChange={handleChange}>
                                {emailError == "" ? <FormLabel className="font-semibold">Email</FormLabel> : <FormError>{emailError}</FormError>}
                            </Input>

                            <Input type="password" id="password" text="Enter your password"  onChange={handleChange} >
                                <FormLabel className="font-semibold">Password</FormLabel>
                            </Input>

                            <Input type="password" id="confirm_password" text="Enter your password again"  onChange={handleChange}>
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

