import 'reflect-metadata'
import { Field, ID, ObjectType } from 'type-graphql';

@ObjectType()
export class Url {
  // StorageId is not returned directly, so that the creator storage wouldn't be leaked.

  @Field((type) => ID)
  readonly id: number;

  @Field({ description: "Full destination url" })
  url: string;

  @Field({ description: "Shortened url key" })
  key: string;

  createdAt: Date;
}
