import React,{useEffect} from "react";
import {BrowserRouter,Routes,Route} from "react-router-dom"
import axios from "axios";

import Home from "./pages/Home";
import "./assets/css/Navbar-style.css"
import {useDispatch,useSelector } from "react-redux";
import studentsReducer from "./redux/reducers/studentsReducer";
import Error from "./pages/Error";
import Loading from "./components/Loading";
import AddStudent from "./pages/AddStudent";
import SelectedStudent from "./pages/SelectedStudent";


function App() {
  const dispatch = useDispatch()
  const studentsState=useSelector(state=>state.studentsState)

  useEffect(()=>{
    dispatch({type:"FETCH_STUDENT_START"})
    axios.get("http://localhost:3005/students")
    .then(response=>{
      setTimeout(()=>{
        dispatch({type:"FETCH_STUDENT_SUCCESS",payload:response.data})
      },500);      
    })
    .catch(error=>{
      dispatch({type:"FETCH_STUDENT_FAIL", payload:"server hatası"})
    })
  },[])

if(studentsState.start===true){
  return <Loading />
}

if(studentsState.fail === true){
  return <Error />
}




  return (      
    <BrowserRouter>
      <Routes>      
      <Route path="/" element={<Home />}/>
      <Route path="/add-student" element={<AddStudent/>} />
      <Route path="/error" element={<Error/>}/>
      <Route path="/selectedstudent" element={<SelectedStudent/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
