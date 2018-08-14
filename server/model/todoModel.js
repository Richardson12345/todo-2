var mongoose = require("mongoose");
var Schema = mongoose.Schema;

let todoSchema = new Schema({
    todo: { 
        type: String,
        required : true
    },
    description: {
        type: String,
        required: true
    },
    due: {
        type: Date,
        required: true
    },
    status: {
        type: Boolean,
        default: false
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User' 
    }
}, {
    timestamps: true
})

let todoModel = mongoose.model("Todo", todoSchema);

module.exports = todoModel;
