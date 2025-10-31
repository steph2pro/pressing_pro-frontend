// // NotificationTester.tsx
// import React from 'react';
// import { Notification } from './Notification';
// import { MessagePayload } from 'firebase/messaging';
// import { useFirebaseNotifications } from '../hooks/useFirebaseNotifications';

// export const NotificationTester = () => {
//   const { success } = Notification({
//     onClick: (data) => {
//       // En fonction du type, tu peux rediriger vers différentes pages
//       if (data.type === 'order') {
//         return `/orders/${data.itemId}`;
//       }
//       return `/default`;
//     },
//   });

//     useFirebaseNotifications()
//   const handleTestNotification = () => {
//     const mockPayload: MessagePayload = {
//   data: {
//     type: 'order',
//     itemId: '42',
//   },
//   notification: {
//     title: 'Nouvelle commande',
//     body: 'Vous avez une nouvelle commande en attente.',
//   },
//   from: 'test',
//   messageId: 'test-id',
//   collapseKey: 'test-collapse-key',
// };


//     success(mockPayload);
//   };

//   return (
//     <div>
//       <button onClick={handleTestNotification}>Tester la notification</button>
//     </div>
//   );
// };
