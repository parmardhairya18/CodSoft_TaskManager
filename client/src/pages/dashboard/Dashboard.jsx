import Sidebar from "../../components/sidebar/Sidebar"
import { Link } from "react-router-dom"
import './dashboard.scss'
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import {getAllTasks} from '../../redux/taskSlice';
const Dashboard = () => {

  const tasklist = useSelector((state)=>state.task);
  const {AllTasks} = tasklist;
  const user = useSelector((state)=>state.auth);
  const {currentUser} = user;

  let pendingTask = [];
  let completedTask = [];

  for(let i = 0;i<AllTasks.length;i++){
    if(AllTasks[i].status ==='todo'|| AllTasks[i].status ==='doing'|| AllTasks[i].status ==='backlog'){
      pendingTask.push(AllTasks[i]);
    }
    else if(AllTasks[i].status ==='done'){
      completedTask.push(AllTasks[i]);
    }
  }

  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(getAllTasks(currentUser.token,currentUser.id));
  },[dispatch,currentUser.token,currentUser.id]);
  return (
    <div>

      <div className="dashboard">
        
        <div className="dashboard__left">
          <Sidebar/>
        </div>

        <div className="dashboard__right">
          <div className="dashboard__rightContent">

  
        <h2>Task Status </h2>

          <div className="taskcount">
            <div className="todo box">Pending - {pendingTask.length}</div>
            <div className="done box">Finished - {completedTask.length}</div>
          </div>
          <div className="createButton">
            <Link to='/taskmanager' className="button">
              Create Task
            </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard