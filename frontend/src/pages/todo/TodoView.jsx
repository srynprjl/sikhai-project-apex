import { useState, useEffect  } from "react";
import TodoContainer from "./components/TodoContainer";
import { useNavigate} from "react-router";
import Tasks from "./components/Tasks";
import DashboardView from "../../components/layouts/DashboardView";
import TodoCreate from "./TodoCreate";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import api from "../../api";

export default function TodoView() {
  const [count, setCount] = useState(0);
  const [todos, setTodos] = useState([]);
  const [todoModal, setTodoModal] = useState(false)
  const [taskModal, setTaskModal] = useState(false)
  const [tasks, setTasks] = useState({});
  const [search, setSearch] = useState("");
  const [taskId, setTasksId] = useState(null)
  
  const navigate = useNavigate();

    useEffect(() => {
    async function fetchData() {
      try {
        const { data: todoData } = await api.get("/api/todos/");
        setTodos(todoData);
        setCount(todoData.length);

        const { data: taskData } = await api.get("/api/tasks/");
        const tasksByTodo = taskData.reduce((acc, task) => {
          acc[task.todo] = acc[task.todo] || [];
          acc[task.todo].push(task);
          return acc;
        }, {});
        setTasks(tasksByTodo);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    }

    fetchData();
  }, []);

  async function handleDelete(id, type) {
    try {
      if (type == "todo") {
        await api.delete(`/api/todos/${id}/`);
        setTodos(todos.filter((todo) => todo.id !== id));
        setTasks((prev) => {
          const newTasks = { ...prev };
          delete newTasks[id];
          return newTasks;
        });
        setCount(todos.length - 1);
      } else if (type == "task") {
        const todoId = Object.keys(tasks).find((key) =>
          tasks[key].some((task) => task.id === id)
        );
        if (todoId) {
          await api.delete(`/api/tasks/${id}/`);
          setTasks((prev) => ({
            ...prev,
            [todoId]: prev[todoId].filter((task) => task.id !== id),
          }));
        } else {
          console.error("Task not found in any Todo");
        }
      }
    } catch (err) {
      console.error(`Error deleting ${type}:`, err);
    }
  }

  function handleCreateTask(id){
    setTasksId(id)
    setTaskModal(true);
  }

  function navigatePage(id, type) {
    return navigate(`/${type}/update/${id}/`);
  }

    const todosList = todos.map((data) => {
    if (data.title.toLowerCase().includes(search.toLowerCase())) {
      return (
        <TodoContainer
          key={data.id}
          name={data.title}
          todoId={data.id}
          deleteFunction={() => handleDelete(data.id, "todo")}
          updateFunction={() => navigatePage(data.id, "todos")}
          createTask={() => handleCreateTask(data.id)}
        >
          {(tasks[data.id] || []).map((task) => (
            <Tasks
              key={task.id}
              id={task.id}
              name={task.title}
              description={task.description}
              completed={task.completed}
              handleUpdate={() => navigatePage(task.id, "tasks")}
              handleDelete={() => handleDelete(task.id, "task")}
            />
          ))}
        </TodoContainer>
      );
    } else {
      null;
    }
  });
  
  return (
    <DashboardLayout>
      <DashboardView
    searchVisible
    titleVisible
      firstContainer
      btnName="Todo"
      btnFnc={() => setTodoModal(true)}
      btnVisible
      title="Your Todos"
      count={count}
    >
      {todosList}
    </DashboardView>

    <TodoCreate modalOpen={todoModal} mode="todo" type={"create"} modalClose={() => setTodoModal(false)}></TodoCreate>
    <TodoCreate modalOpen={taskModal} mode="task" type={"create"} modalClose={() => setTaskModal(false)} taskId={taskId}></TodoCreate>
    </DashboardLayout>
  );
}
