import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateContactInput {

  @Field(() => String, { description: 'Name Of Contact' })
  name: string;

  @Field(() => Int, { description: 'Email of Contact' })
  email: string;


  @Field(() => String, { description: 'Phone Number of Contact' })
  phoneNumber: string;
}
