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
  @Field((type) => ID)
  id: string;

  @Field((type) => ID)
  storageId: string;
}

@ObjectType()
class DeleteUrlPayload {
  @Field((type) => ID, { nullable: true })
  id?: string;

  @Field((type) => ID, { nullable: true })
  storageId?: string;
}

@Resolver(Url)
export class UrlResolver {
  @Mutation((returns) => ShortenUrlPayload)
  async shortenUrl(
    @Arg("data") data: ShortenUrlInput,
    @Ctx() ctx: Context
  ): Promise<ShortenUrlPayload> {
    if (data.storageId === undefined) {
      data.storageId = crypto.randomUUID();
    }

    const created = await ctx.prisma.url.create({
      data: {
        url: data.url,
        key: generateKey(8),
        storage: {
          connectOrCreate: {
            create: { id: data.storageId },
            where: { id: data.storageId },
          },
        },
      },
    });

    return { url: created, storageId: created.storageId };
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
      return { id: where.id, storageId: where.storageId };
    }
  }
}
