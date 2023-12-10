import {IAspect} from "aws-cdk-lib";
import {IConstruct} from "constructs";
import {CfnBucket} from "aws-cdk-lib/aws-s3";

export class BucketTagger implements IAspect {
    private readonly key: string
    private readonly value: string

    constructor(key: string, value: string) {
        this.key = key;
        this.value = value;
    }

    visit(node: IConstruct) {
        if (node instanceof CfnBucket) {
            node.tags.setTag(this.key, this.value)
        }
    }
}
