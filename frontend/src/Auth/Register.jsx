import data from '../data'
import { Card, CardHeader, CardSubtitle, CardTitle } from './components/Card'
import { Form, Button, Input, FormLink, FormGroup, FormLabel, FormError, FormControl, Checkbox } from './components/Form'
import Container from './components/Container'
import RegisterArt from './assets/register-art.svg';

export default function Register() {
    document.title = "Register - Sikhai"

    return (
        <div className="flex">

            <Container id="login-right" className="bg-light-secondary flex-col justify-between">
                <div className='text-5xl font-black'>{data.companyName.toUpperCase()}</div>
                <div><img src={RegisterArt} alt="" /></div>
                <div className='font-semibold'>&copy; sysnefo {new Date().getFullYear()}</div>
            </Container>


            <Container id="login-left" className="bg-light-base">
                <Card id="login">
                    <Form className="gap-10">
                        <CardHeader id="login-title">
                            <CardTitle id="login">Register to {data.companyName.toUpperCase()}</CardTitle>
                            <CardSubtitle id="login">Already have an account? <FormLink>Login here</FormLink></CardSubtitle>
                        </CardHeader>

                        <FormControl className=" gap-3 ">

                            <FormGroup className="gap-3">
                                <Input type="text" id="fname" text="Enter your first name">
                                    <FormLabel className="font-semibold">First Name</FormLabel>
                                </Input>

                                <Input type="text" id="lname" text="Enter your last name">
                                    <FormLabel className="font-semibold">Last Name</FormLabel>
                                </Input>
                            </FormGroup>

                            <Input type="text" id="username" text="Enter your username">
                                <FormLabel className="font-semibold">Username </FormLabel>
                            </Input>
                            <Input type="email" id="email" text="Enter your email">
                                <FormLabel className="font-semibold">Email</FormLabel>
                            </Input>

                            <Input type="password" id="password" text="Enter your password" >
                                <FormLabel className="font-semibold">Password</FormLabel>
                            </Input>

                            <Input type="password" id="confirm-password" text="Enter your password again" >
                                <FormLabel className="font-semibold">Confirm Password</FormLabel>
                            </Input>

                            <Button name="Register" id="register" />
                        </FormControl>
                    </Form>
                </Card>
            </Container>



        </div>
    )
}

