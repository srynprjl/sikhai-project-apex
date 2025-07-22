export default function Error(props){
    const customStyles = {
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
    };

    return <div className="w-screen h-screen bg-dark-primary">
        <div className="absolute top-1/2 left-1/2 right-auto bottom-auto bg-dark-secondary w-1/2 text-white p-16 flex flex-col gap-3 items-center" style={customStyles}>
            <img src={props.img} alt={"props.imgAlt"} className="w-sm"/>
            <h1 className="font-bold text-4xl ">Error {props.errorCode}</h1>
            <h2 className="font-semibold text-xl text-gray-300">{props.errorText}</h2>
        </div>

    </div>
}
