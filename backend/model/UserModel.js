const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    mobileNo: {
        type: String
    },
    password: {
        type: String
    }
}, {
    timestamps: true
});

UserSchema.methods.toJSON = function () {
	var obj = this.toObject();
	delete obj.password;
	return obj;
}

module.exports = mongoose.model('users', UserSchema)