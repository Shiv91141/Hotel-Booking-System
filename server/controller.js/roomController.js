const Room =require('../models/room');

const GetAllRooms=async(req,res)=>{
    try {
        const rooms= await Room.find({});
        return res.status(200).json(rooms);
    } catch (error) {
        return res.status(400).json({message:error});
    }
    
};
const GetRoom=async(req,res)=>{
    const {roomid} =req.body;
    try {
        const room= await Room.findOne({_id: roomid});
        return res.status(200).json(room);
    } catch (error) {
        return res.status(400).json({message:error});
    }
};
const AddRoom=async (req,res)=>{
    try {
        const newroom= new Room(req.body)
        await newroom.save()
        
        res.send('New Room Added Successfully')
    } catch (error) {
        return res.status(400).json({error})
    }
}
module.exports= {GetAllRooms,GetRoom,AddRoom};
