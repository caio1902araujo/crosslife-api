import { container } from 'tsyringe';
import uploadConfig from '@config/upload';

import IStorageProvider from './models/IStorageProvider';
import DiskStorageProvider from './implementations/DiskStorageProvider';
import FirebaseStorageProvider from './implementations/FirebaseStorageProvider';

const providers = {
  disk: DiskStorageProvider,
  firebase: FirebaseStorageProvider,
};

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  providers[uploadConfig.driver]
);
