import { useEffect, useState } from 'react';
import './TaskForm.css';

const TaskForm = (props) => {

    const [catagory, setCatagory] = useState('To-do');
    const [text, setText] = useState('');

    useEffect(() => {

        if(props?.edit){
            const editData = props.edit;
            setText(editData.task);
            setCatagory(editData.catagory);
        }

    }, [props.edit]);

    const catagoryChangeHandler = (e) => {
        setCatagory(e.target.value);
    };

    const textChangeHandler = (e) => {
        setText(e.target.value);
    };

    const formSubmitHandler = (e) => {
        e.preventDefault();
        props.formData(text, catagory);
        setText('');
        
    };

    return (
        <div className='content'>
            <h3 className='main_heading'>Task form</h3>
            <form className='form' onSubmit={formSubmitHandler}>
                <div>
                    <label><b>Enter Task:</b></label>
                    <input type="text" className='form_input' value={text} onChange={textChangeHandler} />
                </div>
                <div>
                    
                    <label><b>Select Catagory:</b></label>
                    <select className='form_dropdown' value={catagory} onChange={catagoryChangeHandler}>
                        <option value='To-do'>To-do</option>
                        <option value='In-progress'>In-progress</option>
                        <option value='Completed'>Completed</option>
                    </select>
                </div>
                <div className='button_container'>
                    {
                        props.edit ? <button className='button' type='submit' style={{backgroundColor: '#b105e6', borderColor:'#b105e6'}} >Update</button> : <button className='button' type='submit'>Add Task</button>
                    }
                </div>
            </form>
        </div>
    );
};

export default TaskForm;