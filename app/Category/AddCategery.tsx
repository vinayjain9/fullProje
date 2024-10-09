/*

// // // // "use client";

// // // // import { addTodo, deleteTodo, getTodos, updateTodo } from "../../actions/category/categoryAction";
// // // // import { useEffect, useState, FormEvent } from "react";
// // // // import Popup from "@/app/components/Popup";

// // // // interface Todo {
// // // //   id: number;
// // // //   firstName: string;
// // // //   lastName: string;
// // // //   age: number;
// // // //   photoUrl: string;
// // // // }

// // // // export default function AddCategory() {
// // // //   const [isPopupOpen, setIsPopupOpen] = useState(false);
// // // //   const [tableData, setTableData] = useState<Todo[]>([]);
// // // //   const [editTodo, setEditTodo] = useState<Todo | undefined>();
// // // //   const [selectedFile, setSelectedFile] = useState<File | null>(null);
// // // //   const [errorMessage, setErrorMessage] = useState<string | null>(null);
// // // //   const [previewSrc, setPreviewSrc] = useState<string | null>(null);


// // // //   const openPopup = () => {
// // // //     setIsPopupOpen(true);
// // // //   };

// // // //   const closePopup = () => {
// // // //     setIsPopupOpen(false);
// // // //     setEditTodo(undefined);
// // // //     setSelectedFile(null);
// // // //   };

// // // //   const loadTableData = async () => {
// // // //     try {
// // // //       const todos: Todo[] = await getTodos();
// // // //       setTableData(todos);
// // // //     } catch (error) {
// // // //       console.error("Error loading data:", error);
// // // //     }
// // // //   };

// // // //   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
// // // //     const file = event.target.files?.[0] || null;
// // // //     if (file) {
// // // //       setSelectedFile(file);
// // // //       setPreviewSrc(URL.createObjectURL(file));
// // // //     }  };

// // // //   const handleTodoSubmit = async (event: FormEvent<HTMLFormElement>) => {
// // // //     event.preventDefault();

// // // //     const target = event.target as typeof event.target & {
// // // //       firstName: { value: string };
// // // //       lastName: { value: string };
// // // //       age: { value: string };
// // // //     };

// // // //     if (!selectedFile) {
// // // //       setErrorMessage("Please select an image.");
// // // //       return;
// // // //     }

// // // //     const formData = new FormData();
// // // //     formData.append("file", selectedFile);

// // // //     try {
// // // //       // Upload image to S3 bucket
// // // //       const response = await fetch("/api/AddImgCat", {
// // // //         method: "POST",
// // // //         body: formData,
// // // //       });

// // // //       if (response.ok) {
// // // //         const imageUrl = await response.text(); // Get image URL from API response

// // // //         if (editTodo) {
// // // //           // Update todo
// // // //           await updateTodo({
// // // //             id: editTodo.id,
// // // //             firstName: target.firstName.value,
// // // //             lastName: target.lastName.value,
// // // //             age: parseInt(target.age.value),
// // // //             photoUrl: imageUrl, // Add photo URL to update
// // // //           });
// // // //         } else {
// // // //           // Add new todo
// // // //           await addTodo({
// // // //             firstName: target.firstName.value,
// // // //             lastName: target.lastName.value,
// // // //             age: parseInt(target.age.value),
// // // //             photoUrl: imageUrl, // Save photo URL in new item
// // // //           });
// // // //         }

// // // //         closePopup();
// // // //         loadTableData();
// // // //       } else {
// // // //         const errorText = await response.text();
// // // //         setErrorMessage(`Failed to upload: ${errorText}`);
// // // //       }
// // // //     } catch (error) {
// // // //       setErrorMessage("Error uploading file. Please try again.");
// // // //       console.error(error);
// // // //     }
// // // //   };

// // // // const deleteItem = async (id: number, fileKey: string) => {
// // // //   try {
// // // //     // First, delete the image from S3
// // // //     await fetch(`/api/AddImgCat?fileKey=${fileKey}`, { method: "DELETE" });

// // // //     // Now delete the user info
// // // //     await deleteTodo(id);
// // // //     await loadTableData();
// // // //   } catch (error) {
// // // //     console.error("Error deleting item and image:", error);
// // // //   }
// // // // };

// // // //   const handleFileClear = () => {
// // // //     setSelectedFile(null);
// // // //     setPreviewSrc(null);
// // // //   };
// // // //   useEffect(() => {
// // // //     loadTableData();
// // // //   }, []);

// // // //   return (
// // // //     <main className="bg-gray-800 w-4/5 mx-auto mt-20 p-5 rounded-lg">
// // // //   <div className="flex justify-between items-center mb-3">
// // // //     <div className="text-3xl text-white">User Information</div>
// // // //     <button
// // // //       onClick={openPopup}
// // // //       className="bg-blue-500 text-white px-5 py-3 text-xl rounded-xl"
// // // //     >
// // // //       Add Info
// // // //     </button>
// // // //   </div>

// // // //   <Popup isOpen={isPopupOpen} onClose={closePopup}>
// // // //     <form onSubmit={handleTodoSubmit} className="mx-auto">
// // // //       {[
// // // //         { id: 'firstName', label: 'First Name', placeholder: 'Enter first name', type: 'text', defaultValue: editTodo?.firstName },
// // // //         { id: 'lastName', label: 'Last Name', placeholder: 'Enter last name', type: 'text', defaultValue: editTodo?.lastName },
// // // //         { id: 'age', label: 'Age', placeholder: 'Enter age', type: 'number', defaultValue: editTodo?.age }
// // // //       ].map(({ id, label, placeholder, type, defaultValue }) => (
// // // //         <div key={id} className="mb-5">
// // // //           <label htmlFor={id} className="block mb-2 text-sm font-medium text-white">
// // // //             {label}
// // // //           </label>
// // // //           <input
// // // //             type={type}
// // // //             id={id}
// // // //             placeholder={placeholder}
// // // //             className="text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white"
// // // //             defaultValue={defaultValue || ''}
// // // //             required
// // // //           />
// // // //         </div>
// // // //       ))}

// // // //       <div className="flex flex-wrap items-center gap-3 sm:gap-5">
// // // //         <div className="grow">
// // // //           <div className="flex items-center gap-x-2">
// // // //             <input
// // // //               type="file"
// // // //               onChange={handleFileChange}
// // // //               accept="image/*"
// // // //               className="hidden"
// // // //               id="file-upload"
// // // //             />
// // // //             <label
// // // //               htmlFor="file-upload"
// // // //               className="py-2 px-3 inline-flex items-center gap-x-2 text-xs font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 cursor-pointer"
// // // //             >
// // // //               Upload photo
// // // //             </label>
// // // //             {previewSrc && (
// // // //               <button
// // // //                 type="button"
// // // //                 onClick={handleFileClear}
// // // //                 className="py-2 px-3 inline-flex items-center gap-x-2 text-xs font-semibold rounded-lg border border-gray-200 bg-white text-gray-500 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50"
// // // //               >
// // // //                 Delete
// // // //               </button>
// // // //             )}
// // // //           </div>
// // // //         </div>

// // // //         {previewSrc && (
// // // //           <div className="shrink-0">
// // // //             <img
// // // //               className="h-20 w-20 object-cover rounded-full"
// // // //               src={previewSrc}
// // // //               alt="Uploaded Preview"
// // // //             />
// // // //           </div>
// // // //         )}
// // // //       </div>

// // // //       {errorMessage && <p className="text-red-500">{errorMessage}</p>}
// // // //       <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-lg">
// // // //         {editTodo ? 'Update Info' : 'Add Info'}
// // // //       </button>
// // // //     </form>
// // // //   </Popup>

// // // //   <div className="mt-5">
// // // //     <table className="w-full border rounded-xl overflow-hidden">
// // // //       <thead className="bg-blue-900">
// // // //         <tr>
// // // //           {['First Name', 'Last Name', 'Age', 'Photo', 'Edit', 'Delete'].map((header) => (
// // // //             <th key={header} className="text-center py-3 border border-gray-500 text-lg">{header}</th>
// // // //           ))}
// // // //         </tr>
// // // //       </thead>
// // // //       <tbody>
// // // //         {tableData &&
// // // //           tableData.map((row, idx) => (
// // // //             <tr key={idx} className="text-center odd:bg-gray-700 even:bg-gray-600">
// // // //               {[
// // // //                 row.firstName,
// // // //                 row.lastName,
// // // //                 row.age,
// // // //                 <img src={row.photoUrl} alt="User Image" className="w-16 h-16 mx-auto" />,
// // // //                 <button
// // // //                   onClick={() => {
// // // //                     setEditTodo(row);
// // // //                     setIsPopupOpen(true);
// // // //                   }}
// // // //                   className="bg-green-500 px-4 py-2 text-white rounded-lg"
// // // //                 >
// // // //                   Edit
// // // //                 </button>,
// // // //                 <button
// // // //                   onClick={() => {
// // // //                     if (window.confirm('Are you sure you want to delete this item?')) {
// // // //                       deleteItem(row.id , row.photoUrl);
// // // //                     }
// // // //                   }}
// // // //                   className="bg-red-500 px-4 py-2 text-white rounded-lg"
// // // //                 >
// // // //                   Delete
// // // //                 </button>
// // // //               ].map((content, i) => (
// // // //                 <td key={i} className="py-3 border border-gray-500">
// // // //                   {content}
// // // //                 </td>
// // // //               ))}
// // // //             </tr>
// // // //           ))}
// // // //       </tbody>
// // // //     </table>
// // // //   </div>
// // // // </main>

// // // //   );
// // // // }

// // // "use client";

// // // import { addTodo, deleteTodo, getTodos, updateTodo } from "../../actions/category/categoryAction";
// // // import { useEffect, useState, FormEvent } from "react";
// // // import Popup from "@/app/components/Popup";

// // // interface Todo {
// // //   id: number;
// // //   firstName: string;
// // //   lastName: string;
// // //   age: number;
// // //   photoUrl: string;
// // //   fileKey: string; // To manage deletions and updates
// // // }

// // // export default function AddCategory() {
// // //   const [isPopupOpen, setIsPopupOpen] = useState(false);
// // //   const [tableData, setTableData] = useState<Todo[]>([]);
// // //   const [editTodo, setEditTodo] = useState<Todo | undefined>();
// // //   const [selectedFile, setSelectedFile] = useState<File | null>(null);
// // //   const [errorMessage, setErrorMessage] = useState<string | null>(null);
// // //   const [previewSrc, setPreviewSrc] = useState<string | null>(null);

// // //   const openPopup = () => {
// // //     setIsPopupOpen(true);
// // //   };

// // //   const closePopup = () => {
// // //     setIsPopupOpen(false);
// // //     setEditTodo(undefined);
// // //     setSelectedFile(null);
// // //     setPreviewSrc(null); // Clear the preview when closing
// // //   };

// // //   const loadTableData = async () => {
// // //     try {
// // //       const todos: Todo[] = await getTodos();
// // //       setTableData(todos);
// // //     } catch (error) {
// // //       console.error("Error loading data:", error);
// // //     }
// // //   };

// // //   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
// // //     const file = event.target.files?.[0] || null;
// // //     if (file) {
// // //       setSelectedFile(file);
// // //       setPreviewSrc(URL.createObjectURL(file));
// // //     }
// // //   };

// // //   const handleTodoSubmit = async (event: FormEvent<HTMLFormElement>) => {
// // //     event.preventDefault();

// // //     const target = event.target as typeof event.target & {
// // //       firstName: { value: string };
// // //       lastName: { value: string };
// // //       age: { value: string };
// // //     };

// // //     if (!selectedFile && !editTodo) {
// // //       setErrorMessage("Please select an image.");
// // //       return;
// // //     }

// // //     let imageUrl = editTodo?.photoUrl || "";
// // //     let fileKey = editTodo?.fileKey || "";

// // //     // If a new image is selected, delete the old one from S3 and upload the new one
// // //     if (selectedFile) {
// // //       if (editTodo?.fileKey) {
// // //         // Delete the old image from S3
// // //         await fetch(`/api/AddImgCat?fileKey=${editTodo.fileKey}`, { method: "DELETE" });
// // //       }

// // //       const formData = new FormData();
// // //       formData.append("file", selectedFile);

// // //       try {
// // //         // Upload the new image to S3 bucket
// // //         const response = await fetch("/api/AddImgCat", {
// // //           method: "POST",
// // //           body: formData,
// // //         });

// // //         if (response.ok) {
// // //           const result = await response.json(); // Get imageUrl and fileKey from API response
// // //           imageUrl = result.imageUrl;
// // //           fileKey = result.fileKey;
// // //         } else {
// // //           const errorText = await response.text();
// // //           setErrorMessage(`Failed to upload: ${errorText}`);
// // //           return;
// // //         }
// // //       } catch (error) {
// // //         setErrorMessage("Error uploading file. Please try again.");
// // //         console.error(error);
// // //         return;
// // //       }
// // //     }

// // //     try {
// // //       if (editTodo) {
// // //         // Update the existing todo
// // //         await updateTodo({
// // //           id: editTodo.id,
// // //           firstName: target.firstName.value,
// // //           lastName: target.lastName.value,
// // //           age: parseInt(target.age.value),
// // //           photoUrl: imageUrl, // Update the photo URL
// // //           fileKey: fileKey,   // Update the fileKey
// // //         });
// // //       } else {
// // //         // Add new todo
// // //         await addTodo({
// // //           firstName: target.firstName.value,
// // //           lastName: target.lastName.value,
// // //           age: parseInt(target.age.value),
// // //           photoUrl: imageUrl, // Save the new photo URL
// // //           fileKey: fileKey,   // Save the fileKey
// // //         });
// // //       }

// // //       closePopup();
// // //       loadTableData();
// // //     } catch (error) {
// // //       setErrorMessage("Error saving the todo. Please try again.");
// // //       console.error(error);
// // //     }
// // //   };

// // //   const deleteItem = async (id: number, fileKey: string) => {
// // //     try {
// // //       // First, delete the image from S3
// // //       await fetch(`/api/AddImgCat?fileKey=${fileKey}`, { method: "DELETE" });

// // //       // Now delete the user info
// // //       await deleteTodo(id);
// // //       await loadTableData();
// // //     } catch (error) {
// // //       console.error("Error deleting item and image:", error);
// // //     }
// // //   };

// // //   const handleFileClear = () => {
// // //     setSelectedFile(null);
// // //     setPreviewSrc(null);
// // //   };

// // //   useEffect(() => {
// // //     loadTableData();
// // //   }, []);

// // //   return (
// // //     <main className="bg-gray-800 w-4/5 mx-auto mt-20 p-5 rounded-lg">
// // //       <div className="flex justify-between items-center mb-3">
// // //         <div className="text-3xl text-white">User Information</div>
// // //         <button
// // //           onClick={openPopup}
// // //           className="bg-blue-500 text-white px-5 py-3 text-xl rounded-xl"
// // //         >
// // //           Add Info
// // //         </button>
// // //       </div>

// // //       <Popup isOpen={isPopupOpen} onClose={closePopup}>
// // //         <form onSubmit={handleTodoSubmit} className="mx-auto">
// // //           {[
// // //             { id: 'firstName', label: 'First Name', placeholder: 'Enter first name', type: 'text', defaultValue: editTodo?.firstName },
// // //             { id: 'lastName', label: 'Last Name', placeholder: 'Enter last name', type: 'text', defaultValue: editTodo?.lastName },
// // //             { id: 'age', label: 'Age', placeholder: 'Enter age', type: 'number', defaultValue: editTodo?.age }
// // //           ].map(({ id, label, placeholder, type, defaultValue }) => (
// // //             <div key={id} className="mb-5">
// // //               <label htmlFor={id} className="block mb-2 text-sm font-medium text-white">
// // //                 {label}
// // //               </label>
// // //               <input
// // //                 type={type}
// // //                 id={id}
// // //                 placeholder={placeholder}
// // //                 className="text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white"
// // //                 defaultValue={defaultValue || ''}
// // //                 required
// // //               />
// // //             </div>
// // //           ))}

// // //           <div className="flex flex-wrap items-center gap-3 sm:gap-5">
// // //             <div className="grow">
// // //               <div className="flex items-center gap-x-2">
// // //                 <input
// // //                   type="file"
// // //                   onChange={handleFileChange}
// // //                   accept="image/*"
// // //                   className="hidden"
// // //                   id="file-upload"
// // //                 />
// // //                 <label
// // //                   htmlFor="file-upload"
// // //                   className="py-2 px-3 inline-flex items-center gap-x-2 text-xs font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 cursor-pointer"
// // //                 >
// // //                   Upload photo
// // //                 </label>
// // //                 {previewSrc && (
// // //                   <button
// // //                     type="button"
// // //                     onClick={handleFileClear}
// // //                     className="py-2 px-3 inline-flex items-center gap-x-2 text-xs font-semibold rounded-lg border border-gray-200 bg-white text-gray-500 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50"
// // //                   >
// // //                     Delete
// // //                   </button>
// // //                 )}
// // //               </div>
// // //             </div>

// // //             {previewSrc && (
// // //               <div className="shrink-0">
// // //                 <img
// // //                   className="h-20 w-20 object-cover rounded-full"
// // //                   src={previewSrc}
// // //                   alt="Uploaded Preview"
// // //                 />
// // //               </div>
// // //             )}
// // //           </div>

// // //           {errorMessage && <p className="text-red-500">{errorMessage}</p>}
// // //           <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-lg">
// // //             {editTodo ? 'Update Info' : 'Add Info'}
// // //           </button>
// // //         </form>
// // //       </Popup>

// // //       <div className="mt-5">
// // //         <table className="w-full border rounded-xl overflow-hidden">
// // //           <thead className="bg-blue-900">
// // //             <tr>
// // //               {['First Name', 'Last Name', 'Age', 'Photo', 'Edit', 'Delete'].map((header) => (
// // //                 <th key={header} className="text-center py-3 border border-gray-500 text-lg">{header}</th>
// // //               ))}
// // //             </tr>
// // //           </thead>
// // //           <tbody>
// // //             {tableData &&
// // //               tableData.map((row, idx) => (
// // //                 <tr key={idx} className="text-center odd:bg-gray-700 even:bg-gray-600">
// // //                   {[
// // //                     row.firstName,
// // //                     row.lastName,
// // //                     row.age,
// // //                     <img src={row.photoUrl} alt="User Image" className="w-16 h-16 mx-auto" />,
// // //                     <button
// // //                       onClick={() => {
// // //                         setEditTodo(row);
// // //                         setPreviewSrc(row.photoUrl); // Set preview for editing
// // //                         setIsPopupOpen(true);
// // //                       }}
// // //                       className="bg-green-500 px-4 py-2 text-white rounded-lg"
// // //                     >
// // //                       Edit
// // //                     </button>,
// // //                     <button
// // //                       onClick={() => {
// // //                         if (window.confirm('Are you sure you want to delete this item?')) {
// // //                           deleteItem(row.id, row.fileKey);
// // //                         }
// // //                       }}
// // //                       className="bg-red-500 px-4 py-2 text-white rounded-lg"
// // //                     >
// // //                       Delete
// // //                     </button>
// // //                   ].map((content, i) => (
// // //                     <td key={i} className="py-3 border border-gray-500">
// // //                       {content}
// // //                     </td>
// // //                   ))}
// // //                 </tr>
// // //               ))}
// // //           </tbody>
// // //         </table>
// // //       </div>
// // //     </main>
// // //   );
// // // }

// // "use client";

// // import React, { useState, useEffect } from 'react';

// // interface TodoItem {
// //   id: number;
// //   firstName: string;
// //   lastName: string;
// //   age: number;
// //   fileKey: string;
// //   photoUrl: string;
// // }

// // const AddCategory = () => {
// //   const [todos, setTodos] = useState<TodoItem[]>([]);
// //   const [editTodo, setEditTodo] = useState<TodoItem | null>(null);
// //   const [firstName, setFirstName] = useState('');
// //   const [lastName, setLastName] = useState('');
// //   const [age, setAge] = useState<number | undefined>();
// //   const [selectedFile, setSelectedFile] = useState<File | null>(null);

// //   useEffect(() => {
// //     // Fetch initial list of todos from the backend
// //     fetchTodos();
// //   }, []);

// //   const fetchTodos = async () => {
// //     try {
// //       const response = await fetch('/api/todo');
// //       const data = await response.json();
// //       setTodos(data);
// //     } catch (error) {
// //       console.error('Error fetching todos:', error);
// //     }
// //   };

// //   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
// //     if (event.target.files && event.target.files[0]) {
// //       setSelectedFile(event.target.files[0]);
// //     }
// //   };

// //   const handleTodoSubmit = async (event: React.FormEvent) => {
// //     event.preventDefault();

// //     // Ensure form data is valid
// //     if (!firstName || !lastName || !age || !selectedFile) {
// //       alert('All fields are required.');
// //       return;
// //     }

// //     try {
// //       // Create FormData object for sending to the backend
// //       const formData = new FormData();
// //       formData.append('firstName', firstName);
// //       formData.append('lastName', lastName);
// //       formData.append('age', age.toString());
// //       formData.append('file', selectedFile);

// //       // If editing, include the old fileKey in the form data
// //       if (editTodo && editTodo.fileKey) {
// //         formData.append('oldFileKey', editTodo.fileKey);
// //       }

// //       const response = await fetch('/api/AddImgCat', {
// //         method: 'POST',
// //         body: formData,
// //       });

// //       if (response.ok) {
// //         const result = await response.json();
// //         if (editTodo) {
// //           // Update the todo in the state
// //           setTodos((prevTodos) =>
// //             prevTodos.map((todo) =>
// //               todo.id === editTodo.id
// //                 ? {
// //                     ...todo,
// //                     firstName,
// //                     lastName,
// //                     age,
// //                     photoUrl: result.imageUrl,
// //                     fileKey: result.fileKey,
// //                   }
// //                 : todo
// //             )
// //           );
// //         } else {
// //           // Add the new todo to the state
// //           const newTodo: TodoItem = {
// //             id: Math.floor(Math.random() * 10000),
// //             firstName,
// //             lastName,
// //             age,
// //             fileKey: result.fileKey,
// //             photoUrl: result.imageUrl,
// //           };
// //           setTodos((prevTodos) => [...prevTodos, newTodo]);
// //         }

// //         // Reset the form
// //         setFirstName('');
// //         setLastName('');
// //         setAge(undefined);
// //         setSelectedFile(null);
// //         setEditTodo(null);
// //       } else {
// //         console.error('Error uploading image.');
// //       }
// //     } catch (error) {
// //       console.error('Error submitting todo:', error);
// //     }
// //   };

// //   const handleEdit = (todo: TodoItem) => {
// //     setEditTodo(todo);
// //     setFirstName(todo.firstName);
// //     setLastName(todo.lastName);
// //     setAge(todo.age);
// //   };

// //   const handleDelete = async (id: number, fileKey: string) => {
// //     try {
// //       // Call API to delete the todo
// //       await fetch(`/api/todo?id=${id}`, {
// //         method: 'DELETE',
// //       });

// //       // Delete the image from S3
// //       await fetch(`/api/AddImgCat?fileKey=${fileKey}`, {
// //         method: 'DELETE',
// //       });

// //       // Remove the todo from state
// //       setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
// //     } catch (error) {
// //       console.error('Error deleting todo:', error);
// //     }
// //   };

// //   return (
// //     <div className="container mx-auto">
// //       <h1 className="text-2xl mb-4">{editTodo ? 'Edit' : 'Add'} Todo</h1>

// //       <form onSubmit={handleTodoSubmit} className="mb-6">
// //         <div className="mb-4">
// //           <label className="block mb-2">First Name</label>
// //           <input
// //             type="text"
// //             value={firstName}
// //             onChange={(e) => setFirstName(e.target.value)}
// //             className="border p-2 w-full"
// //             required
// //           />
// //         </div>

// //         <div className="mb-4">
// //           <label className="block mb-2">Last Name</label>
// //           <input
// //             type="text"
// //             value={lastName}
// //             onChange={(e) => setLastName(e.target.value)}
// //             className="border p-2 w-full"
// //             required
// //           />
// //         </div>

// //         <div className="mb-4">
// //           <label className="block mb-2">Age</label>
// //           <input
// //             type="number"
// //             value={age}
// //             onChange={(e) => setAge(Number(e.target.value))}
// //             className="border p-2 w-full"
// //             required
// //           />
// //         </div>

// //         <div className="mb-4">
// //           <label className="block mb-2">Photo</label>
// //           <input
// //             type="file"
// //             onChange={handleFileChange}
// //             className="border p-2 w-full"
// //             required
// //           />
// //         </div>

// //         <button type="submit" className="bg-blue-500 text-white px-4 py-2">
// //           {editTodo ? 'Update' : 'Add'} Todo
// //         </button>
// //       </form>

// //       <h2 className="text-xl mb-4">Todo List</h2>

// //       {todos.length === 0 ? (
// //         <p>No todos found.</p>
// //       ) : (
// //         <ul className="list-disc pl-5">
// //           {todos.map((todo) => (
// //             <li key={todo.id} className="mb-2">
// //               <div className="flex items-center">
// //                 <div className="mr-4">
// //                   <img
// //                     src={todo.photoUrl}
// //                     alt="todo-img"
// //                     className="w-16 h-16 object-cover"
// //                   />
// //                 </div>
// //                 <div>
// //                   <p>
// //                     <strong>{todo.firstName} {todo.lastName}</strong> (Age: {todo.age})
// //                   </p>
// //                   <button
// //                     onClick={() => handleEdit(todo)}
// //                     className="text-blue-500 mr-4"
// //                   >
// //                     Edit
// //                   </button>
// //                   <button
// //                     onClick={() => handleDelete(todo.id, todo.fileKey)}
// //                     className="text-red-500"
// //                   >
// //                     Delete
// //                   </button>
// //                 </div>
// //               </div>
// //             </li>
// //           ))}
// //         </ul>
// //       )}
// //     </div>
// //   );
// // };

// // export default AddCategory;

*/
"use client";

