function Card(props) {
    return (
        <>
            <div className={"bg-light-secondary w-4/6 h-12/13 rounded-2xl flex flex-col justify-center items-center " + props.className} id={props.id + "-container"}>
                {props.children}
            </div>
        </>
    )
}

function CardHeader(props) {
    return (
        <>
            <div id={props.id + "-header"} className={"flex flex-col gap-2 " + props.className}>
                {props.children}
            </div>
        </>
    )
}

function CardTitle(props) {
    return (
        <>
            <div id={props.id + "-title"} className={"font-black font-logo text-4xl  text-white  text-center " + props.className}>{props.children}</div>
        </>
    )
}

function CardSubtitle(props) {
    return (
        <><div id={props.id + "-subtitle"} className={"text-sm text-white" + props.className}>{props.children}</div></>
    )
}

export { Card, CardHeader, CardSubtitle, CardTitle };
