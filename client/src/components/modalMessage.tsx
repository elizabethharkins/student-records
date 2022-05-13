import { Modal, Button } from "react-bootstrap";

export default function ModalMessage(props: any) {

  const { show, modal, record, deleteRecord } = props;
  const spanStyle = {
    textDecoration: "underline"
  };

  return (
    <>
      <Modal
        show={show}
        backdrop="static"
        keyboard={false}
        record={record}
      >
        <Modal.Header>
          <Modal.Title>Delete Record</Modal.Title>
          <button 
            className="btn btn-link" 
            onClick={() => {modal.handleClose()}}
          >
            Close
          </button>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete the record for <span style={spanStyle}>{record.name}</span>? 
          This action cannot be undone.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => deleteRecord(record._id)}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}