// "use client";
// import { addAddProT, deleteAddProT, getAddProTs, updateAddProT } from "../../actions/product/productAction";
// import { useEffect, useState, FormEvent } from "react";
// import PopupC from "@/app/components/PopupC";
// import { Progress, notification } from 'antd';
// interface AddProT {
//   id: number;
//   ProductName: string;
//   ProductDescription: string;
//   Category: string;
//   Brand: string;
//   ModuleNumber: string;
//   Dimensions: string;
//   Colors: string;
//   Warranty: string;
//   fileKey: string,
//   photoUrl: string;
// }

// export default function AddProduct() {
//   const [isPopupOpen, setIsPopupOpen] = useState(false);
//   const [tableData, setTableData] = useState<AddProT[]>([]);
//   const [editAddProT, setEditAddProT] = useState<AddProT | undefined>();
//   const [selectedFile, setSelectedFile] = useState<File | null>(null);
//   const [errorMessage, setErrorMessage] = useState<string | null>(null);
//   const [previewSrc, setPreviewSrc] = useState<string | null>(null);
//   const [loading, setLoading] = useState(false);
//   const [progress, setProgress] = useState(0);
//   const openPopup = () => {
//     setIsPopupOpen(true);
//   };

//   const closePopup = () => {
//     setIsPopupOpen(false);
//     setEditAddProT(undefined);
//     setSelectedFile(null);
//     setPreviewSrc(null);
//   };

//   const loadTableData = async () => {
//     try {
//       setLoading(true);
//       const AddProTs: AddProT[] = await getAddProTs();
//       setTableData(AddProTs);
//     } catch (error) {
//       console.error("Error loading data:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0] || null;
//     if (file) {
//       setSelectedFile(file);
//       setPreviewSrc(URL.createObjectURL(file));
//     }
//   };

//   const handleAddProTSubmit = async (event: FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     setLoading(true);
//     setProgress(0);
//     setIsPopupOpen(false);
//     const target = event.target as typeof event.target & {
//       ProductName: { value: string };
//       ProductDescription: { value: string };
//       Category: { value: string };
//       Brand: { value: string };
//       ModuleNumber: { value: string };
//       Dimensions: { value: string };
//       Colors: { value: string };
//       Warranty: { value: string };
//     };

//     if (!selectedFile && !editAddProT) {
//       setErrorMessage("Please select an image.");
//       setLoading(false);
//       setIsPopupOpen(true);
//       return;
//     }

//     let imageUrl = editAddProT?.photoUrl || "";
//     let fileKey = editAddProT?.fileKey || "";
//     if (selectedFile) {
//       if (editAddProT?.fileKey) {
//         await fetch(`/api/AddImgPut?fileKey=${editAddProT.fileKey}`, { method: "DELETE" });
//       }

//       const formData = new FormData();
//       formData.append("file", selectedFile);

//       try {
//         setProgress(30);
//         const response = await fetch("/api/AddImgPut", {
//           method: "POST",
//           body: formData,
//         });

//         if (response.ok) {
//           setProgress(60);
//           const result = await response.json(); // Get imageUrl and fileKey from API response
//           imageUrl = result.imageUrl;
//           fileKey = result.fileKey;
//         } else {
//           const errorText = await response.text();
//           setErrorMessage(`Failed to upload: ${errorText}`);
//           setLoading(false);
//           setIsPopupOpen(true); // Reopen popup if error occurs
//           return;
//         }
//       } catch (error) {
//         setErrorMessage("Error uploading file. Please try again.");
//         console.error(error);
//         setLoading(false);
//         setIsPopupOpen(true); // Reopen popup if error occurs
//         return;
//       }
//     }

//       try {
//         if (editAddProT) {
//           // Update the existing AddProT
//           await updateAddProT({
//             id: editAddProT.id,
//             ProductName: target.ProductName.value,
//             ProductDescription: target.ProductDescription.value,
//             Category: target.Category.value,
//             Brand: target.Brand.value,
//             Dimensions: target.Dimensions.value,
//             Colors: target.Colors.value,
//             Warranty: target.Warranty.value,
//             ModuleNumber: target.ModuleNumber.value,
//             photoUrl: imageUrl, // Update the photo URL
//             fileKey: fileKey,   // Update the fileKey
//           });
//         } else {
//           // Add new AddProT
//           await addAddProT({
//           ProductName: target.ProductName.value,
//             ProductDescription: target.ProductDescription.value,
//             Category: target.Category.value,
//             Brand: target.Brand.value,
//             Dimensions: target.Dimensions.value,
//             Colors: target.Colors.value,
//             Warranty: target.Warranty.value,
//             ModuleNumber: target.ModuleNumber.value,
//             photoUrl: imageUrl, // Save the new photo URL
//             fileKey: fileKey,   // Save the fileKey
//           });
//         }

//         setProgress(100);  // Complete progress bar
//         notification.success({
//           message: 'Success',
//           description: 'User info and image saved successfully.',
//         });

//         loadTableData();  // Reload data after save
//       } catch (error) {
//         setErrorMessage("Error saving the AddProT. Please try again.");
//         console.error(error);
//       } finally {
//         setLoading(false); // End loading
//       }
//     };

//     // Delete a AddProT and its image
//     const deleteItem = async (id: number, fileKey: string) => {
//       setLoading(true);
//       try {
//         // First, delete the image from S3
//         await fetch(`/api/AddImgPut?fileKey=${fileKey}`, { method: "DELETE" });

//         // Now delete the user info
//         await deleteAddProT(id);
//         await loadTableData();
//       } catch (error) {
//         console.error("Error deleting item and image:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     // Clear the selected file
//     const handleFileClear = () => {
//       setSelectedFile(null);
//       setPreviewSrc(null);
//     };

