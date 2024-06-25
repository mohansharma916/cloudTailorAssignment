import { Injectable } from '@nestjs/common';
import { CreateContactInput } from './dto/create-contact.input';
import { UpdateContactInput } from './dto/update-contact.input';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class ContactsService {
constructor(private readonly prisma:PrismaService){}



  create(createContactInput: CreateContactInput) {
    return  this.prisma.contact.create({
      data:{...createContactInput}
    })
  }

  findAll() {
    return this.prisma.contact.findMany()
  }

  findOne(id: string) {
    return this.prisma.contact.findUnique({
      where:{
        id
      }
    })
  }

  update(updateContactInput: UpdateContactInput) {
    return this.prisma.contact.update({
      where:{
        id: updateContactInput.id
      },
      data:{
        name:updateContactInput.name,
        email:updateContactInput.email,
        phoneNumber:updateContactInput.phoneNumber
      }
    })
  }

  remove(id: string) {
    return this.prisma.contact.delete({
      where:{
        id
      }
    })
  }
}
