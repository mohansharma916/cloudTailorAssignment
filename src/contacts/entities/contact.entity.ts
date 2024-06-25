import { ObjectType, Field, Int, Float } from '@nestjs/graphql';

import BigInt from "graphql-bigint"

@ObjectType()
export class Contact {

  @Field(() => String, { description: 'Name Of Contact' })
  id: string;


  @Field(() => String, { description: 'Name Of Contact' })
  name: string;

  @Field(() => Int, { description: 'Email of Contact' })
  email: string;


  @Field(() => String, { description: 'Phone Number of Contact' })
  phoneNumber: string;


}
