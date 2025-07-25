
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Clock, Phone, Navigation } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Location = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.unobserve(entry.target);
      }
    }, {
      threshold: 0.1
    });

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const handleDirections = () => {
    window.open('https://maps.google.com/?q=Rua+46,+Número+60,+Maracanaú,+CE', '_blank');
  };

  const info = [
    {
      icon: MapPin,
      title: 'Endereço',
      content: 'Rua 46, Número 60\nMaracanaú/CE',
      action: 'Ver no Mapa'
    },
    {
      icon: Clock,
      title: 'Horário de Funcionamento',
      content: 'Segunda a Sexta: 8h às 18h\nSábado: 8h às 12h',
      action: null
    },
    {
      icon: Phone,
      title: 'Atendimento',
      content: '(85) 98586-0811',
      action: 'Ligar Agora'
    }
  ];

  return (
    <section id="localizacao" ref={sectionRef} className="py-20 bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Nossa <span className="text-cyan-400">Localização</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto">
            Venha nos visitar ou entre em contato para agendar uma visita técnica gratuita.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Information */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            {info.map((item, index) => (
              <div key={index} className="bg-slate-800/50 rounded-2xl p-6 hover:shadow-lg transition-shadow duration-300 border border-slate-700">
                <div className="flex items-start space-x-4">
                  <div className="bg-cyan-600/20 rounded-xl p-3 flex-shrink-0">
                    <item.icon className="h-6 w-6 text-cyan-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                    <p className="text-gray-300 whitespace-pre-line mb-3">{item.content}</p>
                    {item.action && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-cyan-400 text-cyan-400 hover:bg-cyan-600 hover:text-white"
                        onClick={item.title === 'Endereço' ? handleDirections : () => window.open('tel:+5585985860811')}
                      >
                        {item.action}
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="bg-gradient-to-br from-slate-800 to-gray-800 rounded-2xl p-6 text-white border border-slate-700"
            >
              <h3 className="text-xl font-bold mb-4">Visita Técnica Gratuita</h3>
              <p className="text-gray-300 mb-4">
                Oferecemos visita técnica gratuita para avaliar suas necessidades 
                e apresentar a melhor solução em equipamentos de segurança.
              </p>
              <Button
                onClick={() => window.open('https://wa.me/5585985860811?text=Olá!%20Gostaria%20de%20agendar%20uma%20visita%20técnica%20gratuita.', '_blank')}
                className="bg-green-600 hover:bg-green-700 text-white w-full"
              >
                <Navigation className="h-4 w-4 mr-2" />
                Agendar Visita
              </Button>
            </motion.div>
          </motion.div>

          {/* Map */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            <div className="bg-slate-800 rounded-2xl overflow-hidden shadow-lg h-96 lg:h-[500px] border border-slate-700">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3981.4647732448944!2d-38.6208!3d-3.8777!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x7c74fad7c9a9c9f%3A0x1234567890abcdef!2sRua%2046%2C%2060%20-%20Maracana%C3%BA%2C%20CE!5e0!3m2!1spt-BR!2sbr!4v1640000000000!5m2!1spt-BR!2sbr"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Localização Master Equipamentos de Segurança - Maracanaú/CE"
              ></iframe>
            </div>
            <div className="absolute bottom-4 left-4 right-4">
              <div className="bg-slate-800/95 backdrop-blur-sm rounded-lg p-4 shadow-lg border border-slate-700">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold text-white">Master Equipamentos</h4>
                    <p className="text-sm text-gray-300">Rua 46, Número 60 - Maracanaú/CE</p>
                  </div>
                  <Button
                    size="sm"
                    onClick={handleDirections}
                    className="bg-cyan-600 hover:bg-cyan-700 text-white"
                  >
                    <Navigation className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Location;
