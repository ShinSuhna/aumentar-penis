import { MessageCircle, Star, Eye, X } from 'lucide-react';
import { useState, useEffect } from 'react';

interface Notification {
  id: number;
  name: string;
  city: string;
  time: string;
}

const cities = ['Maputo', 'Beira', 'Nampula', 'Quelimane', 'Tete', 'Chimoio', 'Nacala', 'Pemba'];
const names = [
  'João M.', 'Carlos S.', 'Manuel T.', 'António F.', 'Francisco N.',
  'Pedro L.', 'José R.', 'Armando C.', 'Luis P.', 'Fernando A.'
];

function App() {
  const [views, setViews] = useState(423);
  const [productsLeft, setProductsLeft] = useState(22);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 59,
    seconds: 59
  });

  useEffect(() => {
    const viewInterval = setInterval(() => {
      setViews(prev => {
        const increment = Math.random() > 0.5 ? 1 : 0;
        const newViews = prev + increment;
        return newViews > 1800 ? 1800 : newViews;
      });
    }, Math.random() * 3000 + 2000);

    return () => clearInterval(viewInterval);
  }, []);

  useEffect(() => {
    const productInterval = setInterval(() => {
      setProductsLeft(prev => {
        if (prev > 3) {
          return prev - 1;
        }
        return prev;
      });
    }, Math.random() * 15000 + 10000);

    return () => clearInterval(productInterval);
  }, []);

  useEffect(() => {
    const notificationInterval = setInterval(() => {
      const randomName = names[Math.floor(Math.random() * names.length)];
      const randomCity = cities[Math.floor(Math.random() * cities.length)];
      const minutesAgo = Math.floor(Math.random() * 5) + 1;

      const newNotification: Notification = {
        id: Date.now(),
        name: randomName,
        city: randomCity,
        time: `${minutesAgo} min atrás`
      };

      setNotifications(prev => [...prev, newNotification]);

      setTimeout(() => {
        setNotifications(prev => prev.filter(n => n.id !== newNotification.id));
      }, 5000);
    }, 10000);

    return () => clearInterval(notificationInterval);
  }, []);

  useEffect(() => {
    const timerInterval = setInterval(() => {
      setTimeLeft(prev => {
        let { hours, minutes, seconds } = prev;

        if (seconds > 0) {
          seconds--;
        } else if (minutes > 0) {
          minutes--;
          seconds = 59;
        } else if (hours > 0) {
          hours--;
          minutes = 59;
          seconds = 59;
        } else {
          hours = 23;
          minutes = 59;
          seconds = 59;
        }

        return { hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timerInterval);
  }, []);

  const removeNotification = (id: number) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="fixed bottom-4 left-4 z-50 space-y-2">
        {notifications.map(notification => (
          <div
            key={notification.id}
            className="bg-white border-2 border-green-600 rounded-lg shadow-xl p-4 min-w-[280px] animate-slide-in"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <p className="font-bold text-gray-900 text-sm">Compra confirmada!</p>
                </div>
                <p className="text-sm text-gray-700">
                  <span className="font-semibold">{notification.name}</span> de {notification.city}
                </p>
                <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
              </div>
              <button
                onClick={() => removeNotification(notification.id)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-gradient-to-r from-green-700 via-red-700 to-green-700 text-white py-4 text-center">
        <div className="text-2xl mb-2">🇲🇿</div>
        <div className="text-sm font-semibold mb-2">Promoção válida para Moçambique por:</div>
        <div className="flex justify-center gap-2 text-xl font-bold">
          <div className="bg-black/30 px-3 py-1 rounded">
            {String(timeLeft.hours).padStart(2, '0')}h
          </div>
          <div className="bg-black/30 px-3 py-1 rounded">
            {String(timeLeft.minutes).padStart(2, '0')}m
          </div>
          <div className="bg-black/30 px-3 py-1 rounded">
            {String(timeLeft.seconds).padStart(2, '0')}s
          </div>
        </div>
        <div className="mt-3 text-sm">
          <span className="bg-red-600 px-3 py-1 rounded-full font-bold animate-pulse">
            Apenas {productsLeft} unidades restantes!
          </span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight mb-4">
            🚨 URGENTE: Nutricionista revela fórmula natural para ganhar 5 cm em 7 dias
          </h1>
          <p className="text-lg md:text-xl text-gray-700 font-semibold mb-4">
            Sem cirurgia. Sem exercícios. Sem cremes.
          </p>
          <div className="mt-4 text-sm text-gray-500">
            Publicado hoje | Saúde & Bem-estar
          </div>
        </header>

        <article className="prose prose-lg max-w-none">
          <div className="bg-gray-100 p-6 rounded-lg mb-8 text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Eye className="w-5 h-5 text-red-600 animate-pulse" />
              <p className="text-red-600 font-bold">
                {views.toLocaleString()} pessoas assistindo agora
              </p>
            </div>
            <p className="text-gray-700 font-semibold mb-4">
              Veja no vídeo abaixo como o método funciona:
            </p>
            <div className="mb-6 relative">
              <div className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded z-10 flex items-center gap-1">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                AO VIVO
              </div>
              <div dangerouslySetInnerHTML={{__html: `
                <script type="text/javascript">
                var s=document.createElement("script");
                s.src="https://scripts.converteai.net/lib/js/smartplayer-wc/v4/sdk.js",
                s.async=!0,document.head.appendChild(s);
                </script>
                <div id="ifr_68ee9cf66dfe4cfd1083c855_wrapper" style="margin: 0 auto; width: 100%; max-width: 400px;">
                  <div style="position: relative; padding: 177.77777777777777% 0 0 0;" id="ifr_68ee9cf66dfe4cfd1083c855_aspect">
                    <iframe frameborder="0" allowfullscreen src="about:blank" id="ifr_68ee9cf66dfe4cfd1083c855" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" referrerpolicy="origin" onload="this.onload=null, this.src='https://scripts.converteai.net/bf7b07ce-7f37-4cc0-baf1-0d1b3e8d08c7/players/68ee9cf66dfe4cfd1083c855/v4/embed.html'+(location.search||'?')+'&vl='+encodeURIComponent(location.href)"></iframe>
                  </div>
                </div>
              `}} />
            </div>
            <a
              href="https://pay.lojou.app/p/6f5WV"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-green-600 hover:bg-green-700 text-white font-bold text-lg px-8 py-4 rounded-full transition-all transform hover:scale-105 shadow-lg"
            >
              👉 Adquirir Agora
            </a>
          </div>

          <div className="my-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 text-center">
              O que homens moçambicanos estão dizendo
            </h2>

            <div className="space-y-6">
              <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                <div className="flex items-start gap-3 mb-3">
                  <img
                    src="https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop"
                    alt="Manuel Zefanias"
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-bold text-gray-900">Manuel Zefanias</p>
                    <p className="text-sm text-gray-500">Beira</p>
                  </div>
                </div>
                <div className="flex gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 leading-relaxed">
                  "No início achei que era mentira, mas em 2 semanas já comecei a notar diferença. Nunca mais me senti inseguro com minha parceira!"
                </p>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                <div className="flex items-start gap-3 mb-3">
                  <img
                    src="https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop"
                    alt="Carlos M."
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-bold text-gray-900">Carlos M.</p>
                    <p className="text-sm text-gray-500">Maputo</p>
                  </div>
                </div>
                <div className="flex gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 leading-relaxed">
                  "Sem exercícios, sem dor e sem remédios. Só seguindo o que o médico ensina. Estou muito satisfeito com o resultado!"
                </p>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                <div className="flex items-start gap-3 mb-3">
                  <img
                    src="https://images.pexels.com/photos/4307678/pexels-photo-4307678.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop"
                    alt="João Tomé"
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-bold text-gray-900">João Tomé</p>
                    <p className="text-sm text-gray-500">Nampula</p>
                  </div>
                </div>
                <div className="flex gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 leading-relaxed">
                  "Eu e minha esposa estamos mais felizes do que nunca. Recomendo a todos que têm vergonha de falar sobre isso."
                </p>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                <div className="flex items-start gap-3 mb-3">
                  <img
                    src="https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop"
                    alt="Armando N."
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-bold text-gray-900">Armando N.</p>
                    <p className="text-sm text-gray-500">Quelimane</p>
                  </div>
                </div>
                <div className="flex gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 leading-relaxed">
                  "Sinceramente, vale cada metical. E o melhor é que ninguém precisa saber o que você está usando."
                </p>
              </div>
            </div>
          </div>

          <div className="bg-red-50 border-2 border-red-700 rounded-lg p-8 my-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">
              ⚠️ Atenção: Vagas Limitadas
            </h3>
            <p className="text-gray-800 leading-relaxed mb-4 text-center">
              Devido à alta procura e ao limite de kits disponíveis por mês, o acesso ao método está sendo controlado. Os especialistas recomendam garantir sua vaga enquanto ainda há disponibilidade.
            </p>
            <p className="text-gray-800 leading-relaxed mb-6 text-center">
              O método é <strong>100% seguro, natural e discreto</strong>. Ninguém precisa saber. Você recebe tudo de forma confidencial e começa a seguir o protocolo no mesmo dia.
            </p>
            <p className="text-xl font-bold text-center text-gray-900 mb-6">
              Clique no botão abaixo e veja como esse método tem transformado a confiança dos homens moçambicanos.
            </p>
            <div className="text-center">
              <a
                href="https://pay.lojou.app/p/6f5WV"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-green-600 hover:bg-green-700 text-white font-bold text-xl px-10 py-5 rounded-full transition-all transform hover:scale-105 shadow-xl animate-pulse"
              >
                👉 Adquirir Agora
              </a>
              <p className="text-sm text-gray-600 mt-4">
                Acesso imediato após a confirmação do pagamento
              </p>
            </div>
          </div>
        </article>

        <footer className="mt-12 pt-8 border-t border-gray-200 text-center text-sm text-gray-500">
          <p>Este conteúdo é de caráter informativo.</p>
          <p className="mt-2">Resultados podem variar de pessoa para pessoa.</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
