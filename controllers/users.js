const User = require('../models/User.js');
const signToken = require('../serverAuth').signToken;

module.exports = {
	// list all users
	index: (req, res) => {
		User.find({}, (err, users) => {
			if(err) return res.json({message: "ERROR", payload: null, code: err.code})
			res.json({ message: "SUCCESS", payload: users})
		})
	},

	// get one user
	show: (req, res) => {
		User.findById(req.params.id, (err, user) => {
			if(err) return res.json({message: "ERROR", payload: null, code: err.code})
			res.json({ message: "SUCCESS", payload: user })
		})
	},

	// create a new user
	create: (req, res) => {
		console.log(req.body)
		User.create(req.body, (err, user) => {
			if(err) return res.json({message: "ERROR", payload: err, code: err.code})
			const token = signToken(user);
			res.json({ message: "SUCCESS", token })
		})
	},

	// update an existing user
	update: (req, res) => {
		User.findById(req.params.id, (err, user) => {
			if(!req.body.password) delete req.body.password
			Object.assign(user, req.body)
			user.save((err, updatedUser) => {
				if(err) return res.json({message: "ERROR", payload: null, code: err.code})
				const token = signToken(updatedUser);
				res.json({ message: "SUCCESS", token })
			})
		})
	},

	// delete an existing user
	destroy: (req, res) => {
		User.findByIdAndRemove(req.params.id, (err, user) => {
			if(err) return res.json({message: "ERROR", payload: null, code: err.code})
			res.json({ message: "SUCCESS", payload: user })
		})
	},

	authenticate: (req, res) => {
		let { email, password } = req.body;
		User.findOne({ email }, (err, user) => {
			if (!user || !user.validPassword(password)) {
				return res.json({ success: false, message: "Invald Credentials." })
			}

			const token = signToken(user);
			res.json({ success: true, token });
		})
	}
}