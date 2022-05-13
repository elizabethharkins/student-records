import React, { useState } from "react";
import { useNavigate } from "react-router";
import { StudentRecord } from "../interfaces/studentRecord";
import StandardForm from "./standardForm";
import FormGroup from "./formGroup";
import Input from "./inputField";
import InputButton from "./inputButton";
import Label from "./label";
 
export default function CreateRecord() {

  const [form, setForm] = useState({
    name: "",
    email: "",
    age: "",
    grade: "",
  });

  const navigate = useNavigate();
 
  // methods to update the state properties
  function updateForm(value: {} ) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }
 
  // handles the submission
  async function onSubmit(e: React.SyntheticEvent) {
    e.preventDefault();
 
    // when a post request is sent to the create url, 
    // add a new record to the database
    const newStudent: StudentRecord = { ...form };
 
    await fetch("http://localhost:5000/record/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newStudent),
    })
    .catch(error => {
      window.alert(error);
      return;
    });
 
    setForm({ name: "", email: "", age: "", grade: "" });
    navigate("/");
  }
 
  // display the form that takes the input from the user
  return (
    <div>
      <h3>Create New Record</h3>
      <StandardForm onSubmit={onSubmit}>
        <FormGroup>
          <label htmlFor="name">Name</label>
          <Input
            type="text"
            className="form-control"
            id="name"
            placeholder="first name last name"
            value={form.name}
            onChange={(e: any) => updateForm({ name: e.target.value })}
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            className="form-control"
            id="email"
            placeholder="jane@example.com"
            value={form.email}
            onChange={(e) => updateForm({ email: e.target.value })}
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="age">Age</Label>
          <Input
            type="number"
            className="form-control"
            id="Age"
            placeholder="please enter a numeric value"
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
            value="Create Record"
            className="btn btn-secondary"
          />
        </FormGroup>
      </StandardForm>
    </div>
  );
}