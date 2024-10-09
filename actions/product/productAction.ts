// // "use server";
// // import { ddbDocClient } from "@/utils/dbconfig";
// // import { PutCommand, DeleteCommand, ScanCommand, ScanCommandOutput, UpdateCommand } from "@aws-sdk/lib-dynamodb";
// // const TableNameOfAll = "AddProT";

// // // export interface AddProTItem {
// // //   id: number;
// // //   ProductName: string;
// // //   ProductDescription: string;
// // //   Category: string;
// // //   Brand: string;
// // //   ModuleNumber: string;
// // //   Dimensions: string;
// // //   Colors: string;
// // //   Warranty: string;
// // //   fileKey: string;
// // //   photoUrl: string;
// // // }

// // // export const addAddProT = async (AddProT: Omit<AddProTItem, 'id'>) => {
// // //   try {
// // //     const params = {
// // //       TableName: TableNameOfAll,
// // //       Item: {
// // //         id: Math.floor(Math.random() * 10000),
// // //         ProductName: AddProT.ProductName,
// // //         ProductDescription: AddProT.ProductDescription,
// // //         Category: AddProT.Category,
// // //         Brand: AddProT.Brand,
// // //         Dimensions: AddProT.Dimensions,
// // //         Colors: AddProT.Colors,
// // //         Warranty: AddProT.Warranty,
// // //         ModuleNumber: AddProT.ModuleNumber,
// // //         photoUrl: AddProT.photoUrl,
// // //         fileKey: AddProT.fileKey, // Added fileKey in case we need it
// // //       },
// // //     };
// // //     await ddbDocClient.send(new PutCommand(params));
// // //   } catch (error) {
// // //     console.error("Database Error:", error);
// // //     throw new Error("Database Error: Failed to create AddProT.");
// // //   }
// // // };

// // export const deleteAddProT = async (id: number) => {
// //   try {
// //     await ddbDocClient.send(
// //       new DeleteCommand({
// //         TableName: TableNameOfAll,
// //         Key: { id },
// //       })
// //     );
// //   } catch (error) {
// //     console.error("Database Error:", error);
// //     throw new Error("Database Error: Failed to delete AddProT.");
// //   }
// // };

// // // export const getAddProTs = async (): Promise<AddProTItem[]> => {
// // //   try {
// // //     const data: ScanCommandOutput = await ddbDocClient.send(
// // //       new ScanCommand({ TableName: TableNameOfAll })
// // //     );
// // //     return (data.Items as AddProTItem[]) || [];
// // //   } catch (error) {
// // //     console.error("Database Error:", error);
// // //     throw new Error("Database Error: Failed to get AddProTs.");
// // //   }
// // // };

// // // export const updateAddProT = async (AddProT: AddProTItem) => {
// // //   try {
// // //     const params = {
// // //       TableName: TableNameOfAll,
// // //       Key: { id: AddProT.id },
// // //       UpdateExpression:
// // //         "set ProductName = :ProductNameVal, ProductDescription = :ProductDescriptionVal, Category = :CategoryVal, Brand = :BrandVal, ModuleNumber = :ModuleNumberVal, Dimensions = :DimensionsVal, Colors = :ColorsVal, Warranty = :WarrantyVal, photoUrl = :photoUrlVal, fileKey = :fileKeyVal",
// // //       ExpressionAttributeValues: {
// // //         ":ProductNameVal": AddProT.ProductName,
// // //         ":ProductDescriptionVal": AddProT.ProductDescription,
// // //         ":CategoryVal": AddProT.Category,
// // //         ":BrandVal": AddProT.Brand,
// // //         ":ModuleNumberVal": AddProT.ModuleNumber,
// // //         ":DimensionsVal": AddProT.Dimensions,
// // //         ":ColorsVal": AddProT.Colors,
// // //         ":WarrantyVal": AddProT.Warranty,
// // //         ":photoUrlVal": AddProT.photoUrl, // Ensure we update the new photo URL
// // //         ":fileKeyVal": AddProT.fileKey,   // Update file key in case it's changed
// // //       },
// // //     };

// // //     await ddbDocClient.send(new UpdateCommand(params));
// // //   } catch (error) {
// // //     console.error("Database Error:", error);
// // //     throw new Error("Database Error: Failed to update AddProT.");
// // //   }
// // // };

