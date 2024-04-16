
import { Runtime, Code, LayerVersion } from 'aws-cdk-lib/aws-lambda';
import * as path from 'path';

import { CfnOutput } from 'aws-cdk-lib';

const prismaLayer = new LayerVersion(this, 'PrismaLayer', {
    compatibleRuntimes: [Runtime.NODEJS_16_X],
    description: 'Prisma Layer',
    code: Code.fromAsset(path.join(__dirname, '../src/layers/prisma'), {
        bundling: {
            image: Runtime.NODEJS_16_X.bundlingImage,
            command: [
                'bash',
                '-c',
                [
                    'cp package.json package-lock.json api.js client.js /asset-output',
                    'cp -r prisma /asset-output/prisma',
                    'cp -r node_modules /asset-output/node_modules',
                    'rm -rf /asset-output/node_modules/.cache',
                    'rm -rf /asset-output/node_modules/.prisma/client/*darwin*' || true,
                    'rm -rf /asset-output/node_modules/.prisma/client/*windows*' || true,
                    'rm -rf /asset-output/node_modules/@prisma/engines/node_modules',
                    'rm -r /asset-output/node_modules/@prisma/engines/*darwin* || true',
                    'rm -r /asset-output/node_modules/@prisma/engines/*debian* || true',
                    'rm -f /asset-output/node_modules/prisma/*darwin* || true',
                    'rm -f /asset-output/node_modules/prisma/*debian* || true',
                    'rm -f /asset-output/node_modules/prisma/*windows* || true',
                    'npx prisma generate',
                ].join(' && '),
            ],
        },
    }),
    layerVersionName: `prisma-layer`,
});

new CfnOutput(this, 'PrismaLayerVersionArn', { value: prismaLayer.layerVersionArn });