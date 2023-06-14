import './TaskCatagory.css';

const TaskCatagory = (props) => {


    const editTaskHandler = (tas) => {
        props.editTask(tas);

    };

    const deleteTaskHandler = (tas) => {
        
        const _id = props.list.find((e) => tas.id === e.id);

        props.deleteMethod(_id.id);

    };

    const dragStarted = (e,id) => {
        //e.dataTransfer.setData(props.td,id);

        props.sendData(e,id);

        console.log(id);
    };

    const setDroppableTask = (e,id) => {
        props.getDroppableTask(id.task, id);
        
    };

    

    return (
        <div className={props.styleClass}>
            <div>
                <h3 className='main_heading'>{props.cat}</h3>
            </div>
            <div className='ul'>
                <ul>
                    {
                        props.list.map((l,index) => {
                            return (
                                <div key={index} className='list_container' draggable onDrag={(e) => {dragStarted(e,l.id)}} droppable onDrop={(e) => {setDroppableTask(e,l.id)}} >
                                    <li className={props.styleClassLi}>{l.task}</li>
                                    <div className='button_container'>
                                        <button className='button' type='button' onClick={() => deleteTaskHandler(l)} >Delete</button>
                                        <button className='button_edit' type='button' onClick={() => editTaskHandler(l)} >Edit</button>
                                    </div>
                                </div>
                            );
                        })
                    }
                </ul>
            </div>
        </div>
    );
};

export default TaskCatagory;