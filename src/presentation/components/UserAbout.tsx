// import React, { useState } from "react";
// import MessageForm from "./MessageForm";
// import { useValidateEntity } from "../hooks/validation/useValidateEntity";
// import { ValidationPayload } from "@/data2/models/ValidationPayload";
// import { InscriptionItem } from "@/data2/models/PendingType";
// import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../components/ui/dialog";
// import { ArrowLeft } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import { Urls } from "../../utils/const";
// import { Button } from "./ui/button";
// import { Textarea } from "./ui/textarea";
// import { BanRequest } from "@/data2/models/BanRequest";
// import { useRequestUserBan } from "../hooks/user/useRequestUserBan";

// interface UserCardProps {
//   user: InscriptionItem | any;
//   isInscription?: boolean;
//   adminId: number;
//   isMessage?:boolean;
//   isUserDetail?: boolean;
//   isBanrequest?:boolean;
//   isRaport?: boolean;
//   isBlacklist?: boolean;
// }

// const UserAbout: React.FC<UserCardProps> = ({
//   user,
//   isInscription = false,
//   isMessage=false,
//   isUserDetail=false,
//   isBanrequest=false,
//   adminId,
//   isRaport,
//   isBlacklist
// }) => {
//   const [showModal, setShowModal] = useState(false);
//   const [reason, setReason] = useState("");
//   const [isRejecting, setIsRejecting] = useState(false);
// const [showValidationConfirm, setShowValidationConfirm] = useState(false);

//   const { validateEntity, isLoading, error } = useValidateEntity();
//   const {  requestBan, isBanLoading } = useRequestUserBan();

//   const handleRejectClick = () => {
//     setShowModal(true);
//     console.log(showModal)
//   };

//   const handleRejectConfirm = async () => {
//     if (reason.trim() === "" && reason.length<=15) return;

//     const payload: ValidationPayload = {
//       entityId: user.entityId,
//       userId: user.autorId,
//       adminId,
//       entityClass: user.entityClass,
//       dataType: user.dataType,
//       pendingValidationId: user.pendingValidationId,
//       raison: reason.trim(),
//     };
//     console.log("play load:",payload)
//     setIsRejecting(true);
//     try {
//       await validateEntity(payload);
//       setShowModal(false);
//       setReason("");
//     } catch (err) {
//       // Gestion d’erreur si nécessaire
//     } finally {
//       setIsRejecting(false);
//     }
//   };

//   const handleValidateClick = () => {
//   setShowValidationConfirm(true);
// };
// //validation reel
// const handleConfirmValidation = async () => {
//   const payload: ValidationPayload = {
//     entityId: user.entityId,
//     userId: user.autorId,
//     adminId,
//     entityClass: user.entityClass,
//     dataType: user.dataType,
//     pendingValidationId: user.pendingValidationId,
//   };

//   try {
//     await validateEntity(payload);
//     setShowValidationConfirm(false);
//   } catch (err) {
//     console.error("Erreur lors de la validation :", err);
//   }
// };


//   //gestion du zomm
//   const [zoomPhoto, setZoomPhoto] = useState<any | null>(null);
//     const [showPhotoModal, setShowPhotoModal] = useState<boolean>(false);
//     const [isLocal, setIsLocal] = useState<boolean>(false);
  
    
//     const openPhotoModal = (photo:any) => {
//       setZoomPhoto(photo);
//       setShowPhotoModal(true);
//     };
//     const navigate = useNavigate();
    
//     //bannisement
//     const [open, setOpen] = useState(false);
//   const [banReason, setBanReason] = useState("");

//   const handleConfirmBan = async() => {
//     if (!banReason.trim()) return;
//     // Appel API ou action de bannissement ici
//       const banPayload: BanRequest = {
//       userId: user.id,
//       adminId: adminId,
//       reason: banReason,
//     };
//     await requestBan(banPayload)
//     console.log(`Utilisateur ${user.username} banni pour : ${banReason}`);
//     setOpen(false);
//     setBanReason(""); // Réinitialiser le champ
//   };


//   return (
//     <div className="col-span-1 md:col-span-4 lg:col-span-4">
//       <button
//         onClick={() => navigate(-1)}
//         className="flex items-center mb-4 text-sm text-gray-700 hover:text-blue-600"
//       >
//         <ArrowLeft className="w-4 h-4 mr-1" />
//         Retour
//       </button>

//       <div className="p-6 bg-white rounded-lg shadow-md dark:bg-gray-800">
//         <div className="flex items-center justify-between mb-4">
//           <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300">
//             Information personnelle
//           </h2>
//         </div>

