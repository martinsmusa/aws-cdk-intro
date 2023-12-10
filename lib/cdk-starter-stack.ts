import * as cdk from 'aws-cdk-lib';
import {Construct} from 'constructs';
import {Bucket, CfnBucket} from "aws-cdk-lib/aws-s3";
import {CfnOutput, CfnParameter, Duration} from "aws-cdk-lib";

class L3Bucket extends Construct {
    constructor(scope: Construct, id: string, expiration: number) {
        super(scope, id);

        new Bucket(this, id, {
            lifecycleRules: [{
                expiration: Duration.days(expiration)
            }]
        })
    }
}

export class CdkStarterStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        // Create new s3 bucket

        // L1 construct
        new CfnBucket(this, 'L1Bucket', {
            lifecycleConfiguration: {
                rules: [{
                    expirationInDays: 1,
                    status: 'Enabled'
                }]
            }
        })

        const duration = new CfnParameter(this, 'duration', {
            default: 6,
            minValue: 2,
            maxValue: 10,
            type: 'Number'
        })

        // L2 construct
        const l2Bucket = new Bucket(this, 'L2Bucket', {
            lifecycleRules: [{
                expiration: Duration.days(duration.valueAsNumber)
            }]
        })

        new CfnOutput(this, 'L2BucketName', {
            value: l2Bucket.bucketName
        })

        // L3 construct
        new L3Bucket(this, 'L3Bucket', 3)
    }
}
