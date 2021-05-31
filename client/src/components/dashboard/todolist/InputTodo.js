import React, { Fragment, useState } from "react";

const InputTodo = ( {setTodosChange} ) => {

	const [description, setDescription] = useState("");
	const [address, setAddress] = useState("");
	const [time, setTime] = useState("");

  const myHeaders = new Headers();

      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("token", localStorage.token);

	const OnSubmitForm = async (e) => {
		e.preventDefault();
		try {
			const body = {description, address, time};
			const response = await fetch(`/dashboard/todos`, {
				method: "POST",
				headers: myHeaders, 
				body: JSON.stringify(body)
			});
			
			// window.location = "/";

			const parseResponse = await response.json();
			console.log(parseResponse);

			setTodosChange(true);
			setDescription("");
			setAddress("");
			setTime("");
		} catch (err) {
			console.error(err.message);
		};
	};
	return (
		<Fragment>
			<h1 className="text-center mt-5">Pern Todo List</h1>
			<div className="d-flex flex-column">
				
			<form className="d-flex mt-5" onSubmit={OnSubmitForm}>
				<input type="text" placeholder="Todo description" className="form-control" value={description || ''} onChange={e => setDescription(e.target.value)}/>
				<input type="text" placeholder="Todo address" className="form-control ml-2" value={address || ''} onChange={e => setAddress(e.target.value)}/>
				<input type="text" placeholder="Todo when" className="form-control ml-2" value={time || ''} onChange={e => setTime(e.target.value)}/>
				<button className ="btn btn-success ml-2 pt-3 pb-4">Add</button>
			</form>
			</div> 
		</Fragment>
	);
};


export default InputTodo;