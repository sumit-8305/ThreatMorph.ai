import AWS from 'aws-sdk';

export const configureIAM = (accessKeyId, secretAccessKey, region = 'us-east-1') => {
  return new AWS.IAM({
    accessKeyId,
    secretAccessKey,
    region
  });
};

export const listIAMUsers = async (accessKeyId, secretAccessKey, region) => {
  const iam = configureIAM(accessKeyId, secretAccessKey, region);

  try {
    const usersResponse = await iam.listUsers().promise();
    const users = usersResponse.Users;

    const detailedUsers = await Promise.all(users.map(async (user) => {
      const userName = user.UserName;

      // Get MFA devices
      const mfaResponse = await iam.listMFADevices({ UserName: userName }).promise();

      // Get attached policies
      const attachedPolicies = await iam.listAttachedUserPolicies({ UserName: userName }).promise();

      // Check for console password (login profile exists)
      let consoleAccess = false;
      try {
        await iam.getLoginProfile({ UserName: userName }).promise();
        consoleAccess = true;
      } catch (err) {
        // If no login profile, console access is false
        consoleAccess = false;
      }

      return {
        userName,
        arn: user.Arn,
        createDate: user.CreateDate,
        mfaDevices: mfaResponse.MFADevices.map(dev => dev.SerialNumber),
        attachedPolicies: attachedPolicies.AttachedPolicies,
        consoleAccess
      };
    }));

    return detailedUsers;
  } catch (err) {
    throw new Error(err.message);
  }
};
