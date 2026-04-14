import { useState, useEffect, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Zap, 
  Gamepad2, 
  PlusCircle, 
  Trophy, 
  User, 
  Search, 
  Filter, 
  Globe, 
  Star, 
  Users, 
  Cpu, 
  ChevronRight,
  Play,
  Dices,
  Flame,
  Clock,
  LayoutGrid
} from 'lucide-react';
import { translations, Language } from './translations';

// --- Types ---
interface Game {
  id: string;
  title: string;
  thumbnail: string;
  rating: number;
  genre: string;
  difficulty: 'easy' | 'medium' | 'hard';
  isAI: boolean;
  isMultiplayer: boolean;
}

// --- Mock Data ---
const GAMES: Game[] = [
  { id: '1', title: 'Blitz Clicker', thumbnail: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=400&h=250', rating: 4.8, genre: 'speed', difficulty: 'easy', isAI: false, isMultiplayer: false },
  { id: '2', title: 'Neon Memory', thumbnail: 'https://images.unsplash.com/photo-1614850523296-d8c1af93d400?auto=format&fit=crop&q=80&w=400&h=250', rating: 4.5, genre: 'puzzle', difficulty: 'medium', isAI: true, isMultiplayer: false },
  { id: '3', title: 'Retro Runner', thumbnail: 'https://images.unsplash.com/photo-1551103782-8ab07afd45c1?auto=format&fit=crop&q=80&w=400&h=250', rating: 4.9, genre: 'platformer', difficulty: 'hard', isAI: false, isMultiplayer: false },
  { id: '4', title: 'Arena Clash', thumbnail: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=400&h=250', rating: 4.7, genre: 'battle', difficulty: 'medium', isAI: false, isMultiplayer: true },
  { id: '5', title: 'Cyber Puzzle', thumbnail: 'https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&q=80&w=400&h=250', rating: 4.6, genre: 'puzzle', difficulty: 'hard', isAI: true, isMultiplayer: false },
  { id: '6', title: 'Pixel Jump', thumbnail: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=400&h=250', rating: 4.4, genre: 'platformer', difficulty: 'easy', isAI: false, isMultiplayer: false },
  { id: '7', title: 'Math Blitz', thumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80&w=400&h=250', rating: 4.3, genre: 'puzzle', difficulty: 'medium', isAI: false, isMultiplayer: false },
  { id: '8', title: 'Reaction Master', thumbnail: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?auto=format&fit=crop&q=80&w=400&h=250', rating: 4.9, genre: 'speed', difficulty: 'hard', isAI: false, isMultiplayer: true },
];

const LEADERBOARD = [
  { id: '1', name: 'Khesraw', score: 15400, level: 50, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Khesraw' },
  { id: '2', name: 'BlitzMaster', score: 12500, level: 42, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=BlitzMaster' },
  { id: '3', name: 'NeonRunner', score: 11200, level: 38, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=NeonRunner' },
  { id: '4', name: 'FlashGamer', score: 10800, level: 35, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=FlashGamer' },
  { id: '5', name: 'CyberZap', score: 9500, level: 31, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=CyberZap' },
];

// --- Components ---

const Logo = ({ size = "md" }: { size?: "sm" | "md" | "lg" }) => {
  const sizes = {
    sm: "text-2xl",
    md: "text-4xl",
    lg: "text-7xl"
  };
  
  return (
    <motion.div 
      className={`flex items-center font-black tracking-tighter ${sizes[size]}`}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <motion.div
        animate={{ 
          filter: ["drop-shadow(0 0 2px #facc15)", "drop-shadow(0 0 10px #facc15)", "drop-shadow(0 0 2px #facc15)"],
        }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <Zap className="text-blitz-yellow fill-blitz-yellow mr-1" size={size === "lg" ? 80 : size === "md" ? 40 : 24} />
      </motion.div>
      <span className="text-white">Blitz</span>
      <motion.span 
        className="text-play-blue glow-blue"
        animate={{ opacity: [0.8, 1, 0.8] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        Play
      </motion.span>
    </motion.div>
  );
};

const GameCard = ({ game, t, onClick }: { game: Game, t: any, onClick: () => void, key?: string }) => {
  return (
    <motion.div
      className="group relative bg-white/5 rounded-2xl overflow-hidden border border-white/10 cursor-pointer"
      whileHover={{ y: -8, scale: 1.02, borderColor: 'rgba(59, 130, 246, 0.5)' }}
      layout
      onClick={onClick}
    >
      <div className="aspect-video relative overflow-hidden">
        <img 
          src={game.thumbnail} 
          alt={game.title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 game-image"
          referrerPolicy="no-referrer"
          onError={(e) => {
            (e.target as HTMLImageElement).src = `https://placehold.co/400x250/0b0f1a/3b82f6?text=${game.title}`;
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <motion.div
            initial={{ scale: 0 }}
            whileHover={{ scale: 1 }}
            className="bg-blitz-yellow p-4 rounded-full text-black box-glow-yellow"
          >
            <Play fill="currentColor" size={24} />
          </motion.div>
        </div>
        {game.isAI && (
          <div className="absolute top-2 right-2 bg-play-pink/80 backdrop-blur-md px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
            <Cpu size={12} /> AI
          </div>
        )}
        {game.isMultiplayer && (
          <div className="absolute top-2 left-2 bg-play-blue/80 backdrop-blur-md px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
            <Users size={12} /> 1v1
          </div>
        )}
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start mb-1">
          <h3 className="font-bold text-lg group-hover:text-play-blue transition-colors">{game.title}</h3>
          <div className="flex items-center gap-1 text-blitz-yellow">
            <Star size={14} fill="currentColor" />
            <span className="text-sm font-medium">{game.rating}</span>
          </div>
        </div>
        <div className="flex gap-2 mt-2">
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/10 text-white/60 uppercase font-bold tracking-widest">
            {t[game.genre]}
          </span>
          <span className={`text-[10px] px-2 py-0.5 rounded-full uppercase font-bold tracking-widest ${
            game.difficulty === 'easy' ? 'bg-green-500/20 text-green-400' :
            game.difficulty === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
            'bg-red-500/20 text-red-400'
          }`}>
            {t[game.difficulty]}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default function App() {
  const [lang, setLang] = useState<Language>('de');
  const [page, setPage] = useState<'home' | 'games' | 'create' | 'leaderboard' | 'profile'>('home');
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [loading, setLoading] = useState(true);

  const t = translations[lang];

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [showLobby, setShowLobby] = useState(false);

  const filteredGames = GAMES.filter(g => {
    const matchesFilter = filter === 'all' || g.genre === filter || (filter === 'ai' && g.isAI) || (filter === 'multi' && g.isMultiplayer);
    const matchesSearch = g.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const GameView = ({ game, onClose }: { game: Game, onClose: () => void }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(15);
    const [targetPos, setTargetPos] = useState({ x: 50, y: 50 });
    
    // Memory Game State
    const [cards, setCards] = useState<{id: number, val: string, flipped: boolean, matched: boolean}[]>([]);
    const [flipped, setFlipped] = useState<number[]>([]);

    // Math Game State
    const [problem, setProblem] = useState({ a: 0, b: 0, op: '+', ans: 0 });
    const [input, setInput] = useState('');

    useEffect(() => {
      let timer: any;
      if (isPlaying && timeLeft > 0) {
        timer = setInterval(() => {
          setTimeLeft(prev => prev - 1);
        }, 1000);
      } else if (timeLeft === 0) {
        setIsPlaying(false);
      }
      return () => clearInterval(timer);
    }, [isPlaying, timeLeft]);

    const spawnTarget = () => {
      setTargetPos({
        x: Math.random() * 80 + 10,
        y: Math.random() * 80 + 10
      });
    };

    const generateProblem = () => {
      const a = Math.floor(Math.random() * 20) + 1;
      const b = Math.floor(Math.random() * 20) + 1;
      setProblem({ a, b, op: '+', ans: a + b });
      setInput('');
    };

    const initMemory = () => {
      const symbols = ['⚡', '🔥', '💎', '⭐', '🍀', '🍎'];
      const deck = [...symbols, ...symbols]
        .sort(() => Math.random() - 0.5)
        .map((val, i) => ({ id: i, val, flipped: false, matched: false }));
      setCards(deck);
      setFlipped([]);
    };

    const handleTargetClick = () => {
      if (!isPlaying) return;
      setScore(prev => prev + 100);
      spawnTarget();
    };

    const handleMemoryClick = (id: number) => {
      if (!isPlaying || flipped.length === 2 || cards[id].flipped || cards[id].matched) return;
      
      const newCards = [...cards];
      newCards[id].flipped = true;
      setCards(newCards);
      
      const newFlipped = [...flipped, id];
      setFlipped(newFlipped);

      if (newFlipped.length === 2) {
        const [first, second] = newFlipped;
        if (cards[first].val === cards[second].val) {
          setTimeout(() => {
            const matchedCards = [...cards];
            matchedCards[first].matched = true;
            matchedCards[second].matched = true;
            setCards(matchedCards);
            setFlipped([]);
            setScore(prev => prev + 500);
            if (matchedCards.every(c => c.matched)) {
              setIsPlaying(false);
            }
          }, 500);
        } else {
          setTimeout(() => {
            const resetCards = [...cards];
            resetCards[first].flipped = false;
            resetCards[second].flipped = false;
            setCards(resetCards);
            setFlipped([]);
          }, 1000);
        }
      }
    };

    const handleMathSubmit = (e: FormEvent) => {
      e.preventDefault();
      if (parseInt(input) === problem.ans) {
        setScore(prev => prev + 200);
        generateProblem();
      } else {
        setInput('');
      }
    };

    // Reaction Game State
    const [reactionState, setReactionState] = useState<'idle' | 'waiting' | 'ready' | 'result'>('idle');
    const [reactionStartTime, setReactionStartTime] = useState(0);
    const [reactionTime, setReactionTime] = useState(0);

    useEffect(() => {
      let timer: any;
      if (reactionState === 'waiting') {
        const delay = Math.random() * 3000 + 2000;
        timer = setTimeout(() => {
          setReactionState('ready');
          setReactionStartTime(Date.now());
        }, delay);
      }
      return () => clearTimeout(timer);
    }, [reactionState]);

    const handleReactionClick = () => {
      if (reactionState === 'waiting') {
        setReactionState('idle');
        alert("Zu früh! Warte auf GRÜN.");
      } else if (reactionState === 'ready') {
        const time = Date.now() - reactionStartTime;
        setReactionTime(time);
        setReactionState('result');
        setScore(Math.max(0, 1000 - time));
      }
    };

    const startGame = () => {
      setScore(0);
      setTimeLeft(game.id === '2' ? 60 : 15);
      setIsPlaying(true);
      if (game.id === '1') spawnTarget();
      if (game.id === '2') initMemory();
      if (game.id === '7') generateProblem();
      if (game.id === '8') {
        setReactionState('waiting');
        setReactionTime(0);
      }
    };

    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] bg-bg-dark/95 backdrop-blur-2xl flex flex-col"
      >
        <div className="h-20 px-8 flex items-center justify-between border-b border-white/5">
          <div className="flex items-center gap-4">
            <Zap className="text-blitz-yellow" size={24} />
            <h2 className="text-xl font-bold">{game.title}</h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <PlusCircle className="rotate-45 text-white/60" size={32} />
          </button>
        </div>
        <div className="flex-1 p-8 flex flex-col items-center justify-center">
          <div className="w-full max-w-4xl aspect-video bg-black rounded-3xl border-4 border-white/5 relative overflow-hidden flex items-center justify-center">
            <div className="absolute inset-0 opacity-20">
              <img 
                src={game.thumbnail} 
                className="w-full h-full object-cover blur-3xl" 
                referrerPolicy="no-referrer" 
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://placehold.co/400x250/0b0f1a/3b82f6?text=BlitzPlay';
                }}
              />
            </div>
            
            {!isPlaying && timeLeft > 0 && (
              <div className="relative z-10 text-center">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={startGame}
                  className="w-24 h-24 bg-blitz-yellow rounded-full flex items-center justify-center text-black mx-auto mb-6 box-glow-yellow cursor-pointer"
                >
                  <Play fill="currentColor" size={40} />
                </motion.div>
                <h3 className="text-3xl font-black mb-2">Bereit für {game.title}?</h3>
                <p className="text-white/40">
                  {game.id === '1' && "Klicke den Blitz so oft du kannst!"}
                  {game.id === '2' && "Finde alle Paare!"}
                  {game.id === '7' && "Löse die Rechenaufgaben!"}
                  {!['1', '2', '7'].includes(game.id) && "Dieses Spiel wird bald verfügbar sein!"}
                </p>
              </div>
            )}

            {isPlaying && (
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="absolute top-4 left-4 text-2xl font-black text-play-blue">SCORE: {score}</div>
                <div className="absolute top-4 right-4 text-2xl font-black text-play-pink">TIME: {timeLeft}s</div>
                
                {game.id === '1' && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    key={`${targetPos.x}-${targetPos.y}`}
                    style={{ left: `${targetPos.x}%`, top: `${targetPos.y}%` }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-blitz-yellow rounded-full flex items-center justify-center text-black box-glow-yellow cursor-pointer"
                    onClick={handleTargetClick}
                  >
                    <Zap fill="currentColor" size={32} />
                  </motion.div>
                )}

                {game.id === '2' && (
                  <div className="grid grid-cols-4 gap-4 p-8">
                    {cards.map(card => (
                      <motion.div
                        key={card.id}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleMemoryClick(card.id)}
                        className={`w-20 h-20 rounded-xl flex items-center justify-center text-3xl cursor-pointer transition-all ${
                          card.flipped || card.matched ? 'bg-play-blue text-white box-glow-blue' : 'bg-white/10 text-transparent'
                        }`}
                      >
                        {card.val}
                      </motion.div>
                    ))}
                  </div>
                )}

                {game.id === '7' && (
                  <div className="text-center">
                    <div className="text-6xl font-black mb-8">{problem.a} {problem.op} {problem.b} = ?</div>
                    <form onSubmit={handleMathSubmit}>
                      <input 
                        autoFocus
                        type="number"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        className="bg-white/5 border-2 border-play-blue rounded-2xl px-6 py-4 text-4xl font-black text-center w-48 focus:outline-none box-glow-blue"
                      />
                    </form>
                  </div>
                )}

                {game.id === '8' && (
                  <div 
                    onClick={handleReactionClick}
                    className={`w-full h-full flex items-center justify-center cursor-pointer transition-colors duration-200 ${
                      reactionState === 'waiting' ? 'bg-red-500/20' : 
                      reactionState === 'ready' ? 'bg-green-500' : 
                      'bg-white/5'
                    }`}
                  >
                    <div className="text-center pointer-events-none">
                      {reactionState === 'waiting' && <h3 className="text-4xl font-black">Warte auf GRÜN...</h3>}
                      {reactionState === 'ready' && <h3 className="text-6xl font-black text-black">KLICK JETZT!</h3>}
                      {reactionState === 'result' && (
                        <div>
                          <h3 className="text-4xl font-black mb-4">Reaktionszeit:</h3>
                          <div className="text-7xl font-black text-play-blue">{reactionTime}ms</div>
                          <button 
                            onClick={(e) => { e.stopPropagation(); startGame(); }}
                            className="mt-8 px-8 py-4 bg-white/10 hover:bg-white/20 rounded-2xl font-bold"
                          >
                            Nochmal
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}

            {timeLeft === 0 && (
              <div className="relative z-10 text-center">
                <h3 className="text-5xl font-black mb-4 text-blitz-yellow glow-yellow">GAME OVER!</h3>
                <div className="text-3xl font-bold mb-8">Dein Score: <span className="text-play-blue">{score}</span></div>
                <button 
                  onClick={startGame}
                  className="px-8 py-4 bg-white/10 hover:bg-white/20 rounded-2xl font-bold transition-all"
                >
                  Nochmal versuchen
                </button>
              </div>
            )}
          </div>
          
          <div className="mt-8 w-full max-w-4xl flex justify-between items-center bg-white/5 p-6 rounded-2xl border border-white/10">
            <div className="flex gap-8">
              <div className="flex flex-col">
                <span className="text-[10px] text-white/40 uppercase font-bold tracking-wider">Highscore</span>
                <span className="text-xl font-black text-play-blue">45,200</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] text-white/40 uppercase font-bold tracking-wider">Dein Rang</span>
                <span className="text-xl font-black text-blitz-yellow">#12</span>
              </div>
            </div>
            <div className="flex gap-4">
              <button className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-xl font-bold transition-colors flex items-center gap-2">
                <Users size={18} /> Herausfordern
              </button>
              <button className="px-6 py-3 bg-play-blue text-white rounded-xl font-bold box-glow-blue flex items-center gap-2">
                <Flame size={18} /> Blitz Mode
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    );
  };

  const LobbyView = ({ onClose }: { onClose: () => void }) => (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="fixed inset-0 z-[100] bg-bg-dark/95 backdrop-blur-2xl flex items-center justify-center p-4"
    >
      <div className="w-full max-w-2xl bg-white/5 border border-white/10 rounded-[40px] p-10 relative">
        <button onClick={onClose} className="absolute top-6 right-6 p-2 hover:bg-white/10 rounded-full transition-colors">
          <PlusCircle className="rotate-45 text-white/60" size={32} />
        </button>
        
        <h2 className="text-4xl font-black mb-8 flex items-center gap-4">
          <Users className="text-play-blue" size={40} />
          Multiplayer Lobby
        </h2>

        <div className="space-y-4 mb-10">
          {[
            { id: '1', name: 'Khesraw vs BlitzMaster', players: '1/2', status: 'Waiting' },
            { id: '2', name: 'Neon Duel (Pro Only)', players: '2/2', status: 'In Progress' },
            { id: '3', name: 'Flash Battle #99', players: '0/2', status: 'Open' },
          ].map(room => (
            <div key={room.id} className="p-6 bg-black/40 border border-white/5 rounded-2xl flex items-center justify-between hover:border-play-blue/50 transition-colors cursor-pointer group">
              <div className="flex items-center gap-4">
                <div className={`w-3 h-3 rounded-full ${room.status === 'Open' ? 'bg-green-500' : room.status === 'Waiting' ? 'bg-yellow-500' : 'bg-red-500'}`} />
                <div>
                  <div className="font-bold text-lg">{room.name}</div>
                  <div className="text-xs text-white/40 uppercase tracking-widest font-bold">{room.status}</div>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="text-right">
                  <div className="font-black text-play-blue">{room.players}</div>
                  <div className="text-[10px] text-white/40 uppercase font-bold">Players</div>
                </div>
                <button className="px-4 py-2 bg-white/5 group-hover:bg-play-blue rounded-lg text-sm font-bold transition-all">
                  Join
                </button>
              </div>
            </div>
          ))}
        </div>

        <button className="w-full py-5 bg-play-blue text-white font-black text-xl rounded-2xl box-glow-blue flex items-center justify-center gap-3">
          <PlusCircle size={24} /> Create Private Room
        </button>
      </div>
    </motion.div>
  );

  if (loading) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center bg-bg-dark">
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.5, 1, 0.5]
          }}
          transition={{ duration: 1, repeat: Infinity }}
        >
          <Zap size={100} className="text-blitz-yellow fill-blitz-yellow glow-yellow" />
        </motion.div>
        <motion.div 
          className="mt-8 h-1 w-48 bg-white/10 rounded-full overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div 
            className="h-full bg-blitz-yellow"
            animate={{ x: [-200, 200] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          />
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-grid-lines">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-bg-dark/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
          <div className="cursor-pointer" onClick={() => setPage('home')}>
            <Logo size="sm" />
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            {[
              { id: 'home', icon: LayoutGrid, label: t.home },
              { id: 'games', icon: Gamepad2, label: t.games },
              { id: 'create', icon: PlusCircle, label: t.create },
              { id: 'leaderboard', icon: Trophy, label: t.leaderboard },
              { id: 'profile', icon: User, label: t.profile },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setPage(item.id as any)}
                className={`flex items-center gap-2 font-bold transition-all hover:text-play-blue ${
                  page === item.id ? 'text-play-blue glow-blue' : 'text-white/60'
                }`}
              >
                <item.icon size={18} />
                {item.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <div className="relative group">
              <button className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors">
                <Globe size={20} className="text-white/80" />
              </button>
              <div className="absolute right-0 top-full mt-2 bg-bg-dark border border-white/10 rounded-xl overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none group-hover:pointer-events-auto">
                {(['de', 'en', 'es', 'fa'] as const).map((l) => (
                  <button
                    key={l}
                    onClick={() => setLang(l)}
                    className={`w-full px-4 py-2 text-left hover:bg-white/5 transition-colors ${lang === l ? 'text-play-blue' : 'text-white'}`}
                  >
                    {l.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main className="pt-32 pb-20 px-4 max-w-7xl mx-auto">
        <AnimatePresence mode="wait">
          {page === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex flex-col items-center text-center py-12"
            >
              <Logo size="lg" />
              <motion.p 
                className="mt-6 text-2xl md:text-3xl font-medium text-white/80"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                {t.slogan}
              </motion.p>
              <motion.p 
                className="mt-2 text-lg text-white/40 italic"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                {t.instantFun}
              </motion.p>

              <div className="mt-12 flex flex-col sm:flex-row gap-6">
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(250, 204, 21, 0.4)" }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setPage('games')}
                  className="px-10 py-5 bg-blitz-yellow text-black font-black text-xl rounded-2xl flex items-center gap-3"
                >
                  <Play fill="currentColor" size={24} />
                  {t.playNow}
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)" }}
                  whileTap={{ scale: 0.95 }}
                  className="px-10 py-5 border-2 border-white/20 text-white font-black text-xl rounded-2xl flex items-center gap-3"
                >
                  <Dices size={24} />
                  {t.randomGame}
                </motion.button>
              </div>

              <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
                {[
                  { icon: Flame, title: "Blitz Mode", desc: "Increasing speed for true pros." },
                  { icon: Cpu, title: "AI Games", desc: "Endless levels generated by AI." },
                  { icon: Users, title: "Multiplayer", desc: "Challenge your friends in 1v1." },
                ].map((feature, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 + i * 0.1 }}
                    className="p-8 bg-white/5 rounded-3xl border border-white/10 hover:border-play-blue/30 transition-colors"
                  >
                    <div className="w-12 h-12 bg-play-blue/20 rounded-xl flex items-center justify-center text-play-blue mb-4 mx-auto">
                      <feature.icon size={24} />
                    </div>
                    <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                    <p className="text-white/50">{feature.desc}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {page === 'games' && (
            <motion.div
              key="games"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                <h2 className="text-4xl font-black flex items-center gap-3">
                  <Gamepad2 className="text-play-blue" size={36} />
                  {t.games}
                </h2>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <button 
                    onClick={() => setShowLobby(true)}
                    className="px-6 py-3 bg-play-blue/20 text-play-blue border border-play-blue/30 rounded-xl font-bold flex items-center gap-2 hover:bg-play-blue/30 transition-all"
                  >
                    <Users size={18} /> Lobby
                  </button>
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" size={18} />
                    <input 
                      type="text" 
                      placeholder={t.search}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-12 pr-6 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-play-blue transition-colors w-full sm:w-64"
                    />
                  </div>
                  <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 no-scrollbar">
                    {[
                      { id: 'all', label: t.all },
                      { id: 'speed', label: t.speed },
                      { id: 'puzzle', label: t.puzzle },
                      { id: 'platformer', label: t.platformer },
                      { id: 'ai', label: t.aiGenerated },
                      { id: 'multi', label: t.multiplayer },
                    ].map(f => (
                      <button
                        key={f.id}
                        onClick={() => setFilter(f.id)}
                        className={`px-4 py-2 rounded-xl text-sm font-bold whitespace-nowrap transition-all ${
                          filter === f.id ? 'bg-play-blue text-white box-glow-blue' : 'bg-white/5 text-white/60 hover:bg-white/10'
                        }`}
                      >
                        {f.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredGames.map(game => (
                  <GameCard key={game.id} game={game} t={t} onClick={() => setSelectedGame(game)} />
                ))}
              </div>
            </motion.div>
          )}

          {page === 'create' && (
            <motion.div
              key="create"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="max-w-3xl mx-auto"
            >
              <div className="text-center mb-12">
                <div className="w-20 h-20 bg-play-pink/20 rounded-3xl flex items-center justify-center text-play-pink mb-6 mx-auto box-glow-pink">
                  <Cpu size={40} />
                </div>
                <h2 className="text-4xl font-black mb-4">{t.createGame}</h2>
                <p className="text-white/50 text-lg">Nutze die Power der KI, um dein eigenes Mini-Game in Sekunden zu erschaffen.</p>
              </div>

              <div className="bg-white/5 p-8 rounded-3xl border border-white/10">
                <div className="mb-6">
                  <label className="block text-sm font-bold uppercase tracking-widest text-white/40 mb-3">{t.promptPlaceholder}</label>
                  <textarea 
                    className="w-full h-40 bg-black/40 border border-white/10 rounded-2xl p-6 text-lg focus:outline-none focus:border-play-pink transition-colors resize-none"
                    placeholder="z.B. Ein schnelles Spiel, bei dem man fallende Blitze fangen muss..."
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-white/40 mb-2">{t.genre}</label>
                    <select className="w-full bg-black/40 border border-white/10 rounded-xl p-3 focus:outline-none">
                      <option>{t.speed}</option>
                      <option>{t.puzzle}</option>
                      <option>{t.platformer}</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-white/40 mb-2">{t.difficulty}</label>
                    <select className="w-full bg-black/40 border border-white/10 rounded-xl p-3 focus:outline-none">
                      <option>{t.easy}</option>
                      <option>{t.medium}</option>
                      <option>{t.hard}</option>
                    </select>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02, boxShadow: "0 0 30px rgba(236, 72, 153, 0.4)" }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setIsGenerating(true);
                    setTimeout(() => setIsGenerating(false), 3000);
                  }}
                  disabled={isGenerating}
                  className="w-full py-5 bg-play-pink text-white font-black text-xl rounded-2xl flex items-center justify-center gap-3 disabled:opacity-50"
                >
                  {isGenerating ? (
                    <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}>
                      <Cpu size={24} />
                    </motion.div>
                  ) : <Zap size={24} />}
                  {isGenerating ? "Generiere..." : t.generate}
                </motion.button>
              </div>

              <div className="mt-12 grid grid-cols-2 gap-6">
                <div className="p-6 bg-white/5 rounded-2xl border border-white/5">
                  <h4 className="font-bold mb-2 flex items-center gap-2 text-play-blue">
                    <Users size={16} /> Multiplayer Mode
                  </h4>
                  <p className="text-xs text-white/40">Erstelle Spiele, die du direkt mit Freunden im 1v1 Duell spielen kannst.</p>
                </div>
                <div className="p-6 bg-white/5 rounded-2xl border border-white/5">
                  <h4 className="font-bold mb-2 flex items-center gap-2 text-blitz-yellow">
                    <Flame size={16} /> Blitz Mode
                  </h4>
                  <p className="text-xs text-white/40">Füge automatische Geschwindigkeitssteigerung für extra Nervenkitzel hinzu.</p>
                </div>
              </div>
            </motion.div>
          )}

          {page === 'leaderboard' && (
            <motion.div
              key="leaderboard"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="max-w-4xl mx-auto"
            >
              <h2 className="text-4xl font-black mb-12 text-center flex items-center justify-center gap-4">
                <Trophy className="text-blitz-yellow" size={40} />
                {t.top10}
              </h2>

              <div className="space-y-4">
                {LEADERBOARD.map((player, i) => (
                  <motion.div
                    key={player.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className={`p-6 rounded-2xl flex items-center justify-between border ${
                      i === 0 ? 'bg-blitz-yellow/10 border-blitz-yellow/30 blitz-aura' : 'bg-white/5 border-white/10'
                    }`}
                  >
                    <div className="flex items-center gap-6">
                      <span className={`text-2xl font-black w-8 ${
                        i === 0 ? 'text-blitz-yellow' : i === 1 ? 'text-slate-400' : i === 2 ? 'text-amber-700' : 'text-white/20'
                      }`}>
                        {i + 1}
                      </span>
                      <div className="relative">
                        <img src={player.avatar} alt={player.name} className="w-12 h-12 rounded-full bg-white/10" />
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-bg-dark rounded-full" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg flex items-center gap-2">
                          {player.name}
                          {i === 0 && <span className="text-[10px] bg-blitz-yellow text-black px-1.5 py-0.5 rounded font-black uppercase">King</span>}
                        </h3>
                        <span className="text-xs text-white/40 uppercase tracking-widest font-bold">{t.level} {player.level}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-8">
                      <div className="text-right">
                        <div className="text-2xl font-black text-play-blue">{player.score.toLocaleString()}</div>
                        <span className="text-[10px] text-white/40 uppercase font-bold tracking-widest">Blitz Points</span>
                      </div>
                      <button className="px-4 py-2 bg-white/5 hover:bg-play-blue rounded-xl text-xs font-bold transition-all">
                        Challenge
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {page === 'profile' && (
            <motion.div
              key="profile"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-5xl mx-auto"
            >
              <div className="bg-white/5 rounded-[40px] p-12 border border-white/10 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8">
                  <div className="text-right">
                    <div className="text-5xl font-black text-blitz-yellow">LVL 42</div>
                    <div className="mt-2 h-2 w-48 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-blitz-yellow w-3/4 box-glow-yellow" />
                    </div>
                    <span className="text-xs text-white/40 mt-1 block">750 / 1000 XP bis Level 43</span>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row items-center gap-10">
                  <div className="relative">
                    <div className="w-40 h-40 rounded-full bg-play-blue/20 p-2 border-4 border-play-blue/50 box-glow-blue">
                      <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=BlitzMaster" alt="Profile" className="w-full h-full rounded-full" />
                    </div>
                    <div className="absolute -bottom-2 -right-2 bg-blitz-yellow text-black p-2 rounded-xl box-glow-yellow">
                      <Zap size={20} fill="currentColor" />
                    </div>
                  </div>
                  
                  <div className="text-center md:text-left">
                    <h2 className="text-5xl font-black mb-2">BlitzMaster</h2>
                    <p className="text-white/40 text-lg mb-6">Pro Gamer & AI Creator</p>
                    <div className="flex gap-4">
                      <div className="px-6 py-3 bg-white/5 rounded-2xl border border-white/10">
                        <div className="text-2xl font-black text-play-pink">124</div>
                        <div className="text-[10px] text-white/40 uppercase font-bold tracking-wider">{t.games}</div>
                      </div>
                      <div className="px-6 py-3 bg-white/5 rounded-2xl border border-white/10">
                        <div className="text-2xl font-black text-play-blue">12.5k</div>
                        <div className="text-[10px] text-white/40 uppercase font-bold tracking-wider">Points</div>
                      </div>
                      <div className="px-6 py-3 bg-white/5 rounded-2xl border border-white/10">
                        <div className="text-2xl font-black text-green-400">#1</div>
                        <div className="text-[10px] text-white/40 uppercase font-bold tracking-wider">Rank</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-12">
                  <div>
                    <h3 className="text-2xl font-black mb-6 flex items-center gap-3">
                      <Star className="text-blitz-yellow" size={24} />
                      {t.favoriteGames}
                    </h3>
                    <div className="space-y-4">
                      {GAMES.slice(0, 3).map(game => (
                        <div key={game.id} className="p-4 bg-white/5 rounded-2xl border border-white/5 flex items-center gap-4 hover:border-play-blue/30 transition-colors cursor-pointer">
                          <img src={game.thumbnail} className="w-16 h-12 object-cover rounded-lg" />
                          <div>
                            <div className="font-bold">{game.title}</div>
                            <div className="text-xs text-white/40">{t[game.genre]}</div>
                          </div>
                          <ChevronRight className="ml-auto text-white/20" size={20} />
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-2xl font-black mb-6 flex items-center gap-3">
                      <PlusCircle className="text-play-pink" size={24} />
                      {t.myGames}
                    </h3>
                    <div className="space-y-4">
                      {GAMES.filter(g => g.isAI).map(game => (
                        <div key={game.id} className="p-4 bg-white/5 rounded-2xl border border-white/5 flex items-center gap-4 hover:border-play-pink/30 transition-colors cursor-pointer">
                          <img src={game.thumbnail} className="w-16 h-12 object-cover rounded-lg" />
                          <div>
                            <div className="font-bold">{game.title}</div>
                            <div className="text-xs text-white/40">KI-Generiert</div>
                          </div>
                          <ChevronRight className="ml-auto text-white/20" size={20} />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {selectedGame && <GameView game={selectedGame} onClose={() => setSelectedGame(null)} />}
          {showLobby && <LobbyView onClose={() => setShowLobby(false)} />}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 py-12 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <Logo size="sm" />
          <div className="flex gap-8 text-white/40 text-sm font-bold uppercase tracking-widest">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Support</a>
            <a href="#" className="hover:text-white transition-colors">API</a>
          </div>
          <p className="text-white/20 text-xs">© 2026 BlitzPlay. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
