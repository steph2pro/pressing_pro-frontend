import { useNavigate } from 'react-router-dom';
import { HiOutlineHome, HiOutlineArrowLeft, HiOutlineStar } from 'react-icons/hi2';

const Error = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-orange-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center">
        {/* Animation/Illustration */}
        <div className="mb-8 relative">
          <div className="text-9xl mb-4">🌌</div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="text-6xl animate-bounce">🚀</div>
          </div>
        </div>

        {/* Code d'erreur */}
        <div className="mb-6">
          <span className="text-8xl font-bold bg-gradient-to-r from-purple-600 to-orange-500 bg-clip-text text-transparent">
            404
          </span>
        </div>

        {/* Message principal */}
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Oups ! Page introuvable
        </h1>

        {/* Description */}
        <p className="text-xl text-gray-600 mb-8 leading-relaxed">
          Il semble que la page que vous cherchez ait été déplacée, 
          supprimée ou n'existe jamais. Ne vous inquiétez pas, 
          même les meilleurs astronautes se perdent parfois dans l'espace !
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center gap-3 px-6 py-3 bg-white border border-gray-300 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 hover:border-purple-400 group"
          >
            <HiOutlineArrowLeft className="text-xl text-purple-600 group-hover:scale-110 transition-transform" />
            <span className="font-semibold text-gray-700">Retour en arrière</span>
          </button>

          <button 
            onClick={() => navigate('/')}
            className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-purple-600 to-orange-500 text-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group"
          >
            <HiOutlineHome className="text-xl group-hover:scale-110 transition-transform" />
            <span className="font-semibold">Retour à l'accueil</span>
          </button>
        </div>

        {/* Suggestions */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200">
          <h3 className="font-semibold text-gray-800 mb-3 flex items-center justify-center gap-2">
            <HiOutlineStar className="text-purple-600" />
            Suggestions utiles
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
            <div className="p-3 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
              <div className="font-medium text-purple-700 mb-1">Vérifiez l'URL</div>
              <div>Assurez-vous que l'adresse est correcte</div>
            </div>
            <div className="p-3 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors">
              <div className="font-medium text-orange-700 mb-1">Utilisez la navigation</div>
              <div>Parcourez les menus principaux</div>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
              <div className="font-medium text-blue-700 mb-1">Contactez-nous</div>
              <div>Si vous avez besoin d'aide</div>
            </div>
          </div>
        </div>

        {/* Message amusant */}
        <div className="mt-8">
          <p className="text-gray-500 italic">
            "Dans l'espace, personne ne vous entendra crier... mais sur Terre, 
            nous sommes là pour vous aider !" 🪐
          </p>
        </div>
      </div>
    </div>
  );
};

export default Error;