//     // Load AddProTs on component mount
//     useEffect(() => {
//       loadTableData();
//     }, []);

//     return (
//       <main className="bg-gray-800 w-4/5 mx-auto mt-20 p-5 rounded-lg">
//         <div className="flex justify-between items-center mb-3">
//           <div className="text-3xl text-white">User Information</div>
//           <button
//             onClick={openPopup}
//             className="bg-blue-500 text-white px-5 py-3 text-xl rounded-xl"
//           >
//             Add Info
//           </button>
//         </div>

//         {/* Loader when saving data */}
//         {loading && (
//           <div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
//             <Progress type="circle" percent={progress} />
//           </div>
//         )}

//         <PopupC isOpen={isPopupOpen} onClose={closePopup}>
//           <form onSubmit={handleAddProTSubmit} className="mx-auto">
//             {[{ id: 'ProductName', label: 'Product Name', placeholder: 'Enter product Name', type: 'text', defaultValue: editAddProT?.ProductName },
//             { id: 'ProductDescription', label: 'Product Description', placeholder: 'Enter product Description', type: 'text', defaultValue: editAddProT?.ProductDescription },
//             { id: 'Category', label: 'Category', placeholder: 'Enter category', type: 'text', defaultValue: editAddProT?.Category },
//             { id: 'Brand', label: 'Brand', placeholder: 'Enter brand', type: 'text', defaultValue: editAddProT?.Brand },
//             { id: 'ModuleNumber', label: 'Module Number', placeholder: 'Enter module Number', type: 'text', defaultValue: editAddProT?.ModuleNumber },
//             { id: 'Dimensions', label: 'Dimensions', placeholder: 'Enter dimensions', type: 'text', defaultValue: editAddProT?.Dimensions },
//             { id: 'Colors', label: 'Colors', placeholder: 'Enter colors', type: 'text', defaultValue: editAddProT?.Colors },
//             { id: 'Warranty', label: 'Warranty', placeholder: 'Enter warranty', type: 'text', defaultValue: editAddProT?.Warranty },
//             ].map(({ id, label, placeholder, type, defaultValue }) => (
//               <div key={id} className="mb-5">
//                 <label htmlFor={id} className="block mb-2 text-sm font-medium text-white">
//                   {label}
//                 </label>
//                 <input
//                   type={type}
//                   id={id}
//                   placeholder={placeholder}
//                   className="text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white"
//                   defaultValue={defaultValue || ''}
//                   required
//                 />
//               </div>
//             ))}

//             <div className="flex flex-wrap items-center gap-3 sm:gap-5">
//               <div className="grow">
//                 <div className="flex items-center gap-x-2">
//                   <input
//                     type="file"
//                     onChange={handleFileChange}
//                     multiple
//                     accept="image/*"
//                     className="hidden"
//                     id="file-upload"
//                   />
//                   <label
//                     htmlFor="file-upload"
//                     className="py-2 px-3 inline-flex items-center gap-x-2 text-xs font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 cursor-pointer"
//                   >
//                     Upload Products photo
//                   </label>
//                   {previewSrc && (
//                     <button
//                       type="button"
//                       onClick={handleFileClear}
//                       className="py-2 px-3 inline-flex items-center gap-x-2 text-xs font-semibold rounded-lg border border-gray-200 bg-white text-gray-500 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50"
//                     >
//                       Delete
//                     </button>
//                   )}
//                 </div>
//               </div>

//               {previewSrc && (
//                 <div className="shrink-0">
//                   <img
//                     className="h-20 w-20 object-cover rounded-full"
//                     src={previewSrc}
//                     alt="Uploaded Preview"
//                   />
//                 </div>
//               )}
//             </div>

//             {errorMessage && <p className="text-red-500">{errorMessage}</p>}
//             <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-lg">
//               {editAddProT ? 'Update Info' : 'Add Info'}
//             </button>
//           </form>
//         </PopupC>

