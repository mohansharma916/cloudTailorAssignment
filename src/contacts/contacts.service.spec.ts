import { Test, TestingModule } from '@nestjs/testing';
import { ContactsService } from './contacts.service';
import { PrismaService } from 'nestjs-prisma';
import { CreateContactInput } from './dto/create-contact.input';
import { UpdateContactInput } from './dto/update-contact.input';

// Mock data
const mockContact = {
  id: '1',
  name: 'John Doe',
  email: 'john.doe@example.com',
  phoneNumber: 1234567890n,
};

const mockContactsArray = [mockContact];

describe('ContactsService', () => {
  let service: ContactsService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ContactsService,
        {
          provide: PrismaService,
          useValue: {
            contact: {
              create: jest.fn().mockResolvedValue(mockContact),
              findMany: jest.fn().mockResolvedValue(mockContactsArray),
              findUnique: jest.fn().mockResolvedValue(mockContact),
              update: jest.fn().mockResolvedValue(mockContact),
              delete: jest.fn().mockResolvedValue(mockContact),
            },
          },
        },
      ],
    }).compile();

    service = module.get<ContactsService>(ContactsService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new contact', async () => {
      const createContactInput: CreateContactInput = {
        name: 'John Doe',
        email: 'john.doe@example.com',
        phoneNumber: "1234567890n",
      };
      await expect(service.create(createContactInput)).resolves.toEqual(mockContact);
      expect(prismaService.contact.create).toHaveBeenCalledWith({
        data: createContactInput,
      });
    });
  });

  describe('findAll', () => {
    it('should return an array of contacts', async () => {
      await expect(service.findAll()).resolves.toEqual(mockContactsArray);
      expect(prismaService.contact.findMany).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a contact by ID', async () => {
      await expect(service.findOne('1')).resolves.toEqual(mockContact);
      expect(prismaService.contact.findUnique).toHaveBeenCalledWith({
        where: { id: '1' },
      });
    });

    it('should return null if no contact is found', async () => {
      jest.spyOn(prismaService.contact, 'findUnique').mockResolvedValue(null);
      await expect(service.findOne('2')).resolves.toBeNull();
      expect(prismaService.contact.findUnique).toHaveBeenCalledWith({
        where: { id: '2' },
      });
    });
  });

  describe('update', () => {
    it('should update a contact', async () => {
      const updateContactInput: UpdateContactInput = {
        id: '1',
        name: 'Jane Doe',
        email: 'jane.doe@example.com',
        phoneNumber: "9876543210n",
      };
      await expect(service.update(updateContactInput)).resolves.toEqual(mockContact);
      expect(prismaService.contact.update).toHaveBeenCalledWith({
        where: { id: '1' },
        data: {
          name: 'Jane Doe',
          email: 'jane.doe@example.com',
          phoneNumber: "9876543210n",
        },
      });
    });
  });

  describe('remove', () => {
    it('should remove a contact by ID', async () => {
      await expect(service.remove('1')).resolves.toEqual(mockContact);
      expect(prismaService.contact.delete).toHaveBeenCalledWith({
        where: { id: '1' },
      });
    });
  });
});
