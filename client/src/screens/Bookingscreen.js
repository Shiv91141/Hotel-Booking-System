import React ,{useState,useEffect} from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom';
function Bookingscreen() {
    const { roomid } = useParams();
    const [room, setroom] = useState(null);
    const [loading, setloading] = useState(true);
    const [error, seterror] = useState(false);
    useEffect(() => {
        const fetchRoom = async () => {
            try {
                setloading(true);
                const { data } = await axios.post('/api/rooms/getroombyid', {roomid});
                setroom(data);
                // console.log(data);
                setloading(false);
            } catch (error) {
                seterror(true);
                console.error('Error fetching room:', error);
                setloading(false);
            }
        };

        if (roomid) {
            fetchRoom();
        }
    }, [roomid]);
    return (
        <div>
            <h1>
                Booking Screen
            </h1>
            <h1>
                Room id= {roomid}
            </h1>
        </div>
    )
}

export default Bookingscreen
