const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  uid:{
    type: mongoose.Schema.Types.ObjectId,
    default: () => new mongoose.Types.ObjectId() 
  } , 
  name: {
     type: String, 
     required: true 
},
  email: { 
    type: String,
        required: true,
        validate: {
            validator: function (value) {
                return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value);
            },
            message: 'Please provide a valid email address',
        },
},
  password: {  
       type: String,
        required: true,
        minlength: 6,
},
  role: { 
    type: String, enum: ['user', 'lawyer', 'admin'], 
    required: true 
},

gender: {
    type: String,
    enum: ['Male', 'Female', 'Other'],
    required: true,
},

age: {
    type: Number,
    required: true,
    min: 0,
},

messages: [
    { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Message' 
}
]

  
}, 
{ timestamps: true }
);

const User = mongoose.model('User', userSchema);

module.exports = User;
