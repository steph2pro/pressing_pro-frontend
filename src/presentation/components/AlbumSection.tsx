import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { Album } from "@/types";

interface AlbumSectionProps {
  albums?: Album[];
  setAlbums?: React.Dispatch<React.SetStateAction<Album[]>>;
}

const AlbumSection: React.FC<AlbumSectionProps> = ({ albums, setAlbums }) => {
  const navigate = useNavigate();

  
  const handleAlbumDisappear = (album: Album) => {
    const validatedPhotos = album.photos.filter((photo) => photo.isValidated).length;
    return validatedPhotos === album.photos.length;
  };

  const openAlbumPage = (album: Album) => {
    navigate("/albums", { state: { album, setAlbums } });
  };

  return (
    <div className="p-4">
      <div className="space-y-4">
        {albums
          ?.filter((album) => !handleAlbumDisappear(album))
          .map((album) => (
            <div key={album.id} className="p-4 border rounded-lg shadow">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold">
                  {album.title} (
                  {album.photos.filter((photo) => photo.isValidated).length}/{album.photos.length} validées)
                </h3>
                <Button
                  onClick={() => openAlbumPage(album)}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Voir
                </Button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default AlbumSection;
