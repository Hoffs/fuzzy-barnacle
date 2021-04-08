import "reflect-metadata";
import { Storage as UrlStorage } from "./Storage";
import { Context } from "./context";
import { Arg, Ctx, FieldResolver, ID, InputType, Query, Resolver, Root } from "type-graphql";
import { Url } from "./Url";

@Resolver(UrlStorage)
export class StorageResolver {
  @FieldResolver()
  async urls(@Root() storage: UrlStorage, @Ctx() ctx: Context): Promise<Url[]> {
    // TODO: Paging
    return ctx.prisma.storage.findUnique({ where: { id: storage.id } }).urls();
  }

  @Query((returns) => UrlStorage, { nullable: true })
  async storage(@Arg("id", (type) => ID) id: string, @Ctx() ctx: Context) {
    return ctx.prisma.storage.findUnique({ where: { id: id } });
  }
}
