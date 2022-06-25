const bcrypt =require('bcrypt')
const User=require('../models/User')
const jwt=require('jsonwebtoken')

const cryptojs=require('crypto-js')



exports.signup=(req,res,next)=>{
    const emailCrypto=cryptojs.HmacSHA256(req.body.email,"SECRET_KEY").toString()

    bcrypt.hash(req.body.password,10)
    .then(hash=>{
        
        const user=new User({
            email:emailCrypto,
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
                return res.status(200).json({
                    userId:user._id,
                    token:jwt.sign({userId:user._id},
                        'RANDOM_TOKEN_SECRET',
                        {expiresIn:'24h'})
                });
            }).catch(error =>res.status(500).json({error}))
        }
        
        ).catch(error =>res.status(500).json({error}))
        
        
        
        }