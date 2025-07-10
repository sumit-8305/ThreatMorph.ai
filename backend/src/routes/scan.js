import express from 'express';
import {
    listEC2Instances,
    listS3Buckets,
    listRDSInstances,
    listIAMUsers
} from '../services/awsServices.js';
import axios from 'axios';
import Scan from '../models/scans.js';
import User from '../models/user.js';
import { protect } from '../middleware/authMiddleware.js';




const router = express.Router();

router.get('/', protect, (req, res) => {
    res.send('Scan API is working');
});

router.post('/start', protect, async (req, res) => {
    const { accessKeyId, secretAccessKey, region } = req.body;
    if (!accessKeyId || !secretAccessKey || !region) {
        return res.status(400).json({ message: 'Missing AWS credentials or region' });
    }

    try {
        const [ec2Instances, s3Buckets, rdsInstances, iamUsers] = await Promise.all([
            listEC2Instances(accessKeyId, secretAccessKey, region),
            listS3Buckets(accessKeyId, secretAccessKey, region),
            listRDSInstances(accessKeyId, secretAccessKey, region),
            listIAMUsers(accessKeyId, secretAccessKey)
        ]);

        const awsData = {
            ec2: ec2Instances,
            s3: s3Buckets,
            rds: rdsInstances,
            iam: iamUsers
        };


        // Step 2: Send to AI for threat detection and fix suggestions
       console.log("req send = ",awsData);
        const { threats, fixes } = (await axios.post('http://localhost:5000/api/analyze', awsData)).data;
        console.log("res recvd");

        console.log(threats);
        console.log(fixes);
        const scan = await Scan.create({
            user: req.user,
            threats,
            fixes,
            awsData,
            region
        });
        console.log(scan);
        await User.findByIdAndUpdate(req.user, { $push: { scans: scan._id } });
        // Step 3: Send combined result to frontend
        return res.status(200).json({
            awsData,
            threats,
            fixes
        });
    } catch (err) {
        console.error('Scan Error:', err.message);
        return res.status(400).json({ message: err.message || 'Scan failed' });
    }
});

export default router;
