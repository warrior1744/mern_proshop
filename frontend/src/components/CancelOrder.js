import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";

function CancelOrder({ confirmCancelOrder }) {
  const [reason, setReason] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    confirmCancelOrder(reason);
  };

  return (
    <>
      <div>
        <Form onSubmit={onSubmit}>
          <Form.Group controlId="reason">
            <Form.Label>Reason</Form.Label>
            <Form.Control
              style={{ height: "180px", width: "auto" }}
              maxLength={50}
              className="mb-4"
              as="textarea"
              type="text"
              placeholder="enter reason here..."
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Button type="submit" className="btn btn-block btn-warning">
            Confirm Cancel
          </Button>
        </Form>
      </div>
    </>
  );
}

export default CancelOrder;
