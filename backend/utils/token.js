import jwt from "jsonwebtoken"

const genToken = async(userId)=>{
   try {
    const token = await jwt.sign({userId},process.env.JWT_SECRET, {expiresIn: "7d"})  //7 days k bad apne ap logout hoga
   } catch (error) {
     console.log(error);
     
   }
}

export default genToken;