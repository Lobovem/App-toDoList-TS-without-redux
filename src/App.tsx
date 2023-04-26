import { useEffect, useState } from 'react';
import { Form } from './components/Form';
import { Todo } from './components/Todo';
import s from './components/style.module.scss';
import { ITask } from './types';

export const App =()=> {
  // const [tasks, setTasks] = useState<ITask[]>(JSON.parse(localStorage.getItem('tasks')) || []);
  const [tasks, setTasks] = useState<ITask[]> ([]);



  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (userInput:string) => {
    //Если инпут не пустой, создаем новую задачу (на всякий случай чистим пустые пробелы в начале,
    // чтобы небыло просто задачи из пустых пробелов)
    if (userInput.trim()) {
      const newTask = {
        id: Math.random().toString().substring(2, 5), //generation random id number
        task: userInput,
        complete: false,
      };

      setTasks([...tasks, newTask]);
    }
  };

  const deleteTask = (task:ITask) => {
    setTasks(tasks.filter((item) => item.id !== task.id));
  };

  const deleteAllCompleteTask = () => {
    setTasks(tasks.filter((task) => task.complete === false));
  };

  const handleCheck = (id:string) => {
    setTasks([...tasks.map((todo) => (todo.id === id ? { ...todo, complete: !todo.complete } : { ...todo }))]);
  };

  const editTask = (todo:string, myTask:ITask) => {
    let copyTasks = [...tasks];

    for (let i = 0; i < copyTasks.length; i++) {
      if (myTask.id === copyTasks[i].id) {
        copyTasks[i].task = todo;
      }
    }

    setTasks([...copyTasks]);
  };

  return (
    <div className={s.todo}>
      <h1 className={s.todo__title}>{`Count all tasks - ${tasks.length}`}</h1>
      <Form addTask={addTask} deleteAllCompleteTask={deleteAllCompleteTask} />

      {tasks.map((myTask) => {
        return (
          <Todo
            key={myTask.id}
            myTask={myTask}
            handleCheck={handleCheck}
            deleteTask={deleteTask}
            editTask={editTask}
          />
        );
      })}
    </div>
  );
}

