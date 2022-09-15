import { useCallback,useReducer } from "react";
import "./UpdatePopup.css";

const reducerFunction=(state,action)=>{
	return{...state,[action.name]:action.value}
}

function UpdatePopup({initialValue,updateStudentDetails,index,closePopup}){
    console.log(initialValue);
    const [studentDetails,dispatchFunction]=useReducer(reducerFunction,initialValue);

    const {name,age}=studentDetails;

    const changeValues=useCallback((event)=>{
		dispatchFunction({'name':event.target.name,'value':event.target.value});
	},[])

    const submitHandler=(event)=>{
		event.preventDefault();
        updateStudentDetails(studentDetails,index);
        closePopup();
    };
    return (
        <div className="update-popup">
            <div className="popup">
                <h3>Edit the Student details</h3>
                
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
                    <input type="submit" value="update details" className="form-submit"/>
                </form>
                <button onClick={()=> closePopup()}>close</button>
            </div>
            
        </div>
    )
}

export default UpdatePopup;