import { useState } from "react";
import TodoContainer from "./components/TodoContainer";

import Tasks from "./components/Tasks";
import DashboardView from "../../components/DashboardView";

export default function TodoView() {
  const [count, setCount] = useState(0);
  const [todos, setTodos] = useState([]);

  return (
    <DashboardView
      btnName="Todo"
      btnSrc="/todos/create"
      btnVisible
      title="Your Todos"
      count={count}
    >
      <TodoContainer name="A">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dicta in
        incidunt ex molestiae vitae, vero quod tempore dolor, iste voluptatibus
        nulla dolores sed illo assumenda. Quos id quasi velit facere sequi
        dolores!{" "}
      </TodoContainer>
      <TodoContainer name="B">
        <Tasks
          name="Do Assignments"
          description="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Adipisci, nam?"
          dueDate="now"
        />
        <Tasks
          name="Do Assignments"
          description="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Adipisci, nam?"
          dueDate="now"
        />
        <Tasks
          name="Do Assignments"
          description="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Adipisci, nam?"
          dueDate="now"
        />
      </TodoContainer>
      <TodoContainer name="C">
        {" "}
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt sit
        labore, cum facere corporis architecto enim voluptatem sequi libero
        ipsa? Enim odio consectetur molestias at alias corporis? Velit quas
        fugiat iure dolorum!
      </TodoContainer>
      <TodoContainer name="D">
        {" "}
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aliquid
        impedit architecto fugiat ea quae exercitationem sequi totam. Quam nam
        aperiam vero tempora blanditiis accusantium magnam molestiae incidunt
        ratione dolorum minima facere, asperiores ex, repudiandae quae. Labore,
        voluptatibus ipsum. Laboriosam, quasi harum. Iste quod nostrum laborum
        quis nemo! Cumque itaque architecto, animi voluptatibus adipisci quod
        eveniet eos autem porro impedit minima voluptate aspernatur, nemo,
        accusamus fuga corporis perferendis in reprehenderit ullam doloribus
        qui. Ea similique error culpa quas soluta dicta ipsa perspiciatis, nulla
        facilis fuga. Ratione cum sequi a velit eaque aut, eligendi beatae
        voluptas. Quo neque optio ut illo veritatis?{" "}
      </TodoContainer>
      <TodoContainer name="E">
        {" "}
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. In delectus
        corporis minus voluptatibus ratione dolores possimus non ipsam hic a,
        adipisci mollitia beatae odit molestiae, at numquam ullam totam, ea quae
        corrupti.{" "}
      </TodoContainer>
    </DashboardView>
  );
}