//         <div className="flex flex-col items-center">
//           <img
//           src={
//             user.imageUrl
//               ? 
//               `${Urls.profiles}/${user.imageUrl}`
//               : user.autorPhoto
//                 ? `${Urls.profiles}/${user.autorPhoto}`
//                 : isMessage
//                   ? `${Urls.profiles}/${user.profileImage}`
//                   : 
//                   `${Urls.profiles}/${user.photo_profil}`
//           }


//            alt={user.username}
//             className="w-24 h-24 mb-4 border-4 border-blue-500 rounded-full"
//           />
//           <h2 className="text-xl font-bold text-center text-gray-800 dark:text-gray-100">
//             {user.autorName || user.username}
//           </h2>
//         </div>
//         {
//           isUserDetail && (
//              <>
             
//             <div className="mt-8">
//               <MessageForm receiverId={user.autorId} adminId={adminId}  sentTo={"user"}/>
//             </div>
//         <div className="flex justify-center mt-4">
          
//           <Dialog open={open} onOpenChange={setOpen}>
//             <DialogTrigger asChild>
//               <Button variant="destructive">Bannir l'utilisateur</Button>
//             </DialogTrigger>
//             <DialogContent>
//               <DialogHeader>
//                 <DialogTitle>Confirmation de bannissement</DialogTitle>
//               </DialogHeader>

//               <p className="mb-2 text-sm text-gray-600 dark:text-gray-300">
//                 Veux-tu vraiment bannir <strong>{user.username}</strong> ? Cette action est irréversible.
//               </p>

//               <div className="space-y-2">
//                 <label htmlFor="ban-reason" className="text-sm">
//                   Raison du bannissement <span className="text-red-500">*</span>
//                 </label>
//                 <Textarea
//                   id="ban-reason"
//                   value={banReason}
//                   onChange={(e) => setBanReason(e.target.value)}
//                   placeholder="Ex : Comportement inapproprié, violation des règles, etc.... (minimum 15 caractères)"
//                   className="min-h-[100px]"
//                 />
//               </div>

//               <DialogFooter className="mt-4">
//                 <DialogClose asChild>
//                   <Button variant="outline">Annuler</Button>
//                 </DialogClose>
//                 <Button
//                   variant="destructive"
//                   onClick={handleConfirmBan}
//                   disabled={banReason.trim().length < 15 }
//                 >
                  
//                   {isBanLoading ? "Banissement..." : "Confirmer"}
//                 </Button>
//               </DialogFooter>
//             </DialogContent>
//           </Dialog>
//         </div>
//              </>
//           )
//         }
//         {
//           isBanrequest && (
//             <>
//             <div className="mt-8">
//               <MessageForm receiverId={user.autorId} adminId={adminId}  sentTo={"user"}/>
//             </div>
//             <div className="flex justify-center mt-4 align-middle">
//               <div className="flex gap-4 mt-4">
//                 <button
//                   className="px-4 py-2 text-white bg-green-500 rounded-lg hover:bg-green-600 disabled:opacity-50"
//                   onClick={handleValidateClick}
//                   disabled={isLoading}
//                 >
//                   {isLoading ? "Validation..." : "Valider"}
//                 </button>
//                 {
//                   isBlacklist ?(
//                     <></>
//                   ):
//                   (
//                     <button
//                   className="px-4 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600"
//                   onClick={handleRejectClick}
//                 >
//                   Rejeter
//                 </button>
//                   )
//                 }
                
//               </div>

//               {error && (
//                 <p className="mt-2 text-sm text-center text-red-500">{error}</p>
//               )}
//             </div>
//             </>
//           )
//         }
//          {
//           isRaport && (
//             <>
//             <div className="mt-8">
//               <MessageForm receiverId={user.autorId} adminId={adminId}  sentTo={"user"}/>
//             </div>
//             <div className="flex justify-center mt-4 align-middle">
//               <div className="flex gap-4 mt-4">
//                 <button
//                   className="px-4 py-2 text-white bg-green-500 rounded-lg hover:bg-green-600 disabled:opacity-50"
//                   onClick={handleValidateClick}
//                   disabled={isLoading}
//                 >
//                   {isLoading ? "Validation..." : "Marquer comme traiter"}
//                 </button>
//               </div>

//             </div>
//             </>
//           )
//         }

//         {isInscription && (
//           <div>
//             <div className="mt-8">
//               <MessageForm receiverId={user.autorId} adminId={adminId}  sentTo={"user"}/>
//             </div>

