'use client';

import { useState } from 'react';
import Layout from '@/components/layout/Layout';
import Section from '@/components/sections/Section';
import InputField from '@/components/forms/InputField';
import CheckboxField from '@/components/forms/CheckboxField';
import RadioField from '@/components/forms/RadioField';
import Button from '@/components/ui/Button';
import ServiceCard from '@/components/ui/ServiceCard';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

// Esquema de validação com Zod
const constructorSchema = z.object({
  name: z.string().min(3, { message: 'Nome é obrigatório (mínimo 3 caracteres)' }),
  email: z.string().email({ message: 'Email inválido' }),
  phone: z.string().min(10, { message: 'Telefone inválido' }),
  company: z.string().optional(),
  message: z.string().optional(),
  paymentMethod: z.enum(['credit', 'debit', 'pix', 'transfer'], {
    message: 'Selecione uma forma de pagamento',
  }),
  supportPeriod: z.enum(['monthly', 'quarterly', 'yearly'], {
    message: 'Selecione um período de suporte',
  }).optional(),
});

type ConstructorFormData = z.infer<typeof constructorSchema>;

export default function Construtor() {
  // Estado para o plano selecionado
  const [selectedPlan, setSelectedPlan] = useState<{
    id: string;
    name: string;
    price: number;
  } | null>(null);

  // Estado para serviços selecionados
  const [selectedServices, setSelectedServices] = useState<Array<{
    id: string;
    name: string;
    price: number;
    isSupport: boolean;
  }>>([]);

  // Estado para mostrar/esconder opções de periodicidade de suporte
  const [showSupportPeriod, setShowSupportPeriod] = useState(false);

  // Configuração do React Hook Form com validação Zod
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<ConstructorFormData>({
    resolver: zodResolver(constructorSchema),
    defaultValues: {
      paymentMethod: 'pix',
      supportPeriod: 'monthly',
    },
  });

  // Observar mudanças no método de pagamento
  const paymentMethod = watch('paymentMethod');

  // Calcular preço total
  const calculateTotal = () => {
    let total = selectedPlan ? selectedPlan.price : 0;
    
    selectedServices.forEach(service => {
      total += service.price;
    });
    
    return total;
  };

  // Selecionar um plano
  const handleSelectPlan = (plan: { id: string; name: string; price: number }) => {
    setSelectedPlan(plan);
  };

  // Adicionar ou remover um serviço
  const handleToggleService = (service: { id: string; name: string; price: number; isSupport: boolean }) => {
    const exists = selectedServices.some(s => s.id === service.id);
    
    if (exists) {
      setSelectedServices(selectedServices.filter(s => s.id !== service.id));
    } else {
      setSelectedServices([...selectedServices, service]);
    }
    
    // Verificar se há algum serviço de suporte selecionado
    const hasSupport = [...selectedServices, service].some(s => s.isSupport && s.id !== service.id) || 
                      (service.isSupport && !exists);
    
    setShowSupportPeriod(hasSupport);
  };

  // Enviar formulário
  const onSubmit = (data: ConstructorFormData) => {
    // Formatar mensagem para WhatsApp
    let message = `*ORÇAMENTO - KOLIBRA SOLUTIONS*\n\n`;
    message += `*Nome:* ${data.name}\n`;
    message += `*Email:* ${data.email}\n`;
    message += `*Telefone:* ${data.phone}\n`;
    message += `*Empresa:* ${data.company || 'Não informado'}\n`;
    message += `*Plano:* ${selectedPlan ? selectedPlan.name : 'Nenhum plano selecionado'}\n`;
    message += `*Serviços:* ${selectedServices.map(service => service.name).join(', ') || 'Nenhum serviço selecionado'}\n`;
    message += `*Total:* R$ ${calculateTotal().toFixed(2)}\n`;
    message += `*Forma de Pagamento:* ${data.paymentMethod === 'credit' ? 'Cartão de Crédito' : 
                                      data.paymentMethod === 'debit' ? 'Cartão de Débito' : 
                                      data.paymentMethod === 'pix' ? 'PIX' : 'Transferência Bancária'}\n`;
    
    if (showSupportPeriod && data.supportPeriod) {
      message += `*Periodicidade de Suporte:* ${data.supportPeriod === 'monthly' ? 'Mensal' : 
                                              data.supportPeriod === 'quarterly' ? 'Trimestral' : 'Anual'}\n`;
    }
    
    if (data.message) {
      message += `\n*Mensagem:*\n${data.message}\n`;
    }
    
    // Número de telefone para onde a mensagem será enviada (formato internacional)
    const phoneNumber = '5535999796570'; // Número da Kolibra
    
    // URL do WhatsApp
    const whatsappURL = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;
    
    // Abrir o WhatsApp em uma nova aba
    window.open(whatsappURL, '_blank');
  };

  return (
    <Layout>
      {/* Header da Página */}
      <div className="bg-primary text-white pt-32 pb-16 relative">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">Construtor de Pacotes</h1>
            <p className="text-xl opacity-90 mb-8">
              Monte seu plano personalizado de acordo com as necessidades do seu negócio
            </p>
          </div>
        </div>
        
        {/* Curved bottom */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden">
          <svg
            className="relative block w-full h-16 md:h-24"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 100"
            preserveAspectRatio="none"
          >
            <path
              fill="#ffffff"
              d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,100L1360,100C1280,100,1120,100,960,100C800,100,640,100,480,100C320,100,160,100,80,100L0,100Z"
            ></path>
          </svg>
        </div>
      </div>

      {/* Construtor de Pacotes */}
      <Section
        title="Monte seu Pacote Personalizado"
        subtitle="Escolha um plano base e adicione os serviços que melhor atendem às necessidades do seu negócio"
        bgColor="white"
        id="builder"
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Coluna da Esquerda - Seleção de Planos e Serviços */}
          <div className="lg:col-span-2 space-y-8">
            {/* Seleção de Plano Base */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-bold text-primary mb-6 pb-2 border-b border-gray-200">
                Escolha seu Pacote Base
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div 
                  className={`
                    p-6 border-2 rounded-lg cursor-pointer transition-all
                    ${selectedPlan?.id === 'custom' 
                      ? 'border-secondary bg-orange-50' 
                      : 'border-gray-200 hover:border-gray-300'
                    }
                  `}
                  onClick={() => handleSelectPlan({ id: 'custom', name: 'Personalizado', price: 0 })}
                >
                  <h4 className="font-bold text-lg mb-1">Crie seu pacote</h4>
                  <p className="text-secondary font-semibold mb-3">Personalizado</p>
                  <ul className="space-y-2 text-sm text-gray-600 mb-4">
                    <li className="flex items-start">
                      <svg className="w-4 h-4 text-secondary mt-0.5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      <span>Serviços avulsos</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-4 h-4 text-secondary mt-0.5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      <span>Pague apenas pelo que precisar</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-4 h-4 text-secondary mt-0.5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      <span>Sem compromisso mensal</span>
                    </li>
                  </ul>
                </div>
                
                <div 
                  className={`
                    p-6 border-2 rounded-lg cursor-pointer transition-all
                    ${selectedPlan?.id === 'starter' 
                      ? 'border-secondary bg-orange-50' 
                      : 'border-gray-200 hover:border-gray-300'
                    }
                  `}
                  onClick={() => handleSelectPlan({ id: 'starter', name: 'PACOTE BASIC', price: 199.90 })}
                >
                  <h4 className="font-bold text-lg mb-1">PACOTE BASIC</h4>
                  <p className="text-secondary font-semibold mb-3">R$ 199,90/mês</p>
                  <ul className="space-y-2 text-sm text-gray-600 mb-4">
                    <li className="flex items-start">
                      <svg className="w-4 h-4 text-secondary mt-0.5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      <span>Identidade Visual Básica</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-4 h-4 text-secondary mt-0.5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      <span>Foco em Instagram</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-4 h-4 text-secondary mt-0.5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      <span>Gestão de 1 Rede Social</span>
                    </li>
                  </ul>
                </div>
                
                <div 
                  className={`
                    p-6 border-2 rounded-lg cursor-pointer transition-all
                    ${selectedPlan?.id === 'business' 
                      ? 'border-secondary bg-orange-50' 
                      : 'border-gray-200 hover:border-gray-300'
                    }
                  `}
                  onClick={() => handleSelectPlan({ id: 'business', name: 'PACOTE STARTER', price: 399.90 })}
                >
                  <h4 className="font-bold text-lg mb-1">PACOTE STARTER</h4>
                  <p className="text-secondary font-semibold mb-3">R$ 399,90/mês</p>
                  <ul className="space-y-2 text-sm text-gray-600 mb-4">
                    <li className="flex items-start">
                      <svg className="w-4 h-4 text-secondary mt-0.5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      <span>Identidade Visual Completa</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-4 h-4 text-secondary mt-0.5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      <span>Site Institucional (10 páginas)</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-4 h-4 text-secondary mt-0.5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      <span>3 Redes Sociais</span>
                    </li>
                  </ul>
                </div>
                
                <div 
                  className={`
                    p-6 border-2 rounded-lg cursor-pointer transition-all
                    ${selectedPlan?.id === 'premium' 
                      ? 'border-secondary bg-orange-50' 
                      : 'border-gray-200 hover:border-gray-300'
                    }
                  `}
                  onClick={() => handleSelectPlan({ id: 'premium', name: 'PACOTE PREMIUM', price: 799.90 })}
                >
                  <h4 className="font-bold text-lg mb-1">PACOTE PREMIUM</h4>
                  <p className="text-secondary font-semibold mb-3">R$ 799,90/mês</p>
                  <ul className="space-y-2 text-sm text-gray-600 mb-4">
                    <li className="flex items-start">
                      <svg className="w-4 h-4 text-secondary mt-0.5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      <span>Identidade Visual Premium</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-4 h-4 text-secondary mt-0.5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      <span>Site Institucional (15+ páginas)</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-4 h-4 text-secondary mt-0.5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      <span>Todas as Redes Sociais</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-4 h-4 text-secondary mt-0.5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      <span>E-commerce Básico</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            
            {/* Serviços Adicionais */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-bold text-primary mb-6 pb-2 border-b border-gray-200">
                Adicione Serviços
              </h3>
              
              {/* Categoria Branding */}
              <div className="mb-6">
                <div className="flex justify-between items-center bg-gray-100 p-4 rounded-lg mb-4">
                  <h4 className="font-semibold flex items-center">
                    <svg className="w-5 h-5 mr-2 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"></path>
                    </svg>
                    Branding
                  </h4>
                </div>
                
                <div className="space-y-4 pl-4">
                  <div className="flex justify-between items-center p-4 border border-gray-200 rounded-lg">
                    <div>
                      <h5 className="font-medium">Logo</h5>
                      <p className="text-sm text-gray-600 mb-1">Criação de logo profissional para sua marca.</p>
                      <p className="text-secondary font-semibold">R$ 100,00</p>
                    </div>
                    <button 
                      className={`
                        w-10 h-10 rounded-full flex items-center justify-center
                        ${selectedServices.some(s => s.id === 'logo') 
                          ? 'bg-secondary text-white' 
                          : 'bg-primary text-white hover:bg-primary-dark'
                        }
                      `}
                      onClick={() => handleToggleService({
                        id: 'logo',
                        name: 'Logo',
                        price: 100,
                        isSupport: false
                      })}
                      aria-label={selectedServices.some(s => s.id === 'logo') ? "Remover Logo" : "Adicionar Logo"}
                    >
                      {selectedServices.some(s => s.id === 'logo') 
                        ? <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                          </svg>
                        : <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                          </svg>
                      }
                    </button>
                  </div>
                  
                  <div className="flex justify-between items-center p-4 border border-gray-200 rounded-lg">
                    <div>
                      <h5 className="font-medium">Branding Profissional</h5>
                      <p className="text-sm text-gray-600 mb-1">Identidade visual completa, incluindo logo, cores, tipografia e aplicações.</p>
                      <p className="text-secondary font-semibold">R$ 300,00</p>
                    </div>
                    <button 
                      className={`
                        w-10 h-10 rounded-full flex items-center justify-center
                        ${selectedServices.some(s => s.id === 'branding_pro') 
                          ? 'bg-secondary text-white' 
                          : 'bg-primary text-white hover:bg-primary-dark'
                        }
                      `}
                      onClick={() => handleToggleService({
                        id: 'branding_pro',
                        name: 'Branding Profissional',
                        price: 300,
                        isSupport: false
                      })}
                      aria-label={selectedServices.some(s => s.id === 'branding_pro') ? "Remover Branding Profissional" : "Adicionar Branding Profissional"}
                    >
                      {selectedServices.some(s => s.id === 'branding_pro') 
                        ? <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                          </svg>
                        : <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                          </svg>
                      }
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Categoria Web */}
              <div className="mb-6">
                <div className="flex justify-between items-center bg-gray-100 p-4 rounded-lg mb-4">
                  <h4 className="font-semibold flex items-center">
                    <svg className="w-5 h-5 mr-2 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"></path>
                    </svg>
                    Web
                  </h4>
                </div>
                
                <div className="space-y-4 pl-4">
                  <div className="flex justify-between items-center p-4 border border-gray-200 rounded-lg">
                    <div>
                      <h5 className="font-medium">Site Básico</h5>
                      <p className="text-sm text-gray-600 mb-1">Site simples com até 5 páginas para apresentar seu negócio.</p>
                      <p className="text-secondary font-semibold">R$ 300,00</p>
                    </div>
                    <button 
                      className={`
                        w-10 h-10 rounded-full flex items-center justify-center
                        ${selectedServices.some(s => s.id === 'basic_site') 
                          ? 'bg-secondary text-white' 
                          : 'bg-primary text-white hover:bg-primary-dark'
                        }
                      `}
                      onClick={() => handleToggleService({
                        id: 'basic_site',
                        name: 'Site Básico',
                        price: 300,
                        isSupport: false
                      })}
                      aria-label={selectedServices.some(s => s.id === 'basic_site') ? "Remover Site Básico" : "Adicionar Site Básico"}
                    >
                      {selectedServices.some(s => s.id === 'basic_site') 
                        ? <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                          </svg>
                        : <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                          </svg>
                      }
                    </button>
                  </div>
                  
                  <div className="flex justify-between items-center p-4 border border-gray-200 rounded-lg">
                    <div>
                      <h5 className="font-medium">Landing Page</h5>
                      <p className="text-sm text-gray-600 mb-1">Página de conversão otimizada para campanhas específicas.</p>
                      <p className="text-secondary font-semibold">R$ 300,00</p>
                    </div>
                    <button 
                      className={`
                        w-10 h-10 rounded-full flex items-center justify-center
                        ${selectedServices.some(s => s.id === 'landing_page') 
                          ? 'bg-secondary text-white' 
                          : 'bg-primary text-white hover:bg-primary-dark'
                        }
                      `}
                      onClick={() => handleToggleService({
                        id: 'landing_page',
                        name: 'Landing Page',
                        price: 300,
                        isSupport: false
                      })}
                      aria-label={selectedServices.some(s => s.id === 'landing_page') ? "Remover Landing Page" : "Adicionar Landing Page"}
                    >
                      {selectedServices.some(s => s.id === 'landing_page') 
                        ? <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                          </svg>
                        : <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                          </svg>
                      }
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Categoria Suporte */}
              <div>
                <div className="flex justify-between items-center bg-gray-100 p-4 rounded-lg mb-4">
                  <h4 className="font-semibold flex items-center">
                    <svg className="w-5 h-5 mr-2 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"></path>
                    </svg>
                    Suporte
                  </h4>
                </div>
                
                <div className="space-y-4 pl-4">
                  <div className="flex justify-between items-center p-4 border border-gray-200 rounded-lg">
                    <div>
                      <h5 className="font-medium">Suporte Básico</h5>
                      <p className="text-sm text-gray-600 mb-1">Suporte para negócios de segmento, criação de postagens para Instagram e auxílio para crescimento.</p>
                      <p className="text-secondary font-semibold">R$ 25,00/mês</p>
                    </div>
                    <button 
                      className={`
                        w-10 h-10 rounded-full flex items-center justify-center
                        ${selectedServices.some(s => s.id === 'basic_support') 
                          ? 'bg-secondary text-white' 
                          : 'bg-primary text-white hover:bg-primary-dark'
                        }
                      `}
                      onClick={() => handleToggleService({
                        id: 'basic_support',
                        name: 'Suporte Básico',
                        price: 25,
                        isSupport: true
                      })}
                      aria-label={selectedServices.some(s => s.id === 'basic_support') ? "Remover Suporte Básico" : "Adicionar Suporte Básico"}
                    >
                      {selectedServices.some(s => s.id === 'basic_support') 
                        ? <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                          </svg>
                        : <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                          </svg>
                      }
                    </button>
                  </div>
                  
                  <div className="flex justify-between items-center p-4 border border-gray-200 rounded-lg">
                    <div>
                      <h5 className="font-medium">Suporte para Redes Sociais</h5>
                      <p className="text-sm text-gray-600 mb-1">Suporte para postagens em redes sociais e ajuda no direcionamento estratégico.</p>
                      <p className="text-secondary font-semibold">R$ 40,00/mês</p>
                    </div>
                    <button 
                      className={`
                        w-10 h-10 rounded-full flex items-center justify-center
                        ${selectedServices.some(s => s.id === 'social_support') 
                          ? 'bg-secondary text-white' 
                          : 'bg-primary text-white hover:bg-primary-dark'
                        }
                      `}
                      onClick={() => handleToggleService({
                        id: 'social_support',
                        name: 'Suporte para Redes Sociais',
                        price: 40,
                        isSupport: true
                      })}
                      aria-label={selectedServices.some(s => s.id === 'social_support') ? "Remover Suporte para Redes Sociais" : "Adicionar Suporte para Redes Sociais"}
                    >
                      {selectedServices.some(s => s.id === 'social_support') 
                        ? <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                          </svg>
                        : <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                          </svg>
                      }
                    </button>
                  </div>
                  
                  <div className="flex justify-between items-center p-4 border border-gray-200 rounded-lg">
                    <div>
                      <h5 className="font-medium">Suporte para Site</h5>
                      <p className="text-sm text-gray-600 mb-1">Alterações ilimitadas para sites avançados, trocas de valores e adição de novos elementos.</p>
                      <p className="text-secondary font-semibold">R$ 50,00/mês</p>
                    </div>
                    <button 
                      className={`
                        w-10 h-10 rounded-full flex items-center justify-center
                        ${selectedServices.some(s => s.id === 'site_support') 
                          ? 'bg-secondary text-white' 
                          : 'bg-primary text-white hover:bg-primary-dark'
                        }
                      `}
                      onClick={() => handleToggleService({
                        id: 'site_support',
                        name: 'Suporte para Site',
                        price: 50,
                        isSupport: true
                      })}
                      aria-label={selectedServices.some(s => s.id === 'site_support') ? "Remover Suporte para Site" : "Adicionar Suporte para Site"}
                    >
                      {selectedServices.some(s => s.id === 'site_support') 
                        ? <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                          </svg>
                        : <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                          </svg>
                      }
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Coluna da Direita - Resumo e Formulário */}
          <div>
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <h3 className="text-xl font-bold text-primary mb-6 pb-2 border-b border-gray-200">
                Resumo do Pedido
              </h3>
              
              {/* Plano Selecionado */}
              <div className="mb-6">
                <h4 className="font-semibold text-primary mb-3">Plano Selecionado</h4>
                {selectedPlan ? (
                  <div className="bg-gray-100 p-4 rounded-lg">
                    <p className="font-medium">{selectedPlan.name}</p>
                    <p className="text-secondary font-semibold">
                      {selectedPlan.price > 0 ? `R$ ${selectedPlan.price.toFixed(2)}` : 'Personalizado'}
                    </p>
                  </div>
                ) : (
                  <div className="bg-gray-100 p-4 rounded-lg text-gray-500 italic text-center">
                    Nenhum plano selecionado
                  </div>
                )}
              </div>
              
              {/* Serviços Selecionados */}
              <div className="mb-6">
                <h4 className="font-semibold text-primary mb-3">Serviços Adicionados</h4>
                {selectedServices.length > 0 ? (
                  <div className="space-y-3">
                    {selectedServices.map(service => (
                      <div key={service.id} className="bg-gray-100 p-3 rounded-lg flex justify-between items-center">
                        <div>
                          <p className="font-medium">{service.name}</p>
                          <p className="text-secondary font-semibold">R$ {service.price.toFixed(2)}</p>
                        </div>
                        <button 
                          className="w-6 h-6 rounded-full bg-red-100 text-red-500 flex items-center justify-center hover:bg-red-200"
                          onClick={() => handleToggleService(service)}
                          aria-label={`Remover ${service.name}`}
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-gray-100 p-4 rounded-lg text-gray-500 italic text-center">
                    Nenhum serviço adicionado
                  </div>
                )}
              </div>
              
              {/* Periodicidade de Suporte (se aplicável) */}
              {showSupportPeriod && (
                <div className="mb-6">
                  <h4 className="font-semibold text-primary mb-3">Periodicidade de Suporte</h4>
                  <div className="space-y-2">
                    <RadioField
                      id="monthly"
                      name="supportPeriod"
                      label="Mensal"
                      value="monthly"
                      checked={watch('supportPeriod') === 'monthly'}
                      onChange={(value) => setValue('supportPeriod', value as 'monthly' | 'quarterly' | 'yearly')}
                    />
                    <RadioField
                      id="quarterly"
                      name="supportPeriod"
                      label="Trimestral (10% de desconto)"
                      value="quarterly"
                      checked={watch('supportPeriod') === 'quarterly'}
                      onChange={(value) => setValue('supportPeriod', value as 'monthly' | 'quarterly' | 'yearly')}
                    />
                    <RadioField
                      id="yearly"
                      name="supportPeriod"
                      label="Anual (20% de desconto)"
                      value="yearly"
                      checked={watch('supportPeriod') === 'yearly'}
                      onChange={(value) => setValue('supportPeriod', value as 'monthly' | 'quarterly' | 'yearly')}
                    />
                  </div>
                </div>
              )}
              
              {/* Forma de Pagamento */}
              <div className="mb-6">
                <h4 className="font-semibold text-primary mb-3">Forma de Pagamento</h4>
                <div className="space-y-2">
                  <RadioField
                    id="pix"
                    name="paymentMethod"
                    label="PIX"
                    value="pix"
                    checked={paymentMethod === 'pix'}
                    onChange={(value) => setValue('paymentMethod', value as 'credit' | 'debit' | 'pix' | 'transfer')}
                    error={errors.paymentMethod?.message}
                  />
                  <RadioField
                    id="credit"
                    name="paymentMethod"
                    label="Cartão de Crédito"
                    value="credit"
                    checked={paymentMethod === 'credit'}
                    onChange={(value) => setValue('paymentMethod', value as 'credit' | 'debit' | 'pix' | 'transfer')}
                  />
                  <RadioField
                    id="debit"
                    name="paymentMethod"
                    label="Cartão de Débito"
                    value="debit"
                    checked={paymentMethod === 'debit'}
                    onChange={(value) => setValue('paymentMethod', value as 'credit' | 'debit' | 'pix' | 'transfer')}
                  />
                  <RadioField
                    id="transfer"
                    name="paymentMethod"
                    label="Transferência Bancária"
                    value="transfer"
                    checked={paymentMethod === 'transfer'}
                    onChange={(value) => setValue('paymentMethod', value as 'credit' | 'debit' | 'pix' | 'transfer')}
                  />
                </div>
              </div>
              
              {/* Total */}
              <div className="mb-6">
                <div className="flex justify-between items-center py-3 border-t border-b border-gray-200">
                  <span className="font-bold text-lg">Total:</span>
                  <span className="font-bold text-xl text-secondary">R$ {calculateTotal().toFixed(2)}</span>
                </div>
              </div>
              
              {/* Formulário de Contato */}
              <form onSubmit={handleSubmit(onSubmit)}>
                <h4 className="font-semibold text-primary mb-3">Seus Dados</h4>
                
                <InputField
                  id="name"
                  label="Nome"
                  placeholder="Seu nome completo"
                  required
                  error={errors.name?.message}
                  {...register('name')}
                />
                
                <InputField
                  id="email"
                  label="Email"
                  type="email"
                  placeholder="seu@email.com"
                  required
                  error={errors.email?.message}
                  {...register('email')}
                />
                
                <InputField
                  id="phone"
                  label="Telefone"
                  placeholder="(00) 00000-0000"
                  required
                  error={errors.phone?.message}
                  {...register('phone')}
                />
                
                <InputField
                  id="company"
                  label="Empresa"
                  placeholder="Nome da sua empresa (opcional)"
                  {...register('company')}
                />
                
                <div className="mb-6">
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Mensagem (opcional)
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    className="block w-full px-4 py-3 rounded-md border border-gray-300 focus:border-primary focus:ring-primary focus:outline-none focus:ring-2 focus:ring-opacity-50"
                    placeholder="Informações adicionais sobre seu projeto..."
                    {...register('message')}
                  ></textarea>
                </div>
                
                <Button
                  type="submit"
                  variant="secondary"
                  fullWidth
                  className="flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.498 14.382c-.301-.15-1.767-.867-2.04-.966-.273-.101-.473-.15-.673.15-.197.295-.771.964-.944 1.162-.175.195-.349.21-.646.075-.3-.15-1.263-.465-2.403-1.485-.888-.795-1.484-1.77-1.66-2.07-.174-.3-.019-.465.13-.615.136-.135.301-.345.451-.523.146-.181.194-.301.297-.496.1-.21.049-.375-.025-.524-.075-.15-.672-1.62-.922-2.206-.24-.584-.487-.51-.672-.51-.172-.015-.371-.015-.571-.015-.2 0-.523.074-.797.359-.273.3-1.045 1.02-1.045 2.475s1.07 2.865 1.219 3.075c.149.195 2.105 3.195 5.1 4.485.714.3 1.27.48 1.704.629.714.227 1.365.195 1.88.121.574-.091 1.767-.721 2.016-1.426.255-.705.255-1.29.18-1.425-.074-.135-.27-.21-.57-.345m-5.446 7.443h-.016c-1.77 0-3.524-.48-5.055-1.38l-.36-.214-3.75.975 1.005-3.645-.239-.375c-.99-1.576-1.516-3.391-1.516-5.26 0-5.445 4.455-9.885 9.942-9.885 2.654 0 5.145 1.035 7.021 2.91 1.875 1.859 2.909 4.35 2.909 6.99-.004 5.444-4.46 9.885-9.935 9.885M20.52 3.449C18.24 1.245 15.24 0 12.045 0 5.463 0 .104 5.334.101 11.893c0 2.096.549 4.14 1.595 5.945L0 24l6.335-1.652c1.746.943 3.71 1.444 5.71 1.447h.006c6.585 0 11.946-5.336 11.949-11.896 0-3.176-1.24-6.165-3.495-8.411"></path>
                  </svg>
                  Enviar para WhatsApp
                </Button>
              </form>
            </div>
          </div>
        </div>
      </Section>
    </Layout>
  );
}
