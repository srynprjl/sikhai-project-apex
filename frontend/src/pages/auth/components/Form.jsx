import { Link } from "react-router";
function Form(props) {
  return (
    <>
      <form
        className={"min-w-4/5 max-w-4/5 flex flex-col font-sans " + props.className}
        onSubmit={props.onSubmit}
      >
        {props.children}
      </form>
    </>
  );
}

function FormLabel(props) {
  return (
    <>
      {props.icon ? props.icon : null}
      <label htmlFor={props.id} className={props.className +  " text-white "}>
        {props.children}
      </label>
    </>
  );
}

function Input(props) {
  return (
    <>
      <div className={"flex-col flex gap-0.5 " + props.className}>
        {props.children}
        <input
          type={props.type}
          placeholder={props.text}
          className={"bg-dark-input p-2.5 text-sm text-white w-full outline-0 border-0 "}
          id={props.id}
          name={props.id}
          onChange={props.onChange}
          value={props.value}
          disabled={props.disabled}
        />
      </div>
    </>
  );
}

function Checkbox(props) {
  return (
    <>
      <div className="flex gap-0.5 items-center">
        <input
          type="checkbox"
          className={"bg-light-base text-sm " + props.className}
          id={props.id + "_checkbox"}
          defaultChecked={props.isChecked ? "true" : false}
        />
        {props.children}
      </div>
    </>
  );
}

function Button(props) {
  return (
    <>
      <div id={props.id + "-button"} className={props.divClass}>
        <button
          className={
            "p-3 bg-accent w-full text-white font-semibold " +
            props.className
          }
          onClick={props.onClick}
        >
          {props.name}
        </button>
      </div>
    </>
  );
}

function FormLink(props) {
  return (
    <>
      <Link to={props.link}>
        <span className="text-gray-400 text-sm  hover:cursor-pointer">
          {props.children}
        </span>
      </Link>
    </>
  );
}

function FormError(props) {
  return (
    <>
      <label
        htmlFor={props.id}
        className={props.className + " font-semibold text-error"}
      >
        {props.children}
      </label>
    </>
  );
}

function FormControl(props) {
  return (
    <div className={"flex flex-col " + props.className}>{props.children}</div>
  );
}

function FormGroup(props) {
  return (
    <>
      <div className={"flex justify-between " + props.className}>
        {props.children}
      </div>
    </>
  );
}

export {
  Form,
  Button,
  Input,
  FormLink,
  FormGroup,
  FormLabel,
  FormError,
  FormControl,
  Checkbox,
};
