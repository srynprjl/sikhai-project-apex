import data from '../data'
import { Card, CardHeader, CardSubtitle, CardTitle } from './components/Card'
import { Form, Button, Input, FormLink, FormGroup, FormLabel, FormError, FormControl, Checkbox } from './components/Form'
import Container from './components/Container'
import LoginArt from './assets/login-art.svg';

export default function Login() {
    document.title = "Login - Sikhai"

    

    // UI
    return (
        <div className="flex">
            <Container id="login-left" className="bg-light-base">
                <Card id="login">
                    <Form className="gap-16">
                        <CardHeader id="login-title">
                            <CardTitle id="login">Login to {data.companyName.toUpperCase()}</CardTitle>
                            <CardSubtitle id="login">Don't have an account? <FormLink>Register here</FormLink></CardSubtitle>
                        </CardHeader>

                        <FormControl className=" gap-7 ">

                            <Input type="text" id="username" text="Enter your Username">
                                <FormLabel className="font-semibold">Username / Email</FormLabel>
                            </Input>

                            <Input type="password" id="password" text="Enter your password" >
                                <FormGroup>
                                    <FormLabel className="font-semibold">Password</FormLabel>
                                    <FormLink>Forgot your password?</FormLink>
                                </FormGroup>
                            </Input>


                            <Checkbox id="remember-me">
                                <FormLabel className="text-sm font-medium">Remember Me</FormLabel>
                            </Checkbox>

                            <Button name="Login" id="login" />
                        </FormControl>
                    </Form>
                </Card>
            </Container>


            <Container id="login-right" className="bg-light-secondary flex-col justify-between">
                <div className='text-5xl font-black'>{ data.companyName.toUpperCase() }</div>
                <div><img src={LoginArt} alt="" /></div>
                <div className='font-semibold'>&copy; sysnefo {new Date().getFullYear()}</div>
            </Container>
        </div>
    )
}

