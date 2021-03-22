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



router.get('/', async (req,res) => {
    try{
        const claims = await Claim.find();
        res.json(claims);
    }catch(err){
        res.json({message:err});
    }
});

router.get('/:userId', async (req,res) => {
    try{
    const uclaim = await Claim.findById(req.params.userId);
    res.json(uclaim);
    }catch(err){
        res.json({message:err});
    }
});

//delete claim
router.delete('/:userId', async (req,res) => {
    try{
    const claimRemoval = await Claim.remove({_id:req.params.userId});
    res.json(claimRemoval);
    }catch(err){
        res.json({message:err});
    }
});

//update a claim
router.patch('/:userId', async (req,res) => {
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

router.post('/addnew', upload.single('evidence'), async (req,res) => {
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
    }
});

router.get('/update', verify, (req,res) => {
    res.send(req.user);
});


module.exports = router;