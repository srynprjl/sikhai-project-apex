import { useNavigate } from "react-router";


export default function DashboardBox(props) {
const navigate = useNavigate()
    return (
    <>
      <div className="admin-box-container h-full w-full bg-dark-secondary p-8 flex flex-col items-center justify-center gap-2" onClick={() => navigate(props.link)}>
        <div>
          {props.count >= 0 && <h1 className="font-semibold text-5xl text-center">{props.count}</h1>}
          
        </div>
        <div className="text-2xl text-center">
            {props.children}
            {props.text && <h3 className="font-semibold text-2xl text-center">{props.text}</h3>}
        </div>
        
        </div>
      
    </>
  );
}
