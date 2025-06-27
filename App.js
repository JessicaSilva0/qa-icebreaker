import React, { useState } from 'react';
import { Heart, Play, MapPin, Code, Trophy } from 'lucide-react';

const QAIceBreaker = () => {
  const [gameState, setGameState] = useState('setup');
  const [teamMembers, setTeamMembers] = useState([]);
  const [newMemberName, setNewMemberName] = useState('');
  const [availableMembers, setAvailableMembers] = useState([]);
  const [participatedMembers, setParticipatedMembers] = useState([]);
  const [round, setRound] = useState(1);
  const [currentActivity, setCurrentActivity] = useState(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [usedActivities, setUsedActivities] = useState([]);
  const [hasAnswered, setHasAnswered] = useState(false);

  const categories = [
    { 
      name: "Debug Pessoal", 
      color: "bg-gradient-to-r from-purple-500 to-pink-500",
      icon: Heart,
      activities: [
        {
          type: "quiz",
          question: "Se você fosse um comando de terminal, qual seria?",
          options: ["sudo make-coffee ☕", "git blame monday", "npm install happiness", "docker run --party"]
        },
        {
          type: "quiz",
          question: "Qual sua reação quando alguém diz 'só um bug rapidinho'?",
          options: [
            "😅 'Rapidinho igual brigadeiro derretendo'",
            "🙄 'Né isso que tu falou da última vez...'",
            "😰 'Já sei que vou ficar até tarde'",
            "🤔 'Vamos ver esse 'rapidinho' aí...'"
          ]
        },
        {
          type: "challenge",
          title: "Desafio Pessoal",
          task: "Conte uma história engraçada de quando você começou em QA. O mais constrangedor ganha! 😅"
        }
      ]
    },
    { 
      name: "Debug Playwright", 
      color: "bg-gradient-to-r from-green-500 to-blue-500",
      icon: Play,
      activities: [
        {
          type: "quiz",
          question: "Qual é o pior pesadelo de um QA Playwright?",
          options: [
            "page.waitForTimeout(999999) em produção", 
            "Elemento com id 'button1', 'button2', 'button3'...", 
            "Test que só falha na pipeline, nunca local",
            "await page.click('//div[1]/div[2]/div[3]/button')"
          ]
        },
        {
          type: "quiz",
          question: "Se Playwright tivesse WhatsApp, qual seria o status?",
          options: [
            "'Procurando elementos que se escondem...'",
            "'Ocupado: Fazendo screenshot de tudo'",
            "'Disponível apenas para seletores estáveis'",
            "'Testando paciência humana desde 2020'"
          ]
        },
        {
          type: "challenge",
          title: "Desafio Playwright",
          task: "Imitem como vocês ficam quando o teste passa local mas falha na CI. Prêmio para a atuação mais dramática! 🎭"
        }
      ]
    },
    { 
      name: "QA Cultural", 
      color: "bg-gradient-to-r from-teal-500 to-cyan-500",
      icon: MapPin,
      activities: [
        {
          type: "quiz",
          question: "Em Angola, qual seria o melhor nome para um framework de testes?",
          options: ["KizombaTest", "LuandaSelenium", "BenguelaBot", "MuximaValidator", "JacareBangaoDoBengo"]
        },
        {
          type: "quiz",
          question: "Situação mais brasileira/angolana durante um bug em produção:",
          options: [
            "Reunião de emergência vira roda de conversa de 2h",
            "Alguém sempre diz: 'Mas ontem estava funcionando...'",
            "Descobrem que o problema era só limpar o cache",
            "Fix é feito durante o cafézinho"
          ]
        },
        {
          type: "challenge",
          title: "Desafio Cultural Mix",
          task: "Explique um conceito de testing usando gírias de Angola e Brasil misturadas! 😂"
        }
      ]
    },
    { 
      name: "Skills Match", 
      color: "bg-gradient-to-r from-orange-500 to-red-500",
      icon: Code,
      activities: [
        {
          type: "quiz",
          question: "Qual sua maior habilidade secreta em QA?",
          options: [
            "Quebrar qualquer sistema em 5 cliques",
            "Entender o que o dev realmente quis dizer",
            "Encontrar edge cases impossíveis",
            "Manter a calma quando tudo está pegando fogo"
          ]
        },
        {
          type: "challenge",
          title: "Desafio de Skills",
          task: "Em 2 minutos, ensine uma técnica/macete de QA para o grupo!"
        }
      ]
    },
    { 
      name: "Random Facts", 
      color: "bg-gradient-to-r from-yellow-500 to-orange-500",
      icon: Trophy,
      activities: [
        {
          type: "quiz",
          question: "Fato universal sobre QAs Brasil/Angola:",
          options: [
            "Todos sabem que 'funciona na minha máquina' é maldição",
            "Café é considerado parte do stack técnico",
            "Sexta-feira 17h = zona de perigo para releases",
            "Todas as opções são lei da física"
          ]
        },
        {
          type: "quiz",
          question: "Se QA fosse uma novela brasileira/angolana:",
          options: [
            "'O Bug do Século' - drama em 200 episódios",
            "'Amor em Deploy' - romance que sempre dá errado",
            "'A Força do Teste' - herói salva produção",
            "'Passione Playwright' - paixão por automação"
          ]
        },
        {
          type: "challenge",
          title: "Random Facts Challenge",
          task: "Compartilhe um fato curioso sobre você que ninguém do time sabe! 🏆"
        }
      ]
    }
  ];

  const addTeamMember = () => {
    const trimmedName = newMemberName.trim();
    if (trimmedName && !teamMembers.includes(trimmedName)) {
      setTeamMembers([...teamMembers, trimmedName]);
      setNewMemberName('');
    }
  };

  const removeMember = (name) => {
    setTeamMembers(teamMembers.filter(member => member !== name));
  };

  const startGame = () => {
    if (teamMembers.length > 0) {
      setAvailableMembers([...teamMembers]);
      setParticipatedMembers([]);
      setUsedActivities([]);
      setRound(1);
      setGameState('wheel');
    }
  };

  const spinWheel = () => {
    if (isSpinning || availableMembers.length === 0) return;
    
    setIsSpinning(true);
    const spins = 5 + Math.random() * 5;
    const finalRotation = rotation + (spins * 360) + Math.random() * 360;
    setRotation(finalRotation);
    
    setTimeout(() => {
      setIsSpinning(false);
      const normalizedRotation = (finalRotation % 360 + 360) % 360;
      const segmentSize = 360 / categories.length;
      const selectedIndex = Math.floor((360 - normalizedRotation + segmentSize/2) / segmentSize) % categories.length;
      
      const selectedCategory = categories[selectedIndex];
      
      // Filtrar atividades não usadas
      const availableActivities = selectedCategory.activities.filter(
        activity => !usedActivities.some(used => 
          used.category === selectedCategory.name && 
          used.question === activity.question &&
          used.title === activity.title
        )
      );
      
      const activitiesToUse = availableActivities.length > 0 ? availableActivities : selectedCategory.activities;
      const randomActivity = activitiesToUse[Math.floor(Math.random() * activitiesToUse.length)];
      
      const randomMember = availableMembers[Math.floor(Math.random() * availableMembers.length)];
      
      setUsedActivities([...usedActivities, {
        category: selectedCategory.name,
        question: randomActivity.question,
        title: randomActivity.title
      }]);
      
      setCurrentActivity({
        category: selectedCategory.name,
        color: selectedCategory.color,
        targetMember: randomMember,
        ...randomActivity
      });
      
      setHasAnswered(randomActivity.type !== 'quiz');
      setGameState('activity');
    }, 3000);
  };

  const nextQuestion = () => {
    if (!hasAnswered) {
      alert('Por favor, selecione uma opção antes de continuar! 🎯');
      return;
    }
    
    setParticipatedMembers([...participatedMembers, currentActivity.targetMember]);
    setAvailableMembers(availableMembers.filter(member => member !== currentActivity.targetMember));
    
    if (availableMembers.length === 1) {
      setGameState('completed');
    } else {
      setRound(round + 1);
      setGameState('wheel');
      setCurrentActivity(null);
      setHasAnswered(false);
    }
  };

  const resetGame = () => {
    setAvailableMembers([...teamMembers]);
    setParticipatedMembers([]);
    setUsedActivities([]);
    setRound(1);
    setGameState('wheel');
    setCurrentActivity(null);
    setHasAnswered(false);
  };

  if (gameState === 'setup') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-50 to-pink-100 p-4">
        <div className="max-w-6xl mx-auto">
          <header className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              🧊 Team Building - Ice Breaker🧊
            </h1>
            <p className="text-xl text-gray-600">
              The Best Of TIS 💙
            </p>
          </header>

          <div className="max-w-2xl mx-auto">
            <div className="bg-white p-8 rounded-lg shadow-lg mb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                👥 Vamos conhecer o time!
              </h2>
              
              <div className="flex gap-3 mb-6">
                <input
                  type="text"
                  value={newMemberName}
                  onChange={(e) => setNewMemberName(e.target.value)}
                  placeholder="Digite o nome do membro do time..."
                  className="flex-1 px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                  autoComplete="off"
                  autoFocus
                />
                <button
                  onClick={addTeamMember}
                  disabled={!newMemberName.trim()}
                  className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:bg-gray-300"
                >
                  Adicionar
                </button>
              </div>
              
              {teamMembers.length > 0 && (
                <div className="mb-6">
                  <h3 className="font-bold text-gray-700 mb-3">Time TIS 💙 ({teamMembers.length} pessoas):</h3>
                  <div className="flex flex-wrap gap-2">
                    {teamMembers.map((member, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 bg-blue-100 px-3 py-2 rounded-full border-2 border-blue-300"
                      >
                        <span className="text-blue-800 font-medium">{member}</span>
                        <button
                          onClick={() => removeMember(member)}
                          className="text-red-500 hover:text-red-700 font-bold"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {teamMembers.length > 0 ? (
                <div className="text-center">
                  <button
                    onClick={startGame}
                    className="px-8 py-4 bg-gradient-to-r from-green-500 to-blue-600 text-white rounded-full font-bold text-lg hover:scale-105 transition-all shadow-lg"
                  >
                    🎬 Começar o Ice Breaker!
                  </button>
                </div>
              ) : (
                <div className="text-center text-gray-500 py-4">
                  <p>Adicione pelo menos uma pessoa para começar! 😊</p>
                </div>
              )}
            </div>
          </div>

          <footer className="text-center mt-12 text-gray-500">
            <p className="italic">Powered by Playwright sem async 🎭 (porque o Team Building não pode esperar!)</p>
          </footer>
        </div>
      </div>
    );
  }

  if (gameState === 'wheel') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-50 to-pink-100 p-4">
        <div className="max-w-6xl mx-auto">
          <header className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              🧊 Team Building - Ice Breaker🧊
            </h1>
            <p className="text-xl text-gray-600">
              The Best Of TIS 💙
            </p>
          </header>

          <div className="flex flex-col items-center space-y-8">
            <div className="text-center mb-4">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                🎯 Rodada {round} de {teamMembers.length}
              </h2>
              <div className="flex justify-center space-x-4 text-sm">
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full">
                  ✅ Participaram: {participatedMembers.length}
                </span>
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                  ⏳ Restam: {availableMembers.length}
                </span>
              </div>
              
              {availableMembers.length > 0 && (
                <div className="mt-3">
                  <p className="text-gray-600 mb-2">Próximos na fila:</p>
                  <div className="flex flex-wrap justify-center gap-2">
                    {availableMembers.map((member, index) => (
                      <span key={index} className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-sm">
                        {member}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="relative">
              <div 
                className={`w-80 h-80 rounded-full border-8 border-white shadow-2xl transition-transform duration-3000 ease-out ${isSpinning ? 'animate-spin' : ''}`}
                style={{ 
                  transform: `rotate(${rotation}deg)`,
                  background: `conic-gradient(from 0deg, #8b5cf6, #ec4899, #10b981, #3b82f6, #06b6d4, #f59e0b)`
                }}
              >
                {categories.map((category, index) => {
                  const angle = (index * 360) / categories.length;
                  const IconComponent = category.icon;
                  return (
                    <div
                      key={index}
                      className="absolute w-full h-full flex items-center justify-center text-white font-bold text-sm"
                      style={{
                        transform: `rotate(${angle + 180/categories.length}deg)`,
                        transformOrigin: 'center'
                      }}
                    >
                      <div className="flex flex-col items-center" style={{ transform: 'rotate(180deg)' }}>
                        <IconComponent size={24} />
                        <span className="text-xs mt-1 text-center leading-tight">{category.name}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
              
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-full p-4 shadow-lg">
                <div className="text-4xl">🎭</div>
              </div>
              
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2">
                <div className="w-0 h-0 border-l-4 border-r-4 border-b-8 border-l-transparent border-r-transparent border-b-red-500"></div>
              </div>
            </div>
            
            <button
              onClick={spinWheel}
              disabled={isSpinning || availableMembers.length === 0}
              className={`px-8 py-4 rounded-full font-bold text-white text-lg shadow-lg transition-all ${
                isSpinning || availableMembers.length === 0
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:scale-105 hover:shadow-xl'
              }`}
            >
              {isSpinning ? 'Girando...' : availableMembers.length === 0 ? 'Todos participaram!' : '🎰 Girar Roleta!'}
            </button>
          </div>

          <footer className="text-center mt-12 text-gray-500">
            <p className="italic">Powered by Playwright sem async 🎭 (porque o Team Building não pode esperar!)</p>
          </footer>
        </div>
      </div>
    );
  }

  if (gameState === 'activity' && currentActivity) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-50 to-pink-100 p-4">
        <div className="max-w-6xl mx-auto">
          <header className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              🧊 Team Building - Ice Breaker🧊
            </h1>
            <p className="text-xl text-gray-600">
              The Best Of TIS 💙
            </p>
          </header>

          <div className="max-w-2xl mx-auto">
            <div className={`${currentActivity.color} p-6 rounded-lg text-white mb-6`}>
              <h2 className="text-2xl font-bold mb-2">{currentActivity.category}</h2>
              <div className="text-center mb-4">
                <span className="text-lg bg-white bg-opacity-20 px-4 py-2 rounded-full">
                  🎯 Vez de: <strong>{currentActivity.targetMember}</strong>
                </span>
              </div>
              <h3 className="text-xl">{currentActivity.question || currentActivity.title}</h3>
            </div>
            
            {currentActivity.type === 'quiz' && (
              <div>
                <div className="space-y-4">
                  {currentActivity.options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => setHasAnswered(true)}
                      className={`w-full p-4 border-2 rounded-lg transition-all text-left ${
                        hasAnswered
                          ? 'bg-blue-500 text-white border-blue-500' 
                          : 'bg-white border-gray-200 hover:border-blue-500 hover:bg-blue-50'
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
                
                {hasAnswered && (
                  <div className="mt-6 p-4 bg-green-100 border-2 border-green-500 rounded-lg">
                    <p className="text-green-800 font-bold">Ótima escolha! 🎉</p>
                    <p className="text-green-700">Agora compartilhe por que escolheu essa opção!</p>
                  </div>
                )}
                
                {!hasAnswered && (
                  <div className="mt-6 p-4 bg-yellow-100 border-2 border-yellow-500 rounded-lg">
                    <p className="text-yellow-800 font-bold">⚠️ Selecione uma opção para continuar</p>
                  </div>
                )}
              </div>
            )}

            {currentActivity.type === 'challenge' && (
              <div>
                <div className="bg-white p-6 rounded-lg border-2 border-gray-200 mb-6">
                  <p className="text-lg text-gray-800">{currentActivity.task}</p>
                </div>
                
                <div className="p-4 bg-purple-100 border-2 border-purple-500 rounded-lg">
                  <p className="text-purple-800 font-bold">🎯 Desafio Ativo!</p>
                  <p className="text-purple-700">Tempo sugerido: 5-10 minutos para discussão.</p>
                </div>
              </div>
            )}
          </div>

          <div className="text-center mt-8">
            <button
              onClick={nextQuestion}
              className="px-8 py-4 bg-gradient-to-r from-green-500 to-blue-600 text-white rounded-full font-bold text-lg hover:scale-105 transition-all shadow-lg mr-4"
            >
              ➡️ Próxima Pergunta
            </button>
            <button
              onClick={() => setGameState('setup')}
              className="px-6 py-3 bg-gradient-to-r from-gray-500 to-gray-600 text-white rounded-full font-bold hover:scale-105 transition-all shadow-lg"
            >
              👥 Gerenciar Time
            </button>
          </div>

          <footer className="text-center mt-12 text-gray-500">
            <p className="italic">Powered by Playwright sem async 🎭 (porque o Team Building não pode esperar!)</p>
          </footer>
        </div>
      </div>
    );
  }

  if (gameState === 'completed') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-50 to-pink-100 p-4">
        <div className="max-w-6xl mx-auto">
          <header className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              🧊 Team Building - Ice Breaker🧊
            </h1>
            <p className="text-xl text-gray-600">
              The Best Of TIS 💙
            </p>
          </header>

          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-gradient-to-r from-green-500 to-blue-600 p-8 rounded-lg text-white mb-6">
              <h2 className="text-3xl font-bold mb-4">🎉 Parabéns TIS!</h2>
              <p className="text-xl">Todo mundo participou do Ice Breaker!</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg border-2 border-green-300 mb-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">📊 Resumo da Sessão:</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                <div className="bg-blue-100 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-blue-800">{teamMembers.length}</div>
                  <div className="text-blue-600">Participantes</div>
                </div>
                <div className="bg-green-100 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-green-800">{teamMembers.length}</div>
                  <div className="text-green-600">Rodadas Completas</div>
                </div>
                <div className="bg-purple-100 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-purple-800">100%</div>
                  <div className="text-purple-600">Participação</div>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-bold text-gray-700">Hall da Fama TIS 💙:</h4>
              <div className="flex flex-wrap justify-center gap-3">
                {teamMembers.map((member, index) => (
                  <div
                    key={index}
                    className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2 rounded-full font-bold shadow-lg"
                  >
                    🏆 {member}
                  </div>
                ))}
              </div>
            </div>
            
            <div className="text-center mt-8 space-x-4">
              <button
                onClick={resetGame}
                className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full font-bold text-lg hover:scale-105 transition-all shadow-lg"
              >
                🎰 Jogar Novamente
              </button>
              <button
                onClick={() => setGameState('setup')}
                className="px-6 py-3 bg-gradient-to-r from-gray-500 to-gray-600 text-white rounded-full font-bold hover:scale-105 transition-all shadow-lg"
              >
                👥 Novo Time
              </button>
            </div>
          </div>

          <footer className="text-center mt-12 text-gray-500">
            <p className="italic">Powered by Playwright sem async 🎭 (porque o Team Building não pode esperar!)</p>
          </footer>
        </div>
      </div>
    );
  }

  return null;
};

export default QAIceBreaker;