import {
  Form,
  Button,
  Input,
  FormGroup,
  FormLabel,
  FormError,
  FormControl,
  Select,
  Option,
} from "../../pages/auth/components/Form";

import { useState, useEffect } from "react";
import api from "../../api";
import { useNavigate } from "react-router-dom";

export default function CreateUpdateUserForm(props) {
  const navigate = useNavigate();
  const [username, setUsername] = useState(null);
  const [email, setEmail] = useState(null);
  const [first_name, setFname] = useState(null);
  const [last_name, setLname] = useState(null);
  const [password, setPassword] = useState(null);
  const [isTutor, setIsTutor] = useState(null);
  const [isAdmin, setIsAdmin] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [editProfile, setEditProfile] = useState(
    props.mode === "create" ? true : false,
  );

  useEffect(() => {
    try {
      async function fetchData() {
        const { data } = await api.get(props.apiUrl);
        console.log(data);
        setUsername(data.username);
        setFname(data.first_name);
        setLname(data.last_name);
        setEmail(data.email);
        setIsTutor(data.is_tutor);
        setIsAdmin(data.is_superuser);
      }

      fetchData();
    } catch (e) {
      console.log("No update " + e);
    }
  }, []);

  function edit(e) {
    e.preventDefault();
    setEditProfile((prev) => !prev);
  }

  async function delUser() {
    await api.delete(props.apiUrl);
    navigate("/logout");
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setConfirmPassword("");
      let updatedData = {
        email: email,
        username: username,
        first_name: first_name,
        last_name: last_name,
        is_tutor: false,
      };

      if (password) {
        updatedData = { ...updatedData, password: password };
      }

      console.log(updatedData);

      const response =
        props.mode === "create"
          ? await api.post(props.apiUrl, updatedData)
          : await api.patch(props.apiUrl, updatedData);

      navigate("/admin/users");
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <>
      <div className="flex justify-between items-center px-24 py-4">
        <h1 className="text-3xl font-black">
          {props.mode == "update"
            ? `User Profile of ${username}`
            : "Create User"}
        </h1>
        {props.mode === "update" ? (
          <div className="flex gap-2">
            <Button
              name="Delete"
              id="delete"
              onClick={delUser}
              className="bg-red-400"
            />
            <Button
              name={edit ? "Edit Profile" : "Cancel"}
              id="edit"
              onClick={edit}
            />
          </div>
        ) : null}
        {editProfile ? (
          <Button
            name={props.mode === "create" ? "Create" : "Update"}
            id="update"
            onClick={handleSubmit}
          />
        ) : null}
      </div>
      <div className="flex w-full">
        <div className="w-full">
          <Form className="gap-10 px-24 py-0 max-w-full">
            <div className="flex justify-between"></div>
            <FormControl className="gap-3">
              <FormGroup className="gap-3 justify-start ">
                <Input
                  className="w-full"
                  type="text"
                  id="fname"
                  text="Enter your first name"
                  onChange={(e) => setFname(e.target.value)}
                  value={first_name}
                  disabled={!editProfile}
                >
                  <FormLabel className="font-semibold">First Name</FormLabel>
                </Input>

                <Input
                  className="w-full"
                  type="text"
                  id="lname"
                  text="Enter your last name"
                  onChange={(e) => setLname(e.target.value)}
                  value={last_name}
                  disabled={!editProfile}
                >
                  <FormLabel className="font-semibold">Last Name</FormLabel>
                </Input>
              </FormGroup>

              <Input
                type="text"
                id="username"
                text="Enter your username"
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                disabled={!editProfile}
              >
              <FormLabel className="font-semibold">Username</FormLabel>
                
              </Input>
              <Input
                type="email"
                id="email"
                text="Enter your email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                disabled={!editProfile}
              >

                  <FormLabel className="font-semibold">Email</FormLabel>
              </Input>

              <FormGroup className="gap-2">
                <Input
                  type="password"
                  id="password"
                  text="Enter your password"
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={!editProfile}
                  className={"w-full"}
                >
                  <FormLabel className="font-semibold">Password</FormLabel>
                </Input>

                {editProfile ? (
                  <>
                    <Input
                      type="password"
                      id="confirm_password"
                      text="Enter your password again"
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className={"w-full"}
                    >
                        <FormLabel className="font-semibold">
                          Confirm Password
                        </FormLabel>
                    </Input>
                  </>
                ) : null}
              </FormGroup>
              <FormLabel className="font-semibold">Roles</FormLabel>
              <Select
                disabled={!editProfile}
                defaultValue={isAdmin ? "admin" : isTutor ? "tutor" : "user"}
              >
                <Option name="User" value="user" />
                <Option name="Tutor" value="tutor" />
                <Option name="Admin" value="admin" />
              </Select>
            </FormControl>
          </Form>
        </div>
      </div>
    </>
  );
}