import { addTodo, deleteTodo, getTodos, updateTodo } from "../../actions/category/categoryAction";
import { useEffect, useState, FormEvent } from "react";
import PopupC from "@/app/components/PopupC";
import { Progress, notification } from 'antd';
interface Todo {
  id: number;
  firstName: string;
  lastName: string;
  photoUrl: string;
  fileKey: string;
}

export default function AddCategory() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [tableData, setTableData] = useState<Todo[]>([]);
  const [editTodo, setEditTodo] = useState<Todo | undefined>();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [previewSrc, setPreviewSrc] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    setEditTodo(undefined);
    setSelectedFile(null);
    setPreviewSrc(null);
  };

  const loadTableData = async () => {
    try {
      setLoading(true);
      const todos: Todo[] = await getTodos();
      setTableData(todos);
      console.log("table data" + todos);
    } catch (error) {
      console.error("Error loading data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    if (file) {
      setSelectedFile(file);
      setPreviewSrc(URL.createObjectURL(file));
    }
  };

  const handleTodoSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setProgress(0);
    setIsPopupOpen(false);
    const target = event.target as typeof event.target & {
      firstName: { value: string };
      lastName: { value: string };
    };

    if (!selectedFile && !editTodo) {
      setErrorMessage("Please select an image.");
      setLoading(false);
      setIsPopupOpen(true);
      return;
    }

    let imageUrl = editTodo?.photoUrl || "";
    let fileKey = editTodo?.fileKey || "";
    if (selectedFile) {
      if (editTodo?.fileKey) {
        await fetch(`/api/AddImgCat?fileKey=${editTodo.fileKey}`, { method: "DELETE" });
      }

      const formData = new FormData();
      formData.append("file", selectedFile);

      try {
        setProgress(30);
        const response = await fetch("/api/AddImgCat", {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          setProgress(60);
          const result = await response.json(); // Get imageUrl and fileKey from API response
          imageUrl = result.imageUrl;
          fileKey = result.fileKey;
        } else {
          const errorText = await response.text();
          setErrorMessage(`Failed to upload: ${errorText}`);
          setLoading(false);
          setIsPopupOpen(true); // Reopen popup if error occurs
          return;
        }
      } catch (error) {
        setErrorMessage("Error uploading file. Please try again.");
        console.error(error);
        setLoading(false);
        setIsPopupOpen(true); // Reopen popup if error occurs
        return;
      }
    }

    try {
      if (editTodo) {
        // Update the existing todo
        await updateTodo({
          id: editTodo.id,
          firstName: target.firstName.value,
          lastName: target.lastName.value,
          photoUrl: imageUrl, // Update the photo URL
          fileKey: fileKey,   // Update the fileKey
        });
      } else {
        // Add new todo
        await addTodo({
          firstName: target.firstName.value,
          lastName: target.lastName.value,
          photoUrl: imageUrl, // Save the new photo URL
          fileKey: fileKey,   // Save the fileKey
        });
      }

      setProgress(100);  // Complete progress bar
      notification.success({
        message: 'Success',
        description: 'User info and image saved successfully.',
      });

      loadTableData();  // Reload data after save
    } catch (error) {
      setErrorMessage("Error saving the todo. Please try again.");
      console.error(error);
    } finally {
      setLoading(false); // End loading
    }
  };

  // Delete a todo and its image
  const deleteItem = async (id: number, fileKey: string) => {
    setLoading(true);
    try {
      // First, delete the image from S3
      await fetch(`/api/AddImgCat?fileKey=${fileKey}`, { method: "DELETE" });

      // Now delete the user info
      await deleteTodo(id);
      await loadTableData();
    } catch (error) {
      console.error("Error deleting item and image:", error);
    } finally {
      setLoading(false);
    }
  };

  // Clear the selected file
  const handleFileClear = () => {
    setSelectedFile(null);
    setPreviewSrc(null);
  };

  // Load todos on component mount
  useEffect(() => {
    loadTableData();
  }, []);

  return (
    <main className="bg-gray-800 mx-6  mt-10 p-5 rounded-lg">
      <div className="flex justify-between items-center mb-3">
        <div className="text-3xl text-white">User Information</div>
        <button
          onClick={openPopup}
          className="bg-blue-500 text-white px-5 py-3 text-xl rounded-xl"
        >
          Add Info
        </button>
      </div>

      {/* Loader when saving data */}
      {loading && (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
          <Progress type="circle" percent={progress} />
        </div>
      )}

      <PopupC isOpen={isPopupOpen} onClose={closePopup}>
        <form onSubmit={handleTodoSubmit} className="mx-auto  ">
          {[{ id: 'firstName', label: 'Category Name', placeholder: 'Enter Category Name', type: 'text', defaultValue: editTodo?.firstName },
            { id: 'lastName', label: 'Brands', placeholder: 'Enter Brands', type: 'text', defaultValue: editTodo?.lastName },
          ].map(({ id, label, placeholder, type, defaultValue }) => (
            <div key={id} className="mb-5">
              <label htmlFor={id} className="block mb-2 text-sm font-medium text-white">
                {label}
              </label>
              <input
                type={type}
                id={id}
                placeholder={placeholder}
                className="text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white"
                defaultValue={defaultValue || ''}
                required
              />
            </div>
          ))}

          <div className="flex flex-wrap items-center gap-3 sm:gap-5">
            <div className="grow">
              <div className="flex items-center gap-x-2">
                <input
                  type="file"
                  onChange={handleFileChange}
                  accept="image/*"
                  className="hidden"
                  id="file-upload"
                />
                <label
                  htmlFor="file-upload"
                  className="py-2 px-3 inline-flex items-center gap-x-2 text-xs font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 cursor-pointer"
                >
                  Upload Bard photo
                </label>
                {previewSrc && (
                  <button
                    type="button"
                    onClick={handleFileClear}
                    className="py-2 px-3 inline-flex items-center gap-x-2 text-xs font-semibold rounded-lg border border-gray-200 bg-white text-gray-500 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50"
                  >
                    Delete
                  </button>
                )}
              </div>
            </div>

            {previewSrc && (
              <div className="shrink-0">
                <img
                  className="h-20 w-20 object-cover rounded-full"
                  src={previewSrc}
                  alt="Uploaded Preview"
                />
              </div>
            )}
          </div>

          {errorMessage && <p className="text-red-500">{errorMessage}</p>}
          <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-lg">
            {editTodo ? 'Update Info' : 'Add Info'}
          </button>
        </form>
      </PopupC>

      <div className="mt-5">
        <table className="w-full border rounded-xl overflow-hidden">
          <thead className="bg-blue-900 ">
            <tr>
              {['First Name', 'Last Name', 'Photo', 'Edit', 'Delete'].map((header) => (
                <th key={header} className="text-center py-3 border border-gray-500 text-white text-lg">{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tableData.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-3 text-lg text-gray-200 ">No data found.</td>
              </tr>
            ) : (
              tableData.map(({ id, firstName, lastName, photoUrl, fileKey }) => (
                <tr key={id} className="text-start   text-base text-white border border-gray-500">
                  <td>{firstName}</td>
                  <td>{lastName}</td>
                  <td className="text-center">
                    {photoUrl && (
                      <img className="inline  w-16 m-3 h-10 object-cover rounded-lg" src={photoUrl} alt="User Photo" />
                    )}
                  </td>
                  <td className="text-center">
                    <button
                      onClick={() => {
                        setEditTodo({ id, firstName, lastName, photoUrl, fileKey });
                        openPopup();
                      }}
                      className="px-3  py-1 bg-yellow-500 text-white rounded-lg"
                    >
                      Edit
                    </button>
                  </td>
                      <td className="text-center">
                    <button
                      onClick={() => deleteItem(id, fileKey)}
                      className="px-3 py-1 bg-red-500 text-white rounded-lg"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      
    </main>
  );
}

/*
"use client";

import { addTodo, deleteTodo, getTodos, updateTodo } from "../../actions/category/categoryAction";
import { useEffect, useState, FormEvent } from "react";
import Popup from "@/app/components/Popup";

interface Todo {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
  photoUrl: string;
  fileKey: string; // This is the key used to delete the file from S3
}

export default function AddCategory() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [tableData, setTableData] = useState<Todo[]>([]);
  const [editTodo, setEditTodo] = useState<Todo | undefined>();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [previewSrc, setPreviewSrc] = useState<string | null>(null);

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    setEditTodo(undefined);
    setSelectedFile(null);
    setPreviewSrc(null); // Clear the preview when closing
  };

  // Load table data
  const loadTableData = async () => {
    try {
      const todos: Todo[] = await getTodos();
      setTableData(todos);
    } catch (error) {
      console.error("Error loading data:", error);
    }
  };

  // Handle file change and preview
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    if (file) {
      setSelectedFile(file);
      setPreviewSrc(URL.createObjectURL(file));
    }
  };

  // Submit new or edited todo
  const handleTodoSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const target = event.target as typeof event.target & {
      firstName: { value: string };
      lastName: { value: string };
      age: { value: string };
    };

    if (!selectedFile && !editTodo) {
      setErrorMessage("Please select an image.");
      return;
    }

    let imageUrl = editTodo?.photoUrl || "";
    let fileKey = editTodo?.fileKey || "";

    try {
      // Upload new image if selected
      if (selectedFile) {
        if (editTodo?.fileKey) {
          // Delete the old image from S3 before uploading a new one
          const deleteResponse = await fetch(`/api/deleteImage?fileKey=${editTodo.fileKey}`, {
            method: "DELETE",
          });

          if (!deleteResponse.ok) {
            const errorText = await deleteResponse.text();
            setErrorMessage(`Failed to delete old image: ${errorText}`);
            return;
          }
        }

        const formData = new FormData();
        formData.append("file", selectedFile);

        // Upload new image to S3
        const uploadResponse = await fetch("/api/uploadImage", {
          method: "POST",
          body: formData,
        });

        if (uploadResponse.ok) {
          const result = await uploadResponse.json(); // Get imageUrl and fileKey from API response
          imageUrl = result.imageUrl;
          fileKey = result.fileKey;
        } else {
          const errorText = await uploadResponse.text();
          setErrorMessage(`Failed to upload: ${errorText}`);
          return;
        }
      }

      // Determine if we are adding or updating a todo
      if (editTodo) {
        // Update the existing todo
        await updateTodo({
          id: editTodo.id,
          firstName: target.firstName.value,
          lastName: target.lastName.value,
          age: parseInt(target.age.value),
          photoUrl: imageUrl, // Update the photo URL
          fileKey: fileKey, // Update the fileKey
        });
      } else {
        // Add new todo
        await addTodo({
          firstName: target.firstName.value,
          lastName: target.lastName.value,
          age: parseInt(target.age.value),
          photoUrl: imageUrl, // Save the new photo URL
          fileKey: fileKey, // Save the fileKey
        });
      }

      closePopup();
      loadTableData();
    } catch (error) {
      setErrorMessage("Error saving the todo. Please try again.");
      console.error(error);
    }
  };

  // Delete a todo and its image
  const deleteItem = async (id: number, fileKey: string) => {
    try {
      // First, delete the image from S3
      const deleteResponse = await fetch(`/api/deleteImage?fileKey=${fileKey}`, {
        method: "DELETE",
      });

      if (!deleteResponse.ok) {
        const errorText = await deleteResponse.text();
        console.error(`Failed to delete image from S3: ${errorText}`);
        return;
      }

      // Now delete the user info
      await deleteTodo(id);
      await loadTableData();
    } catch (error) {
      console.error("Error deleting item and image:", error);
    }
  };

  // Clear the selected file
  const handleFileClear = () => {
    setSelectedFile(null);
    setPreviewSrc(null);
  };

  // Load todos on component mount
  useEffect(() => {
    loadTableData();
  }, []);

  return (
    <main className="bg-gray-800 w-4/5 mx-auto mt-20 p-5 rounded-lg">
      <div className="flex justify-between items-center mb-3">
        <div className="text-3xl text-white">User Information</div>
        <button
          onClick={openPopup}
          className="bg-blue-500 text-white px-5 py-3 text-xl rounded-xl"
        >
          Add Info
        </button>
      </div>

      <Popup isOpen={isPopupOpen} onClose={closePopup}>
        <form onSubmit={handleTodoSubmit} className="mx-auto">
          {[
            { id: "firstName", label: "First Name", placeholder: "Enter first name", type: "text", defaultValue: editTodo?.firstName },
            { id: "lastName", label: "Last Name", placeholder: "Enter last name", type: "text", defaultValue: editTodo?.lastName },
            { id: "age", label: "Age", placeholder: "Enter age", type: "number", defaultValue: editTodo?.age },
          ].map(({ id, label, placeholder, type, defaultValue }) => (
            <div key={id} className="mb-5">
              <label htmlFor={id} className="block mb-2 text-sm font-medium text-white">
                {label}
              </label>
              <input
                type={type}
                id={id}
                placeholder={placeholder}
                className="text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white"
                defaultValue={defaultValue || ""}
                required
              />
            </div>
          ))}

          <div className="flex flex-wrap items-center gap-3 sm:gap-5">
            <div className="grow">
              <div className="flex items-center gap-x-2">
                <input
                  type="file"
                  onChange={handleFileChange}
                  accept="image/*"
                  className="hidden"
                  id="file-upload"
                />
                <label
                  htmlFor="file-upload"
                  className="py-2 px-3 inline-flex items-center gap-x-2 text-xs font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 cursor-pointer"
                >
                  Upload photo
                </label>
                {previewSrc && (
                  <button
                    type="button"
                    onClick={handleFileClear}
                    className="py-2 px-3 inline-flex items-center gap-x-2 text-xs font-semibold rounded-lg border border-gray-200 bg-white text-gray-500 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50"
                  >
                    Delete
                  </button>
                )}
              </div>
            </div>

            {previewSrc && (
              <div className="shrink-0">
                <img
                  className="inline-block h-20 w-20 object-cover rounded-full ring-2 ring-white"
                  src={previewSrc}
                  alt="User preview"
                />
              </div>
            )}
          </div>

          {errorMessage && (
            <p className="text-sm text-red-500 mt-2">{errorMessage}</p>
          )}

          <button
            type="submit"
            className="mt-5 px-5 py-3 text-white bg-green-500 hover:bg-green-600 font-medium rounded-lg text-sm"
          >
            {editTodo ? "Update Info" : "Add Info"}
          </button>
        </form>
      </Popup>

      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left text-white mt-5">
          <thead className="text-xs text-white uppercase bg-gray-700">
            <tr>
              {["First Name", "Last Name", "Age", "Photo", "Edit", "Delete"].map((header) => (
                <th key={header} className="text-center py-3 border border-gray-500 text-lg">{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tableData.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-3 text-lg text-gray-200">No data found.</td>
              </tr>
            ) : (
              tableData.map(({ id, firstName, lastName, age, photoUrl, fileKey }) => (
                <tr key={id} className="text-center py-3 border border-gray-500">
                  <td>{firstName}</td>
                  <td>{lastName}</td>
                  <td>{age}</td>
                  <td>
                    {photoUrl && (
                      <img className="inline h-20 w-20 object-cover rounded-full" src={photoUrl} alt="User Photo" />
                    )}
                  </td>
                  <td>
                    <button
                      onClick={() => {
                        setEditTodo({ id, firstName, lastName, age, photoUrl, fileKey });
                        openPopup();
                        setPreviewSrc(photoUrl); // Set the preview source to the current photo URL

                      }}
                      className="px-3 py-1 bg-yellow-500 text-white rounded-lg"
                    >
                      Edit
                    </button>
                  </td>
                  <td>
                    <button
                      onClick={() => deleteItem(id, fileKey)}
                      className="px-3 py-1 bg-red-500 text-white rounded-lg"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
}
*/