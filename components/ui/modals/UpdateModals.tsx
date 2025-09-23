// "use client";
// import { useState, Dispatch, SetStateAction } from "react";
// import styles from "./modal.module.scss";
// import styler from "@/styles/updatedForm.module.scss";
// import UpdateForms from "@/components/UpdateForms";
// import { useRouter } from "next/navigation";
// import toast from "react-hot-toast";

// interface ModalProps {
//   showModal: boolean;
//   setShowModal: Dispatch<SetStateAction<boolean>>;
//   postId: string;
//   title?: string;
//   content?: string;
// }

// interface DeleteModal {
//   showModal: boolean;
//   setShowModal: Dispatch<SetStateAction<boolean>>;
//   postId: string;
//   title?: string;
//   content?: string;
// }

// function Modal({
//   showModal,
//   setShowModal,
//   postId,
//   title,
//   content,
// }: ModalProps) {
//   if (!showModal) return null;

//   return (
//     <dialog
//       open
//       onClose={() => setShowModal(false)}
//       className={styles.dialogOverlay}
//     >
//       <div className={styles.dialogContent}>
//         <div className={styles.dialogTitle}>Edit your Posts</div>
//         <div className={styles.dialogDescription}>
//           <UpdateForms
//             setShowModal={setShowModal}
//             postId={postId}
//             title={title}
//             content={content}
//           />
//         </div>
//       </div>
//     </dialog>
//   );
// }

// function DeleteModal({ setShowModal, postId }: DeleteModal) {
//   const [isPending, setIsPending] = useState(false);
//   const router = useRouter();
//   async function HandleSubmit(evt: React.FormEvent<HTMLFormElement>) {
//     evt.preventDefault();
//     setIsPending(true);

//     try {
//       const res = await fetch(
//         `${process.env.NEXT_PUBLIC_API_URL}/api/posts/${postId}`,
//         {
//           method: "DELETE",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ postId }),
//         }
//       );
//       const data = await res.json();

//       if (!res.ok) {
//         toast.error(data.error || "Failed to delete post");
//         setIsPending(false);
//       } else {
//         toast.success("Successfully Post");
//         router.refresh();
//         setIsPending(false);
//       }
//     } catch (err) {
//       console.error(err);
//       toast.error("Something went wrong");
//       setIsPending(false);
//     }
//   }
//   return (
//     <dialog
//       open
//       onClose={() => setShowModal(false)}
//       className={styles.dialogOverlay}
//     >
//       <div className={styles.dialogContent} style={{ height: "300px" }}>
//         <div className={styles.dialogTitle}>Delete your Posts</div>
//         <div className={styles.dialogDescription} style={{ marginTop: "70px" }}>
//           Are you sure, Do you want to delete this data ?
//         </div>
//         <form onSubmit={HandleSubmit} className={styler["modal-form"]}>
//           <div className={styler["modal-actions"]}>
//             <button type="submit" className={styler.btn}>
//               Delete
//             </button>
//             <button
//               disabled={isPending}
//               className={styler.closebtn}
//               onClick={() => setShowModal(false)}
//             >
//               Close
//             </button>
//           </div>
//         </form>
//       </div>
//     </dialog>
//   );
// }

// export default function UpdateModals() {
//   const [showModal, setShowModal] = useState(false);

//   const [editPost, setEditPost] = useState<{
//     id: string;
//     title?: string;
//     content?: string;
//   } | null>(null);

//   const [showDelete, setDeletePost] = useState<{
//     id: string;
//     title?: string;
//     content?: string;
//   } | null>(null);

//   const ModalComponent = () => {
//     if (!showModal) return null;

//     if (editPost) {
//       return (
//         <Modal
//           showModal={showModal}
//           setShowModal={setShowModal}
//           postId={editPost.id}
//           title={editPost.title}
//           content={editPost.content}
//         />
//       );
//     }

//     if (showDelete) {
//       return (
//         <DeleteModal
//           showModal={showModal}
//           setShowModal={setShowModal}
//           postId={showDelete.id}
//           title={showDelete.title}
//           content={showDelete.content}
//         />
//       );
//     }
//   };

//   return { setShowModal, setEditPost, setDeletePost, ModalComponent };
// }

"use client";
import { useState, Dispatch, SetStateAction } from "react";
import styles from "./modal.module.scss";
import styler from "@/styles/updatedForm.module.scss";
import UpdateForms from "@/components/UpdateForms";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface ModalProps {
  setShowModal: Dispatch<SetStateAction<boolean>>;
  postId: string;
  title?: string;
  content?: string;
}

function EditModal({ setShowModal, postId, title, content }: ModalProps) {
  return (
    <dialog
      open
      onClose={() => setShowModal(false)}
      className={styles.dialogOverlay}
    >
      <div className={styles.dialogContent}>
        <div className={styles.dialogTitle}>Edit your Post</div>
        <div className={styles.dialogDescription}>
          <UpdateForms
            setShowModal={setShowModal}
            postId={postId}
            title={title}
            content={content}
          />
        </div>
      </div>
    </dialog>
  );
}

function DeleteModal({ setShowModal, postId }: ModalProps) {
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();

  async function HandleSubmit(evt: React.FormEvent<HTMLFormElement>) {
    evt.preventDefault();
    setIsPending(true);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/posts/${postId}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ postId }),
        }
      );

      const data = await res.json();
      if (!res.ok) {
        toast.error(data.error || "Failed to delete post");
      } else {
        toast.success("Successfully deleted post");
        router.refresh();
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    } finally {
      setIsPending(false);
      setShowModal(false);
    }
  }

  return (
    <dialog
      open
      onClose={() => setShowModal(false)}
      className={styles.dialogOverlay}
    >
      <div className={styles.dialogContent} style={{ height: "300px" }}>
        <div className={styles.dialogTitle}>Delete your Post</div>
        <div className={styles.dialogDescription} style={{ marginTop: "70px" }}>
          Are you sure you want to delete this post?
        </div>
        <form onSubmit={HandleSubmit} className={styler["modal-form"]}>
          <div className={styler["modal-actions"]}>
            <button type="submit" className={styler.btn} disabled={isPending}>
              {isPending ? "Deleting..." : "Delete"}
            </button>
            <button
              type="button"
              disabled={isPending}
              className={styler.closebtn}
              onClick={() => setShowModal(false)}
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
}

export default function UpdateModals() {
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<"edit" | "delete" | null>(null);

  const [currentPost, setCurrentPost] = useState<{
    id: string;
    title?: string;
    content?: string;
  } | null>(null);

  const ModalComponent = () => {
    if (!showModal || !modalType || !currentPost) return null;

    if (modalType === "edit") {
      return (
        <EditModal
          setShowModal={setShowModal}
          postId={currentPost.id}
          title={currentPost.title}
          content={currentPost.content}
        />
      );
    }

    if (modalType === "delete") {
      return (
        <DeleteModal
          setShowModal={setShowModal}
          postId={currentPost.id}
          title={currentPost.title}
          content={currentPost.content}
        />
      );
    }

    return null;
  };

  return { setShowModal, setModalType, setCurrentPost, ModalComponent };
}
