import React, { useState } from "react";
import toast from "react-hot-toast";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "./ui/dialog";
import { Textarea } from "./ui/textarea";
import { VideoItem } from "../../data2/models/PendingType";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { useValidateEntity } from "../hooks/validation/useValidateEntity";
import { ValidationPayload } from "../../data2/models/ValidationPayload";
import { useNavigate } from "react-router-dom";
import { Urls } from "../../utils/const";

interface VideoSingleSectionProps {
  video: VideoItem;
  onComplete?: () => void;
  adminId: number;
}

const VideoSingleSection: React.FC<VideoSingleSectionProps> = ({ video, onComplete, adminId }) => {
  const [showDialog, setShowDialog] = useState(false);
  const [showRejectReason, setShowRejectReason] = useState(false);
  const [rejectReason, setRejectReason] = useState("");
  
  const { validateEntity, isLoading, error } = useValidateEntity();

    const navigate = useNavigate();
  const handleValidation = async () => {
    const payload: ValidationPayload = {
      entityId: video.entityId,
      userId: video.autorId,
      adminId,
      entityClass: video.entityClass,
      dataType: video.dataType,
      pendingValidationId: video.pendingValidationId,
    };

      await validateEntity(payload);
     navigate(-1)
      
  };

  const handleRejection = async () => {
    if (!rejectReason.trim()) {
      toast.error("Veuillez indiquer une raison de rejet.");
      return;
    }

    const payload: ValidationPayload = {
      entityId: video.entityId,
      userId: video.autorId,
      adminId,
      entityClass: video.entityClass,
      dataType: video.dataType,
      pendingValidationId: video.pendingValidationId,
      raison: rejectReason.trim(),
    };

      await validateEntity(payload);
     navigate(-1)
  };


     
  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Titre</TableHead>
            <TableHead className="text-center">Statut</TableHead>
            <TableHead className="text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow key={video.autorId}>
            <TableCell>{video.title}</TableCell>
            <TableCell className="text-center">
              {video.isValidated ? (
                <span className="font-semibold text-green-600">Validée</span>
              ) : (
                <span className="font-semibold text-yellow-600">En attente</span>
              )}
            </TableCell>
            <TableCell className="text-center">
              <Button onClick={() => setShowDialog(true)} className="text-white bg-blue-600">
                Gérer la vidéo
              </Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-auto p-6">
          <p className="mb-3 text-sm text-gray-500">
            Statut :{" "}
            {video.isValidated ? (
              <span className="font-semibold text-green-600">Validée</span>
            ) : (
              <span className="font-semibold text-yellow-600">En attente</span>
            )}
          </p>

          <video className="w-full rounded-md max-h-[50vh]" controls>
            <source src={`${Urls.videos}/${video.videoUrl}`} type="video/mp4" />
            Votre navigateur ne supporte pas la lecture vidéo.
          </video>

          {!showRejectReason ? (
            <DialogFooter className="flex justify-end gap-2 mt-4">
              <DialogClose asChild>
                <Button variant="secondary">Fermer</Button>
              </DialogClose>
              <Button onClick={handleValidation} className="bg-green-500" disabled={isLoading}>
                {isLoading ? "Validation..." : "Valider"}
              </Button>
              <Button variant="destructive" onClick={() => setShowRejectReason(true)}>
                Rejeter
              </Button>
            </DialogFooter>
          ) : (
            <>
              <div className="mt-4">
                <label className="block mb-1 text-sm">
                  Raison du rejet <span className="text-red-500">*</span>
                </label>
                <Textarea
                  value={rejectReason}
                  onChange={(e) => setRejectReason(e.target.value)}
                  placeholder="Ex : Vidéo inappropriée, hors sujet, qualité insuffisante..."
                  className="min-h-[100px]"
                />
              </div>
              <DialogFooter className="flex justify-end gap-2 mt-4">
                <Button variant="secondary" onClick={() => setShowRejectReason(false)}>
                  Retour
                </Button>
                <Button
                  variant="destructive"
                  onClick={handleRejection}
                  disabled={isLoading || rejectReason.trim() === ""}
                >
                  {isLoading ? "Rejet..." : "Confirmer le rejet"}
                </Button>
              </DialogFooter>
            </>
          )}
          {error && <p className="mt-2 text-sm text-center text-red-500">{error}</p>}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default VideoSingleSection;
