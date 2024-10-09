"use server"; // Ensure this is the first line

import { ddbDocClient } from "../../utils/dbconfig";
import { PutCommand, DeleteCommand, ScanCommand, ScanCommandOutput, UpdateCommand } from "@aws-sdk/lib-dynamodb";

const TableNameOfAll = "todo";

export interface TodoItem {
  id: number;
  firstName: string;
  lastName: string;
  fileKey: string, // Pass the fileKey to manage the image
  photoUrl: string;
}

export const addTodo = async (todo: Omit<TodoItem, 'id'>) => {
  try {
    const params = {
      TableName: TableNameOfAll,
      Item: {
        id: Math.floor(Math.random() * 10000),
        firstName: todo.firstName,
        lastName: todo.lastName,
        photoUrl: todo.photoUrl,
         fileKey: todo.fileKey,
      },
    };
    await ddbDocClient.send(new PutCommand(params));
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Database Error: Failed to create Todo.");
  }
};

// Delete Todo
export const deleteTodo = async (id: number) => {
  try {
    await ddbDocClient.send(
      new DeleteCommand({
        TableName: TableNameOfAll,
        Key: { id },
      })
    );
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Database Error: Failed to delete Todo.");
  }
};

// Get Todos
export const getTodos = async (): Promise<TodoItem[]> => {
  try {
    const data: ScanCommandOutput = await ddbDocClient.send(
      new ScanCommand({ TableName: TableNameOfAll, FilterExpression: "#status = :statusVal",
        ExpressionAttributeNames: {
          "#status": "status",
        },
        ExpressionAttributeValues: {
          ":statusVal": false,
        }, })
    );
    return (data.Items as TodoItem[]) || [];
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Database Error: Failed to get Todo.");
  }
};



// Update Todo (with photo URL)
export const updateTodo = async (todo: TodoItem) => {
  try {
    const params = {
       TableName: TableNameOfAll,
        Key: { id: todo.id },
        UpdateExpression:
          "set firstName = :firstNameVal, lastName = :lastNameVal,  photoUrl = :photoUrlVal,fileKey = :fileKeyVal" ,
        ExpressionAttributeValues: {
          ":firstNameVal": todo.firstName,
          ":lastNameVal": todo.lastName,
          ":photoUrlVal": todo.photoUrl,":fileKeyVal": todo.fileKey,},
      }
    
  await ddbDocClient.send(new UpdateCommand(params));
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Database Error: Failed to update AddProT.");
  }
};

