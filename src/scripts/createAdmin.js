import * as userRepo  from '../../src/modules/user/userRepo.js';
import { doHashing } from '../../src/core/utils/hashing.js';
import { config } from '../../src/config/index.js';
import connectDb from '../../src/config/mongoDb.js';

const run = async () => {
        await connectDb();
  const existing = await userRepo.getUserByEmail('admin@system.com');
  if (existing) {
    console.log('Admin already exists');
  
    process.exit(0);
  }

  const hashed = await doHashing(config().adminPassword);

  await userRepo.createUser({
    email: 'admin@system.com',
    name: 'Admin',
    password: hashed,
    role: 'ADMIN'
  });

  console.log('Admin created successfully');
  process.exit(0);
} 

  run();
