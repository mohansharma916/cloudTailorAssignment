import { Test, TestingModule } from '@nestjs/testing';
import { ContactsResolver } from './contacts.resolver';
import { ContactsService } from './contacts.service';
import { CreateContactInput } from './dto/create-contact.input';
import { UpdateContactInput } from './dto/update-contact.input';
import { Contact } from './entities/contact.entity';

// Mock data
const contact: Contact = {
  id: '1',
  name: 'John Doe',
  email: 'john.doe@example.com',
  phoneNumber: "1234567890",
};

const contactsArray: Contact[] = [contact];

describe('ContactsResolver', () => {
  let resolver: ContactsResolver;
  let service: ContactsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ContactsResolver,
        {
          provide: ContactsService,
          useValue: {
            create: jest.fn().mockResolvedValue(contact),
            findAll: jest.fn().mockResolvedValue(contactsArray),
            findOne: jest.fn().mockResolvedValue(contact),
            update: jest.fn().mockResolvedValue(contact),
            remove: jest.fn().mockResolvedValue(contact),
          },
        },
      ],
    }).compile();

    resolver = module.get<ContactsResolver>(ContactsResolver);
    service = module.get<ContactsService>(ContactsService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('createContact', () => {
    it('should create a new contact', async () => {
      const createContactInput: CreateContactInput = {
        name: 'John Doe',
        email: 'john.doe@example.com',
        phoneNumber: "1234567890n",
      };
      await expect(resolver.createContact(createContactInput)).resolves.toEqual(contact);
      expect(service.create).toHaveBeenCalledWith(createContactInput);
    });
  });

  describe('findAll', () => {
    it('should return an array of contacts', async () => {
      await expect(resolver.findAll()).resolves.toEqual(contactsArray);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a contact by ID', async () => {
      await expect(resolver.findOne('1')).resolves.toEqual(contact);
      expect(service.findOne).toHaveBeenCalledWith('1');
    });
  });

  describe('updateContact', () => {
    it('should update a contact', async () => {
      const updateContactInput: UpdateContactInput = {
        id: '1',
        name: 'Jane Doe',
        email: 'jane.doe@example.com',
        phoneNumber: "9876543210n",
      };
      await expect(resolver.updateContact(updateContactInput)).resolves.toEqual(contact);
      expect(service.update).toHaveBeenCalledWith(updateContactInput);
    });
  });

  describe('removeContact', () => {
    it('should remove a contact by ID', async () => {
      await expect(resolver.removeContact('1')).resolves.toEqual(contact);
      expect(service.remove).toHaveBeenCalledWith('1');
    });
  });
});
