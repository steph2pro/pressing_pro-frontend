
import { useAdminConversations } from "../hooks/admin/useAdminConversations";
import "./conversation.scss";
import { ChangeEvent, useState } from "react";
import MessageList from "./MessagesList";
import { Conversation } from "../../data2/models/ConversationAdmin";
import { useSendInboxMessage } from "../hooks/admin/useSendInboxMessage";

type Props = {
    userId:number,
  adminId: number;
};
export default function ConversationList({userId,adminId}:Props) {
//   const adminId = 1; // Remplace par l'ID dynamique de l'admin si nécessaire
  const [page, setPage] = useState(1);
  const limit = 10;
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);

  const { sendInboxMessage,isLoading:isSending } = useSendInboxMessage();
  const [messageText, setMessageText] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const {
    conversations,
    isLoading,
    error,
    totalPages,
    refetch,
  } = useAdminConversations(adminId, page, limit);

  if (isLoading) return <div>Chargement des conversations...</div>;
  if (error) return <div>Aucun messages trouver</div>;

  const openConversation = (conversation: Conversation) => {
    setSelectedConversation(conversation);
  };

  const closeDialog = () => {
    setSelectedConversation(null);
  };
   const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };
  //envoie des messages

const handleSendMessage = async () => {
  if (!messageText.trim() && !imageFile) {
    alert("Le message ou une image est requis");
    return;
  }

  if (!selectedConversation) {
    alert("Aucune conversation sélectionnée");
    return;
  }

  const payload = {
    type: imageFile ? "image" : "text",
    senderId: adminId,
    receiverId: selectedConversation.other.id,
    message: messageText,
    image: imageFile,
  };

  try {
    console.log("Envoi du message :", payload);
    // Appel de la fonction pour envoyer le message
    await sendInboxMessage(payload);
    setMessageText("");
    setImageFile(null);
    setImagePreview(null);
    refetch(); // pour mettre à jour les conversations
  } catch (err) {
    console.error("Erreur lors de l'envoi du message :", err);
  }
};

if (isLoading) return <div>Chargement des conversations...</div>;
  if (error) return <div>Aucun message trouvé</div>;
  return (
    <>
      <div className="col-left">
        <div className="col-content">
          <ul className="messages">
            {conversations.map((conv) => (
              <li
                key={conv.conversation_id}
                onClick={() => openConversation(conv)}
                style={{ cursor: "pointer" }}
              >
                <div className="avatar">
                  <div className="avatar-image">
                    <div className={`status ${conv.other.type === "admin" ? "online" : "offline"}`}></div>
                    <img
                      src={`https://chaghen.fr/${conv.other.photo}` || "/img/default-avatar.png"}
                      alt={conv.other.username}
                    />
                  </div>
                </div>
                <h3>{conv.other.username}</h3>
                <p>
                  {conv.typeMessage === "text"
                    ? conv.last_message
                    : conv.typeMessage === "image"
                    ? "📷 Image"
                    : conv.typeMessage === "video"
                    ? "🎥 Vidéo"
                    : conv.last_message}
                </p>
              </li>
            ))}
          </ul>

          {/* Pagination simple */}
          <div className="pagination">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                className={page === i + 1 ? "active" : ""}
                onClick={() => setPage(i + 1)}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Dialog affichant les messages */}
{selectedConversation && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white max-w-3xl w-full h-[90vh] rounded-lg shadow-lg flex flex-col overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b flex justify-between items-center">
        <div>
          
        <h2 className="text-lg font-semibold">Messages</h2>
        <p className="text-sm text-gray-600">
          Liste des messages pour la conversation de{" "}
          {selectedConversation.other.username}
        </p>
        </div>
        <button
          onClick={closeDialog}
          className=" p-1  top-4 right-4 text-gray-500 hover:text-black hover:bg-slate-400"
        >
          ✕
        </button>
      </div>

      {/* Message list */}
      <div className="flex-1 overflow-y-auto p-4">
        {selectedConversation.conversation_id && (
          <MessageList
            conversationId={selectedConversation.conversation_id}
            userId={userId}
          />
        )}
      </div>

      {/* Footer */}
      <div className="border-t p-4">
        {/* Formulaire d'envoi */}
        <div className="flex items-center gap-2">

          {/* Zone de texte */}
          <input
            type="text"
            placeholder="Votre message..."
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            className="flex-1 border rounded px-3 py-2"
          />
          
          {/* Bouton Plus 📎 */}
          <label className="cursor-pointer px-3 py-2 bg-gray-200 rounded">
            📎
            <input type="file" accept="image/*" hidden onChange={handleImageChange} />
          </label>
          {/* Bouton envoyer */}
          <button
            onClick={handleSendMessage}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            { isSending ? 'Envoi en cours...' : 'Envoyer'}
          </button>
        </div>
        {/* {isSending && <p className="text-blue-500 text-sm">Envoi en cours...</p>}
        {sendError && <p className="text-red-500 text-sm">Erreur : {sendError}</p>} */}

        {/* Aperçu de l’image */}
        {imagePreview && (
          <div className="mt-4">
            <p className="text-sm text-gray-600">Aperçu de l’image :</p>
            <img src={imagePreview} alt="Preview" className="max-w-xs rounded mt-2" />
          </div>
        )}
      </div>
    </div>
  </div>
)}

    </>
  );
}
