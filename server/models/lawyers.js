const mongoose = require('mongoose');

const lawyerSchema = new mongoose.Schema({
  lid:{
    type: mongoose.Schema.Types.ObjectId,
    default: () => new mongoose.Types.ObjectId() 
  },
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

  bio: { 
    type: String,
    required: false 
},

   
  ratings: { 
    type: Number, 
    default: 0 
},  // Average rating of the lawyer

  experience: { 
    type: Number, 
    required: true 
},  // Years of experience

   category:[{
    type: mongoose.Schema.Types.ObjectId,
    ref:"category"
     

   }],
    

   
 messages: [
     { 
     type: mongoose.Schema.Types.ObjectId, 
     ref: 'Message' 
 }
 ]

}, { timestamps: true }

);

const Lawyer = mongoose.model('Lawyer', lawyerSchema);

module.exports = Lawyer;