// // export interface AddProTItem {
// //   id: number;
// //   ProductName: string;
// //   ProductDescription: string;
// //   Category: string;
// //   Brand: string;
// //   ModuleNumber: string;
// //   Dimensions: string;
// //   Colors: string;
// //   Warranty: string;
// //   images: { photoUrl: string; fileKey: string }[]; // Storing multiple images
// // }

// // // Modify the add and update functions to handle the `images` array
// // export const addAddProT = async (AddProT: Omit<AddProTItem, 'id'>) => {
// //   try {
// //     const params = {
// //       TableName: TableNameOfAll,
// //       Item: {
// //         id: Math.floor(Math.random() * 10000),
// //         ProductName: AddProT.ProductName,
// //         ProductDescription: AddProT.ProductDescription,
// //         Category: AddProT.Category,
// //         Brand: AddProT.Brand,
// //         ModuleNumber: AddProT.ModuleNumber,
// //         Dimensions: AddProT.Dimensions,
// //         Colors: AddProT.Colors,
// //         Warranty: AddProT.Warranty,
// //         images: AddProT.images || [], // Store the image array
// //       },
// //     };
// //     await ddbDocClient.send(new PutCommand(params));
// //   } catch (error) {
// //     console.error("Database Error:", error);
// //     throw new Error("Database Error: Failed to create AddProT.");
// //   }
// // };
// // export const getAddProTs = async (): Promise<AddProTItem[]> => {
// //   try {
// //     const params = {
// //       TableName: "YourTableName", // Replace with your DynamoDB table name
// //     };

// //     const data = await ddbDocClient.send(new ScanCommand(params));

// //     // Map the items from DynamoDB response to AddProTItem format
// //     const products: AddProTItem[] = (data.Items || []).map((item: any) => ({
// //       id: item.id,
// //       ProductName: item.ProductName,
// //       ProductDescription: item.ProductDescription,
// //       Category: item.Category,
// //       Brand: item.Brand,
// //       ModuleNumber: item.ModuleNumber,
// //       Dimensions: item.Dimensions,
// //       Colors: item.Colors,
// //       Warranty: item.Warranty,
// //       images: item.images || [], // Ensure `images` is returned as an array of image objects
// //     }));

// //     return products;
// //   } catch (error) {
// //     console.error("Error fetching products from DynamoDB:", error);
// //     throw new Error("Error fetching products.");
// //   }
// // };
// // export const updateAddProT = async (AddProT: AddProTItem) => {
// //   try {
// //     const params = {
// //       TableName: TableNameOfAll,
// //       Key: { id: AddProT.id },
// //       UpdateExpression:
// //         "set ProductName = :ProductNameVal, ProductDescription = :ProductDescriptionVal, Category = :CategoryVal, Brand = :BrandVal, ModuleNumber = :ModuleNumberVal, Dimensions = :DimensionsVal, Colors = :ColorsVal, Warranty = :WarrantyVal, images = :imagesVal",
// //       ExpressionAttributeValues: {
// //         ":ProductNameVal": AddProT.ProductName,
// //         ":ProductDescriptionVal": AddProT.ProductDescription,
// //         ":CategoryVal": AddProT.Category,
// //         ":BrandVal": AddProT.Brand,
// //         ":ModuleNumberVal": AddProT.ModuleNumber,
// //         ":DimensionsVal": AddProT.Dimensions,
// //         ":ColorsVal": AddProT.Colors,
// //         ":WarrantyVal": AddProT.Warranty,
// //         ":imagesVal": AddProT.images, // Update the images array
// //       },
// //     };

// //     await ddbDocClient.send(new UpdateCommand(params));
// //   } catch (error) {
// //     console.error("Database Error:", error);
// //     throw new Error("Database Error: Failed to update AddProT.");
// //   }
// // };


// "use server";
// import { ddbDocClient } from "@/utils/dbconfig";
// import { PutCommand, DeleteCommand, ScanCommand, ScanCommandOutput, UpdateCommand } from "@aws-sdk/lib-dynamodb";
// const TableNameOfAll = "AddProT";

// export interface AddProTItem {
//   id: number;
//   ProductName: string;
//   ProductDescription: string;
//   Category: string;
//   Brand: string;
//   ModuleNumber: string;
//   Dimensions: string;
//   Colors: string;
//   Warranty: string;
//   fileKey: string;
//   photoUrl: string;
// }