//         <div className="mt-5">
//           <table className="w-full border rounded-xl overflow-hidden">
//             <thead className="bg-blue-900">
//               <tr>
//                 {['Product Name', 'Category', 'Brand', 'Module ', 'Photo', 'Edit', 'Delete'].map((header) => (
//                   <th key={header} className="text-center py-3 border border-gray-500 text-lg">{header}</th>
//                 ))}
//               </tr>
//             </thead>
//             <tbody>
//               {tableData.length === 0 ? (
//                 <tr>
//                   <td colSpan={6} className="text-center py-3 text-lg text-gray-200">No data found.</td>
//                 </tr>
//               ) : (
//                 tableData.map(({ id, ProductName, Category, ProductDescription, Brand, ModuleNumber, Dimensions, Colors, Warranty, photoUrl, fileKey }) => (
//                   <tr key={id} className="text-center py-3 border border-gray-500">
//                     <td>{ProductName}</td>
//                     <td>{Category}</td>
//                     <td>{Brand}</td>
//                     <td>{ModuleNumber}</td>
//                     <td>
//                       {photoUrl && (
//                         <img className="inline h-20 w-20 object-cover rounded-full" src={photoUrl} alt="User Photo" />
//                       )}
//                     </td>
//                     <td>
//                       <button
//                         onClick={() => {
//                           setEditAddProT({ id, ProductName, Category, ProductDescription, Brand, ModuleNumber, Dimensions, Colors, Warranty, photoUrl, fileKey });
//                           openPopup();
//                         }}
//                         className="px-3 py-1 bg-yellow-500 text-white rounded-lg"
//                       >
//                         Edit
//                       </button>
//                     </td>
//                     <td>
//                       <button
//                         onClick={() => deleteItem(id, fileKey)}
//                         className="px-3 py-1 bg-red-500 text-white rounded-lg"
//                       >
//                         Delete
//                       </button>
//                     </td>
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//         </div>
//       </main>
//     );
//   }
/*
"use client";
import { addAddProT, deleteAddProT, getAddProTs, updateAddProT } from "../../actions/product/productAction";
import { useEffect, useState, FormEvent } from "react";
import PopupC from "@/app/components/PopupC";
import { Progress, notification } from 'antd';
interface AddProT {
  id: number;
  ProductName: string;
  ProductDescription: string;
  Category: string;
  Brand: string;
  ModuleNumber: string;
  Dimensions: string;
  Colors: string;
  Warranty: string;
  fileKey: string,
  photoUrl: string;
}

export default function AddProduct() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [tableData, setTableData] = useState<AddProT[]>([]);
  const [editAddProT, setEditAddProT] = useState<AddProT | undefined>();
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
    setEditAddProT(undefined);
    setSelectedFile(null);
    setPreviewSrc(null);
  };

  const loadTableData = async () => {
    try {
      setLoading(true);
      const AddProTs: AddProT[] = await getAddProTs();
      setTableData(AddProTs);
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

  const handleAddProTSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setProgress(0);
    setIsPopupOpen(false);
    const target = event.target as typeof event.target & {
      ProductName: { value: string };
      ProductDescription: { value: string };
      Category: { value: string };
      Brand: { value: string };
      ModuleNumber: { value: string };
      Dimensions: { value: string };
      Colors: { value: string };
      Warranty: { value: string }; };

    if (!selectedFile && !editAddProT) {
      setErrorMessage("Please select an image.");
      setLoading(false);
      setIsPopupOpen(true);
      return;
    }

    let imageUrl = editAddProT?.photoUrl || "";
    let fileKey = editAddProT?.fileKey || "";
    if (selectedFile) {
      if (editAddProT?.fileKey) {
        await fetch(`/api/AddImgPut?fileKey=${editAddProT.fileKey}`, { method: "DELETE" });
      }

      const formData = new FormData();
      formData.append("file", selectedFile);

      try {
        setProgress(30);
        const response = await fetch("/api/AddImgPut", {
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
      if (editAddProT) {
        // Update the existing AddProT
        await updateAddProT({
          id: editAddProT.id,
          ProductName: target.ProductName.value,
          ProductDescription: target.ProductDescription.value,
          Category: target.Category.value,
          Brand: target.Brand.value,
          Dimensions: target.Dimensions.value,
          Colors: target.Colors.value,
          Warranty: target.Warranty.value,
          ModuleNumber: target.ModuleNumber.value,
          photoUrl: imageUrl, // Update the photo URL
          fileKey: fileKey,   // Update the fileKey
        });
      } else {
        // Add new AddProT
        await addAddProT({
        ProductName: target.ProductName.value,
          ProductDescription: target.ProductDescription.value,
          Category: target.Category.value,
          Brand: target.Brand.value,
          Dimensions: target.Dimensions.value,
          Colors: target.Colors.value,
          Warranty: target.Warranty.value,
          ModuleNumber: target.ModuleNumber.value,
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
      setErrorMessage("Error saving the AddProT. Please try again.");
      console.error(error);
    } finally {
      setLoading(false); // End loading
    }
  };

  // Delete a AddProT and its image
  const deleteItem = async (id: number, fileKey: string) => {
    setLoading(true);
    try {
      // First, delete the image from S3
      await fetch(`/api/AddImgPut?fileKey=${fileKey}`, { method: "DELETE" });

      // Now delete the user info
      await deleteAddProT(id);
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

  // Load AddProTs on component mount
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

      {loading && (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
          <Progress type="circle" percent={progress} />
        </div>
      )}

      <PopupC isOpen={isPopupOpen} onClose={closePopup}>
        <form onSubmit={handleAddProTSubmit} className="mx-auto">
          {[{ id: 'ProductName', label: 'Product Name', placeholder: 'Enter product Name', type: 'text', defaultValue: editAddProT?.ProductName },
            { id: 'ProductDescription', label: 'Product Description', placeholder: 'Enter product Description', type: 'text', defaultValue: editAddProT?.ProductDescription },
            { id: 'Category', label: 'Category', placeholder: 'Enter category', type: 'text', defaultValue: editAddProT?.Category },
            { id: 'Brand', label: 'Brand', placeholder: 'Enter brand', type: 'text', defaultValue: editAddProT?.Brand },
            { id: 'ModuleNumber', label: 'Module Number', placeholder: 'Enter module Number', type: 'text', defaultValue: editAddProT?.ModuleNumber },
            { id: 'Dimensions', label: 'Dimensions', placeholder: 'Enter dimensions', type: 'text', defaultValue: editAddProT?.Dimensions },
            { id: 'Colors', label: 'Colors', placeholder: 'Enter colors', type: 'text', defaultValue: editAddProT?.Colors },
            { id: 'Warranty', label: 'Warranty', placeholder: 'Enter warranty', type: 'text', defaultValue: editAddProT?.Warranty },
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
                  multiple
                  accept="image/*"
                  className="hidden"
                  id="file-upload"
                />
                <label
                  htmlFor="file-upload"
                  className="py-2 px-3 inline-flex items-center gap-x-2 text-xs font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 cursor-pointer"
                >
                  Upload Products photo
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
            {editAddProT ? 'Update Info' : 'Add Info'}
          </button>
        </form>
      </PopupC>

      <div className="mt-5">
        <table className="w-full border rounded-xl overflow-hidden">
          <thead className="bg-blue-900">
            <tr>
              {['Product Name', 'Category', 'Brand', 'Module ','Photo', 'Edit', 'Delete'].map((header) => (
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
              tableData.map(({ id, ProductName, Category,ProductDescription,Brand,ModuleNumber,Dimensions,Colors,Warranty, photoUrl, fileKey }) => (
                <tr key={id} className="text-center py-3 border border-gray-500">
                  <td>{ProductName}</td>
                  <td>{Category}</td>
                  <td>{Brand}</td>
                 <td>{ModuleNumber}</td>
                  <td>
                    {photoUrl && (
                      <img className="inline h-20 w-20 object-cover rounded-full" src={photoUrl} alt="User Photo" />
                    )}
                  </td>
                  <td>
                    <button
                      onClick={() => {
                        setEditAddProT({ id, ProductName, Category,ProductDescription,Brand,ModuleNumber,Dimensions,Colors,Warranty, photoUrl, fileKey });
                        openPopup();
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
} */
/*
"use client";
import {
  addAddProT,
  deleteAddProT,
  getAddProTs,
  updateAddProT,
} from "../../actions/product/productAction";
import { useEffect, useState, FormEvent } from "react";
import PopupC from "@/app/components/PopupC";
import { Progress, notification } from "antd";

interface AddProT {
  id: number;
  ProductName: string;
  ProductDescription: string;
  Category: string;
  Brand: string;
  ModuleNumber: string;
  Dimensions: string;
  Colors: string;
  Warranty: string;
  photoUrls: string[];
  fileKeys: string[];
}

export default function AddProduct() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [tableData, setTableData] = useState<AddProT[]>([]);
  const [editAddProT, setEditAddProT] = useState<AddProT | undefined>();
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [previewSrcs, setPreviewSrcs] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    setEditAddProT(undefined);
    setSelectedFiles([]);
    setPreviewSrcs([]);
    setErrorMessage(null);
  };

  const loadTableData = async () => {
    try {
      setLoading(true);
      const AddProTs: AddProT[] = await getAddProTs();
      setTableData(AddProTs);
    } catch (error) {
      console.error("Error loading data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files ? Array.from(event.target.files) : [];
    if (files.length > 0) {
      setSelectedFiles(files);
      setPreviewSrcs(files.map((file) => URL.createObjectURL(file)));
    }
  };

  const handleAddProTSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setProgress(0);
    setIsPopupOpen(false);

    const target = event.target as typeof event.target & {
      ProductName: { value: string };
      ProductDescription: { value: string };
      Category: { value: string };
      Brand: { value: string };
      ModuleNumber: { value: string };
      Dimensions: { value: string };
      Colors: { value: string };
      Warranty: { value: string };
    };

    if (selectedFiles.length === 0 && !editAddProT) {
      setErrorMessage("Please select images.");
      setLoading(false);
      setIsPopupOpen(true);
      return;
    }

    let imageUrls: string[] = editAddProT?.photoUrls || [];

    if (selectedFiles.length > 0) {
      if (editAddProT?.fileKeys?.length) {
        // Delete old images if necessary
        await Promise.all(
          editAddProT.fileKeys.map((key: string) =>
            fetch(`/api/AddImgPut?fileKey=${key}`, { method: "DELETE" })
          )
        );
      }

      const formData = new FormData();
      selectedFiles.forEach((file) => formData.append("files", file));

      try {
        setProgress(30);
        const response = await fetch("/api/AddImgPut", {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          setProgress(60);
          const result = await response.json();
          imageUrls = result.urls; // Updated to match the expected response structure
        } else {
          const errorText = await response.text();
          setErrorMessage(`Failed to upload: ${errorText}`);
          setLoading(false);
          setIsPopupOpen(true);
          return;
        }
      } catch (error) {
        setErrorMessage("Error uploading files. Please try again.");
        console.error(error);
        setLoading(false);
        setIsPopupOpen(true);
        return;
      }
    }

    try {
      if (editAddProT) {
        // Update existing AddProT
        await updateAddProT({
          id: editAddProT.id,
          ProductName: target.ProductName.value,
          ProductDescription: target.ProductDescription.value,
          Category: target.Category.value,
          Brand: target.Brand.value,
          Dimensions: target.Dimensions.value,
          Colors: target.Colors.value,
          Warranty: target.Warranty.value,
          ModuleNumber: target.ModuleNumber.value,
          photoUrls: imageUrls,
          fileKeys: editAddProT.fileKeys, // Keep existing fileKeys, if any
        });
      } else {
        // Add new AddProT
        await addAddProT({
          ProductName: target.ProductName.value,
          ProductDescription: target.ProductDescription.value,
          Category: target.Category.value,
          Brand: target.Brand.value,
          Dimensions: target.Dimensions.value,
          Colors: target.Colors.value,
          Warranty: target.Warranty.value,
          ModuleNumber: target.ModuleNumber.value,
          photoUrls: imageUrls,
          fileKeys: [], // Start with an empty array for new AddProT
        });
      }

      setProgress(100);
      notification.success({
        message: "Success",
        description: "Product info and images saved successfully.",
      });

      loadTableData(); // Reload data after save
    } catch (error) {
      setErrorMessage("Error saving the AddProT. Please try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Clear the selected files
  const handleFileClear = () => {
    setSelectedFiles([]);
    setPreviewSrcs([]);
  };

  // Load AddProTs on component mount
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

      {loading && (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
          <Progress type="circle" percent={progress} />
        </div>
      )}

      <PopupC isOpen={isPopupOpen} onClose={closePopup}>
        <form onSubmit={handleAddProTSubmit} className="mx-auto">
          {[{
              id: "ProductName",
              label: "Product Name",
              placeholder: "Enter product Name",
              type: "text",
              defaultValue: editAddProT?.ProductName,
            },
            {
              id: "ProductDescription",
              label: "Product Description",
              placeholder: "Enter product Description",
              type: "text",
              defaultValue: editAddProT?.ProductDescription,
            },
            {
              id: "Category",
              label: "Category",
              placeholder: "Enter category",
              type: "text",
              defaultValue: editAddProT?.Category,
            },
            {
              id: "Brand",
              label: "Brand",
              placeholder: "Enter brand",
              type: "text",
              defaultValue: editAddProT?.Brand,
            },
            {
              id: "ModuleNumber",
              label: "Module Number",
              placeholder: "Enter module Number",
              type: "text",
              defaultValue: editAddProT?.ModuleNumber,
            },
            {
              id: "Dimensions",
              label: "Dimensions",
              placeholder: "Enter dimensions",
              type: "text",
              defaultValue: editAddProT?.Dimensions,
            },
            {
              id: "Colors",
              label: "Colors",
              placeholder: "Enter colors",
              type: "text",
              defaultValue: editAddProT?.Colors,
            },
            {
              id: "Warranty",
              label: "Warranty",
              placeholder: "Enter warranty",
              type: "text",
              defaultValue: editAddProT?.Warranty,
            },
          ].map(({ id, label, placeholder, type, defaultValue }) => (
            <div key={id} className="mb-5">
              <label
                htmlFor={id}
                className="block mb-2 text-sm font-medium text-white"
              >
                {label}
              </label>
              <input
                type={type}
                id={id}
                placeholder={placeholder}
                defaultValue={defaultValue}
                required
                className="text-sm rounded-lg block w-full p-2 bg-gray-600 border-gray-300 placeholder-gray-400 text-white"
              />
            </div>
          ))}

          <div className="mb-5">
            <label
              htmlFor="files"
              className="block mb-2 text-sm font-medium text-white"
            >
              Upload Images
            </label>
            <input
              type="file"
              id="files"
              multiple
              accept="image/*"
              onChange={handleFileChange}
              className="text-sm rounded-lg block w-full p-2 bg-gray-600 border-gray-300 placeholder-gray-400 text-white"
            />
            <div className="mt-2">
              {previewSrcs.map((src, index) => (
                <img
                  key={index}
                  src={src}
                  alt={`Preview ${index + 1}`}
                  className="w-20 h-20 object-cover mr-2"
                />
              ))}
            </div>
          </div>

          {errorMessage && (
            <div className="text-red-500 mb-4">{errorMessage}</div>
          )}
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-500 text-white px-5 py-2 rounded-lg"
            >
              {editAddProT ? "Update" : "Add"}
            </button>
            <button
              type="button"
              onClick={handleFileClear}
              className="bg-red-500 text-white px-5 py-2 rounded-lg ml-2"
            >
              Clear Files
            </button>
          </div>
        </form>
      </PopupC>
    </main>
  );
}
*/
"use client";
import { useEffect, useState, FormEvent } from "react";
import { Progress, notification, Table, Button, Space, Select } from "antd";
import { addAddProT, deleteAddProT, getAddProTs, updateAddProT } from "../../actions/product/productAction";
import { getTodos, TodoItem } from "../../actions/category/categoryAction";
import PopupC from "@/app/components/PopupC";

