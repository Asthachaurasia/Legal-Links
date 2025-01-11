
require('dotenv').config();
const express = require('express');
const connectDB = require('./db/db.config');
const User = require('./models/users');
const io= require('socket.io')(8080,{
  cors:{
    origin:'http://localhost:3000'
  }
})
//routes
const authRoutes = require('./routes/auth.routes');
const categoryRoutes = require('./routes/category.routes');
const lawyerRoutes = require('./routes/lawyer.routes');
const conversation = require('./routes/conversation.routes');
const message = require('./routes/message.routes');

const cors= require('cors');
const app = express();

// Connect to MongoDB
connectDB(); // No need to pass process.env.DB_URL

// Middleware

app.use(express.json());
app.use(cors());
let users =[];
io.on('connection',socket=>{ 
  console.log('user connected',socket.id);
  socket.on('addUser',(userId)=>{
    const isUserExist = users.find(user=>user.userId === userId);
    if(!isUserExist){
      const user = {userId,socketId:socket.id};
      users.push(user);
      console.log('users',users);
      io.emit('getUsers',users);
    }
    
  });
   
     socket.on('sendMessage',async({senderId,receiverId,message,conversationId})=>{
      const receiver = users.find(user=>user.userId === receiverId);
      const sender = users.find(user=>user.userId === senderId);
      const user = await User.findById(receiverId);
      if(receiver){
      io.to(receiver.socketId).to(sender.socketId).emit('getMessage',{
        senderId,
        message,
        conversationId,
        receiverId,
        user:{id:user._id,email:user.email,name:user.name}
      });}

      else{
        if(sender){
        io.to(sender.socketId).emit('getMessage',{
          senderId,
          message,
          conversationId,
          receiverId,
          user:{id:user._id,email:user.email,name:user.name}
        });
      }}
    });


  socket.on('disconnect',()=>{
    users = users.filter(user=>user.socketId !== socket.id);
    console.log('users',users);
    io.emit('getUsers',users);
  });

  // io.emit('getUsers',socket.userId);
});

// Use authentication routes
app.use('/auth', authRoutes);
app.use('/category',categoryRoutes);
app.use('/lawyer', lawyerRoutes);
app.use('/conversation', conversation);
app.use('/message', message);


// Test route
app.get('/', (req, res) => {
  res.send('Server is up and running');
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
