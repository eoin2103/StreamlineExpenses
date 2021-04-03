const router = require('express').Router();
const verify = require('./verifyJWT');
const Claim = require('../model/Claim');
const multer = require('multer');
const fs = require('fs');
 
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + '.png')
    }
});
 
const upload = multer({ storage: storage });



router.get('/all', verify, async (req,res) => {
    try{
        const claims = await Claim.find();
        res.json(claims);
    }catch(err){
        res.json({message:err});
    }
});

router.get('/:userID', verify, async (req,res) => {
    try{
    const uclaim = await Claim.find({userID: req.params.userID});
    res.json(uclaim);
    }catch(err){
        res.json({message:err});
    }
});

//delete claim
router.delete('/:claimId', verify, async (req,res) => {
    try{
    const claimRemoval = await Claim.remove({_id:req.params.claimId});
    res.status(200).json(claimRemoval);
    }catch(err){
        res.json({message:err});
    }
});

//update a claim
router.patch('/:userId', verify, async (req,res) => {
    try{
        const claimUpdate = await Claim.updateOne({_id:req.params.userId}, 
            {$set: {title:req.body.title}}
            );
            res.json(claimUpdate);
    }catch(err){
        res.json({message:err});
    }
});


router.get('/addnew', verify, (req,res) => {
    res.send(req.user);
});

router.post('/addnew', verify, upload.single('evidence'), async (req,res) => {
    const newclaim = new Claim({
        title: req.body.title,
        description: req.body.description,
        amount: req.body.amount,
        date: req.body.date,
        evidence:`http://localhost:3000/${req.file.filename}` ,
        timestamp: req.body.timestamp,
        userID: req.body.userID
    });
    try{
    const nclaim = await newclaim.save();
    res.json(nclaim);
    }catch(err){
        res.status(500).send('Internal Server Error');
        console.log(err);      
    }
});

router.get('/update', verify, (req,res) => {
    res.send(req.user);
});


module.exports = router;