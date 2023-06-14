import { useEffect, useState } from 'react';
import TaskCatagory from './Components/TaskCatagory';
import TaskForm from './Components/TaskForm';
import './App.css';

 const App = () => {

  const [list, setList] = useState([]);
  const [edit, setEdit] = useState(null);
  const [draggableId, setDraggableId] = useState();
  const [droppableTask, setDroppableTask] = useState('');
  const [droppableId, setDroppableId] = useState();
  
  


  const styleTodo = "container_todo";
  const styleInProgress = "container_inprogress";
  const styleComplete = "container_complete";

  const styleTodoli = "li_todo";
  const styleInProgressli = "li_inprogress";
  const styleCompleteli = "li_complete";


  const getFormData = (tas, cat) => {

    if(!tas || !cat){
      return alert('Please enter all the fields');
    }

    if(edit===null){
      let taskObject = {
        id: list.length+1,
        task: tas,
        catagory: cat
      };
  
      setList((prev) => {
        return [...prev, taskObject];
      });
    }
    else{
      let _list = list;
      let elem = _list.find((e) => e.id===edit.id);
      elem.task = tas;
      elem.catagory = cat;
      setList(_list);
      setEdit(null);
    }

  };

  const deleteMethod = (id) => {
    const _list = list.filter((e) => e.id!==id);
    setList(_list);
  };



  const editHandler = (taskObj) => {
    setEdit(taskObj);
    console.log(edit);
  };

  const draggingOverTodo = (e,t) => {
    e.preventDefault();
    console.log('Dragging over todo');
  };

  const draggingOverProg = (e,t) => {
    e.preventDefault();
    console.log('Dragging over progress');
  };

  const draggingOverComp = (e,t) => {
    e.preventDefault();
    console.log('Dragging over complete');
  };

  /*const dropOnTodo = (e) => {
    if(e.dataTransfer.getData('prog')){
      console.log('You have dropped');
      let tranferedDataId = e.dataTransfer.getData('prog');
      console.log(tranferedDataId);
      let _list = list;
      let tranferedDataObj = _list.find((e) => e.id==tranferedDataId);
      tranferedDataObj.catagory='To-do';
      setList(_list);
    }
    else{
      console.log('You have dropped');
      let tranferedDataId = e.dataTransfer.getData('comp');
      console.log(tranferedDataId);
      let _list = list;
      let tranferedDataObj = _list.find((e) => e.id==tranferedDataId);
      tranferedDataObj.catagory='To-do';
      setList(_list);
    }
    
  };*/

  const dropOnProg = (e) => {
    if(e.dataTransfer.getData('todo')){
      console.log('You have dropped');
      let tranferedDataId = e.dataTransfer.getData('todo');
      console.log(tranferedDataId);
      let _list = list;
      let tranferedDataObj = _list.find((e) => e.id==tranferedDataId);
      tranferedDataObj.catagory='In-progress';
      setList(_list);
    }
    else{
      console.log('You have dropped');
      let tranferedDataId = e.dataTransfer.getData('comp');
      console.log(tranferedDataId);
      let _list = list;
      let tranferedDataObj = _list.find((e) => e.id==tranferedDataId);
      tranferedDataObj.catagory='In-progress';
      setList(_list);
    }
    
  };

  const dropOnComp = (e, cat) => {
    /*if(e.dataTransfer.getData('prog')){
      console.log('You have dropped');
      let tranferedDataId = e.dataTransfer.getData('prog');
      console.log(tranferedDataId);
      let _list = list;
      let tranferedDataObj = _list.find((e) => e.id==tranferedDataId);
      tranferedDataObj.catagory='Completed';
      setList(_list);
    }
    else{
      console.log('You have dropped');
      let tranferedDataId = e.dataTransfer.getData('todo');
      console.log(tranferedDataId);
      let _list = list;
      let tranferedDataObj = _list.find((e) => e.id==tranferedDataId);
      tranferedDataObj.catagory='Completed';
      setList(_list);
    }*/

    

    const _list = [...list];
    setList([]);
    let find = _list.find((e)=> e.id==draggableId);

    if(find.catagory===cat){
      let findObjById = _list.find((e) => e.id==droppableId);
      let t = findObjById.task;
      findObjById.task = find.task;
      find.task = t;
      setList(_list);
    }
    
    else{
      find.catagory = cat;
      console.log(_list);
      setList(_list);
    }

  };

  const getDroppableTask = (t,id) => {
    setDroppableTask(t);
    setDroppableId(id);
  };

  const sendData = (e,id) => {
    setDraggableId(id);
  };

  const onDragOver = (e) => {
    e.preventDefault();
  };

  


  const renderTodoTask = () => {
    let toDoTask = list.filter((e) => e.catagory==='To-do');
    return (
      <div droppable  onDrop={(e) => {dropOnComp(e,'To-do')}} onDragOver={onDragOver} >
          <TaskCatagory list={toDoTask} sendData={sendData}  getDroppableTask={getDroppableTask}  cat="To-do List" deleteMethod={deleteMethod} editTask={editHandler} styleClass={styleTodo} styleClassLi={styleTodoli} td="todo" />
      </div>
    );
  };

  const renderProgressTask = () => {
    let inProgressTask = list.filter((e) => e.catagory==='In-progress');
    return (
      <div droppable  onDrop={(e) => {dropOnComp(e, 'In-progress')}} onDragOver={onDragOver} >
          <TaskCatagory list={inProgressTask} sendData={sendData}  cat="In-progress List" deleteMethod={deleteMethod} editTask={editHandler} styleClass={styleInProgress} styleClassLi={styleInProgressli} td="prog" />
      </div>
    );
  };

  const renderCompleteTask = () => {
    let completedTask = list.filter((e) => e.catagory==='Completed');
    return (
      <div droppable  onDrop={(e) => {dropOnComp(e, 'Completed')}} onDragOver={onDragOver} >
          <TaskCatagory list={completedTask} sendData={sendData}  cat="Completed List" deleteMethod={deleteMethod} editTask={editHandler} styleClass={styleComplete} styleClassLi={styleCompleteli} td="comp" />
      </div>
    );
  };


  return (
    <div>
      <h1 className='main_heading'>Project Management Application</h1>
      <div>
        <TaskForm formData={getFormData} edit={edit} />
      </div>
      <div className='main_container_grid'>
        {renderTodoTask()}
        {renderProgressTask()}
        {renderCompleteTask()}
      </div>
    </div>
  ); 
 }; 

export default App;
