import Error from "../../components/layouts/Error";

import ErrorImg from "../../assets/403.png"

export default function NotAuthorized(){
    return <Error img={ErrorImg} imgAlt={"Error 403 - Forbidden"} errorCode={403} errorText={"You are forbidden to access this resources"} />
}
