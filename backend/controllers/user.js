const bcrypt =require('bcrypt')
const User=require('../models/User')
const jwt=require('jsonwebtoken')





exports.signup=(req,res,next)=>{
   

    bcrypt.hash(req.body.password,10)
    .then(hash=>{
        
        const user=new User({
            email:req.body.email,
            password:hash
        });
        user.save().then(()=>res.status(201).json({message:'Utilisateur crée !'})).catch(error=>res.status(400).json({error}))
    }).catch(error=>res.status(500).json({error}))
    
    }

    exports.login=(req,res,next)=>{
        //on va chercher un seul utilisateur en utilisant le findOne et filtrer avec l'objet de comparaison 
        // on veut que ce soit l'utilisateur pour qui l'adresse mail correspond à l'adresse mail envoyé dans la requete
        User.findOne({email:req.body.email}).then(user=>{
            if(!user){
                return res.status(401).json({error: 'utilisateur non trouvé!'})
            }
            bcrypt.compare(req.body.password,user.password).then(valid=>{
                if(!valid){
                    return res.status(401).json({error:'Mot de passe incorrect'})
                }
                return res.status(200).json({// on renvoie le user id et le token
                    userId:user._id,
                    token:jwt.sign({userId:user._id},
                        'udl*VFMnxp5Crly-({',
                        {expiresIn:'24h'})
                });
            }).catch(error =>res.status(500).json({error}))
        }
        
        ).catch(error =>res.status(500).json({error}))
        
        
        
        }