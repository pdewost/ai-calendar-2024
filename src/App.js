// Accès aux hooks de React
const { useState, useEffect } = React;

// Composant principal
const App = () => {
  // États - correction de la syntaxe useState
  const [activeView, setActiveView] = React.useState(1);
  const [openWindow, setOpenWindow] = React.useState(null);
  const [selectedAnnouncement, setSelectedAnnouncement] = React.useState(null);
  const [snowflakes, setSnowflakes] = React.useState([]);

  // Correction du useEffect
  React.useEffect(() => {
    const createSnowflake = () => ({
      id: Math.random(),
      left: `${Math.random() * 100}%`,
      animationDuration: `${Math.random() * 12 + 15}s`,
      opacity: Math.random() * 0.4 + 0.2,
      fontSize: `${Math.random() * 12 + 8}px`,
      animationDelay: `${Math.random() * 5}s`,
      drift: `${Math.random() * 200 - 100}px`
    });

    const interval = setInterval(() => {
      setSnowflakes(prev => [...prev.slice(-30), createSnowflake()]);
    }, 600);

    return () => {
      clearInterval(interval);
    };
  }, []);
  
  // Composant Flocon (déplacé à l'intérieur de App pour avoir accès au style)
  const Snowflake = ({ style }) => (
    <div 
      className="absolute text-white opacity-80 animate-fall"
      style={style}
    >
      ❄
    </div>
  );

  // Gestionnaire de sélection d'annonce
  const handleAnnouncementClick = (announcement) => {
    if (selectedAnnouncement?.id === announcement.id && 
        selectedAnnouncement?.company === announcement.company) {
      setSelectedAnnouncement(null);
      setOpenWindow(null);
    } else {
      setSelectedAnnouncement(announcement);
      setOpenWindow(announcement.id);
    }
  };

  // [Le reste du code reste identique jusqu'au rendu]

  // Rendu principal
  return (
    <div className="max-w-4xl mx-auto bg-gray-50 rounded-xl shadow-lg overflow-hidden relative">
      {/* En-tête festif */}
      <div className="bg-gradient-to-r from-red-600 to-green-600 p-4 text-white relative">
        {/* Animation de neige */}
        <div className="fixed inset-0 pointer-events-none">
          {snowflakes.map(flake => (
            <Snowflake
              key={flake.id}
              style={{
                left: flake.left,
                animationDuration: flake.animationDuration,
                opacity: flake.opacity,
                fontSize: flake.fontSize,
                animationDelay: flake.animationDelay,
                '--drift': flake.drift
              }}
            />
          ))}
        </div>

        {/* Sapins de Noël SVG */}
        <div className="absolute top-0 right-0 flex gap-3 m-2">
          {[
            { size: "w-10 h-14", marginTop: "mt-6" },
            { size: "w-14 h-20", marginTop: "mt-1" },
            { size: "w-12 h-16", marginTop: "mt-4" }
          ].map((style, i) => (
            <div key={i} className={`${style.size} ${style.marginTop}`}>
              <svg viewBox="0 0 100 120" xmlns="http://www.w3.org/2000/svg">
                <rect x="45" y="100" width="10" height="20" fill="#8B4513"/>
                <path d="M50 10 L80 40 L20 40 Z" fill="#228B22"/>
                <path d="M50 30 L85 65 L15 65 Z" fill="#2E8B57"/>
                <path d="M50 50 L90 90 L10 90 Z" fill="#3CB371"/>
                <circle cx="50" cy="20" r="3" fill="gold"/>
                <circle cx="40" cy="45" r="2.5" fill="red"/>
                <circle cx="60" cy="55" r="2.5" fill="#1E90FF"/>
                <circle cx="35" cy="70" r="2.5" fill="gold"/>
                <circle cx="65" cy="75" r="2.5" fill="#FF69B4"/>
                <circle cx="45" cy="85" r="2.5" fill="#9370DB"/>
              </svg>
            </div>
          ))}
        </div>

        {/* Titre et navigation */}
        <h2 className="text-2xl font-bold mb-4">Calendrier de l'Avent AI 2024</h2>
        <div className="flex gap-4">
          <button
            onClick={() => setActiveView(1)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors
              ${activeView === 1 ? 'bg-white text-red-600' : 'hover:bg-white/10'}`}
          >
            <Calendar />
            Calendrier
          </button>
          <button
            onClick={() => setActiveView(2)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors
              ${activeView === 2 ? 'bg-white text-green-600' : 'hover:bg-white/10'}`}
          >
            <Gift />
            Timeline
          </button>
          <button
            onClick={() => setActiveView(3)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors
              ${activeView === 3 ? 'bg-white text-red-600' : 'hover:bg-white/10'}`}
          >
            <Rocket />
            Entreprises
          </button>
        </div>
      </div>

      {/* Contenu principal */}
      <div className="h-96 overflow-y-auto">
        {activeView === 1 && <CalendarView />}
        {activeView === 2 && <TimelineView />}
        {activeView === 3 && <CompanyView />}
      </div>

      {/* Section détails */}
      {selectedAnnouncement && (
        <div className="p-4 border-t border-gray-200 bg-white">
          <div className="flex items-start gap-4">
            <div 
              className="w-3 h-3 rounded-full mt-1.5"
              style={{backgroundColor: companies[selectedAnnouncement.company]}}
            />
            <div>
              <div className="flex items-baseline gap-2">
                <span className="font-bold text-lg">{selectedAnnouncement.title}</span>
                <span className="text-sm text-gray-500">
                  {selectedAnnouncement.company} - {selectedAnnouncement.id} décembre
                </span>
              </div>
              <p className="mt-2 text-gray-700">
                {selectedAnnouncement.description.split(/(\bhttps?:\/\/\S+)/gi).map((part, index) => {
                  if (part.match(/^https?:\/\//i)) {
                    return (
                      <a
                        key={index}
                        href={part}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 hover:underline"
                      >
                        {part}
                      </a>
                    );
                  }
                  return part;
                })}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Rendre App disponible globalement
window.App = App;
