import React from 'react';
import { toast } from 'react-toastify';
import { MessagePayload } from 'firebase/messaging';
import { useNavigate } from 'react-router-dom';

type NotificationData = {
  type: string;
  itemId: string;
  [key: string]: any;
};

type NotificationProps = {
  payload: MessagePayload;
  onClick: (data: NotificationData) => string;
};

export const NotificationTastify = ({ payload, onClick }: NotificationProps) => {
  const navigate = useNavigate();

  React.useEffect(() => {
    toast.info(
      <div
        onClick={() => {
          const url = onClick(payload.data as NotificationData);
          if (url) {
            navigate(url);
          }
        }}
        style={{ cursor: 'pointer' }}
      >
        <strong>{payload.notification?.title}</strong>
        <div>{payload.notification?.body}</div>
      </div>,
      {
        autoClose: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
      }
    );
  }, [payload, onClick, navigate]);

  return null; // ce composant ne rend rien visuellement dans l’arborescence
};


// // Notification.tsx
// import { toast } from 'react-toastify';
// import { MessagePayload } from 'firebase/messaging';
// import { useNavigate } from 'react-router-dom';

// type NotificationData = {
//   type: string;
//   itemId: string;
//   [key: string]: any;
// };

// type UseNotificationParams = {
//   onClick: (data: NotificationData) => string; // La fonction qui retourne l’URL de navigation
// };

// export const Notification = ({ onClick }: UseNotificationParams) => {
//   const navigate = useNavigate();

//   return {
//     success: (payload: MessagePayload) =>
//       toast.info(
//         <div
//           onClick={() => {
//             const url = onClick(payload.data as NotificationData);
//             if (url) {
//               navigate(url);
//             }
//           }}
//           style={{ cursor: 'pointer' }}
//         >
//           <strong>{payload.notification?.title}</strong>
//           <div>{payload.notification?.body}</div>
//         </div>,
//         {
//           autoClose: false,
//           closeOnClick: false,
//           pauseOnHover: true,
//           draggable: true,
//         }
//       ),
//   };
// };
