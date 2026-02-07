
import React from 'react';
import { Shield } from 'lucide-react';
import { Language } from '../types';

interface PrivacyProps {
  lang: Language;
  t: any;
}

const Privacy: React.FC<PrivacyProps> = ({ lang, t }) => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-20">
      <div className="text-center mb-16">
        <div className="inline-flex p-3 bg-rose-50 text-rose-500 rounded-2xl mb-4">
          <Shield size={32} />
        </div>
        <h1 className="text-4xl md:text-5xl font-elegant font-bold text-gray-900">{t.privacy}</h1>
      </div>
      
      <div className="bg-white p-10 md:p-12 rounded-[3rem] border border-rose-50 shadow-sm prose prose-rose max-w-none">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">1. Coleta de Dados</h2>
        <p className="text-gray-600 mb-8">
          Coletamos apenas as informações necessárias para a criação da sua página personalizada, como nomes, fotos enviadas e endereços de e-mail para comunicação. Suas fotos são armazenadas de forma segura e não são compartilhadas com terceiros.
        </p>
        
        <h2 className="text-2xl font-bold text-gray-900 mb-6">2. Uso de Imagens</h2>
        <p className="text-gray-600 mb-8">
          As fotos que você envia para o KIZUNA são de sua inteira propriedade. Nós as utilizamos exclusivamente para renderizar sua página. Não utilizamos suas fotos para fins publicitários sem sua autorização explícita.
        </p>

        <h2 className="text-2xl font-bold text-gray-900 mb-6">3. Segurança de Pagamento</h2>
        <p className="text-gray-600 mb-8">
          Todos os pagamentos são processados via Stripe. O KIZUNA não armazena dados de cartões de crédito em seus servidores.
        </p>

        <h2 className="text-2xl font-bold text-gray-900 mb-6">4. Cookies</h2>
        <p className="text-gray-600">
          Utilizamos cookies básicos para melhorar sua experiência de navegação e salvar suas preferências de idioma.
        </p>
      </div>
    </div>
  );
};

export default Privacy;
