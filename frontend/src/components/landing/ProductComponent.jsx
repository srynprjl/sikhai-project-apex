export default function ProductComponent(props){
return(
<div className="flex items-center gap-4 max-lg:flex-col ">
    <div className="bg-productivity-bg p-4 rounded-xl">
        <img src={props.img} alt="" className="w-24"/>
    </div>
    <div className="flex flex-col gap-1">
        <div className="font-bold text-xl">{props.title}</div>
        <div className="text-xs text-justify">{props.children}</div>
    </div>
    <hr className="max-lg:border-2 border-white w-full max-lg:block hidden "/>
</div>
)
}
