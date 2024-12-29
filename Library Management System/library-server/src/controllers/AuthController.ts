import { NextFunction, Request, Response } from 'express';
import { register,login } from '../services/UserService';
import { IUser } from '../models/User';
import { IUserModel } from '../daos/UserDao';
import { InvalidUsernameOrPasswordError } from '../utils/LibraryErrors';

async function handleRegister(req: Request, res: Response,next:NextFunction) {
    const user: IUser = req.body;

    try {
        const registerdUser = await register(user);

        res.status(201).json({
            message: "WHOA! User Successfully Created!",
            user: {
                _id: registerdUser._id, 
                type: registerdUser.type,
                firstName: registerdUser.firstName,
                lastName: registerdUser.lastName,
                email: registerdUser.email
            }
        });

    } catch (error: any) {
        if(error.message.includes("E11000 duplicate key error collection:")){
            res.status(409).json({message:"Oh No!, User with email Already exists!", error:error.message});
        }
        else{
            res.status(500).json({ message: "Sorry, Unable to register user at this time", error: error.message });
        }
        
    }
}
async function handleLogin(req:Request,res:Response) {
    const credentials=req.body;

    try {
        const loggedIn:IUserModel = await login(credentials);

        res.status(200).json({
            message:"User logged in succesfully!",
            user: {
                _id: loggedIn._id,
                type:loggedIn.type,
                firstName:loggedIn.firstName,
                lastName:loggedIn.lastName,
                email:loggedIn.email
            }
        })
    } catch (error:any) {
        if(error instanceof InvalidUsernameOrPasswordError){
            res.status(401).json({message:"Unable to login user at this time",error:error.message});
        }
        else{
        res.status(500).json({message:"Unable to login user at this time",error:error.message});
        }
    }
}
export default { handleRegister,handleLogin };
