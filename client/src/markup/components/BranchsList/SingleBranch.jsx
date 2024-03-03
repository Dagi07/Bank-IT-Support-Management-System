// import React, { useState } from "react";

// import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
// import SmallModal from "../SmallModal/SmallModal";

// const SingleBranch = ({
//   branch,
//   serverError,
//   setServerError,
//   editing,
//   setEditing,
//   index,
//   setBranchData,
//   branchData,
// }) => {
//   const [showSmallModal, setShowSmallModal] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [originalBranchData, setOriginalBranchData] = useState([]);

//   const handleUpdate = (index) => {
//     const updatedRow = branchData[index];
//     const originalRow = originalBranchData[index];

//     const changesOnRow = Object.keys(updatedRow).reduce((result, key) => {
//       if (updatedRow[key] !== originalRow[key]) {
//         result[key] = updatedRow[key];
//       }
//       return result;
//     }, {});
//     if (changesOnRow.password && changesOnRow.password.length < 6) {
//       setServerError(() => "Password length should atleast be 6 characters");
//       return;
//     } else if (changesOnRow.password && changesOnRow.password.length > 30) {
//       setServerError(
//         () => "Password length should not be more than 30 characters"
//       );
//       return;
//     } else {
//       setServerError(() => "");
//     }
//     setLoading(() => true);
//     changesOnRow._id = branchData[index]._id;
//     console.log("changesOnRow", changesOnRow);
//     const updateBranch = branchsService.updateBranch(changesOnRow, token);
//     updateBranch
//       .then((data) => {
//         if (data.data.status == "success") {
//           console.log("Update successful:", data);
//           setEditing(() => null);
//           getBranchsfn();
//           setLoading(() => false);
//           // setBranchData((branchData) => [...branchData, data.data.data]);
//         }
//       })
//       .catch((error) => {
//         console.error("Error updating row:", error);
//         setServerError(() => error.response.data.message);
//       })
//       .finally(() => {
//         setShowPassword(() => false);
//       });
//   };
//   console.log(branch);
//   return (
//     <>
//       {editing == null || editing !== index ? (
//         <>
//           <td className="text-center">{branch?.name}</td>
//           <td className="">{branch?.username}</td>
//           <td className=" text-center">{branch?.phoneno}</td>
//           <td className=" text-center">{branch?.city}</td>
//           <td className=" text-center">******</td>
//           <td className=" text-center">Active</td>
//           <td
//             className=" text-center"
//             onClick={() => {
//               setShowSmallModal(true);
//             }}
//           >
//             <p>
//               <InfoOutlinedIcon className="cursor-pointer active:opacity-50" />
//             </p>
//           </td>

//           <td>
//             <button
//               onClick={() => setEditing(index)}
//               className="border border-black rounded-lg px-3 py-1 bg-white text-black text-sm hover:opacity-50 active:opacity-25"
//             >
//               Edit
//             </button>{" "}
//           </td>
//           {showSmallModal && (
//             <SmallModal
//               from="BranchsList"
//               token={token}
//               branch={branch}
//               showsmallmodal={showSmallModal}
//               setshowsmallmodal={setShowSmallModal}
//             />
//           )}
//         </>
//       ) : (
//         <>
//           <td className=" text-center">
//             <input
//               name="name"
//               type="text"
//               value={branch.name}
//               onKeyDown={(event) => {
//                 if (event.key === "Enter") handleUpdate(index);
//               }}
//               onChange={(event) =>
//                 setBranchData((prevBranchData) => [
//                   ...prevBranchData.slice(0, index),
//                   {
//                     ...prevBranchData[index],
//                     [event.target.name]: event.target.value,
//                   },
//                   ...prevBranchData.slice(index + 1),
//                 ])
//               }
//               className="border border-gray-400 px-2 rounded-md w-48"
//             />
//           </td>

