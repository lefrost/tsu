import { jobMake, jobRun } from '$all/bunqueue';
import { db, eq, getTableConfig, is, isNotNull, PgTable, schema } from '$all/drizzle';
import { DeleteObjectCommand, GetObjectCommand, HeadObjectCommand, ListObjectsV2Command, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const bucket = process.env.R2_BUCKET!;
const r2 = new S3Client({
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!
  },
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  region: `auto`
});

jobRun({
  dat: {},
  interval: 60 * 60 * 1000, // 60 mins
  job: jobMake({
    fn: async () => {
      const fileCols = Object.values(schema)
        .filter(tab => is(tab, PgTable))
        .flatMap(tab =>
          getTableConfig(tab).columns
          .filter(col => col.name.endsWith(`Filek`))
          .map(col => ({ col, tab })));

      const fileks = new Set(
        (await Promise.all(fileCols
          .map(({ col, tab }) =>
            db.select({ filek: col as any })
              .from(tab)
              .where(isNotNull(col as any)
            ))
        )).flat().map(row => row.filek)
      );

      let contToken;
      do {
        const { ks, nextToken } = await filesGet({ contToken });
        await Promise.all(
          ks.filter(({ k }) =>
            !fileks.has(k)).map(({ k }) => fileDel({ k })
          )
        );
        contToken = nextToken;
      } while (contToken);
    },
    k: `r2StalesDel`,
    size: 1
  }),
  k: `r2StalesDelRun`,
});

function publicUrlGet(k: string) { return `${process.env.PUBLIC_URL}/${k}`; }

export async function fileAdd({ body, k, type } : {
  body: Buffer | Uint8Array | string,
  k: string,
  type?: string
}) {
  await r2.send(new PutObjectCommand({
    Body: body,
    Bucket: bucket,
    ContentType: type,
    Key: k
  }));
  return publicUrlGet(k);
}

export async function fileAddUrlGet({ expiresIn = 3600, k, type }: { // client-triggered fileAdd, url to upload file directly to r2
  k: string,
  expiresIn?: number,
  type?: string
}) {
  return getSignedUrl(r2, new PutObjectCommand({
    Bucket: bucket,
    ContentType: type,
    Key: k
  }), { expiresIn });
}

export async function fileDel({ k }: {k: string}) {
  await r2.send(new DeleteObjectCommand({
    Bucket: bucket,
    Key: k
  }));
}

export async function fileGet({ k }: {k: string}) {
  const res = await r2.send(new GetObjectCommand({
    Bucket: bucket,
    Key: k
  }));
  return {
    buffer: Buffer.from(await res.Body!.transformToByteArray()),
    type: res.ContentType
  };
}

export async function fileGetUrlGet({ expiresIn = 3600, k }: {
  k: string,
  expiresIn?: number
}) { // client-triggered fileGet, url to download file directly to r2
  return getSignedUrl(r2, new GetObjectCommand({
    Bucket: bucket,
    Key: k
  }), { expiresIn });
}

export async function fileHeadGet({ k }: { k: string }) {
  try {
    return await r2.send(new HeadObjectCommand({
      Bucket: bucket,
      Key: k
    }));
  } catch (er: any) {
    if (er.name === `NotFound`) return null;
    throw er;
  }
}

export async function filesGet({ contToken, prefix }: {
  contToken?: string,
  prefix?: string
}) {
  const res = await r2.send(new ListObjectsV2Command({
    Bucket: bucket,
    ContinuationToken: contToken,
    MaxKeys: 1000,
    Prefix: prefix
  }));
  return {
    ks: res.Contents?.map(o => ({
      k: o.Key!,
      modified: o.LastModified,
      size: o.Size,
    })) ?? [],
    nextToken: res.IsTruncated ? res.NextContinuationToken : null
  };
}