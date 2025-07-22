import Error from "../../components/layouts/Error";

import ErrorImg from "../../assets/403.png"
export default function NotFound(){
    return <Error img={ErrorImg} imgAlt={"Error 404 - Not Found"} errorCode={404} errorText={"The resources you were looking for doesnt exist"} />
}
