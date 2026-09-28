import { Router } from 'express';
import { AddressBookRepository } from '../infrastructure/in-memory-address.repository.js';
export declare function createAddressBookRouter(repo: AddressBookRepository): Router;