//           <td className="">
//             <input
//               name="username"
//               type="text"
//               value={branch.username}
//               onKeyDown={(event) => {
//                 if (event.key === "Enter") handleUpdate(index);
//               }}
//               onChange={(event) =>
//                 setBranchData((prevBranchData) => [
//                   ...prevBranchData.slice(0, index),
//                   {
//                     ...prevBranchData[index],
//                     [event.target.name]: event.target.value,
//                   },
//                   ...prevBranchData.slice(index + 1),
//                 ])
//               }
//               className="border border-gray-400 px-2 rounded-md w-52"
//             />
//           </td>
//           <td className=" text-center">
//             <input
//               name="phoneno"
//               type="text"
//               value={branch.phoneno}
//               onKeyDown={(event) => {
//                 if (event.key === "Enter") handleUpdate(index);
//               }}
//               onChange={(event) =>
//                 setBranchData((prevBranchData) => [
//                   ...prevBranchData.slice(0, index),
//                   {
//                     ...prevBranchData[index],
//                     [event.target.name]: event.target.value,
//                   },
//                   ...prevBranchData.slice(index + 1),
//                 ])
//               }
//               className="border border-gray-400 px-2 rounded-md w-28"
//             />
//           </td>
//           <td className=" text-center">
//             <input
//               name="city"
//               type="text"
//               value={branch.city}
//               onKeyDown={(event) => {
//                 if (event.key === "Enter") handleUpdate(index);
//               }}
//               onChange={(event) =>
//                 setBranchData((prevBranchData) => [
//                   ...prevBranchData.slice(0, index),
//                   {
//                     ...prevBranchData[index],
//                     [event.target.name]: event.target.value,
//                   },
//                   ...prevBranchData.slice(index + 1),
//                 ])
//               }
//               className="border border-gray-400 px-2 rounded-md w-40"
//             />
//           </td>
//           <td className=" text-center">
//             <div class="max-w-sm">
//               <div class="relative">
//                 <input
//                   id="hs-toggle-password"
//                   name="password"
//                   type={showPassword ? "text" : "password"}
//                   value={branch.password}
//                   onKeyDown={(event) => {
//                     if (event.key === "Enter") handleUpdate(index);
//                   }}
//                   onChange={(event) =>
//                     setBranchData((prevBranchData) => [
//                       ...prevBranchData.slice(0, index),
//                       {
//                         ...prevBranchData[index],
//                         [event.target.name]: event.target.value,
//                       },
//                       ...prevBranchData.slice(index + 1),
//                     ])
//                   }
//                   className="border border-gray-400 px-2 rounded-md py-2 block w-full  text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
//                   placeholder="New Password"
//                 />
//                 <button
//                   type="button"
//                   data-hs-toggle-password='{
//         "target": "#hs-toggle-password"
//       }'
//                   class="absolute top-0 end-0 p-3.5 rounded-e-md dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
//                   onClick={() => setShowPassword(() => !showPassword)}
//                 >
//                   <svg
//                     class="flex-shrink-0 size-3.5 text-gray-400 dark:text-neutral-600"
//                     width="24"
//                     height="24"
//                     viewBox="0 0 24 24"
//                     fill="none"
//                     stroke="currentColor"
//                     stroke-width="2"
//                     stroke-linecap="round"
//                     stroke-linejoin="round"
//                   >
//                     <path
//                       class="hs-password-active:hidden"
//                       d="M9.88 9.88a3 3 0 1 0 4.24 4.24"
//                     />
//                     <path
//                       class="hs-password-active:hidden"
//                       d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"
//                     />
//                     <path
//                       class="hs-password-active:hidden"
//                       d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"
//                     />
//                     <line
//                       class="hs-password-active:hidden"
//                       x1="2"
//                       x2="22"
//                       y1="2"
//                       y2="22"
//                     />
//                     <path
//                       class="hidden hs-password-active:block"
//                       d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"
//                     />
//                     <circle
//                       class="hidden hs-password-active:block"
//                       cx="12"
//                       cy="12"
//                       r="3"
//                     />
//                   </svg>
//                 </button>
//               </div>
//             </div>
//           </td>
//           <td className=" text-center">
//             <select
//               name="isActive"
//               defaultValue={branch.isActive}
//               onKeyDown={(event) => {
//                 if (event.key === "Enter") handleUpdate(index);
//               }}
//               onChange={(event) =>
//                 setBranchData((prevBranchData) => [
//                   ...prevBranchData.slice(0, index),
//                   {
//                     ...prevBranchData[index],
//                     [event.target.name]: event.target.value,
//                   },
//                   ...prevBranchData.slice(index + 1),
//                 ])
//               }
//             >
//               <option value="true">Active</option>
//               <option value="false">Inactive</option>
//             </select>
//           </td>
//           <td></td>
//           <td>
//             <button
//               onClick={() => handleUpdate(index)}
//               className="group text-white bg-black  text-sm border border-white rounded-lg px-2 py-1 hover:opacity-65 active:opacity-50"
//             >
//               {!loading ? (
//                 "Update"
//               ) : (
//                 <svg
//                   className="mx-3 h-5 w-5 animate-spin group text-white"
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                 >
//                   <circle
//                     className="opacity-25"
//                     cx="12"
//                     cy="12"
//                     r="10"
//                     stroke="currentColor"
//                     stroke-width="4"
//                   ></circle>
//                   <path
//                     className="opacity-75"
//                     fill="currentColor"
//                     d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                   ></path>
//                 </svg>
//               )}
//             </button>
//           </td>
//         </>
//       )}
//     </>
//   );
// };

// export default SingleBranch;
