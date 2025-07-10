// backend/src/services/rdsService.js
import AWS from 'aws-sdk';

export const configureAWS = (accessKeyId, secretAccessKey, region = 'us-east-1') => {
  AWS.config.update({
    accessKeyId,
    secretAccessKey,
    region
  });

  return new AWS.RDS();
};

export const listRDSInstances = async (accessKeyId, secretAccessKey, region) => {
  const rds = configureAWS(accessKeyId, secretAccessKey, region);

  try {
    const result = await rds.describeDBInstances().promise();

    const instances = result.DBInstances.map(instance => ({
      dbInstanceIdentifier: instance.DBInstanceIdentifier,
      engine: instance.Engine,
      engineVersion: instance.EngineVersion,
      dbInstanceClass: instance.DBInstanceClass,
      storageEncrypted: instance.StorageEncrypted,
      publiclyAccessible: instance.PubliclyAccessible,
      multiAZ: instance.MultiAZ,
      backupRetentionPeriod: instance.BackupRetentionPeriod,
      iamAuthentication: instance.IAMDatabaseAuthenticationEnabled,
      endpoint: {
        address: instance.Endpoint?.Address || null,
        port: instance.Endpoint?.Port || null
      },
      vpcSecurityGroups: instance.VpcSecurityGroups.map(group => ({
        vpcSecurityGroupId: group.VpcSecurityGroupId,
        status: group.Status
      })),
      tags: [] // You can fetch tags via rds.listTagsForResource({ ResourceName: arn }) if needed
    }));

    return instances;
  } catch (err) {
    throw new Error(err.message);
  }
};
