import bcrypt from 'bcryptjs';
 export const doHashing = (value, saltValue = 12) => {
    const result =  bcrypt.hash(value, saltValue);
    return result;
   };
   export const doCompare = (value, hashedValue) => {
      const result = bcrypt.compare(value, hashedValue);
      return result;
   };