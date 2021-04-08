import 'reflect-metadata'
import { ObjectType, Field, ID } from 'type-graphql';
import { Url } from './Url';

@ObjectType()
export class Storage {
  @Field((type) => ID)
  id: string;

  createdAt: string;

  @Field((type) => [Url])
  urls: Url[];
}
