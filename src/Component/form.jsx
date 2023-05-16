import React, { useEffect, useState } from 'react';
import axios from 'axios';

const FormList = () => {
    const [name, setName] = useState('');
    const [mobile, setMobile] = useState('');
    const [email, setEmail] = useState('');
    const [list, setList] = useState([]);

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        // Validate the form fields
        if (name.length >= 5 && mobile.length > 0 && mobile.length <= 10 && email.length >= 1) {

            //   return;
            try {
                await axios.post('https://visity.onrender.com/items/create', { name, mobile, email });
                // If the request is successful, add the form data to the list
                setList([...list, { name, mobile, email }]);
                // Clear the form fields
                // setName('');
                // setMobile('');
                // setEmail('');
            }
            catch (error) {
                console.error('Error saving form data:', error);
            }

        }

        else if(name.length >= 1 || mobile.length > 10) {
            alert(' Name Should be 5 and Number max 10 characters');
            return
        }

        else if(name.length === 0 && mobile.length === 0 && email.length === 0){
            alert("Please fill in all fields.");
        }

    };

    const handleDelete = (id) => {
        // const updatedUsers = [...list];
        // updatedUsers.splice(id, 1);
        // setList(updatedUsers);

        axios.delete(`https://visity.onrender.com/items/delete/${id}`)
            .then(res => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            })

    }

    const handleEdit = (index, id) => {
        const user = list[index];
        setName(user.name);
        setEmail(user.email);
        setMobile(user.mobile);
        // setIsValid(true);
        handleDelete(id);
    };

    useEffect(() => {
        fetch("https://visity.onrender.com/items")
            .then((res) => {
                return res.json();
            })
            .then((res) => {
                // console.log("useeffect",res);
                setList(res);
            })
            .catch((err) =>
                console.log(err));
    }, [list]);


    return (
        <div>
            <form onSubmit={handleFormSubmit}>
                <h1>Web Form</h1>
                <label>
                    Name:
                    <input
                        type="text"
                        placeholder='Enter Name'
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                    />
                </label>
                <br />

                <label>
                    Email:
                    <input
                        type="email"
                        placeholder='Enter Email'
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                    />
                </label>

                <br />
                <label>
                    Mobile:
                    <input
                        type="number"
                        placeholder='Enter Mobile Number'
                        value={mobile}
                        onChange={(event) => setMobile(event.target.value)}
                    />
                </label>
                <br />
                
                <button type="submit">Submit</button>
            </form>

            <h2>List</h2>
            {/* <ul>
        {list.map((item, index) => (
          <li key={index}>
            Name: {item.name}, Mobile: {item.mobile}, Email: {item.email}
            <button onClick={() => handleEdit(index,item._id)}>Edit</button>
            <button onClick={() => handleDelete(item._id)}>Delete</button>
          </li>
        ))}
      </ul> */}

            <table>
                <thead>
                    <tr className='item-th'>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Mobile</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {list.map((item, index) => (
                        <tr key={index}>
                            <td>{item.name}</td>
                            <td>{item.email}</td>
                            <td>{item.mobile}</td>
                            <td>
                                <button onClick={() => handleEdit(index, item._id)}>Edit</button>
                            </td>
                            <td>
                                <button onClick={() => handleDelete(item._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default FormList;
