const Admin = require("../models/administradoresModelo")
const bcrypt = require("bcryptjs")
const { generarJwt } = require("../helpers/jwt")



const getAdmin = async (req, res) => {

    try {
        const usuarios = await Admin.find()

        return res.status(200).json({
            ok: true,
            msg: 'admins:',
            total_usuarios: usuarios.length,
            data: usuarios
        })
    } catch (error) {
        return res.status(404).json({
            ok: false,
            msg: 'Error retriving data'
        })
    }
}


const crearAdmin = async (req, res) => {


    const { usuario, pass, mail } = req.body


    const user = await Admin.findOne({ mail })



    try {
        if (user) {
            return res.status(400).json({
                ok: false,
                msg: 'email allready in use'
            })
        } else {

            const nuevoAdmin = new Admin(req.body);
           

            let salt = bcrypt.genSaltSync(10);

            nuevoAdmin.pass = bcrypt.hashSync(pass, salt);
            
            await nuevoAdmin.save()

            const token = await generarJwt(nuevoAdmin.id, usuario)

            console.log(token);
            
            return res.status(201).json({

                ok: true,
                uid: nuevoAdmin.id,
                usuario: nuevoAdmin.usuario,
                mail: nuevoAdmin.mail,
                token

            })

        }

    } catch (error) {

        return res.status(500).json({
            ok: false,
            msg: 'ERROR.'
        });

    }
}

const loginAdmin = async (req, res) => {

    const { usuario, pass, mail  } = req.body


    const admin = await Admin.findOne({ mail })

    const passAdmin= bcrypt.compareSync(pass, admin.pass)

    try {
        if (!admin) {
            return res.status(401).json({
                ok: false,
                msg: 'no admin whith theese data'
            })
        } else if (!passAdmin) {
            return res.status(401).json({
                ok: false,
                msg: 'wrong password'
            })
        } else {
            const token = await generarJwt(admin.id, usuario)
            return res.status(200).json({
                ok: true,
                msg: 'check Password',
                data:{
                    msg:"token: ",
                    token
                }
            })
        }
    } catch (error) {

        return res.status(500).json({
            ok: false,
            msg: 'ERROR'
        });

    }
}


//*renew


const renew = (req, res) => {

    const { uid, nombre } = req;
    const token = jwtGenerator(uid, nombre);

    return res.status(200).json({
        ok: true,
        user: {
            uid,
            nombre
        },
        msg: 'renew jwt',
        token
    })
}



module.exports = {
    getAdmin,
    crearAdmin,
    loginAdmin,
    renew
}