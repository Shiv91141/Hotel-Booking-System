import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Room from '../components/Room';

function Homescreen() {
    const [rooms, setrooms] = useState([]);
    const [loading, setloading] = useState();
    const [error, seterror] = useState();
    useEffect(() => {
        const fetchRooms = async () => {
            try {
                setloading(true);
                const { data } = await axios.get('/api/rooms/getallrooms');
                setrooms(data);
                setloading(false);
            } catch (error) {
                seterror(true);
                console.error('Error fetching rooms:', error);
                setloading(false);
            }
        };

        fetchRooms();
    }, []);
    return (
        <div className='container'>
            <div className="row justify-content-center mt-5">
                {loading ? (<h1>Loading...</h1>) : error ? (<h1>Error</h1>) : (rooms.map((room) => {
                    return (<div className="col-md-9 mt-2" key={room.id}>
                        <Room room={room} />
                    </div>)
                }))}
            </div>

        </div>
    )
}

export default Homescreen
