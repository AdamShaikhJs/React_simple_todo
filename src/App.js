import React, { useState } from 'react';
import './style.css';

export default function App() {
  const [isEdit, setIsEdit] = useState(false);
  const [editID, setEditID] = useState();
  const [data, setData] = useState([
    {
      id: 1,
      name: 'adam',
      email: 'adamshaikhjs@gmail.com',
      number: '89993893893',
      gender: 'male',
    },
    {
      id: 2,
      name: 'don',
      email: 'adamshaikhjs@gmail.com',
      number: '89993893893',
      gender: 'male',
    },
  ]);

  const [user, setUser] = useState({
    name: '',
    email: '',
    number: '',
    gender: '',
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((pre) => ({ ...pre, [name]: value }));
  };

  const editItem = (id) => {
    const findEdit = data.find((item) => item.id === id);
    setUser({
      name: findEdit.name,
      email: findEdit.email,
      number: findEdit.number,
      gender: findEdit.gender,
    });

    setIsEdit(!isEdit);
    setEditID(id);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, number, gender } = user;
    if (!number || !email || !number || !gender) {
      alert('fill form first');
      return;
    }
    if (isEdit) {
      setData(
        data.map((item) => {
          if (item.id === editID) {
            return { ...item, ...user };
          }
          return item;
        })
      );
      setIsEdit(!isEdit);
    } else {
      setData([...data, { id: data.length + 1, ...user }]);
    }
    setTimeout(() => {
      setUser({
        name: '',
        email: '',
        number: '',
        gender: '',
      });
    }, 1000);
  };
  const handleDelet = (id) => {
    let newData = data.filter((val, i) => val.id !== id);
    setData(newData);
  };
  return (
    <div>
      <h1>React form with value!</h1>
      <form>
        <label>
          name
          <input
            type="text"
            name="name"
            value={user.name}
            onChange={handleChange}
          />{' '}
        </label>
        <label>
          email
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
          />
        </label>
        <label>
          number
          <input
            type="number"
            name="number"
            value={user.number}
            onChange={handleChange}
          />
        </label>{' '}
        <label>
          gender
          <input
            type="radio"
            name="gender"
            checked={user.gender === 'male'}
            value="male"
            onChange={handleChange}
          />{' '}
          male
          <input
            type="radio"
            name="gender"
            value="female"
            checked={user.gender === 'female'}
            onChange={handleChange}
          />{' '}
          female
        </label>
        <button type="button" onClick={handleSubmit}>
          Submit !
        </button>
      </form>

      <table>
        <thead>
          <tr>
            <td> No</td>
            <td> Name</td>
            <td> Email</td>
            <td> Number</td>
            <td> Gender</td>
          </tr>
        </thead>
        <tbody>
          {data.map((val, i) => {
            return (
              <tr key={i} onClick={() => editItem(val.id)}>
                <td> {val.id}</td>
                <td> {val.name}</td>
                <td> {val.email}</td>
                <td> {val.number}</td>
                <td> {val.gender}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
