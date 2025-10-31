import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { Report } from "../../types";
import { resolveReport, rejectReport } from "../../api/ApiRoute";
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
  DialogDescription,
  DialogFooter,
} from "./ui/dialog";
import { Textarea } from "./ui/textarea";

interface ReportSectionProps {
  reports: Report[];
}

const ReportSection: React.FC<ReportSectionProps> = ({ reports = [] }) => {
  const [filteredReports, setFilteredReports] = useState<Report[]>(reports);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);
  const [showImageModal, setShowImageModal] = useState<boolean>(false);
  const [isRejecting, setIsRejecting] = useState<boolean>(false);
  const [rejectReason, setRejectReason] = useState<string>("");

  useEffect(() => {
    setFilteredReports(reports);
  }, [reports]);

  const openReportModal = (report: Report) => {
    setSelectedReport(report);
    setIsRejecting(false);
    setShowModal(true);
  };

  const openConfirmModal = () => {
    setShowModal(false);
    setShowConfirmModal(true);
  };

  const openImageModal = () => {
    setShowImageModal(true);
  };

  const handleValidate = async () => {
    if (!selectedReport) return;
    try {
      // await resolveReport(selectedReport.id);
      setFilteredReports((prev) =>
        prev.filter((r) => r.id !== selectedReport.id)
      );
      toast.success("Signalement validé !");
      setShowConfirmModal(false);
      setSelectedReport(null);
    } catch (error) {
      toast.error("Erreur lors de la validation du signalement !");
    }
  };

  const handleReject = async () => {
    if (!rejectReason.trim()) {
      toast.error("La raison du rejet est obligatoire !");
      return;
    }
    if (!selectedReport) return;
    try {
      // await rejectReport(selectedReport.id, rejectReason);
      setFilteredReports((prev) =>
        prev.filter((r) => r.id !== selectedReport.id)
      );
      toast.success("Signalement rejeté !");
      setShowModal(false);
      setRejectReason("");
      setSelectedReport(null);
    } catch (error) {
      toast.error("Erreur lors du rejet du signalement !");
    }
  };

  return (
    <div>
      {filteredReports.length > 0 ? (
        <Table className="text-gray-600  dark:text-gray-300">
          <TableHeader className="text-gray-700 uppercase bg-gray-200 dark:bg-gray-800 dark:text-gray-200">
            <TableRow>
              <TableHead>Titre</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Photo</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredReports.map((report) => (
              <TableRow key={report.id}>
                <TableCell>{report.title}</TableCell>
                <TableCell>{report.description}</TableCell>
                <TableCell>
                  {report.photo ? (
                    <img
                      src={report.photo}
                      alt="Signalement"
                      className="object-cover w-16 h-16 rounded cursor-pointer"
                      onClick={openImageModal}
                    />
                  ) : (
                    "Aucune"
                  )}
                </TableCell>
                <TableCell>
                  {new Date(report.date).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <Button
                    onClick={() => openReportModal(report)}
                    className="bg-blue-500"
                  >
                    Gérer
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <p className="text-center text-gray-500">Aucun signalement trouvé.</p>
      )}

      {selectedReport && (
        <Dialog open={showModal} onOpenChange={setShowModal}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Gérer le signalement</DialogTitle>
            </DialogHeader>
            <div className="flex flex-col items-center gap-3">
              {selectedReport.photo && (
                <img
                  src={selectedReport.photo}
                  alt="Signalement"
                  className="object-cover w-32 h-32 transition-transform rounded cursor-pointer hover:scale-105"
                  onClick={openImageModal}
                />
              )}
              <p className="text-lg font-semibold">{selectedReport.title}</p>
              <p className="text-gray-600">{selectedReport.description}</p>
            </div>

            {isRejecting ? (
              <>
                <Textarea
                  placeholder="Entrez la raison du rejet..."
                  rows={5}
                  value={rejectReason}
                  onChange={(e) => setRejectReason(e.target.value)}
                />
                <DialogFooter>
                  <Button
                    variant="secondary"
                    onClick={() => setIsRejecting(false)}
                  >
                    Annuler
                  </Button>
                  <Button variant="destructive" onClick={handleReject}>
                    Confirmer le rejet
                  </Button>
                </DialogFooter>
              </>
            ) : (
              <DialogFooter>
                <Button variant="secondary" onClick={() => setShowModal(false)}>
                  Annuler
                </Button>
                <Button className="bg-green-500" onClick={openConfirmModal}>
                  Valider
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => setIsRejecting(true)}
                >
                  Rejeter
                </Button>
              </DialogFooter>
            )}
          </DialogContent>
        </Dialog>
      )}

      {selectedReport && (
        <Dialog open={showConfirmModal} onOpenChange={setShowConfirmModal}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirmer la validation</DialogTitle>
              <DialogDescription>
                Êtes-vous sûr de vouloir valider ce signalement ?
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button
                variant="secondary"
                onClick={() => setShowConfirmModal(false)}
              >
                Annuler
              </Button>
              <Button className="bg-green-500" onClick={handleValidate}>
                Confirmer
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {selectedReport?.photo && (
        <Dialog open={showImageModal} onOpenChange={setShowImageModal}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Image du signalement</DialogTitle>
            </DialogHeader>
            <img
              src={selectedReport.photo}
              alt="Signalement"
              className="w-full h-auto rounded"
            />
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default ReportSection;
