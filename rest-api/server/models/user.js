const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');
const UserSchema = new mongoose.Schema({
    email : {
        type : String,
        required: true,
        minlength : 1,
        trim : true,
        unique:  true,
        validate : {
            validator : (value) => {
                return validator.isEmail(value);
            },
            message : '{VALUE} is not a valid email'
        }
    },

    password : {
        type : String,
        require : true,
        minlength : 6
    },

    tokens : [{
        access : {
            type : String,
            required : true
        },

        token : {
            type : String,
            required : true
        }
    }]

})

UserSchema.methods.generateAuthToken = function () {
    const user = this;
    let access = 'auth';
    let token = jwt.sign({_id : user._id.toString(), access}, 'emeka').toString();

    user.tokens.push({access, token})

    return user.save().then(() => {
        return token;
    })
};


UserSchema.methods.toJSON = function () {
    var user = this;
    var userObject = user.toObject();
    
    return _.pick(userObject, ['_id', 'email'])
}

UserSchema.statics.findByToken = function(token) {
    var User = this;
    var decoded;

    try {
        decoded =  jwt.verify(token, 'emeka');
    } catch (error) {
        return new Promise((resolve, reject) => {
            reject(error);
        });

        //return Promise.reject(error)
    }
    
    return User.findOne({
        '_id' : decoded._id,
        'tokens.token' : token,
        'tokens.access' : 'auth'
    })
}

//called before save
UserSchema.pre('save', function(next) {
    var user = this;

    if(user.isModified('password')) {
        bcrypt.genSalt(10, (error, salt) => {
            bcrypt.hash(user.password, salt, (err, hash) => {
                user.password = hash;
                next();
            })
        })
    } else {
        next();
    }

});

var User = mongoose.model('User', UserSchema)

module.exports = {User}