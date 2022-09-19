import { useState ,useCallback,useReducer} from "react";
import NavBar from "../../Components/NavBar/NavBar";
import UpdatePopup from "../../Components/UpdatePopup/UpdatePopup";
import "./HomePage.css"

const reducerFunction=(state,action)=>{
	return{...state,[action.name]:action.value}
}

const initialValue={
    name:'',
    age:''
}

function HomePage(){
    const navBarTitle = "Student Crud app"


    const [studentDetails,dispatchFunction]=useReducer(reducerFunction,initialValue);

    const {name,age}=studentDetails;

    const [index,setIndex] = useState(-1);
    const [updateValue,setUpdateValue] = useState(initialValue);

    const [showPopup,setShowPopup] = useState(false);

    const changeValues=useCallback((event)=>{
		dispatchFunction({'name':event.target.name,'value':event.target.value});
	},[])


    const [studentDetailsList,setStudentDetailsList] = useState([
        {
            "name":"Sakthi",
            "age":12
        }
    ]);

    const addStudentDetails=(studentDetail)=>{
        // studentDetail.id = studentDetailsList.length+1;
        setStudentDetailsList( [...studentDetailsList,studentDetail]);
    }



    const submitHandler=(event)=>{
		event.preventDefault();
        console.log(studentDetails);
        addStudentDetails(studentDetails);
        alert(`Added new student ${studentDetails.name} successfully`);
        dispatchFunction({'name':'name','value':''})
        dispatchFunction({'name':'age','value':''})
    };

    const updateStudentDetails = (studentDetails,index)=>{
        console.log('update student details');
        studentDetailsList[index]= studentDetails;
        alert(`updated ${studentDetails.name} details successfully`)
        setStudentDetailsList([...studentDetailsList]);
    }

    const deleteStudentDetails=(index)=>{
        console.log('in delete student details');
        studentDetailsList.splice(index,1);
        setStudentDetailsList( [...studentDetailsList]);
    }

    const toggleUpdatePop=(studentDetail,index)=>{
        setShowPopup(true);
        setUpdateValue(studentDetail);
        setIndex(index);
        console.log('opening update popup');
    }
    return(
        <>
            <NavBar title={navBarTitle}/>
            <div className="home-page-container">
                <div className="student-form-flex-container">
                    <div className="student-form-container">
                        <h3>Add New Student Details</h3>
                        <form onSubmit={submitHandler}>
                            <div className="form-block">
                                <label htmlFor="name" className="form-label">Enter Student Name :</label><br/>
                                <input 
                                    className="form-input" 
                                    name="name" 
                                    type="text"
                                    value={name} 
                                    onChange={changeValues}
                                    placeholder="your name" 
                                    required />
                            </div>
                            <div className="form-block">
                                <label htmlFor="age" className="form-label">Enter your age :</label><br/>
                                <input 
                                    className="form-input" 
                                    name="age" 
                                    type="number"
                                    value={age} 
                                    placeholder="your age" 
                                    onChange={changeValues}
                                    required/>
                            </div>
                            <input type="submit" value="add details" className="form-submit"/>
                        </form>
                    </div>
                    { showPopup && <UpdatePopup initialValue={updateValue} index={index} updateStudentDetails={updateStudentDetails} closePopup={()=>setShowPopup(false)}/>}
                </div>
                <div className="student-details-table-container">
                    <h3>Student Details Table</h3>
                    <table>
                        <thead>
                            <tr className="table-head">
                                <th>Name</th>
                                <th>Age</th>
                                <th>blood group</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                            studentDetailsList.map((studentDetail,index) =>
                                <tr key={index}>
                                    <th>{studentDetail.name}</th>
                                    <th>{studentDetail.age}</th>
                                    <th>blood group</th>
                                    <th>
                                        <button onClick={()=>toggleUpdatePop(studentDetail,index)}><i className="fa-solid fa-pen-to-square"></i></button>
                                        <button onClick={()=>deleteStudentDetails(index)}><i className="fa-solid fa-trash"></i></button>
                                    </th>
                                </tr>
                            )
                            }
                        </tbody>
                    </table>
                </div>

            </div>
            
        </>
        
    );
}

export default HomePage;