import AWS from 'aws-sdk';

export const configureAWS = (accessKeyId, secretAccessKey, region = 'us-east-1') => {
    AWS.config.update({ accessKeyId, secretAccessKey, region });
    return new AWS.EC2();
};

export const listEC2Instances = async (accessKeyId, secretAccessKey, region) => {
    const ec2 = configureAWS(accessKeyId, secretAccessKey, region);

    const instanceResults = [];
    const securityGroupResults = [];

    try {
        const { Reservations } = await ec2.describeInstances().promise();

        Reservations.forEach(reservation => {
            reservation.Instances.forEach(instance => {
                instanceResults.push({
                    instanceId: instance.InstanceId,
                    instanceType: instance.InstanceType,
                    state: instance.State.Name,
                    publicIp: instance.PublicIpAddress || null,
                    privateIp: instance.PrivateIpAddress || null,
                    launchTime: instance.LaunchTime,
                    keyName: instance.KeyName || null,
                    securityGroups: instance.SecurityGroups.map(sg => ({
                        groupId: sg.GroupId,
                        groupName: sg.GroupName
                    })),
                    tags: instance.Tags || []
                });
            });
        });

        const { SecurityGroups } = await ec2.describeSecurityGroups().promise();
        SecurityGroups.forEach(group => {
            securityGroupResults.push({
                groupId: group.GroupId,
                groupName: group.GroupName,
                description: group.Description,
                inboundRules: group.IpPermissions.map(rule => ({
                    protocol: rule.IpProtocol,
                    portRange: rule.FromPort === rule.ToPort ? `${rule.FromPort}` : `${rule.FromPort}-${rule.ToPort}`,
                    source: rule.IpRanges.map(ip => ip.CidrIp).join(', ')
                })),
                outboundRules: group.IpPermissionsEgress.map(rule => ({
                    protocol: rule.IpProtocol,
                    portRange: rule.FromPort === rule.ToPort ? `${rule.FromPort}` : `${rule.FromPort}-${rule.ToPort}`,
                    destination: rule.IpRanges.map(ip => ip.CidrIp).join(', ')
                }))
            });
        });

        return {
            instances: instanceResults,
            securityGroups: securityGroupResults
        };

    } catch (error) {
        throw new Error(error.message);
    }
};
