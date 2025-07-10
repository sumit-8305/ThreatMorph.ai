import AWS from 'aws-sdk';

export const configureS3 = (accessKeyId, secretAccessKey, region = 'us-east-1') => {
    AWS.config.update({
        accessKeyId,
        secretAccessKey,
        region
    });
    return new AWS.S3();
};

export const listS3Buckets = async (accessKeyId, secretAccessKey, region) => {
  const s3 = configureS3(accessKeyId, secretAccessKey, region);
    const output = [];

    const buckets = await s3.listBuckets().promise();

    for (const bucket of buckets.Buckets) {
        const name = bucket.Name;
        const creationDate = bucket.CreationDate;

        const details = {
            name,
            creationDate,
            acl: null,
            encryptionEnabled: false,
            loggingEnabled: false,
            versioningEnabled: false,
            isPublic: false,
            hasPolicy: false,
            publicAccessBlock: null
        };

        try {
            const acl = await s3.getBucketAcl({ Bucket: name }).promise();
            details.acl = acl;
            details.isPublic = acl.Grants.some(grant =>
                grant.Grantee.URI === 'http://acs.amazonaws.com/groups/global/AllUsers'
            );
        } catch (e) { }

        try {
            const enc = await s3.getBucketEncryption({ Bucket: name }).promise();
            details.encryptionEnabled = !!enc.ServerSideEncryptionConfiguration;
        } catch (e) { }

        try {
            const log = await s3.getBucketLogging({ Bucket: name }).promise();
            details.loggingEnabled = !!log.LoggingEnabled;
        } catch (e) { }

        try {
            const ver = await s3.getBucketVersioning({ Bucket: name }).promise();
            details.versioningEnabled = ver.Status === 'Enabled';
        } catch (e) { }

        try {
            const policy = await s3.getBucketPolicy({ Bucket: name }).promise();
            details.hasPolicy = !!policy.Policy;
        } catch (e) { }

        try {
            const pab = await s3.getPublicAccessBlock({ Bucket: name }).promise();
            details.publicAccessBlock = pab.PublicAccessBlockConfiguration;
        } catch (e) { }

        output.push(details);
    }

    return output;
};
