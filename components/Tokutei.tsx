
import React from 'react';
import { FileText } from 'lucide-react';
import { Language } from '../types';

interface TokuteiProps {
  lang: Language;
  t: any;
}

const Tokutei: React.FC<TokuteiProps> = ({ lang, t }) => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-20 animate-in fade-in duration-700">
      <div className="text-center mb-16">
        <div className="inline-flex p-4 bg-[#f4f0f7] text-[#a47fba] rounded-2xl mb-4 shadow-sm">
          <FileText size={32} />
        </div>
        <h1 className="text-4xl md:text-5xl font-elegant font-bold text-[#30302e]">{t.tokutei}</h1>
      </div>
      
      <div className="bg-white p-8 md:p-16 rounded-[3rem] border border-[#f0eef2] shadow-sm prose prose-slate max-w-none">
        {lang === 'jp' ? (
          <div className="space-y-10">
            <section>
              <h2 className="text-xl font-bold border-b border-gray-100 pb-2 mb-4">販売業者名</h2>
              <p className="text-gray-600">KIZUNA Digital Love Project (Represented by YOU NEXT WEB)</p>
            </section>

            <section>
              <h2 className="text-xl font-bold border-b border-gray-100 pb-2 mb-4">運営責任者</h2>
              <p className="text-gray-600">運営責任者：[Inserir Nome do Responsável]</p>
            </section>

            <section>
              <h2 className="text-xl font-bold border-b border-gray-100 pb-2 mb-4">所在地</h2>
              <p className="text-gray-600">〒000-0000 東京都[Endereço Completo no Japão]</p>
            </section>

            <section>
              <h2 className="text-xl font-bold border-b border-gray-100 pb-2 mb-4">電話番号</h2>
              <p className="text-gray-600">+81 000-000-0000 (平日10:00〜18:00)</p>
            </section>

            <section>
              <h2 className="text-xl font-bold border-b border-gray-100 pb-2 mb-4">メールアドレス</h2>
              <p className="text-gray-600">atendimento@kizuna.love</p>
            </section>

            <section>
              <h2 className="text-xl font-bold border-b border-gray-100 pb-2 mb-4">販売価格</h2>
              <p className="text-gray-600">各プランの紹介ページをご参照ください。表示価格は税込です。</p>
            </section>

            <section>
              <h2 className="text-xl font-bold border-b border-gray-100 pb-2 mb-4">商品代金以外の必要料金</h2>
              <p className="text-gray-600">デジタルコンテンツのため、送料は発生しません。インターネット接続料金等は、お客様のご負担となります。</p>
            </section>

            <section>
              <h2 className="text-xl font-bold border-b border-gray-100 pb-2 mb-4">引き渡し時期</h2>
              <p className="text-gray-600">決済完了後、即時に提供されます。</p>
            </section>

            <section>
              <h2 className="text-xl font-bold border-b border-gray-100 pb-2 mb-4">お支払方法</h2>
              <p className="text-gray-600">クレジットカード決済 (Stripe)、PayPay等。</p>
            </section>

            <section>
              <h2 className="text-xl font-bold border-b border-gray-100 pb-2 mb-4">返品・交換・キャンセルについて</h2>
              <p className="text-gray-600">デジタルコンテンツの特性上、返品は承っておりませんが、万が一ご満足いただけない場合は購入後7日以内にご連絡いただければ全額返金対応をいたします。</p>
            </section>
          </div>
        ) : (
          <div className="space-y-10">
            <section>
              <h2 className="text-xl font-bold border-b border-gray-100 pb-2 mb-4">Nome do Distribuidor</h2>
              <p className="text-gray-600">KIZUNA Digital Love Project (Representado por YOU NEXT WEB)</p>
            </section>

            <section>
              <h2 className="text-xl font-bold border-b border-gray-100 pb-2 mb-4">Endereço</h2>
              <p className="text-gray-600">Tóquio, Japão [Endereço para correspondência]</p>
            </section>

            <section>
              <h2 className="text-xl font-bold border-b border-gray-100 pb-2 mb-4">Contato</h2>
              <p className="text-gray-600">E-mail: atendimento@kizuna.love | Telefone: +81 [Número de Suporte]</p>
            </section>

            <section>
              <h2 className="text-xl font-bold border-b border-gray-100 pb-2 mb-4">Preço do Serviço</h2>
              <p className="text-gray-600">Conforme indicado na página de planos. Todos os preços incluem impostos aplicáveis.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold border-b border-gray-100 pb-2 mb-4">Tempo de Entrega</h2>
              <p className="text-gray-600">O conteúdo digital é gerado e entregue instantaneamente após a confirmação do pagamento via link de e-mail e QR Code na tela.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold border-b border-gray-100 pb-2 mb-4">Métodos de Pagamento</h2>
              <p className="text-gray-600">Cartão de Crédito, PayPay e outros métodos processados via Stripe.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold border-b border-gray-100 pb-2 mb-4">Política de Reembolso</h2>
              <p className="text-gray-600">Oferecemos uma garantia de satisfação total com reembolso integral em até 7 dias após a data da compra original, mediante solicitação aos nossos canais de suporte.</p>
            </section>
          </div>
        )}
      </div>
    </div>
  );
};

export default Tokutei;
