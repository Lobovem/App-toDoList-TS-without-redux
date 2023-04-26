import { useState } from 'react';
import s from './style.module.scss';

interface IFormProps {
  addTask: (userInput: string) => void;
  deleteAllCompleteTask: () => void;
}

export const Form:React.FC<IFormProps> = ({ addTask, deleteAllCompleteTask }) =>{
  const [userInput, setUserInput] = useState<string>('');

  const handleSubmit = (e) => {
    e.preventDefault();
    addTask(userInput);
    setUserInput('');
  };

  const handleChange = (e) => {
    setUserInput(e.currentTarget.value);
  };

  const handlePressKey = (e) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };

  return (
    <div>
      <form className={s.todo__formWrap} onSubmit={handleSubmit}>
        <input
          className={s.todo__input}
          type="text"
          placeholder="Please enter new task..."
          name="input"
          value={userInput}
          onChange={handleChange}
          onKeyDown={handlePressKey}
        />
        <button className={s.todo__add}>+</button>
      </form>

      <button className={s.todo__delAll} onClick={deleteAllCompleteTask}>
        Remove checked
      </button>
    </div>
  );
}
