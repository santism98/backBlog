const jwt=require("jsonwebtoken")

const generarJwt=(uid,name)=>{


    return new Promise((resolve,reject)=>{

        let payload={uid,name}
        jwt.sign(payload,
            process.env.JWT_SECRET_KEY,
            {expiresIn:"3h"},
                (error,token)=>{
                    if(error){
                        console.log(error);
                        reject("error generating token")
                    }else{
                        resolve(token)
                    }
                })
    })
}



module.exports={
    generarJwt
}