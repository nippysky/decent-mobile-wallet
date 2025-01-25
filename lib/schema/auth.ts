import * as yup from "yup";

// Helper function to generate schemas dynamically
const generateSchema = (fieldCount: number): yup.ObjectSchema<any> => {
  const fields: Record<string, yup.StringSchema> = {};
  for (let i = 1; i <= fieldCount; i++) {
    fields[`field${i}`] = yup.string().required(`Field ${i} is required`);
  }
  return yup.object(fields);
};

// Generate schemas
export const twelveSchema = generateSchema(12);
export const twentyFourSchema = generateSchema(24);
