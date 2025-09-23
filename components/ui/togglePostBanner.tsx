// "use client";
// import React, { useContext } from "react";
// import { useState } from "react";
// import { IoEllipsisHorizontalOutline } from "react-icons/io5";
// import { ModalContext } from "./modals/providers";

// interface Props {
//   postId: string;
//   title: string;
//   content: string;
// }
// function TogglePostBanner({ postId, title, content }: Props) {
//   const [isOpen, setIsOpen] = useState(false);
//   const { setShowModal, setDeletePost, setEditPost } = useContext(ModalContext);
//   return (
//     <div style={{ position: "relative", display: "inline-block" }}>
//       <IoEllipsisHorizontalOutline
//         style={{ color: "white", cursor: "pointer" }}
//         onClick={() => setIsOpen((prev) => !prev)}
//       />
//       {isOpen && (
//         <div
//           style={{
//             position: "absolute",
//             top: "120%",
//             right: 0,
//             backgroundColor: "white",
//             color: "black",
//             borderRadius: "8px",
//             boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
//             zIndex: 100,
//             minWidth: "120px",
//           }}
//         >
//           <button
//             onClick={() => {
//               setShowModal(true);
//               setEditPost({ id: postId, title, content });
//             }}
//             style={{
//               padding: "8px 12px",
//               display: "block",
//               width: "100%",
//               textAlign: "left",
//               background: "none",
//               border: "none",
//               cursor: "pointer",
//               color: "black",
//               borderRadius: "8px",
//               borderBottomLeftRadius: "0px",
//               borderBottomRightRadius: "0px",
//             }}
//             onMouseEnter={(e) =>
//               (e.currentTarget.style.backgroundColor = "#1f5bffff")
//             }
//             onMouseLeave={(e) =>
//               (e.currentTarget.style.backgroundColor = "transparent")
//             }
//           >
//             Update
//           </button>

//           <button
//             onClick={() => {
//               setShowModal(true);
//               setDeletePost({ id: postId, title, content });
//             }}
//             style={{
//               padding: "8px 12px",
//               display: "block",
//               width: "100%",
//               textAlign: "left",
//               background: "none",
//               border: "none",
//               cursor: "pointer",
//               color: "black",
//               borderBottomLeftRadius: "8px",
//               borderBottomRightRadius: "8px",
//             }}
//             onMouseEnter={(e) =>
//               (e.currentTarget.style.backgroundColor = "#1f5bffff")
//             }
//             onMouseLeave={(e) =>
//               (e.currentTarget.style.backgroundColor = "transparent")
//             }
//           >
//             Delete
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }

// export default TogglePostBanner;

"use client";
import React, { useContext, useState } from "react";
import { IoEllipsisHorizontalOutline } from "react-icons/io5";
import { ModalContext } from "./modals/providers";

interface Props {
  postId: string;
  title: string;
  content: string;
}

function TogglePostBanner({ postId, title, content }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const { setShowModal, setModalType, setCurrentPost } =
    useContext(ModalContext);

  const handleOpen = (type: "edit" | "delete") => {
    setShowModal(true);
    setModalType(type);
    setCurrentPost({ id: postId, title, content });
    setIsOpen(false); // close dropdown after click
  };

  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      <IoEllipsisHorizontalOutline
        style={{ color: "white", cursor: "pointer" }}
        onClick={() => setIsOpen((prev) => !prev)}
      />

      {isOpen && (
        <div
          style={{
            position: "absolute",
            top: "120%",
            right: 0,
            backgroundColor: "white",
            color: "black",
            borderRadius: "8px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
            zIndex: 100,
            minWidth: "120px",
          }}
        >
          <button
            onClick={() => handleOpen("edit")}
            style={{
              padding: "8px 12px",
              display: "block",
              width: "100%",
              textAlign: "left",
              border: "none",
              cursor: "pointer",
              background: "none",
              color: "black",
            }}
          >
            Update
          </button>

          <button
            onClick={() => handleOpen("delete")}
            style={{
              padding: "8px 12px",
              display: "block",
              width: "100%",
              textAlign: "left",
              border: "none",
              cursor: "pointer",
              background: "none",
              color: "black",
            }}
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
}

export default TogglePostBanner;
