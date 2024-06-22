import React, { useState, useEffect } from 'react'
import axios from 'axios';

function Homescreen() {
    const [rooms, setrooms] = useState([]);
    useEffect(() => {
        const fetchRooms = async () => {
            try {
                const { data } = await axios.get('/api/rooms/getallrooms');
                setrooms(data);
            } catch (error) {
                console.error('Error fetching rooms:', error);
            }
        };

        fetchRooms();
    }, []);
return (
    <div>
        <h1>Home Screen</h1>
        <h1>there are {rooms.length} rooms</h1>
    </div>
)
}

export default Homescreen
