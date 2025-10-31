import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "./ui/dialog";
import { Textarea } from "./ui/textarea";
import { Urls } from "../../utils/const";
// import { rejectVideo, validateVideo } from "../../api/ApiRoute"; // Uncomment if using real API

export interface UserVideo {
  id: number;
  url: string;
  vues: number;
  likes: number;
  titre: string;
}

interface VideoSectionProps {
  videos: UserVideo[];
}

const VideoSection: React.FC<VideoSectionProps> = ({ videos }) => {
  const [videoList, setVideoList] = useState<UserVideo[]>(videos);
  const [selectedVideo, setSelectedVideo] = useState<UserVideo | null>(null);
  const [rejectReason, setRejectReason] = useState<string>("");
  const [showRejectReason, setShowRejectReason] = useState<boolean>(false);
  const [showConfirm, setShowConfirm] = useState<boolean>(false);
  const [confirmAction, setConfirmAction] = useState<"validate" | "reject" | null>(null);

  useEffect(() => {
    setVideoList(videos);
  }, [videos]);

  const handleValidateVideo = async () => {
    if (!selectedVideo) return;

    try {
      // await validateVideo(selectedVideo.id); 
      setVideoList((prev) => prev.filter((v) => v.id !== selectedVideo.id));
      toast.success("Vidéo validée !");
      setSelectedVideo(null);
      setShowConfirm(false);
    } catch (error) {
      toast.error("Erreur lors de la validation !");
    }
  };

  const handleRejectVideo = async () => {
    if (!selectedVideo || !rejectReason.trim()) {
      toast.error("Raison du rejet requise !");
      return;
    }

    try {
      // await rejectVideo(selectedVideo.id, rejectReason); 
      setVideoList((prev) => prev.filter((v) => v.id !== selectedVideo.id));
      toast.success("Vidéo rejetée !");
      setSelectedVideo(null);
      setRejectReason("");
      setShowRejectReason(false);
      setShowConfirm(false);
    } catch (error) {
      toast.error("Erreur lors du rejet !");
    }
  };

  return (
    <div>
      {videoList?.length > 0 ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Titre</TableHead>
              <TableHead className="text-center">Vues</TableHead>
              <TableHead className="text-center">Likes</TableHead>
              <TableHead className="text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {videoList.map((video) => (
              <TableRow key={video.id}>
                <TableCell>{video.titre}</TableCell>
                <TableCell className="text-center">{video.vues}</TableCell>
                <TableCell className="text-center">{video.likes}</TableCell>
                <TableCell className="text-center">
                  <Button onClick={() => setSelectedVideo(video)} className="bg-blue-500">
                    Voire
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <p className="text-center text-gray-500">Aucune vidéo trouvée.</p>
      )}

      {selectedVideo && (
        <Dialog open={!!selectedVideo} onOpenChange={() => setSelectedVideo(null)}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-auto p-6">
            <DialogHeader>
              <DialogTitle>{selectedVideo.titre}</DialogTitle>
            </DialogHeader>

            <video className="w-full rounded-md max-h-[50vh]" controls>
              <source src={`${Urls.videos}/${selectedVideo.url}`} type="video/mp4" />
              Votre navigateur ne supporte pas la lecture des vidéos.
            </video>

            {/* {!showRejectReason ? (
              <DialogFooter className="flex justify-end gap-2">
                <Button variant="secondary" onClick={() => setSelectedVideo(null)}>
                  Fermer
                </Button>
                <Button
                  className="bg-green-500"
                  onClick={() => {
                    setShowConfirm(true);
                    setConfirmAction("validate");
                  }}
                >
                  Valider
                </Button>
                <Button variant="destructive" onClick={() => setShowRejectReason(true)}>
                  Rejeter
                </Button>
              </DialogFooter>
            ) : (
              <div>
                <Textarea
                  placeholder="Entrez la raison du rejet..."
                  required
                  rows={3}
                  value={rejectReason}
                  onChange={(e) => setRejectReason(e.target.value)}
                />
                <DialogFooter className="flex justify-end gap-2 mt-3">
                  <Button variant="secondary" onClick={() => setShowRejectReason(false)}>
                    Retour
                  </Button>
                  <Button variant="destructive" onClick={handleRejectVideo}>
                    Confirmer le rejet
                  </Button>
                </DialogFooter>
              </div>
            )} */}
          </DialogContent>
        </Dialog>
      )}

      <Dialog open={showConfirm} onOpenChange={setShowConfirm}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmation</DialogTitle>
          </DialogHeader>
          <p className="text-gray-700">Êtes-vous sûr de vouloir valider cette vidéo ?</p>
          <DialogFooter className="flex justify-end gap-2">
            <Button variant="secondary" onClick={() => setShowConfirm(false)}>
              Annuler
            </Button>
            <Button className="bg-green-500" onClick={handleValidateVideo}>
              Confirmer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default VideoSection;