//             <div className="flex justify-center mt-4">
//               <div className="flex gap-4 mt-4">
//                 <button
//                   className="px-4 py-2 text-white bg-green-500 rounded-lg hover:bg-green-600 disabled:opacity-50"
//                   onClick={handleValidateClick}
//                   disabled={isLoading}
//                 >
//                   {isLoading ? "Validation..." : "Valider"}
//                 </button>
//                 <button
//                   className="px-4 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600"
//                   onClick={handleRejectClick}
//                 >
//                   Rejeter
//                 </button>
//               </div>


              
//             </div>
//                   <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300">
//                     Image de validation
//                   </h2>
//                 <div className="grid grid-cols-1 gap-4">
                 
//                   <div
//                     key={user.autorId}
//                     className="relative overflow-hidden border rounded-lg shadow group"
//                   >
//                     <img
//                       src={`${Urls.profiles}/${user.verificationPhoto}`}
//                       alt="Photo"
//                       className="object-cover w-full h-40 transition-transform duration-300 cursor-pointer group-hover:scale-110"
//                       onClick={() =>{
//                         openPhotoModal(user.verificationPhoto)
//                         setIsLocal(false);
//                       } }
//                     />
//                   </div>
//                      <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300">
//                     Image a reproduire
//                   </h2>
//                   <div
//                     key={user.autorId}
//                     className="relative overflow-hidden border rounded-lg shadow group"
//                   >
//                     <img
//                       src={`../../src/assets/gestures/${user.geste}`}
//                       alt="Photo"
//                       className="object-cover w-full h-40 transition-transform duration-300 cursor-pointer group-hover:scale-110"
//                       onClick={() =>{
//                         openPhotoModal(user.geste)
//                         setIsLocal(true);
//                       } }
//                     />
//                   </div>
//               </div>
              
//                     {showPhotoModal && zoomPhoto && (
//                       <Dialog open={showPhotoModal} onOpenChange={() => setShowPhotoModal(false)}>
//                         <DialogContent className="max-w-2xl max-h-[80vh] overflow-auto p-4">
//                           <img
//                             src={isLocal ? `../../src/assets/gestures/${zoomPhoto}` : `${Urls.profiles}/${zoomPhoto}`}
//                             alt="Zoom"
//                             className="w-full h-auto max-h-[70vh] object-contain rounded-lg"
//                           />
//                         </DialogContent>
              
//                       </Dialog>
//                     )}
              



//           </div>
//         )}
//       </div>
      
//             <Dialog open={showModal} onOpenChange={setShowModal}>
//             <DialogContent>
//               <DialogHeader>
//                 <DialogTitle>Motif du rejet</DialogTitle>
//               </DialogHeader>

//               <Textarea
//                 value={reason}
//                 onChange={(e) => setReason(e.target.value)}
//                 placeholder="Indiquez le motif du rejet"
//               />

//           <DialogFooter>
//             <DialogClose asChild>
//               <button
//                       className="px-4 py-2 text-gray-700 bg-gray-300 rounded-lg hover:bg-gray-400"
//                       onClick={() => setShowModal(false)}
//                       disabled={isRejecting}
//                     > Annuler</button>
//            </DialogClose>
     
//                 <button
//                       className="px-4 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600 disabled:opacity-50"
//                       onClick={handleRejectConfirm}
//                       disabled={reason.trim().length < 15 || isRejecting}
//                     >
//                       {isRejecting ? "Rejet en cours..." : "Confirmer"}
//                     </button>
//           </DialogFooter>
//         </DialogContent>
//       </Dialog>
//       <Dialog open={showValidationConfirm} onOpenChange={setShowValidationConfirm}>
//         <DialogContent>
//           <DialogHeader>
//             <DialogTitle>Confirmation de validation</DialogTitle>
//           </DialogHeader>

//           <p className="text-sm text-gray-600 dark:text-gray-300">
//             Es-tu sûr de vouloir valider <strong>{user.username}</strong> ?
//           </p>

//           <DialogFooter className="mt-4">
//             <DialogClose asChild>
//               <Button variant="outline">Annuler</Button>
//             </DialogClose>
//             <Button onClick={handleConfirmValidation} disabled={isLoading}>
//               {isLoading ? "Validation..." : "Confirmer"}
//             </Button>
//           </DialogFooter>
//         </DialogContent>
//       </Dialog>

//     </div>
//   );
// };

// export default UserAbout;
// UserAbout.tsx
import React, { useState } from "react";
import MessageForm from "./MessageForm";
import { useValidateEntity } from "../hooks/validation/useValidateEntity";
import { useRequestUserBan } from "../hooks/user/useRequestUserBan";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Urls } from "../../utils/const";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "../components/ui/dialog";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
// import ValidationActions from "./ValidationActions";

