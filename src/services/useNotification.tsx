// import {toast} from "react-toastify";
// // import toast from 'react-hot-toast';


// export const useNotification = () => {
//     return {
//         success: (message: string) =>  toast.success(
//             <div>
//                 {message}
//             </div>,
//     {
//         position: toast.POSITION.TOP_RIGHT,
//             autoClose: 3000, // milliseconds
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         progress: undefined,
//     },
// ),
//         error: (message: string) =>  toast.error(
//             <div>
//                 {message}
//             </div>,
//             {
//                 position: toast.POSITION.TOP_RIGHT,
//                 autoClose: 3000, // milliseconds
//                 hideProgressBar: false,
//                 closeOnClick: true,
//                 pauseOnHover: true,
//                 draggable: true,
//                 progress: undefined,
//             },
//         ),
//     };
// };
import { toast } from "react-hot-toast";

export function useNotification() {
  return {
    success: (msg: string, opts?: any) => toast.success(msg, opts),
    error: (msg: string, opts?: any) => toast.error(msg, opts),
    loading: (msg: string, opts?: any) => toast.loading(msg, opts),
    dismiss: (id: string) => toast.dismiss(id),
  };
}
