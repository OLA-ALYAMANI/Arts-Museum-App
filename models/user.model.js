const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
let salt = 10;

const userSchema = mongoose.Schema({
    type: {
        type: String,
        enum: ["regular", "tourGuide", "admin"],
        required: true,
        default: "regular"
    },

    firstName: {
        type: String,
        required: true
    },

    lastName: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true
    },
     password: {
        type: String,
        required: true,
    },

    bookedTours:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:'Tour',
        }
    ]

}, { timestamps: true });

//Encrypt the password before saving it
userSchema.pre('save', function (next) {
    if (this.isModified("password"))
        this.password = bcrypt.hashSync(this.password, salt)

    next();
})

userSchema.methods.verifyPassword=function(password){
    return bcrypt.compareSync(password, this.password)
}

userSchema.methods.updatePassword=function(password){
    this.password = password;
}


const User = mongoose.model('User', userSchema)
module.exports = User;