import { InscriptionItem } from "@/data2/models/PendingType";

interface UserCardProps {
  user: InscriptionItem | any;
  isInscription?: boolean;
  isMessage?: boolean;
  isUserDetail?: boolean;
  isBanrequest?: boolean;
  isRaport?: boolean;
  isBlacklist?: boolean;
  adminId: number;
}

const UserAbout: React.FC<UserCardProps> = ({
  user,
  isInscription = false,
  isMessage = false,
  isUserDetail = false,
  isBanrequest = false,
  adminId,
  isRaport,
  isBlacklist
}) => {
  const navigate = useNavigate();

  //gestion du zomm
  const [zoomPhoto, setZoomPhoto] = useState<any | null>(null);
    const [showPhotoModal, setShowPhotoModal] = useState<boolean>(false);
    const [isLocal, setIsLocal] = useState<boolean>(false);
  
    
    const openPhotoModal = (photo:any) => {
      setZoomPhoto(photo);
      setShowPhotoModal(true);
    };

  return (
    <div className="col-span-1 md:col-span-4 lg:col-span-4">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center mb-4 text-sm text-gray-700 hover:text-blue-600"
      >
        <ArrowLeft className="w-4 h-4 mr-1" /> Retour
      </button>

      <div className="p-6 bg-white rounded-lg shadow-md dark:bg-gray-800">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300">
            Information personnelle
          </h2>
        </div>

        <div className="flex flex-col items-center">
          <img
           src={
            isMessage
              ? `${Urls.profiles}/${user.profileImage}`
              : user.photo_profil
              ? `${Urls.profiles}/${user.photo_profil}`
              : user.imageUrl
              ? `${Urls.profiles}/${user.imageUrl}`
              : user.autorPhoto
              ? `${Urls.profiles}/${user.autorPhoto}`
              : undefined
          }

            alt={user.username}
            className="w-24 h-24 mb-4 border-4 border-blue-500 rounded-full"
          />
          <h2 className="text-xl font-bold text-center text-gray-800 dark:text-gray-100">
            {user.autorName || user.username}
          </h2>
        </div>

        {(isUserDetail || isBanrequest  || isRaport) && (
          <>
            <div className="mt-8">
              <MessageForm receiverId={user.autorId} adminId={adminId} sentTo={"user"} />
            </div>
            
          </>
        )}

{isInscription && (
          <div>
            <div className="mt-8">
              <MessageForm receiverId={user.autorId} adminId={adminId}  sentTo={"user"}/>
            </div>

                  <h3 className="text-base font-semibold text-gray-700 dark:text-gray-300 mt-10 mb-4">
                    Image de validation
                  </h3>
                <div className="grid grid-cols-1 gap-4">
                 
                  <div
                    key={user.autorId}
                    className="relative overflow-hidden border rounded-lg shadow group"
                  >
                    <img
                      src={`${Urls.profiles}/${user.verificationPhoto}`}
                      alt="Photo"
                      className="object-cover w-full h-40 transition-transform duration-300 cursor-pointer group-hover:scale-110"
                      onClick={() =>{
                        openPhotoModal(user.verificationPhoto)
                        setIsLocal(false);
                      } }
                    />
                  </div>
                     <h3 className="text-base font-semibold text-gray-700 dark:text-gray-300">
                    Image a reproduire
                  </h3>
                  <div
                    key={user.autorId}
                    className="relative overflow-hidden border rounded-lg shadow group"
                  >
                    <img
                      src={`../../src/assets/gestures/${user.geste}`}
                      alt="Photo"
                      className="object-cover w-full h-40 transition-transform duration-300 cursor-pointer group-hover:scale-110"
                      onClick={() =>{
                        openPhotoModal(user.geste)
                        setIsLocal(true);
                      } }
                    />
                  </div>
              </div>
              
                    {showPhotoModal && zoomPhoto && (
                      <Dialog open={showPhotoModal} onOpenChange={() => setShowPhotoModal(false)}>
                        <DialogContent className="max-w-2xl max-h-[80vh] overflow-auto p-4">
                          <img
                            src={isLocal ? `../../src/assets/gestures/${zoomPhoto}` : `${Urls.profiles}/${zoomPhoto}`}
                            alt="Zoom"
                            className="w-full h-auto max-h-[70vh] object-contain rounded-lg"
                          />
                        </DialogContent>
              
                      </Dialog>
                    )}
              



          </div>
        )}




      </div>
    </div>
  );
};

export default UserAbout;