// export const addAddProT = async (AddProT: Omit<AddProTItem, 'id'>) => {
//   try {
//     const params = {
//       TableName: TableNameOfAll,
//       Item: {
//         id: Math.floor(Math.random() * 10000),
//         ProductName: AddProT.ProductName,
//         ProductDescription: AddProT.ProductDescription,
//         Category: AddProT.Category,
//         Brand: AddProT.Brand,
//         Dimensions: AddProT.Dimensions,
//         Colors: AddProT.Colors,
//         Warranty: AddProT.Warranty,
//         ModuleNumber: AddProT.ModuleNumber,
//         photoUrl: AddProT.photoUrl,
//         fileKey: AddProT.fileKey, // Added fileKey in case we need it
//       },
//     };
//     await ddbDocClient.send(new PutCommand(params));
//   } catch (error) {
//     console.error("Database Error:", error);
//     throw new Error("Database Error: Failed to create AddProT.");
//   }
// };

// export const deleteAddProT = async (id: number) => {
//   try {
//     await ddbDocClient.send(
//       new DeleteCommand({
//         TableName: TableNameOfAll,
//         Key: { id },
//       })
//     );
//   } catch (error) {
//     console.error("Database Error:", error);
//     throw new Error("Database Error: Failed to delete AddProT.");
//   }
// };

// export const getAddProTs = async (): Promise<AddProTItem[]> => {
//   try {
//     const data: ScanCommandOutput = await ddbDocClient.send(
//       new ScanCommand({ TableName: TableNameOfAll })
//     );
//     return (data.Items as AddProTItem[]) || [];
//   } catch (error) {
//     console.error("Database Error:", error);
//     throw new Error("Database Error: Failed to get AddProTs.");
//   }
// };

// export const updateAddProT = async (AddProT: AddProTItem) => {
//   try {
//     const params = {
//       TableName: TableNameOfAll,
//       Key: { id: AddProT.id },
//       UpdateExpression:
//         "set ProductName = :ProductNameVal, ProductDescription = :ProductDescriptionVal, Category = :CategoryVal, Brand = :BrandVal, ModuleNumber = :ModuleNumberVal, Dimensions = :DimensionsVal, Colors = :ColorsVal, Warranty = :WarrantyVal, photoUrl = :photoUrlVal, fileKey = :fileKeyVal",
//       ExpressionAttributeValues: {
//         ":ProductNameVal": AddProT.ProductName,
//         ":ProductDescriptionVal": AddProT.ProductDescription,
//         ":CategoryVal": AddProT.Category,
//         ":BrandVal": AddProT.Brand,
//         ":ModuleNumberVal": AddProT.ModuleNumber,
//         ":DimensionsVal": AddProT.Dimensions,
//         ":ColorsVal": AddProT.Colors,
//         ":WarrantyVal": AddProT.Warranty,
//         ":photoUrlVal": AddProT.photoUrl, // Ensure we update the new photo URL
//         ":fileKeyVal": AddProT.fileKey,   // Update file key in case it's changed
//       },
//     };

//     await ddbDocClient.send(new UpdateCommand(params));
//   } catch (error) {
//     console.error("Database Error:", error);
//     throw new Error("Database Error: Failed to update AddProT.");
//   }
// };
/*

export interface AddProTItem {
  id: number;
  ProductName: string;
  ProductDescription: string;
  Category: string;
  Brand: string;
  ModuleNumber: string;
  Dimensions: string;
  Colors: string;
  Warranty: string;
  fileKeys: string[];    // Store multiple file keys
  photoUrls: string[];   // Store multiple photo URLs
}

export const addAddProT = async (AddProT: Omit<AddProTItem, 'id'>) => {
  try {
    const params = {
      TableName: TableNameOfAll,
      Item: {
        id: Math.floor(Math.random() * 10000),
        ProductName: AddProT.ProductName,
        ProductDescription: AddProT.ProductDescription,
        Category: AddProT.Category,
        Brand: AddProT.Brand,
        Dimensions: AddProT.Dimensions,
        Colors: AddProT.Colors,
        Warranty: AddProT.Warranty,
        ModuleNumber: AddProT.ModuleNumber,
        photoUrls: AddProT.photoUrls, // Store multiple image URLs
        fileKeys: AddProT.fileKeys,   // Store multiple fileKeys
      },
    };
    await ddbDocClient.send(new PutCommand(params));
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Database Error: Failed to create AddProT.");
  }
};

export const updateAddProT = async (AddProT: AddProTItem) => {
  try {
    const params = {
      TableName: TableNameOfAll,
      Key: { id: AddProT.id },
      UpdateExpression:
        "set ProductName = :ProductNameVal, ProductDescription = :ProductDescriptionVal, Category = :CategoryVal, Brand = :BrandVal, ModuleNumber = :ModuleNumberVal, Dimensions = :DimensionsVal, Colors = :ColorsVal, Warranty = :WarrantyVal, photoUrls = :photoUrlsVal, fileKeys = :fileKeysVal",
      ExpressionAttributeValues: {
        ":ProductNameVal": AddProT.ProductName,
        ":ProductDescriptionVal": AddProT.ProductDescription,
        ":CategoryVal": AddProT.Category,
        ":BrandVal": AddProT.Brand,
        ":ModuleNumberVal": AddProT.ModuleNumber,
        ":DimensionsVal": AddProT.Dimensions,
        ":ColorsVal": AddProT.Colors,
        ":WarrantyVal": AddProT.Warranty,
        ":photoUrlsVal": AddProT.photoUrls, // Update multiple image URLs
        ":fileKeysVal": AddProT.fileKeys,   // Update multiple fileKeys
      },
    };

    await ddbDocClient.send(new UpdateCommand(params));
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Database Error: Failed to update AddProT.");
  }
};


export const deleteAddProT = async (id: number) => {
  try {
    await ddbDocClient.send(
      new DeleteCommand({
        TableName: TableNameOfAll,
        Key: { id },
      })
    );
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Database Error: Failed to delete AddProT.");
  }
};

export const getAddProTs = async (): Promise<AddProTItem[]> => {
  try {
    const data: ScanCommandOutput = await ddbDocClient.send(
      new ScanCommand({ TableName: TableNameOfAll })
    );
    return (data.Items as AddProTItem[]) || [];
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Database Error: Failed to get AddProTs.");
  }
};*/

