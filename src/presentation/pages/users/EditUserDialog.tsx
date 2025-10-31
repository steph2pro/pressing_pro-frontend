import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "../../components/ui/dialog";
import { Button } from "../../components/ui/button";
import { User, UserRole, UserStatus } from "../../../data/models/users";

interface EditUserDialogProps {
  open: boolean;
  onClose: () => void;
  user: User;
}

export default function EditUserDialog({ open, onClose, user }: EditUserDialogProps) {
  const [form, setForm] = useState({ ...user });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    console.log("Modification utilisateur :", form);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-[var(--ubuntu-dark-aubergine)] font-semibold">
            Modifier l'utilisateur
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 mt-4">
          <input
            name="nom"
            value={form.nom}
            onChange={handleChange}
            className="w-full border rounded-lg p-2"
          />
          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            className="w-full border rounded-lg p-2"
          />
          <select
            name="role"
            value={form.role}
            onChange={handleChange}
            className="w-full border rounded-lg p-2"
          >
            {Object.values(UserRole).map(role => (
              <option key={role} value={role}>{role}</option>
            ))}
          </select>
          <select
            name="statut"
            value={form.statut}
            onChange={handleChange}
            className="w-full border rounded-lg p-2"
          >
            {Object.values(UserStatus).map(status => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
        </div>
        <DialogFooter className="mt-6 flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>
            Annuler
          </Button>
          <Button
            onClick={handleSubmit}
            className="bg-[var(--ubuntu-orange)] hover:bg-[var(--ubuntu-light-orange)] text-white"
          >
            Sauvegarder
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
