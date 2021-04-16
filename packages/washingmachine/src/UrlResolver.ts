import "reflect-metadata";
import { Storage as UrlStorage } from "./Storage";
import { Context } from "./context";
import {
  Arg,
  Ctx,
  Field,
  ID,
  InputType,
  Mutation,
  ObjectType,
  Resolver,
} from "type-graphql";
import { Url } from "./Url";
import { generateKey } from "./utils/KeyGenerator";
import crypto from "crypto";
import { IsUrl, MaxLength, MinLength } from "class-validator";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { PrismaClient } from ".prisma/client";

// Could be 2 types, one with specific storageId, other with random.
@InputType()
class ShortenUrlInput implements Partial<Url> {
  @Field()
  @IsUrl()
  url: string;

  @Field((type) => ID, { nullable: true })
  @MaxLength(36)
  @MinLength(6)
  storageId?: string;
}

@ObjectType()
class ShortenUrlPayload {
  @Field({ nullable: true })
  url?: Url;

  @Field((type) => ID, { nullable: true })
  storageId?: string;
}

@InputType()
class DeleteUrlInput {
  @Field((type) => String)
  id: string;

  @Field((type) => String)
  storageId: string;
}

@ObjectType()
class DeleteUrlPayload {
  @Field((type) => String, { nullable: true })
  urlId?: string;

  @Field((type) => String, { nullable: true })
  storageId?: string;
}

@Resolver(Url)
export class UrlResolver {
  @Mutation((returns) => ShortenUrlPayload)
  async shortenUrl(
    @Arg("data") data: ShortenUrlInput,
    @Ctx() ctx: Context
  ): Promise<ShortenUrlPayload> {
    async function createUrlRecord(
      prisma: PrismaClient,
      url: string,
      urlKey: string,
      storageId: string
    ): Promise<ShortenUrlPayload> {
      const created = await prisma.url.create({
        data: {
          url: url,
          key: urlKey,
          storage: {
            connectOrCreate: {
              create: { id: storageId },
              where: { id: storageId },
            },
          },
        },
      });
      return { url: created, storageId: created.storageId };
    }

    if (!data.storageId) {
      data.storageId = crypto.randomUUID();
    }

    // This generates random url "key" optimistically.
    try {
      return await createUrlRecord(
        ctx.prisma,
        data.url,
        generateKey(8),
        data.storageId
      );
    } catch (error) {
      ctx.logger.error(error, "Failed to create URL, retrying...");
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === "P2002"
      ) {
        // Retry once more if unique constraint violated.
        return await createUrlRecord(
          ctx.prisma,
          data.url,
          generateKey(8),
          data.storageId
        );
      } else {
        throw error;
      }
    }
  }

  @Mutation((returns) => DeleteUrlPayload)
  async deleteOneUrl(
    @Arg("where") where: DeleteUrlInput,
    @Ctx() ctx: Context
  ): Promise<DeleteUrlPayload> {
    // Technically deleteMany will delete only single record, but since storageId is not part of Unique constraint
    // deleteMany has to be used.
    const { count } = await ctx.prisma.url.deleteMany({
      where: { id: Number(where.id), storageId: where.storageId },
    });

    if (count === 0) {
      return {};
    } else {
      return { urlId: where.id, storageId: where.storageId };
    }
  }
}
