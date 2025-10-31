// UserValidationActions.tsx
import React, { useState } from "react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../components/ui/dialog";
import { useValidateEntity } from "../hooks/validation/useValidateEntity";
import { useRequestUserBan } from "../hooks/user/useRequestUserBan";
import { ValidationPayload } from "@/data2/models/ValidationPayload";
import { BanRequest } from "@/data2/models/BanRequest";
import MessageForm from "./MessageForm";
import { useNavigate } from "react-router-dom";

interface Props {
  
  user: any;
  isInscription?: boolean;
  adminId: number;
  isMessage?:boolean;
  isUserDetail?: boolean;
  isBanrequest?:boolean;
  isRaport?: boolean;
  isBlacklist?: boolean;
}

const UserValidationActions: React.FC<Props> = ({ user,
  isInscription = false,
  isMessage=false,
  isUserDetail=false,
  isBanrequest=false,
  adminId,
  isRaport,
  isBlacklist
}) => {
    const [showModal, setShowModal] = useState(false);
  const [reason, setReason] = useState("");
  const [isRejecting, setIsRejecting] = useState(false);
const [showValidationConfirm, setShowValidationConfirm] = useState(false);

  const { validateEntity, isLoading, error } = useValidateEntity();
  const {  requestBan, isBanLoading } = useRequestUserBan();

  const handleRejectClick = () => {
    setShowModal(true);
    console.log(showModal)
  };
const navigate = useNavigate();

  const handleRejectConfirm = async () => {
    if (reason.trim() === "" && reason.length<=15) return;

    const payload: ValidationPayload = {
      entityId: user.entityId,
      userId: user.autorId,
      adminId,
      entityClass: user.entityClass,
      dataType: user.dataType,
      pendingValidationId: user.pendingValidationId,
      raison: reason.trim(),
    };
    console.log("play load:",payload)
    setIsRejecting(true);
    try {
      await validateEntity(payload);
      setShowModal(false);
      setReason("");
      navigate(-1)
    } catch (err) {
      // Gestion d’erreur si nécessaire
    } finally {
      setIsRejecting(false);
    }
  };

  const handleValidateClick = () => {
  setShowValidationConfirm(true);
};
//validation reel
const handleConfirmValidation = async () => {
  const payload: ValidationPayload = {
    entityId: user.entityId,
    userId: user.autorId,
    adminId,
    entityClass: user.entityClass,
    dataType: user.dataType,
    pendingValidationId: user.pendingValidationId,
  };

  try {
    await validateEntity(payload);
    setShowValidationConfirm(false);
    navigate(-1)
  } catch (err) {
    console.error("Erreur lors de la validation :", err);
  }
};


    
    //bannisement
    const [open, setOpen] = useState(false);
  const [banReason, setBanReason] = useState("");

  const handleConfirmBan = async() => {
    if (!banReason.trim()) return;
    // Appel API ou action de bannissement ici
      const banPayload: BanRequest = {
      userId: user.id,
      adminId: adminId,
      reason: banReason,
    };
    await requestBan(banPayload)
    console.log(`Utilisateur ${user.username} banni pour : ${banReason}`);
    setOpen(false);
    setBanReason(""); // Réinitialiser le champ
    navigate(-1)
  };


  return (
    <div className="col-span-1 md:col-span-4 lg:col-span-4">
     {
          isUserDetail && (
             <>
             
        <div className="flex justify-center mt-4">
          
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button variant="destructive">Bannir l'utilisateur</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Confirmation de bannissement</DialogTitle>
              </DialogHeader>

              <p className="mb-2 text-sm text-gray-600 dark:text-gray-300">
                Veux-tu vraiment bannir <strong>{user.username}</strong> ? Cette action est irréversible.
              </p>

              <div className="space-y-2">
                <label htmlFor="ban-reason" className="text-sm">
                  Raison du bannissement <span className="text-red-500">*</span>
                </label>
                <Textarea
                  id="ban-reason"
                  value={banReason}
                  onChange={(e) => setBanReason(e.target.value)}
                  placeholder="Ex : Comportement inapproprié, violation des règles, etc.... (minimum 15 caractères)"
                  className="min-h-[100px]"
                />
              </div>

              <DialogFooter className="mt-4">
                <DialogClose asChild>
                  <Button variant="outline">Annuler</Button>
                </DialogClose>
                <Button
                  variant="destructive"
                  onClick={handleConfirmBan}
                  disabled={banReason.trim().length < 15 }
                >
                  
                  {isBanLoading ? "Banissement..." : "Confirmer"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
             </>
          )
        }
        {
          isBanrequest && (
            <>
           
            <div className="flex justify-center mt-4 align-middle">
              <div className="flex gap-4 mt-4">
                <button
                  className="px-4 py-2 text-white bg-green-500 rounded-lg hover:bg-green-600 disabled:opacity-50"
                  onClick={handleValidateClick}
                  disabled={isLoading}
                >
                  {isLoading ? "Validation..." : "Valider"}
                </button>
                {
                  isBlacklist ?(
                    <></>
                  ):
                  (
                    <button
                  className="px-4 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600"
                  onClick={handleRejectClick}
                >
                  Rejeter
                </button>
                  )
                }
                
              </div>

              {error && (
                <p className="mt-2 text-sm text-center text-red-500">{error}</p>
              )}
            </div>
            </>
          )
        }
         {
          isRaport && (
            <>
           
            <div className="flex justify-center mt-4 align-middle">
              <div className="flex gap-4 mt-4">
                <button
                  className="px-4 py-2 text-white bg-green-500 rounded-lg hover:bg-green-600 disabled:opacity-50"
                  onClick={handleValidateClick}
                  disabled={isLoading}
                >
                  {isLoading ? "Validation..." : "Marquer comme traiter"}
                </button>
              </div>

            </div>
            </>
          )
        }

        {isInscription && (
          <div>
           

            <div className="flex justify-center mt-4">
              <div className="flex gap-4 mt-4">
                <button
                  className="px-4 py-2 text-white bg-green-500 rounded-lg hover:bg-green-600 disabled:opacity-50"
                  onClick={handleValidateClick}
                  disabled={isLoading}
                >
                  {isLoading ? "Validation..." : "Valider"}
                </button>
                <button
                  className="px-4 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600"
                  onClick={handleRejectClick}
                >
                  Rejeter
                </button>
              </div>


              
            </div>
                  
              



          </div>
        )}
      
            <Dialog open={showModal} onOpenChange={setShowModal}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Motif du rejet</DialogTitle>
              </DialogHeader>

              <Textarea
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Indiquez le motif du rejet"
              />

          <DialogFooter>
            <DialogClose asChild>
              <button
                      className="px-4 py-2 text-gray-700 bg-gray-300 rounded-lg hover:bg-gray-400"
                      onClick={() => setShowModal(false)}
                      disabled={isRejecting}
                    > Annuler</button>
           </DialogClose>
     
                <button
                      className="px-4 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600 disabled:opacity-50"
                      onClick={handleRejectConfirm}
                      disabled={reason.trim().length < 15 || isRejecting}
                    >
                      {isRejecting ? "Rejet en cours..." : "Confirmer"}
                    </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Dialog open={showValidationConfirm} onOpenChange={setShowValidationConfirm}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmation de validation</DialogTitle>
          </DialogHeader>

          <p className="text-sm text-gray-600 dark:text-gray-300">
            Es-tu sûr de vouloir valider <strong>{user.username}</strong> ?
          </p>

          <DialogFooter className="mt-4">
            <DialogClose asChild>
              <Button variant="outline">Annuler</Button>
            </DialogClose>
            <Button onClick={handleConfirmValidation} disabled={isLoading}>
              {isLoading ? "Validation..." : "Confirmer"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

    </div>
  );
};


export default UserValidationActions;