"use server";
import { ddbDocClient } from "@/utils/dbconfig";
import { PutCommand, DeleteCommand, ScanCommand, ScanCommandOutput, UpdateCommand } from "@aws-sdk/lib-dynamodb";

const TableNameOfAll = "AddProT";

export interface AddProTItem {
  id: number;
  ProductName: string;
  ProductDescription: string;
  Category: string;
  Brand: string;
  ModuleNumber: string;
  Dimensions: string;
  Colors: string;
  Warranty: string;
  photoUrls: string[]; // Store multiple photo URLs as an array
fileKeys: string[];
}

// Create a new product
export const addAddProT = async (AddProT: Omit<AddProTItem, 'id'>) => {
  try {
    const params = {
      TableName: TableNameOfAll,
      Item: {
        id: Math.floor(Math.random() * 10000), // Generate unique ID
        ...AddProT,
      },
    };
    await ddbDocClient.send(new PutCommand(params));
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Database Error: Failed to create AddProT.");
  }
};

// Delete a product by ID
export const deleteAddProT = async (id: number) => {
  try {
    await ddbDocClient.send(
      new DeleteCommand({
        TableName: TableNameOfAll,
        Key: { id },
      })
    );
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Database Error: Failed to delete AddProT.");
  }
};

// Get all products
export const getAddProTs = async (): Promise<AddProTItem[]> => {
  try {
    const data: ScanCommandOutput = await ddbDocClient.send(
      new ScanCommand({ TableName: TableNameOfAll })
    );
    return (data.Items as AddProTItem[]) || [];
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Database Error: Failed to get AddProTs.");
  }
};

// Update a product by ID
export const updateAddProT = async (AddProT: AddProTItem) => {
  try {
    const params = {
      TableName: TableNameOfAll,
      Key: { id: AddProT.id },
      UpdateExpression:
        "set ProductName = :ProductNameVal, ProductDescription = :ProductDescriptionVal, Category = :CategoryVal, Brand = :BrandVal, ModuleNumber = :ModuleNumberVal, Dimensions = :DimensionsVal, Colors = :ColorsVal, Warranty = :WarrantyVal, photoUrls = :photoUrlsVal",
      ExpressionAttributeValues: {
        ":ProductNameVal": AddProT.ProductName,
        ":ProductDescriptionVal": AddProT.ProductDescription,
        ":CategoryVal": AddProT.Category,
        ":BrandVal": AddProT.Brand,
        ":ModuleNumberVal": AddProT.ModuleNumber,
        ":DimensionsVal": AddProT.Dimensions,
        ":ColorsVal": AddProT.Colors,
        ":WarrantyVal": AddProT.Warranty,
        ":photoUrlsVal": AddProT.photoUrls, // Update photo URLs as an array
      },
    };

    await ddbDocClient.send(new UpdateCommand(params));
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Database Error: Failed to update AddProT.");
  }
};