interface AddProT {
  id: number;
  ProductName: string;
  ProductDescription: string;
  Category: string;
  Brand: string;
  ModuleNumber: string;
  Dimensions: string;
  Colors: string;
  Warranty: string;
  photoUrls: string[];
  fileKeys: string[];
}

export default function AddProduct() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [tableData, setTableData] = useState<AddProT[]>([]);
  const [editAddProT, setEditAddProT] = useState<AddProT | undefined>();
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [previewSrcs, setPreviewSrcs] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [todoItems, setTodoItems] = useState<TodoItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>();
  const [selectedBrand, setSelectedBrand] = useState<string | undefined>();

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    setEditAddProT(undefined);
    setSelectedFiles([]);
    setPreviewSrcs([]);
    setErrorMessage(null);
    setIsSubmitting(false);
  };

  const loadTableData = async () => {
    try {
      setLoading(true);
      const AddProTs: AddProT[] = await getAddProTs();
      setTableData(AddProTs);
    } catch (error) {
      console.error("Error loading data:", error);
    } finally {
      setLoading(false);
    }
  };

  const loadTodoOptions = async () => {
    try {
      const todos = await getTodos();
      setTodoItems(todos);
    } catch (error) {
      console.error("Error loading todos:", error);
    }
  };

  const handleEdit = (record: AddProT) => {
    setEditAddProT(record);
    setSelectedCategory(record.Category);
    setSelectedBrand(record.Brand);
    setIsPopupOpen(true);
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteAddProT(id);
      notification.success({
        message: "Deleted",
        description: "Product deleted successfully.",
      });
      loadTableData();
    } catch (error) {
      notification.error({
        message: "Error",
        description: "Failed to delete product. Please try again.",
      });
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files ? Array.from(event.target.files) : [];
    if (files.length > 0) {
      setSelectedFiles(files);
      setPreviewSrcs(files.map((file) => URL.createObjectURL(file)));
    }
  };

  const handleAddProTSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    setLoading(true);
    setProgress(0);
    setIsPopupOpen(false);

    const target = event.target as typeof event.target & {
      ProductName: { value: string };
      ProductDescription: { value: string };
      ModuleNumber: { value: string };
      Dimensions: { value: string };
      Colors: { value: string };
      Warranty: { value: string };
    };

    if (selectedFiles.length === 0 && !editAddProT) {
      setErrorMessage("Please select images.");
      setLoading(false);
      setIsSubmitting(false);
      setIsPopupOpen(true);
      return;
    }

    let imageUrls: string[] = editAddProT?.photoUrls || [];

    if (selectedFiles.length > 0) {
      if (editAddProT?.fileKeys?.length) {
        await Promise.all(
          editAddProT.fileKeys.map((key: string) =>
            fetch(`/api/AddImgPut?fileKey=${key}`, { method: "DELETE" })
          )
        );
      }

      const formData = new FormData();
      selectedFiles.forEach((file) => formData.append("files", file));

      try {
        setProgress(30);
        const response = await fetch("/api/AddImgPut", {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          setProgress(60);
          const result = await response.json();
          imageUrls = result.urls;
        } else {
          const errorText = await response.text();
          setErrorMessage(`Failed to upload: ${errorText}`);
          setLoading(false);
          setIsSubmitting(false);
          setIsPopupOpen(true);
          return;
        }
      } catch (error) {
        setErrorMessage("Error uploading files. Please try again.");
        setLoading(false);
        setIsSubmitting(false);
        setIsPopupOpen(true);
        return;
      }
    }

    try {
      if (editAddProT) {
        await updateAddProT({
          id: editAddProT.id,
          ProductName: target.ProductName.value,
          ProductDescription: target.ProductDescription.value,
          Category: selectedCategory || "",
          Brand: selectedBrand || "",
          ModuleNumber: target.ModuleNumber.value,
          Dimensions: target.Dimensions.value,
          Colors: target.Colors.value,
          Warranty: target.Warranty.value,
          photoUrls: imageUrls,
          fileKeys: editAddProT.fileKeys,
        });
      } else {
        await addAddProT({
          ProductName: target.ProductName.value,
          ProductDescription: target.ProductDescription.value,
          Category: selectedCategory || "",
          Brand: selectedBrand || "",
          ModuleNumber: target.ModuleNumber.value,
          Dimensions: target.Dimensions.value,
          Colors: target.Colors.value,
          Warranty: target.Warranty.value,
          photoUrls: imageUrls,
          fileKeys: [],
        });
      }

      setProgress(100);
      notification.success({
        message: "Success",
        description: "Product info and images saved successfully.",
      });

      loadTableData();
    } catch (error) {
      setErrorMessage("Error saving the product. Please try again.");
    } finally {
      setLoading(false);
      setIsSubmitting(false);
    }
  };

  const handleFileClear = () => {
    setSelectedFiles([]);
    setPreviewSrcs([]);
  };

  useEffect(() => {
    loadTableData();
    loadTodoOptions();
  }, []);

  const columns = [
    {
      title: "Product Name",
      dataIndex: "ProductName",
      key: "ProductName",
    },
    {
      title: "Category",
      dataIndex: "Category",
      key: "Category",
    },
    {
      title: "Brand",
      dataIndex: "Brand",
      key: "Brand",
    },
    {
      title: "Actions",
      key: "actions",
      render: (text: string, record: AddProT) => (
        <Space size="middle">
          <Button onClick={() => handleEdit(record)} type="primary">
            Edit
          </Button>
          <Button onClick={() => handleDelete(record.id)} type="primary" danger>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <main className="bg-gray-800 w-4/5 mx-auto mt-10 p-5 rounded-lg">
      <div className="flex justify-between items-center mb-3">
        <div className="text-3xl text-white">Product Information</div>
        <button
          onClick={openPopup}
          className="bg-blue-500 text-white px-5 py-3 text-xl rounded-xl"
        >
          Add Product
        </button>
      </div>

      {loading && (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
          <Progress type="circle" percent={progress} />
        </div>
      )}

      <Table
        className="bg-white rounded-lg overflow-hidden"
        dataSource={tableData}
        columns={columns}
        rowKey="id"
        pagination={{ pageSize: 5 }}
      />
<PopupC isOpen={isPopupOpen} onClose={closePopup}>
  <form onSubmit={handleAddProTSubmit} className="bg-white p-10 rounded-lg">
          <div className="border-b-4 ">
    <h2 className="text-2xl ">{editAddProT ? "Edit Product" : "Add Product"}</h2>
            
</div>
    <div className="grid grid-cols-3 pt-2 gap-4">
      {[
        { label: "Product Name", name: "ProductName", defaultValue: editAddProT?.ProductName },
        { label: "Module Number", name: "ModuleNumber", defaultValue: editAddProT?.ModuleNumber },
        { label: "Dimensions", name: "Dimensions", defaultValue: editAddProT?.Dimensions },
        { label: "Colors", name: "Colors", defaultValue: editAddProT?.Colors },
        { label: "Warranty", name: "Warranty", defaultValue: editAddProT?.Warranty },
      ].map(({ label, name, defaultValue }) => (
        <div key={name}>
          <label className="text-lg font-semibold">{label}</label>
          <input className="w-full px-2 py-1 text-lg border-2 border-gray-400 rounded-lg" type="text" name={name} defaultValue={defaultValue} required />
        </div>
      ))}

      <div>
              <label className="text-lg font-semibold">Category</label>
              <Select
                className="w-full my-1"
                placeholder="Select Category"
                value={selectedCategory}
                onChange={(value) => setSelectedCategory(value)}
              >
                {todoItems.map((item) => (
                  <Select.Option key={item.id} value={item.firstName}>
                    {item.firstName}
                  </Select.Option>
                ))}
              </Select>
            </div>

            <div>
              <label className="text-lg font-semibold">Brand</label>
              <Select
                className="w-full"
                placeholder="Select Brand"
                value={selectedBrand}
                onChange={(value) => setSelectedBrand(value)}
              >
                {todoItems.map((item) => (
                  <Select.Option key={item.id} value={item.lastName}>
                    {item.lastName}
                  </Select.Option>
                ))}
              </Select>
            </div>
    </div>

          <div className="grid grid-cols-8 pt-2 gap-4" > 
            <div className="col-span-7"> <label className="text-lg font-semibold px-2">Product Images</label>
      <input type="file" multiple onChange={handleFileChange} accept="image/*" className="w-2/5 px-4 py-2 text-xl border-2 border-gray-400 rounded-lg" />
      <div className="mt-2 flex flex-wrap gap-4">
        {previewSrcs.map((src, index) => (
          <img key={index} src={src} alt={`preview-${index}`} className="w-32 h-32 object-cover rounded-lg" />
        ))}
            </div>
 </div>
        <div>
            
      {selectedFiles.length > 0 && (
        <Button onClick={handleFileClear} type="default" className="mt-2 bg-red-400">
          Clear Selected Images
        </Button>
      )}
    </div>
          </div>
          
        

    {errorMessage && <div className="text-red-500 mt-2 text-lg">{errorMessage}</div>}

    <div className="mt-5 flex justify-end space-x-3">
      <Button onClick={closePopup} type="default" className="text-lg">
        Cancel
      </Button>
      <Button htmlType="submit" type="primary" className="text-lg">
        {editAddProT ? "Update Product" : "Add Product"}
      </Button>
    </div>
  </form>
</PopupC>


    </main>
  );
}

/*
"use client";
import {addAddProT,  deleteAddProT,  getAddProTs,  updateAddProT,} from "../../actions/product/productAction";
import { useEffect, useState, FormEvent } from "react";
import PopupC from "@/app/components/PopupC";
import { Progress, notification, Table, Button, Space, Select } from "antd"; // Ant Design components
import { getTodos, TodoItem } from "../../actions/category/categoryAction"; // Import the getTodos function

interface AddProT {
  id: number;
  ProductName: string;
  ProductDescription: string;
  Category: string;
  Brand: string;
  ModuleNumber: string;
  Dimensions: string;
  Colors: string;
  Warranty: string;
  photoUrls: string[];
  fileKeys: string[];
}

export default function AddProduct() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [tableData, setTableData] = useState<AddProT[]>([]);
  const [editAddProT, setEditAddProT] = useState<AddProT | undefined>();
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [previewSrcs, setPreviewSrcs] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [todoItems, setTodoItems] = useState<TodoItem[]>([]); // State to store options from DynamoDB
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>();
  const [selectedBrand, setSelectedBrand] = useState<string | undefined>();

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    setEditAddProT(undefined);
    setSelectedFiles([]);
    setPreviewSrcs([]);
    setErrorMessage(null);
    setIsSubmitting(false);
  };

  const loadTableData = async () => {
    try {
      setLoading(true);
      const AddProTs: AddProT[] = await getAddProTs();
      setTableData(AddProTs);
    } catch (error) {
      console.error("Error loading data:", error);
    } finally {
      setLoading(false);
    }
  };

  const loadTodoOptions = async () => {
    try {
      const todos = await getTodos(); // Fetch data from DynamoDB
      setTodoItems(todos);
    } catch (error) {
      console.error("Error loading todos:", error);
    }
  };

  const handleEdit = (record: AddProT) => {
    setEditAddProT(record);
    setSelectedCategory(record.Category);
    setSelectedBrand(record.Brand);
    setIsPopupOpen(true);
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteAddProT(id);
      notification.success({
        message: "Deleted",
        description: "Product deleted successfully.",
      });
      loadTableData(); // Reload table after deletion
    } catch (error) {
      notification.error({
        message: "Error",
        description: "Failed to delete product. Please try again.",
      });
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files ? Array.from(event.target.files) : [];
    if (files.length > 0) {
      setSelectedFiles(files);
      setPreviewSrcs(files.map((file) => URL.createObjectURL(file)));
    }
  };

  const handleAddProTSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    setLoading(true);
    setProgress(0);
    setIsPopupOpen(false);

    const target = event.target as typeof event.target & {
      ProductName: { value: string };
      ProductDescription: { value: string };
      ModuleNumber: { value: string };
      Dimensions: { value: string };
      Colors: { value: string };
      Warranty: { value: string };
    };

    if (selectedFiles.length === 0 && !editAddProT) {
      setErrorMessage("Please select images.");
      setLoading(false);
      setIsSubmitting(false);
      setIsPopupOpen(true);
      return;
    }

    let imageUrls: string[] = editAddProT?.photoUrls || [];

    if (selectedFiles.length > 0) {
      if (editAddProT?.fileKeys?.length) {
        await Promise.all(
          editAddProT.fileKeys.map((key: string) =>
            fetch(`/api/AddImgPut?fileKey=${key}`, { method: "DELETE" })
          )
        );
      }

      const formData = new FormData();
      selectedFiles.forEach((file) => formData.append("files", file));

      try {
        setProgress(30);
        const response = await fetch("/api/AddImgPut", {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          setProgress(60);
          const result = await response.json();
          imageUrls = result.urls;
        } else {
          const errorText = await response.text();
          setErrorMessage(`Failed to upload: ${errorText}`);
          setLoading(false);
          setIsSubmitting(false);
          setIsPopupOpen(true);
          return;
        }
      } catch (error) {
        setErrorMessage("Error uploading files. Please try again.");
        setLoading(false);
        setIsSubmitting(false);
        setIsPopupOpen(true);
        return;
      }
    }

    try {
      if (editAddProT) {
        await updateAddProT({
          id: editAddProT.id,
          ProductName: target.ProductName.value,
          ProductDescription: target.ProductDescription.value,
          Category: selectedCategory || "",
          Brand: selectedBrand || "",
          ModuleNumber: target.ModuleNumber.value,
          Dimensions: target.Dimensions.value,
          Colors: target.Colors.value,
          Warranty: target.Warranty.value,
          photoUrls: imageUrls,
          fileKeys: editAddProT.fileKeys,
        });
      } else {
        await addAddProT({
          ProductName: target.ProductName.value,
          ProductDescription: target.ProductDescription.value,
          Category: selectedCategory || "",
          Brand: selectedBrand || "",
          ModuleNumber: target.ModuleNumber.value,
          Dimensions: target.Dimensions.value,
          Colors: target.Colors.value,
          Warranty: target.Warranty.value,
          photoUrls: imageUrls,
          fileKeys: [],
        });
      }

      setProgress(100);
      notification.success({
        message: "Success",
        description: "Product info and images saved successfully.",
      });

      loadTableData();
    } catch (error) {
      setErrorMessage("Error saving the product. Please try again.");
    } finally {
      setLoading(false);
      setIsSubmitting(false);
    }
  };

  const handleFileClear = () => {
    setSelectedFiles([]);
    setPreviewSrcs([]);
  };

  useEffect(() => {
    loadTableData();
    loadTodoOptions(); // Load Todo options on component mount
  }, []);

  const columns = [
    {
      title: "Product Name",
      dataIndex: "ProductName",
      key: "ProductName",
    },
    {
      title: "Category",
      dataIndex: "Category",
      key: "Category",
    },
    {
      title: "Brand",
      dataIndex: "Brand",
      key: "Brand",
    },
    {
      title: "Actions",
      key: "actions",
      render: (text: string, record: AddProT) => (
        <Space size="middle">
          <Button onClick={() => handleEdit(record)} type="primary">
            Edit
          </Button>
          <Button onClick={() => handleDelete(record.id)} type="primary" danger>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <main className="bg-gray-800 w-4/5 mx-auto mt-20 p-5 rounded-lg">
      <div className="flex justify-between items-center mb-3">
        <div className="text-3xl text-white">Product Information</div>
        <button
          onClick={openPopup}
          className="bg-blue-500 text-white px-5 py-3 text-xl rounded-xl"
        >
          Add Product
        </button>
      </div>

      {loading && (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
          <Progress type="circle" percent={progress} />
        </div>
      )}

      <Table
        className="bg-white rounded-lg overflow-hidden"
        dataSource={tableData}
        columns={columns}
        rowKey="id"
        pagination={{ pageSize: 5 }}
      />

      <PopupC isOpen={isPopupOpen} onClose={closePopup}>
        <form onSubmit={handleAddProTSubmit} className="bg-white p-10 rounded-lg">
          <h2 className="text-2xl mb-5">{editAddProT ? "Edit Product" : "Add Product"}</h2>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xl">Product Name</label>
              <input
                className="w-full px-4 py-2 text-xl border-2 border-gray-400 rounded-lg"
                type="text"
                name="ProductName"
                defaultValue={editAddProT?.ProductName}
                required
              />
            </div>

            <div>
              <label className="text-xl">Category</label>
              <Select
                className="w-full"
                placeholder="Select Category"
                value={selectedCategory}
                onChange={(value) => setSelectedCategory(value)}
              >
                {todoItems.map((item) => (
                  <Select.Option key={item.id} value={item.firstName}>
                    {item.firstName}
                  </Select.Option>
                ))}
              </Select>
            </div>

            <div>
              <label className="text-xl">Brand</label>
              <Select
                className="w-full"
                placeholder="Select Brand"
                value={selectedBrand}
                onChange={(value) => setSelectedBrand(value)}
              >
                {todoItems.map((item) => (
                  <Select.Option key={item.id} value={item.lastName}>
                    {item.lastName}
                  </Select.Option>
                ))}
              </Select>
            </div>

            <div>
              <label className="text-xl">Module Number</label>
              <input
                className="w-full px-4 py-2 text-xl border-2 border-gray-400 rounded-lg"
                type="text"
                name="ModuleNumber"
                defaultValue={editAddProT?.ModuleNumber}
              />
            </div>

            <div>
              <label className="text-xl">Dimensions</label>
              <input
                className="w-full px-4 py-2 text-xl border-2 border-gray-400 rounded-lg"
                type="text"
                name="Dimensions"
                defaultValue={editAddProT?.Dimensions}
              />
            </div>

            <div>
              <label className="text-xl">Colors</label>
              <input
                className="w-full px-4 py-2 text-xl border-2 border-gray-400 rounded-lg"
                type="text"
                name="Colors"
                defaultValue={editAddProT?.Colors}
              />
            </div>

            <div>
              <label className="text-xl">Warranty</label>
              <input
                className="w-full px-4 py-2 text-xl border-2 border-gray-400 rounded-lg"
                type="text"
                name="Warranty"
                defaultValue={editAddProT?.Warranty}
              />
            </div>
          </div>

          <div className="mt-4">
            <label className="text-xl">Product Images</label>
            <input
              type="file"
              multiple
              onChange={handleFileChange}
              accept="image/*"
              className="w-full px-4 py-2 text-xl border-2 border-gray-400 rounded-lg"
            />

            <div className="mt-2 flex flex-wrap gap-4">
              {previewSrcs.map((src, index) => (
                <img
                  key={index}
                  src={src}
                  alt={`preview-${index}`}
                  className="w-32 h-32 object-cover rounded-lg"
                />
              ))}
            </div>

            {selectedFiles.length > 0 && (
              <div className="mt-2">
                <Button onClick={handleFileClear} type="default">
                  Clear Selected Images
                </Button>
              </div>
            )}
          </div>
          {errorMessage && (
            <div className="text-red-500 mt-2 text-lg">{errorMessage}</div>
          )}
          <div className="mt-5 flex justify-end space-x-3">
            <Button onClick={closePopup} type="default" className="text-lg">
              Cancel
            </Button>
            <Button htmlType="submit" type="primary" className="text-lg">
              {editAddProT ? "Update Product" : "Add Product"}
            </Button>
          </div>
        </form>
      </PopupC>
    </main>
  );
}*/
