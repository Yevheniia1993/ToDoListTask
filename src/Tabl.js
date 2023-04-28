import React, { useRef, useState } from "react";
function Tabl() {
  const data = [
    { ID: 1, Name: "Ira", Email: "Ira@gmail.com", Age: 33 },
    { ID: 2, Name: "Anna", Email: "Anna@gmail.com", Age: 25 },
    { ID: 3, Name: "Ihor", Email: "Ihor@gmail.com", Age: 29 },
  ];
  const [disp, setDisp] = useState({ display: "none" });
  const [dispNone, setDispNone] = useState({ display: "none" });
  const [SaveNone, setSaveNone] = useState({ display: "none" });
  const [userData, setUserData] = useState(data);
  const [directSort, setDirectSort] = useState(true);
  const [uID, setUID] = useState("");
  const [uName, setUName] = useState("");
  const [uEmail, setUEmail] = useState("");
  const [uAge, setUAge] = useState("");
  const [fieldMy, setField] = useState("");
  const IDUser = useRef("");
  const NameUser = useRef("");
  const EmailUser = useRef("");
  const AgeUser = useRef("");
  const Arrow = () => {
    return directSort ? (
      <img className="img-class" src="5.png" alt="" />
    ) : (
      <img className="img-class" src="6.png" alt="" />
    );
  };
  function DataUser() {
    setDisp({ display: "table-row" });
    setSaveNone({ display: "block" });
  }
  function PlusUser() {
    let newUser = {
      ID: Number(IDUser.current.value),
      Name: NameUser.current.value,
      Email: EmailUser.current.value,
      Age: Number(AgeUser.current.value),
    };
    setDisp({ display: "none" });
    setUserData([...userData, newUser]);
    setSaveNone({ display: "none" });
  }
  const Change = (e) => {
    setUName(e.target.value);
  };
  const Change1 = (e) => {
    setUEmail(e.target.value);
  };
  const Change2 = (e) => {
    setUAge(e.target.value);
  };

  function Edite(id, name, email, age) {
    setDispNone({ display: "block" });
    setUID(id);
    setUName(name);
    setUEmail(email);
    setUAge(age);
  }
  function Delete(itemID) {
    const filterUser = userData.filter((i) => i.ID !== itemID);
    setUserData(filterUser);
  }
  const Sort = (field) => {
    const copyData = userData.concat();
    let sortData;
    if (directSort) {
      sortData = copyData.sort((a, b) => {
        return a[field] > b[field] ? 1 : -1;
      });
    } else {
      sortData = copyData.reverse((a, b) => {
        return a[field] > b[field] ? 1 : -1;
      });
    }
    setUserData(sortData);
    setDirectSort(!directSort);
  };
  const Save = () => {
    const tmpData = userData.map((obj) =>
      obj.ID === uID
        ? { ...obj, Name: uName, Email: uEmail, Age: uAge }
        : { ...obj }
    );
    setDispNone({ display: "none" });
    setUserData(tmpData);
  };
  const fieldSortData = (field) => {
    Sort(field);
    setField(field);
  };
  const dataTabl = userData.map((item, index) => {
    return (
      <tr key={index}>
        <td>{item.ID}</td>
        <td>{item.Name}</td>
        <td>{item.Email}</td>
        <td>{item.Age}</td>
        <td>
          <button
            className="Button-Delete-Edite"
            onClick={() => Edite(item.ID, item.Name, item.Email, item.Age)}
          >
            Редагувати
          </button>
          <button
            className="Button-Delete-Edite"
            onClick={() => Delete(item.ID)}
          >
            Видалити
          </button>
        </td>
      </tr>
    );
  });
  return (
    <div>
      <table id="tabl">
        <thead>
          <tr>
            <th
              onClick={() => {
                fieldSortData("ID");
              }}
              data-type="number"
            >
              ID
              {fieldMy === "ID" ? <Arrow /> : null}
            </th>
            <th
              onClick={() => {
                fieldSortData("Name");
              }}
              data-type="string"
            >
              Name
              {fieldMy === "Name" ? <Arrow /> : null}
            </th>
            <th
              onClick={() => {
                fieldSortData("Email");
              }}
              data-type="string"
            >
              Email
              {fieldMy === "Email" ? <Arrow /> : null}
            </th>
            <th
              onClick={() => {
                fieldSortData("Age");
              }}
              data-type="string"
            >
              Age
              {fieldMy === "Age" ? <Arrow /> : null}
            </th>
            <th data-type="string">Редагувати/Видалити</th>
          </tr>
        </thead>
        <tbody>
          {dataTabl}
          <tr style={disp}>
            <td>
              <input className="inputPlus" ref={IDUser} />
            </td>
            <td>
              <input className="inputPlus" ref={NameUser} />
            </td>
            <td>
              <input className="inputPlus" ref={EmailUser} />
            </td>
            <td>
              <input className="inputPlus" ref={AgeUser} />
            </td>
          </tr>
        </tbody>
      </table>
      <button className="Button-class" onClick={DataUser}>
        Додати користувача
      </button>
      <button className="Button-class" style={SaveNone} onClick={PlusUser}>
        Зберегти користувача
      </button>
      <div style={dispNone} className="modal-change">
        <input id="id" defaultValue={uID} readOnly />
        <input id="name" onChange={Change} value={uName} />
        <input id="email" onChange={Change1} value={uEmail} />
        <input id="age" onChange={Change2} value={uAge} />
        <button className="Button-Delete-Edite" onClick={() => Save()}>
          Зберегти
        </button>
      </div>
    </div>
  );
}
export default Tabl;
