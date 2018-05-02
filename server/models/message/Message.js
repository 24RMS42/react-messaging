const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MessageSchema = new Schema({  
  roomId: {
    type: Schema.Types.ObjectId,
    required: true
  },
  body: {
    type: String,
    required: true
  },
  author: {
    // type: Schema.Types.ObjectId,
    // ref: 'User'
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
  }
},
{
  timestamps: true // Saves createdAt and updatedAt as dates. createdAt will be our timestamp.
});

module.exports = mongoose.model('Message', MessageSchema);  
