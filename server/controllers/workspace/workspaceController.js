const mongoose = require('mongoose');

const Workspace = mongoose.model('Workspace');
const emailService = require('../../common/emailService');

const returnSuccess = (req, res) => res.jsonSuccess();
const returnMessages = (req, res) => res.jsonSuccess(res.locals.messages);

const getList = async(req, res, next) => {
    var results = await Workspace.find({});
    res.locals.messages = results;
    return next();
}

const sendEmail = async(req, res, next) => {
    console.log('workemail data====:', req.body);
    emailService.sendEmail(req, res, function(result) {
        var results = { message: 'Successfully sent email'};
        res.locals.messages = results;
        return next();
    });
}

module.exports = {
    getList,
    sendEmail,
    returnSuccess,
    returnMessages,
    create (req, res) {
        // console.log("=====", req.body);
        Workspace.findOne({
            email: req.body.email
        })
        .then(async user => {
            if (user) {
                res.status(406).send({ error: 'Workspace already exists' });
            } else {
                try {
                    const workspace = await new Workspace({
                        fullName: req.body.fullName,
                        displayName: req.body.displayName,
                        email: req.body.email,
                        password: req.body.password
                    }).save();
                    res.status(200).send({ message: 'Workspace created successfully' });
                } catch (err) {
                    res.status(422).send(err);
                }
            }
        })
        .catch(res.negotiate);
    }
}