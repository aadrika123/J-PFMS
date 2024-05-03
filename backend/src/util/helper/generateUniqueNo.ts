import { v4 as uuidv4 } from "uuid";

export const generateUniquePaymentNo = (initialString?: string): string => {
  const uniqueId = uuidv4();

  // Extract the first 8 characters from the UUID
  const unqId = uniqueId.substring(0, 6);

  return initialString ? initialString + unqId : unqId;
};

export function generateMultiUniqueNo(prefix:string, count:number) {
  const uniqueId = uuidv4();
  const uniqueNumbers = [];
  for (let i = 0; i < count; i++) {
      uniqueNumbers.push(`${prefix}-${uniqueId.substring(0, 6)}`);
  }
  return uniqueNumbers;
}
