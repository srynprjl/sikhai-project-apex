export default function Container(props){
    return(
        <div className={"w-1/2 h-screen flex items-center justify-center " + props.className}>
            {props.children}
        </div>
    )
}