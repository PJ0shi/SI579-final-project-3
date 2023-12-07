import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';

const FeedbackCard = ({ feedback, removeFeedback, updateFeedback, username}) => {
  const [isEditing, setIsEditing] = useState(false); //To determine whether the card is being edited or not
  const [updatedFeedback, setUpdatedFeedback] = useState(feedback.feedback); //To determine the new feedback after editing
  
  const handleEdit = () => {
    //Checking post author to allow editing
    if (feedback.firstName === username) {
      setIsEditing(true);
    } else {
      alert('You can only edit your own feedback.');
    }
  };

  const handleCancelEdit = () => {
    //After clicking the cancel button in edit mode
    setIsEditing(false);
    setUpdatedFeedback(feedback.feedback);
  };

  const handleUpdateFeedback = () => {
    // Call updateFeedback with the updated feedback
    updateFeedback(feedback.firstName, updatedFeedback);
    setIsEditing(false);
  };

  return (
    <Card style={{ width: '18rem'}}>
      <Card.Body>
        <Card.Title className='name'>{feedback.firstName}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted date">{feedback.startDate}</Card.Subtitle>
        <Card.Subtitle className="mb-2 text-muted">{feedback.course}</Card.Subtitle>
        {isEditing ? (
          <textarea
            value={updatedFeedback}
            onChange={(e) => setUpdatedFeedback(e.target.value)}
            rows="3"
            className="form-control mb-2"
          />
        ) : (
          <Card.Text>{feedback.feedback}</Card.Text>
        )}
        {isEditing ? (
          <>
            <button className="btn btn-success" onClick={handleUpdateFeedback}>
              Save
            </button>
            <button className="btn btn-secondary ml-2" onClick={handleCancelEdit}>
              Cancel
            </button>
          </>
        ) : (
          <>
            <Card.Link href="#" onClick={handleEdit}>
              Edit
            </Card.Link>
            <Card.Link href="#" onClick={() => feedback.firstName === username ? removeFeedback(feedback.firstName) : alert('You can only delete your own feedback.')}>
              Delete
            </Card.Link>
          </>
        )}
      </Card.Body>
    </Card>
  );
};

export default FeedbackCard;
