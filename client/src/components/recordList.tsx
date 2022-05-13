import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { StudentRecordAugmented } from "../interfaces/studentRecord";
import { arrayDataIsVerified } from "../utils";
import ModalMessage from "./modalMessage";

function Record(props: any) {
  
  const { record, modal } = props;

  return (
    <tr>
      <td>{record.name}</td>
      <td>{record.email}</td>
      <td>{record.age}</td>
      <td>{record.grade}</td>
      <td>
        <Link className="btn btn-link" to={`/edit/${record._id}`}>Edit</Link> |
        <button className="btn btn-link"
          onClick={() => {
            modal.handleShow();
            modal.handleRecord(record);
          }}
        >
          Delete
        </button>
      </td>
    </tr>
  );
};
  
export default function RecordList() {
  const [records, setRecords] = useState([]);
  const [show, setShow] = useState(false);
  const [record, setRecord] = useState({});

  const modal = {
    handleClose() {
      setShow(false);
    },
    handleShow() {
      setShow(true);
    },
    handleRecord(record: StudentRecordAugmented) {
      setRecord(record);
    }
  };
  
  // fetch records from db
  useEffect(() => {
    async function getRecords() {
      const response = await fetch(`http://localhost:5000/record/`);
  
      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }
  
      const records = await response.json();
      if (!arrayDataIsVerified(records)) return;
      setRecords(records);
    }
  
    getRecords();
  
    return;
  }, [records.length]);
  
  // deletes a record
  async function deleteRecord(id: string) {
    await fetch(`http://localhost:5000/${id}`, {
      method: "DELETE"
    });
    
    const newRecords = records.filter((record: StudentRecordAugmented) => record._id !== id);
    setRecords(newRecords);
    modal.handleClose();
  }
  
  // map out the records on the table
  function recordList() {
    return records.map((record: StudentRecordAugmented) => {
      return (
        <Record
          record={record}
          key={record._id}
          show={show}
          modal={modal}
        />
      );
    });
  }
  
  // displays the table with the records of students
  return (
    <div>
      <h3>Record List</h3>
      <table className="table table-striped" style={{ marginTop: 20 }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Age</th>
            <th>Grade</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>{recordList()}</tbody>
        <ModalMessage 
          show={show} 
          modal={modal} 
          record={record}
          deleteRecord={deleteRecord} 
        />
      </table>
    </div>
  );
}