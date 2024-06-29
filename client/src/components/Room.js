import React ,{useState} from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Carousel from 'react-bootstrap/Carousel';

function Room({ room }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div className='row bs'>
      <div className="col-md-4">
        <img src={room.imageurls[0]} className='smallimg' />
      </div>
      <div className="col-md-7">
        <h1>{room.name}</h1>
        <b>
          <p>Max Count :{room.maxcount}</p>
          <p>Phone Number: {room.phonenumber}</p>
          <p>Type :{room.type}</p>
        </b>
        <div style={ {float: 'right'}}>
          <button className="btn btn-primary" onClick={handleShow}>
            View details
          </button>
        </div>
      </div>

      <Modal show={show} onHide={handleClose} size='lg'>
        <Modal.Header closeButton>
          <Modal.Title>{room.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Carousel>
      
      {room.imageurls.map(url=>{
        return <Carousel.Item>
        <img className='d-block bigimg'
        src={url}
        alt='First image'/>
      </Carousel.Item>
      })}
    </Carousel>
    <p>{room.description}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default Room
