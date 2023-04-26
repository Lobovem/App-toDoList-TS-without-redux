import { useState } from 'react';
import s from './style.module.scss';
import { ITask } from '../types';

interface ITodoProps {
  myTask: ITask;
  handleCheck: (id: string) => void;
  deleteTask: (task: ITask) => void;
  editTask: (todo: string, myTask: ITask) => void;
}

export const  Todo:React.FC<ITodoProps> =({ myTask, handleCheck, deleteTask, editTask })=> {
  const [todoEdit, setTodoEdit] = useState<string>('');
  const [changeEdit, setChangeEdit] = useState<boolean>(false);

  const changeForEdit = () => {
    setChangeEdit(!changeEdit);
  };

  const handleChangeEdit = (e) => {
    setTodoEdit(e.currentTarget.value);
  };

  const editForm = (task:ITask) => {
    setTodoEdit(task.task);
    changeForEdit();
  };

  const handleSubmitEdit = (e) => {
    e.preventDefault();
    //Если инпут не пустой, редактируем задачу (на всякий случай чистим пустые пробелы в начале,
    // чтобы небыло просто задачи из пустых пробелов)
    if (todoEdit.trim()) {
      editTask(todoEdit, myTask);
      changeForEdit();
    } else {
      alert('Enter task');
    }
  };

  return (
    <div className={s.todo__wrap}>
      <div className={s.todo__btnEdit} onClick={() => editForm(myTask)}>
        Edit
      </div>

      {changeEdit && (
        <form>
          <button onClick={handleSubmitEdit} className={s.todo__btnApply}>
            Apply
          </button>
          <input className={s.todo__taskEdit} type="text" value={todoEdit} onChange={handleChangeEdit} />
        </form>
      )}

      {!changeEdit && (
        <div className={myTask.complete ? `${s.todo__task} ${s.todo__task_complete}` : s.todo__task}>
          <input className={s.todo__checkbox} type="checkbox" name="" id="" defaultChecked={myTask.complete} onClick={() => handleCheck(myTask.id)} />
          {myTask.task}
        </div>
      )}
      <div className={s.todo__del} onClick={() => deleteTask(myTask)}>
        X
      </div>
    </div>
  );
}
