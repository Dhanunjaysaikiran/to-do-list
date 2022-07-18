
import './App.css';
import React, { useEffect, useState } from 'react';



function App() {
  const [tasks, setData] = useState([])
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos').then((result) => {
      result.json().then((resp) => {
        setData(resp)
      })
    })
  }, [])
  const [newtask, SetNewtask] = useState('');
  const[UpdateData,SetUpdateData] = useState('')
  const AddTask = () => {
    if (newtask) {
      let num = tasks.length + 1;
      let newEntry = { id: num, title: newtask, completed: false }
      setData([...tasks, newEntry])
      SetNewtask('');
    }
  }
  const DelTask = (id) => {
    let newTasks = tasks.filter(tasks => tasks.id !== id)
    setData(newTasks);
  }
  const MarkDone = (id) => {
    let newtask = tasks.map(tasks => {
      if (tasks.id === id) {
        return ({ ...tasks, completed: !tasks.completed })
      }
      return tasks;
    })
    setData(newtask);
  }
  const ChangeTask = (e)=>{
    let newEntry = {
      id: UpdateData.id,
      title: e.target.value,
      completed:UpdateData.completed ? true:false
    }
    SetUpdateData(newEntry);
  }
  const UpdateTask = () => {
    let filterInfo =[...tasks].filter(tasks=>tasks.id!==UpdateData.id);
    let UpdatedObject=[...filterInfo,UpdateData];
    setData(UpdatedObject);
    SetUpdateData('');
  }
  const CancelUpdate = ()=>{
    SetUpdateData('');
  }


  return (
    <div className='todo'>
      <div className='head'>
        <h1>To-Do List</h1>
      </div>
      <h2 className='sub'>Add a new task in the list</h2>
      <div className='flex'>
        <input className='textbar' value={newtask} onChange={(e) => SetNewtask(e.target.value)}></input>
        <button onClick={AddTask} className='update'>Submit</button>
      </div>
      <h2 className='sub'>Edit a task in the list</h2>
      <div className='flex'>
        <input className='textbar' value={UpdateData && UpdateData.title} onChange={(e)=>ChangeTask(e)}></input>
        <button onClick={UpdateTask} className='update'>Update</button>
        <button onClick={CancelUpdate} className='cancel'>Cancel</button>
      </div>
      <h2 className='sub'>Added task in To-do list</h2>

      <div className='gridbox'>

        {tasks.sort((a, b) => a.id > b.id ? 1 : -1).map((tasks) => {
          return (
            <div className='cont' key={tasks.id}>
              <div className='box'>
                <span className='right'>{tasks.id}.</span>

                <div className={tasks.completed ? 'done' : 'rec'}>
                  <div className={tasks.completed ? 'tick' : 'hidden'}>✓</div>
                  <div className='top'>
                    <span> {tasks.title}</span>
                  </div>
                  <div className='bot'>

                    <span className={tasks.completed ? "click2" : 'click'} onClick={(e) => MarkDone(tasks.id)}>{tasks.completed ? 'Mark as incomplete' : 'Mark as completed'}</span>
                    <span className={tasks.completed ? "click2" : 'del'} onClick={() => SetUpdateData({
                      id: tasks.id,
                      title: tasks.title, completed: tasks.completed ? true : false
                    })}>Edit</span>
                    <span className={tasks.completed ? "click2" : 'del'} onClick={() => DelTask(tasks.id)}>Delete</span>


                  </div>
                </div>
              </div>
            </div>
          )
        })}

      </div>

    </div>

  );
}

export default App;
