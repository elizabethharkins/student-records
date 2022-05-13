import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { StudentRecord } from "../interfaces/studentRecord";
import StandardForm from "./standardForm";
import FormGroup from "./formGroup";
import Input from "./inputField";
import InputButton from "./inputButton";
import Label from "./label";
 
export default function EditRecord() {

  const [form, setForm] = useState({
    name: "",
    email: "",
    age: "",
    grade: "",
    records: [],
  });

  const params: any = useParams();
  const navigate = useNavigate();
 
  useEffect(() => {
    async function fetchData() {
      const id = params?.id.toString();
      const response = await fetch(`http://localhost:5000/record/${params.id.toString()}`);
  
      if (!response.ok) {
        const message = `An error has occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }
  
      const record = await response.json();
      if (!record) {
        window.alert(`Record with id ${id} not found`);
        navigate("/");
        return;
      }
  
      setForm(record);
    }
 
    fetchData();
 
    return;
  }, [params.id, navigate]);
 
  // methods to update the state properties
  function updateForm(value: {}) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }
 
  async function onSubmit(e: React.SyntheticEvent) {
    e.preventDefault();
    const editedStudent: StudentRecord = {
      name: form.name,
      email: form.email,
      age: form.age,
      grade: form.grade,
    };
  
    // send post request to update the data in the db
    await fetch(`http://localhost:5000/edit/${params.id}`, {
      method: "POST",
      body: JSON.stringify(editedStudent),
      headers: {
        'Content-Type': 'application/json'
      },
    });
  
    navigate("/");
  }
 
  // display the form that takes input from the user to update the data
  return (
    <div>
      <h3>Update Record</h3>
      <StandardForm onSubmit={onSubmit}>
        <FormGroup>
          <Label htmlFor="name">Name</Label>
          <Input
            type="text"
            className="form-control"
            id="name"
            value={form.name}
            onChange={(e) => updateForm({ name: e.target.value })}
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            className="form-control"
            id="email"
            value={form.email}
            onChange={(e) => updateForm({ email: e.target.value })}
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="age">Age</Label>
          <Input
            type="numeric"
            className="form-control"
            id="age"
            value={form.age}
            onChange={(e) => updateForm({ age: e.target.value })}
          />
        </FormGroup>
        <FormGroup>
          <div className="form-check form-check-inline">
            <Input
              className="form-check-input"
              type="radio"
              name="gradeOptions"
              id="gradesK-1"
              value="K - 1"
              checked={form.grade === "K - 1"}
              onChange={(e) => updateForm({ grade: e.target.value })}
            />
            <Label htmlFor="gradesK-1" className="form-check-label">K - 1</Label>
          </div>
          <div className="form-check form-check-inline">
            <Input
              className="form-check-input"
              type="radio"
              name="gradeOptions"
              id="grades2-3"
              value="2 - 3"
              checked={form.grade === "2 - 3"}
              onChange={(e) => updateForm({ grade: e.target.value })}
            />
            <Label htmlFor="grades2-3" className="form-check-label">2 - 3</Label>
          </div>
          <div className="form-check form-check-inline">
            <Input
              className="form-check-input"
              type="radio"
              name="gradeOptions"
              id="grades4-5"
              value="4 - 5"
              checked={form.grade === "4 - 5"}
              onChange={(e) => updateForm({ grade: e.target.value })}
            />
            <Label htmlFor="grades4-5" className="form-check-label">4 - 5</Label>
          </div>
        </FormGroup>
  
        <FormGroup>
          <InputButton
            type="submit"
            value="Update Record"
            className="btn btn-secondary"
          />
        </FormGroup>
      </StandardForm>
    </div>
  );
}