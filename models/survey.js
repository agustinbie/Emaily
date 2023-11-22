const mongoose  = require("mongoose");
const { Schema } = mongoose;
const RecipientSchema = require("./recipient"); //no hace falta entonces require en el index

const surveySchema = new Schema({
    title: String,
    body: String, 
    subject: String,
    recipients: [RecipientSchema],
    yes: {type: Number, default: 0},
    no: {type: Number, default: 0},
    _user: {type: Schema.Types.ObjectId, ref: "user"}, //cada survey va a pertenecer a un usuario en particular
    dateSent: Date,
    lastResponded: Date //si hace dos semanas ya no te responde nadie, es probable que ya nadie lo haga
});

mongoose.model("surveys", surveySchema);