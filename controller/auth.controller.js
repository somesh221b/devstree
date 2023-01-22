const bcrypt = require("bcrypt");
var jwt = require('jsonwebtoken');
const user = require("../model/user");
let SECRET_TOKEN = "8y/B?D(G+KbPeShVmYq3t6w9z$C&F)H@McQfTjWnZr4u7x!A%D*G-KaNdRgUkXp2"

const signUp = async (req, res, next) => {
    try {
        const userDetails = await user.findOne({ email: req.body.email }).catch((e) => {
            console.log(e);
        })
        if (userDetails) {
            return res.send("User Already Exist")
        } else {
            let pwd = await bcrypt.hash(req.body.pwd, 12);
            console.log("pwd", pwd);
            const userData = {
                name: req.body.name ?? '',
                email: req.body.email,
                role: 2,
                password: pwd,
                status: req.body.status ?? true
            };
            const newUser = await user.create(userData).catch((e) => { console.log("error:-", e); });

            return res.send(newUser)
        }


    } catch (e) {
        console.log("error:-", e);
    }
};

const logIn = async (req, res) => {
    try {
        const email = req.body.email;
        const pwd = req.body.pwd;
        const userDetails = await user.findOne({ email }).catch(e => { console.log(e); });
        if (userDetails) {
            bcrypt.compare(pwd, userDetails.password).then(result => {
                if (result) {
                    let token = jwt.sign({ _id: userDetails._id, role: userDetails.role }, SECRET_TOKEN)
                    userDetails.accessToken = token;
                    userDetails.save();
                    return res.send({
                        "Message": "Successfully logIn !",
                        "User": userDetails
                    })
                } else {
                    return res.send("Invalid password !")
                }
            })
        } else {
            return res.send("Invalid User !")
        }
    } catch (e) {
        console.log(e);
    }
}
const verifyToken = async (req, res, next) => {
    try {
        console.log('req.header', req.headers.authorization);
        if (!req.headers.authorization) {
            return res.send('please give accessToken in header');
        }

        const token = req.headers.authorization;
        console.log('token', token);
        jwt.verify(token, SECRET_TOKEN, (err, decoded) => {
            if (err) {
                return res.send('Invalid accessToken');
            } else {
                console.log("sucessfully token verified", decoded);

                req.body.permision = decoded.role;
                req.body.userId = decoded._id;
                next();
            }
        })
    } catch (e) {
        console.log("error:-", e);
    }
}
module.exports = {
    signUp,
    logIn,
    verifyToken,
};