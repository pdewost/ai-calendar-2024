const App = () => {
  const [activeView, setActiveView] = React.useState(1);
  const [openWindow, setOpenWindow] = React.useState(null);
  const [selectedAnnouncement, setSelectedAnnouncement] = React.useState(null);
  const [snowflakes, setSnowflakes] = React.useState([]);

  const companies = {
    'OpenAI': '#412991',
    'Google': '#4285F4',
    'xAI': '#1DA1F2',
    'Anthropic': '#FF6B6B',
    'Mistral': '#50C878'
  };

  const announcements = [
    {
      id: 5,
      company: 'OpenAI',
      title: '12 Days of OpenAI Kick-off',
      description: "Lancement d'une série de mises à jour quotidiennes présentant de nouveaux outils et fonctionnalités pour ChatGPT et d'autres modèles. Plus d'informations : https://shlegal.com/insights/neural-network---december-2024"
    },
    {
      id: 6,
      company: 'OpenAI',
      title: 'Reinforcement Fine-Tuning',
      description: "Introduction du fine-tuning pour des tâches spécifiques avec intégration du feedback utilisateur."
    },
    {
      id: 7,
      company: 'OpenAI',
      title: 'GPT-4 Turbo Enhancements',
      description: "Améliorations significatives des performances et de la vitesse du modèle GPT-4 Turbo, avec une réduction de la latence de 50%."
    },
    {
      id: 8,
      company: 'OpenAI',
      title: 'Advanced Code Interpreter',
      description: "Nouvelle version de l'interpréteur de code avec support étendu pour plus de langages et d'environnements d'exécution."
    },
    {
      id: 9,
      company: 'OpenAI',
      title: 'Sora Turbo Launch',
      description: "Lancement du modèle avancé de génération vidéo pour la conversion texte-vidéo et vidéo-vidéo."
    },
    {
      id: 10,
      company: 'OpenAI',
      title: 'Canvas Workspace',
      description: "Espace de travail interactif intégré à GPT-4 pour la gestion de projet et l'exécution de code Python."
    },
    {
      id: 11,
      company: 'Google',
      title: 'Gemini 2.0',
      description: "Nouveau modèle AI avec des avancées significatives en multimodalité et capacités agentiques. Plus d'informations : https://www.linqto.com/unicorn-news/anthropic-news-ai-computing-market-faces-potential-shake-up-in-2025/"
    },
    {
      id: 11,
      company: 'Google',
      title: 'Deep Research',
      description: "Outil AI permettant aux utilisateurs de conduire des recherches en ligne et de générer des rapports complets."
    },
    {
      id: 12,
      company: 'OpenAI',
      title: 'DALL-E 4 Preview',
      description: "Aperçu de la prochaine génération du modèle de génération d'images avec des capacités artistiques et créatives étendues."
    },
    {
      id: 13,
      company: 'OpenAI',
      title: 'GPT-4V Improvements',
      description: "Mises à jour majeures des capacités de vision du modèle GPT-4V, incluant une meilleure compréhension des images."
    },
    {
      id: 14,
      company: 'OpenAI',
      title: 'ChatGPT Enterprise+',
      description: "Nouveau niveau d'abonnement entreprise avec fonctionnalités avancées de personnalisation et d'intégration."
    },
    {
      id: 15,
      company: 'OpenAI',
      title: 'AI Safety Tools',
      description: "Suite d'outils pour améliorer la sécurité et la fiabilité des modèles AI."
    },
    {
      id: 16,
      company: 'Google',
      title: 'Veo 2',
      description: "Modèle avancé de génération vidéo offrant des sorties haute résolution et un contrôle cinématique."
    },
    {
      id: 16,
      company: 'OpenAI',
      title: 'Developer Platform 2.0',
      description: "Refonte majeure de la plateforme développeur avec de nouvelles APIs et outils d'intégration."
    },
    {
      id: 20,
      company: 'Google',
      title: 'AI Android/Pixel',
      description: "Mises à jour Android incluant une navigation photos améliorée et des sous-titres audio plus précis."
    },
    {
      id: 21,
      company: 'OpenAI',
      title: 'o3 Reasoning',
      description: "Modèle de raisonnement avancé pour améliorer les capacités de prise de décision de l'AI."
    },
    {
      id: 21,
      company: 'xAI',
      title: 'Grok Scaling',
      description: "Entraînement de Grok 3 avec 100 000 GPU Nvidia H100, objectif 200 000 GPU pour Grok 4. Plus d'infos : https://www.linqto.com/unicorn-news/xai-news-xai-advances-ai-compute-scaling/"
    },
    {
      id: 24,
      company: 'xAI',
      title: '$6B Funding',
      description: "Levée de fonds de 6 milliards de dollars. Sources : https://www.nytimes.com/2024/12/24/technology/elon-musk-xai-funding.html"
    },
    {
      id: 29,
      company: 'Anthropic',
      title: 'AI Agent Roadmap',
      description: "Plan détaillé sur la conception modulaire et la supervision humaine des systèmes Claude AI. Plus d'infos : https://www.linqto.com/unicorn-news/anthropic-news-anthropic-reveals-roadmap-for-ai-agent-development/"
    },
    {
      id: 29,
      company: 'Mistral',
      title: 'Mixtral 8x7B',
      description: "Nouveau LLM utilisant une approche 'Mixture of Experts'. Plus d'infos : https://www.ictjournal.ch/news/2023-12-13/mistral-ai-degaine-un-nouveau-llm"
    }
  ];

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

  const Snowflake = ({ style }) => (
    <div 
      className="absolute text-white opacity-80 animate-fall"
      style={style}
    >
      ❄
    </div>
  );

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

  const CalendarView = () => (
    <div className="grid grid-cols-7 gap-2 p-4">
      {[...Array(31)].map((_, idx) => {
        const day = idx + 1;
        const dayAnnouncements = announcements.filter(a => a.id === day);
        const count = dayAnnouncements.length;
        const isSelected = dayAnnouncements.some(a => 
          selectedAnnouncement?.id === a.id && 
          selectedAnnouncement?.company === a.company
        );
        
        return (
          <div
            key={day}
            className={`relative aspect-square rounded-lg flex flex-col items-center justify-center transition-all
              ${count > 0 
                ? `bg-white shadow-lg hover:scale-105 cursor-pointer
                   ${isSelected ? 'ring-2 ring-red-500 scale-105' : ''}`
                : 'bg-gray-100'}`}
            onClick={() => {
              if (count === 1) {
                handleAnnouncementClick(dayAnnouncements[0]);
              } else if (count > 1 && !isSelected) {
                setOpenWindow(day);
              }
            }}
          >
            <div className="font-bold mb-1">{day}</div>
            {count > 0 && (
              <div className="flex gap-1">
                {dayAnnouncements.map((announcement) => (
                  <div
                    key={`${announcement.id}-${announcement.company}`}
                    className={`w-2 h-2 rounded-full z-10
                      ${selectedAnnouncement?.id === announcement.id && 
                        selectedAnnouncement?.company === announcement.company
                        ? 'ring-2 ring-red-500'
                        : ''}`}
                    style={{backgroundColor: companies[announcement.company]}}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAnnouncementClick(announcement);
                    }}
                    title={announcement.title}
                  />
                ))}
              </div>
            )}
            {count > 1 && openWindow === day && (
              <div 
                className="absolute top-full left-0 mt-1 bg-white shadow-lg rounded-lg p-2 z-20 w-48"
                onClick={(e) => e.stopPropagation()}
              >
                {dayAnnouncements.map((announcement) => (
                  <div
                    key={`menu-${announcement.id}-${announcement.company}`}
                    className={`p-2 cursor-pointer rounded flex items-center gap-2 text-sm
                      ${selectedAnnouncement?.id === announcement.id && 
                        selectedAnnouncement?.company === announcement.company
                        ? 'bg-red-50'
                        : 'hover:bg-gray-50'}`}
                    onClick={() => {
                      handleAnnouncementClick(announcement);
                      setOpenWindow(null);
                    }}
                  >
                    <div 
                      className="w-3 h-3 rounded-full"
                      style={{backgroundColor: companies[announcement.company]}}
                    />
                    <span>{announcement.title}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );

  const TimelineView = () => (
    <div className="space-y-4 p-4">
      {announcements.map((announcement, idx) => (
        <div 
          key={idx}
          className="flex items-center gap-4 cursor-pointer hover:scale-102 transition-transform"
          onClick={() => handleAnnouncementClick(announcement)}
        >
          <div className="w-16 text-right font-bold">{announcement.id} déc</div>
          <div className="h-full w-1 bg-red-200" />
          <div 
            className={`flex-1 p-3 rounded-lg transition-colors
              ${selectedAnnouncement?.id === announcement.id && 
                selectedAnnouncement?.company === announcement.company 
                ? 'ring-2 ring-red-500' : ''}`}
            style={{backgroundColor: `${companies[announcement.company]}20`}}
          >
            <div className="font-medium" style={{color: companies[announcement.company]}}>
              {announcement.company}
            </div>
            <div>{announcement.title}</div>
          </div>
        </div>
      ))}
    </div>
  );

  const CompanyView = () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
      {Object.entries(companies).map(([company, color]) => (
        <Card key={company} className="overflow-hidden">
          <div className="p-3 text-white font-bold" style={{backgroundColor: color}}>
            {company}
          </div>
          <CardContent className="p-4">
            {announcements
              .filter(a => a.company === company)
              .map((announcement) => (
                <div 
                  key={announcement.id}
                  className={`mb-2 text-sm cursor-pointer p-2 rounded transition-colors
                    ${selectedAnnouncement?.id === announcement.id && 
                      selectedAnnouncement?.company === announcement.company
                      ? 'bg-red-50'
                      : 'hover:bg-gray-50'}`}
                  onClick={() => handleAnnouncementClick(announcement)}
                >
                  <span className="font-medium">{announcement.id} déc:</span> {announcement.title}
                </div>
              ))}
          </CardContent>
        </Card>
      ))}
    </div>
  );

return (
    <div className="max-w-4xl mx-auto bg-gray-50 rounded-xl shadow-lg overflow-hidden relative">
      <div className="bg-gradient-to-r from-red-600 to-green-600 p-4 text-white relative">
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

      <div className="h-96 overflow-y-auto">
        {activeView === 1 && <CalendarView />}
        {activeView === 2 && <TimelineView />}
        {activeView === 3 && <CompanyView />}
      </div>

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

window.App = App;
