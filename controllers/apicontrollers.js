const Entry = require("../models/articulosModelo")




const getEntries=async(req,res)=>{


const options={
    page:req.query.page,
    limit:2
}

  
    try {

        Entry.paginate({}, options,(err,docs)=>{

           
            return  res.status(200).json({
                ok:true,
                msg:'Obteniendo todos entries',
                data: docs,
                
            })
        })
    } catch (error) {
        return  res.status(404).json({
            ok:false,
            msg:'Error al ob '
        })
     } 
}


const getArticulo= async(req,res)=>{
       console.log('getArticulo');
    const id=req.params.id

    try {
        const unArticulo=await Entry.findById(id) 

        if(!unArticulo){
            return res.status(404).json({
                ok:false,
                msg:'el id esta mal'
            })
        }else{
             return  res.status(200).json({
                ok:true,
                msg:'Obteniendo un articulo ',
                articuloEncontrado:unArticulo
        })
        }
       
    } catch (error) {
        return  res.status(500).json({
            ok:false,
            msg:'Error al obtener el servicio solicitado'
        })
    }
   
}


const createEntry = async (req, res) => {

    const nuevoArticulo = new Entry(req.body);
    

    try {

        const articuloData=nuevoArticulo.save()

        if(!articuloData){

            return res.status(404)
        }else{
            return res.status(201).json({

            ok:true,
            
            msg:"articulo creado",

            data:articuloData
        })
        }
        
        

    } catch (error) {
       
        return res.status(500).json({
            ok: false,
            msg: 'ERROR: no se ha creado el articulo .'
        });

    } 
}


const updateEntry= async(req,res)=>{

    try {  
        const id = req.params.id;
        const title = req.body.title;
        const stract = req.body.stract;
        const text=req.body.text
        const image=req.body.image
        const articuloActualizada = await Entry.findOneAndUpdate({_id:id},{$set:{title,image,text,stract}},{new:true});
            return res.status(201).json({
                ok:true,
                msg:"actualizando articulo",
                data:articuloActualizada
            })
        
    } catch (error) {
        
        return res.status(500).json({
            ok: false,
            msg: 'ERROR: no se ha encontrado el articulo que quiere actualizar.'
        });

    };
}


const eliminarArticulo= async(req,res)=>{

    const id=req.params.id

   try {

        await Entry.findOneAndDelete({_id:id});

        return res.status(200).json({
            ok: true,
            msg: 'articulo eliminado correctamente.'
        });
        
    } catch (error) {
        
        return res.status(500).json({
            ok: false,
            msg: 'ERROR: el articulo  que quiere eliminar no existe.'
        });

    }
}


const getArticuloBusqueda= async(req,res)=>{
   
   
    
    const search= new RegExp( `${req.query.query}`,'i' ) 
    
    
    try {
       
       
        const entries=await Entry.find(

            {$or:[{title:search},{stract:search}] }
        ) 

       

        if(!entries){
            return res.status(404).json({
                ok:false,
                msg:' no hay ningun articulo con esa search '
            })
        }else{
             return  res.status(200).json({
                ok:true,
                msg:'obteniendo las noticias ',
                entries:entries
        })
        }
    } catch (error) {
        return  res.status(500).json({
            ok:false,
            msg:'Error algo esta mal'
        })
    }
}



module.exports={
    getEntries,
    getArticulo,
    createEntry,
    updateEntry,
    eliminarArticulo,
    getArticuloBusqueda
}