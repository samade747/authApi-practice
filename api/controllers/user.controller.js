import bcrypt from "bcryptjs"
import User from "../models/user.model.js"

export const createNewUser = async (req, res) => {
    const { email, username, name, password } = req.body

    if (!email || !username || !name || !password) {
        return res.status(400).json({
            error: "All fields are required!"
        })
    }

    const user = await User.findOne({ $or: [{ email }, { username }] });

    if(user){
        return res.status(400).json({
            error: "User already exists!"
        })
    }


    //HASH PASSWORD
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
        email: email,
        username: username,
        name: name,
        password: hashedPassword
    })

    const createdUser = await newUser.save()

    res.status(201).json({
        message: "Account created sucessfully",
        data: createdUser
    })

}

