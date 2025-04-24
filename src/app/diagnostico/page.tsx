'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Layout from '@/components/layout/Layout';
import Section from '@/components/sections/Section';
import InputField from '@/components/forms/InputField';
import RadioField from '@/components/forms/RadioField';
import CheckboxField from '@/components/forms/CheckboxField';
import Button from '@/components/ui/Button';

// Esquema de validação com Zod
const diagnosticSchema = z.object({
  name: z.string().min(3, { message: 'Nome é obrigatório (mínimo 3 caracteres)' }),
  email: z.string().email({ message: 'Email inválido' }),
  phone: z.string().min(10, { message: 'Telefone inválido' }),
  company: z.string().min(2, { message: 'Nome da empresa é obrigatório' }),
  segment: z.string().min(2, { message: 'Segmento é obrigatório' }),
  businessTime: z.enum(['less_than_1', '1_to_3', '3_to_5', 'more_than_5'], {
    message: 'Selecione o tempo de existência do negócio',
  }),
  hasWebsite: z.boolean(),
  hasSocialMedia: z.boolean(),
  hasLogo: z.boolean(),
  mainChallenge: z.string().min(10, { message: 'Por favor, descreva seu principal desafio (mínimo 10 caracteres)' }),
  budget: z.enum(['less_than_500', '500_to_1000', '1000_to_3000', 'more_than_3000'], {
    message: 'Selecione uma faixa de orçamento',
  }),
  acceptTerms: z.boolean({
    required_error: 'Você precisa aceitar os termos para continuar',
  }),
});

type DiagnosticFormData = z.infer<typeof diagnosticSchema>;

export default function Diagnostico() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
    setValue,
    trigger,
  } = useForm<DiagnosticFormData>({
    resolver: zodResolver(diagnosticSchema),
    mode: 'onChange',
    defaultValues: {
      hasWebsite: false,
      hasSocialMedia: false,
      hasLogo: false,
      acceptTerms: false,
    }
  });

  const watchHasWebsite = watch('hasWebsite');
  const watchHasSocialMedia = watch('hasSocialMedia');
  const watchHasLogo = watch('hasLogo');
  const watchAcceptTerms = watch('acceptTerms');

  const nextStep = async () => {
    let fieldsToValidate: Array<keyof DiagnosticFormData> = [];
    
    if (currentStep === 1) {
      fieldsToValidate = ['name', 'email', 'phone', 'company', 'segment'];
    } else if (currentStep === 2) {
      fieldsToValidate = ['businessTime', 'mainChallenge', 'budget'];
    }
    
    const isStepValid = await trigger(fieldsToValidate);
    
    if (isStepValid) {
      setCurrentStep(prev => Math.min(prev + 1, totalSteps));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const onSubmit = (data: DiagnosticFormData) => {
    setIsSubmitting(true);
    
    // Formatar mensagem para WhatsApp
    let message = `*DIAGNÓSTICO - KOLIBRA SOLUTIONS*\n\n`;
    message += `*Nome:* ${data.name}\n`;
    message += `*Email:* ${data.email}\n`;
    message += `*Telefone:* ${data.phone}\n`;
    message += `*Empresa:* ${data.company}\n`;
    message += `*Segmento:* ${data.segment}\n\n`;
    
    message += `*Tempo de existência:* ${
      data.businessTime === 'less_than_1' ? 'Menos de 1 ano' :
      data.businessTime === '1_to_3' ? '1 a 3 anos' :
      data.businessTime === '3_to_5' ? '3 a 5 anos' :
      'Mais de 5 anos'
    }\n\n`;
    
    message += `*Presença digital atual:*\n`;
    message += `- Website: ${data.hasWebsite ? 'Sim' : 'Não'}\n`;
    message += `- Redes Sociais: ${data.hasSocialMedia ? 'Sim' : 'Não'}\n`;
    message += `- Logo/Identidade Visual: ${data.hasLogo ? 'Sim' : 'Não'}\n\n`;
    
    message += `*Principal desafio:*\n${data.mainChallenge}\n\n`;
    
    message += `*Orçamento disponível:* ${
      data.budget === 'less_than_500' ? 'Menos de R$ 500' :
      data.budget === '500_to_1000' ? 'R$ 500 a R$ 1.000' :
      data.budget === '1000_to_3000' ? 'R$ 1.000 a R$ 3.000' :
      'Mais de R$ 3.000'
    }`;
    
    // Número de telefone para onde a mensagem será enviada (formato internacional)
    const phoneNumber = '5535999796570'; // Número da Kolibra
    
    // URL do WhatsApp
    const whatsappURL = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;
    
    // Abrir o WhatsApp em uma nova aba
    window.open(whatsappURL, '_blank');
    
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  return (
    <Layout>
      {/* Header da Página */}
      <div className="bg-primary text-white pt-32 pb-16 relative">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">Diagnóstico Digital Gratuito</h1>
            <p className="text-xl opacity-90 mb-8">
              Avalie a presença digital do seu negócio e receba recomendações personalizadas
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

      {/* Formulário de Diagnóstico */}
      <Section
        title={isSubmitted ? "Diagnóstico Enviado!" : `Diagnóstico Digital - Etapa ${currentStep} de ${totalSteps}`}
        subtitle={isSubmitted 
          ? "Obrigado por solicitar seu diagnóstico digital. Entraremos em contato em breve!"
          : "Preencha o formulário abaixo para receber uma análise personalizada da presença digital do seu negócio"
        }
        bgColor="white"
      >
        {isSubmitted ? (
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-green-100 border border-green-400 text-green-700 px-6 py-8 rounded-lg mb-8 animate-fadeIn">
              <svg className="w-16 h-16 text-green-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <h3 className="text-xl font-bold mb-2">Diagnóstico Enviado com Sucesso!</h3>
              <p className="mb-4">Nossa equipe analisará as informações e entrará em contato em até 24 horas úteis com seu diagnóstico personalizado.</p>
              <p>Enquanto isso, que tal conhecer mais sobre nossos serviços?</p>
            </div>
            
            <div className="flex flex-wrap justify-center gap-4">
              <Button href="/servicos" variant="primary">
                Conhecer Serviços
              </Button>
              <Button href="/portfolio" variant="outline">
                Ver Portfólio
              </Button>
            </div>
          </div>
        ) : (
          <div className="max-w-3xl mx-auto">
            {/* Indicador de Progresso */}
            <div className="mb-8">
              <div className="flex justify-between mb-2">
                {Array.from({ length: totalSteps }).map((_, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <div 
                      className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-medium
                        ${currentStep > index + 1 
                          ? 'bg-secondary' 
                          : currentStep === index + 1 
                            ? 'bg-primary' 
                            : 'bg-gray-300'
                        }`}
                    >
                      {currentStep > index + 1 
                        ? <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                          </svg>
                        : index + 1
                      }
                    </div>
                    <span className="text-xs mt-1 text-gray-600">
                      {index === 0 ? 'Informações Básicas' : 
                       index === 1 ? 'Situação Atual' : 
                       'Finalizar'}
                    </span>
                  </div>
                ))}
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className="bg-primary h-2.5 rounded-full transition-all duration-500" 
                  style={{ width: `${(currentStep / totalSteps) * 100}%` }}
                ></div>
              </div>
            </div>
            
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Etapa 1: Informações Básicas */}
              {currentStep === 1 && (
                <div className="space-y-6 animate-fadeIn">
                  <InputField
                    id="name"
                    label="Nome Completo"
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
                    label="Nome da Empresa"
                    placeholder="Nome da sua empresa"
                    required
                    error={errors.company?.message}
                    {...register('company')}
                  />
                  
                  <InputField
                    id="segment"
                    label="Segmento de Atuação"
                    placeholder="Ex: Restaurante, Barbearia, Consultoria, etc."
                    required
                    error={errors.segment?.message}
                    {...register('segment')}
                  />
                </div>
              )}
              
              {/* Etapa 2: Situação Atual */}
              {currentStep === 2 && (
                <div className="space-y-6 animate-fadeIn">
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Há quanto tempo seu negócio existe? <span className="text-red-500">*</span>
                    </label>
                    <div className="space-y-2">
                      <RadioField
                        id="less_than_1"
                        name="businessTime"
                        label="Menos de 1 ano"
                        value="less_than_1"
                        checked={watch('businessTime') === 'less_than_1'}
                        onChange={(value) => setValue('businessTime', value as 'less_than_1' | '1_to_3' | '3_to_5' | 'more_than_5')}
                        error={errors.businessTime?.message}
                      />
                      <RadioField
                        id="1_to_3"
                        name="businessTime"
                        label="1 a 3 anos"
                        value="1_to_3"
                        checked={watch('businessTime') === '1_to_3'}
                        onChange={(value) => setValue('businessTime', value as 'less_than_1' | '1_to_3' | '3_to_5' | 'more_than_5')}
                      />
                      <RadioField
                        id="3_to_5"
                        name="businessTime"
                        label="3 a 5 anos"
                        value="3_to_5"
                        checked={watch('businessTime') === '3_to_5'}
                        onChange={(value) => setValue('businessTime', value as 'less_than_1' | '1_to_3' | '3_to_5' | 'more_than_5')}
                      />
                      <RadioField
                        id="more_than_5"
                        name="businessTime"
                        label="Mais de 5 anos"
                        value="more_than_5"
                        checked={watch('businessTime') === 'more_than_5'}
                        onChange={(value) => setValue('businessTime', value as 'less_than_1' | '1_to_3' | '3_to_5' | 'more_than_5')}
                      />
                    </div>
                    {errors.businessTime && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.businessTime.message}
                      </p>
                    )}
                  </div>
                  
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Sua empresa já possui: (selecione todas as opções aplicáveis)
                    </label>
                    <div className="space-y-2">
                      <CheckboxField
                        id="hasWebsite"
                        label="Website ou Landing Page"
                        checked={watchHasWebsite}
                        onChange={(checked) => setValue('hasWebsite', checked)}
                      />
                      <CheckboxField
                        id="hasSocialMedia"
                        label="Presença em Redes Sociais"
                        checked={watchHasSocialMedia}
                        onChange={(checked) => setValue('hasSocialMedia', checked)}
                      />
                      <CheckboxField
                        id="hasLogo"
                        label="Logo e Identidade Visual"
                        checked={watchHasLogo}
                        onChange={(checked) => setValue('hasLogo', checked)}
                      />
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="mainChallenge" className="block text-sm font-medium text-gray-700 mb-1">
                      Qual é o principal desafio digital do seu negócio atualmente? <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="mainChallenge"
                      rows={4}
                      className={`
                        block w-full px-4 py-3 rounded-md border 
                        ${errors.mainChallenge 
                          ? 'border-red-500 focus:border-red-500 focus:ring-red-500' 
                          : 'border-gray-300 focus:border-primary focus:ring-primary'
                        }
                        focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-all duration-200
                      `}
                      placeholder="Descreva o principal desafio que você enfrenta na presença digital do seu negócio..."
                      {...register('mainChallenge')}
                      aria-invalid={errors.mainChallenge ? 'true' : 'false'}
                    ></textarea>
                    {errors.mainChallenge && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.mainChallenge.message}
                      </p>
                    )}
                  </div>
                  
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Qual é o orçamento disponível para investimento em soluções digitais? <span className="text-red-500">*</span>
                    </label>
                    <div className="space-y-2">
                      <RadioField
                        id="less_than_500"
                        name="budget"
                        label="Menos de R$ 500"
                        value="less_than_500"
                        checked={watch('budget') === 'less_than_500'}
                        onChange={(value) => setValue('budget', value as 'less_than_500' | '500_to_1000' | '1000_to_3000' | 'more_than_3000')}
                        error={errors.budget?.message}
                      />
                      <RadioField
                        id="500_to_1000"
                        name="budget"
                        label="R$ 500 a R$ 1.000"
                        value="500_to_1000"
                        checked={watch('budget') === '500_to_1000'}
                        onChange={(value) => setValue('budget', value as 'less_than_500' | '500_to_1000' | '1000_to_3000' | 'more_than_3000')}
                      />
                      <RadioField
                        id="1000_to_3000"
                        name="budget"
                        label="R$ 1.000 a R$ 3.000"
                        value="1000_to_3000"
                        checked={watch('budget') === '1000_to_3000'}
                        onChange={(value) => setValue('budget', value as 'less_than_500' | '500_to_1000' | '1000_to_3000' | 'more_than_3000')}
                      />
                      <RadioField
                        id="more_than_3000"
                        name="budget"
                        label="Mais de R$ 3.000"
                        value="more_than_3000"
                        checked={watch('budget') === 'more_than_3000'}
                        onChange={(value) => setValue('budget', value as 'less_than_500' | '500_to_1000' | '1000_to_3000' | 'more_than_3000')}
                      />
                    </div>
                    {errors.budget && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.budget.message}
                      </p>
                    )}
                  </div>
                </div>
              )}
              
              {/* Etapa 3: Finalização */}
              {currentStep === 3 && (
                <div className="space-y-6 animate-fadeIn">
                  <div className="bg-gray-100 p-6 rounded-lg mb-6">
                    <h3 className="text-lg font-semibold text-primary mb-4">Resumo das Informações</h3>
                    
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-500">Nome</p>
                          <p className="font-medium">{watch('name')}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Email</p>
                          <p className="font-medium">{watch('email')}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Telefone</p>
                          <p className="font-medium">{watch('phone')}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Empresa</p>
                          <p className="font-medium">{watch('company')}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Segmento</p>
                          <p className="font-medium">{watch('segment')}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Tempo de existência</p>
                          <p className="font-medium">
                            {watch('businessTime') === 'less_than_1' ? 'Menos de 1 ano' :
                             watch('businessTime') === '1_to_3' ? '1 a 3 anos' :
                             watch('businessTime') === '3_to_5' ? '3 a 5 anos' :
                             'Mais de 5 anos'}
                          </p>
                        </div>
                      </div>
                      
                      <div>
                        <p className="text-sm text-gray-500">Presença digital atual</p>
                        <ul className="list-disc list-inside pl-2">
                          {watchHasWebsite && <li className="font-medium">Website ou Landing Page</li>}
                          {watchHasSocialMedia && <li className="font-medium">Presença em Redes Sociais</li>}
                          {watchHasLogo && <li className="font-medium">Logo e Identidade Visual</li>}
                          {!watchHasWebsite && !watchHasSocialMedia && !watchHasLogo && 
                            <li className="font-medium text-gray-500 italic">Nenhuma presença digital</li>}
                        </ul>
                      </div>
                      
                      <div>
                        <p className="text-sm text-gray-500">Principal desafio</p>
                        <p className="font-medium">{watch('mainChallenge')}</p>
                      </div>
                      
                      <div>
                        <p className="text-sm text-gray-500">Orçamento disponível</p>
                        <p className="font-medium">
                          {watch('budget') === 'less_than_500' ? 'Menos de R$ 500' :
                           watch('budget') === '500_to_1000' ? 'R$ 500 a R$ 1.000' :
                           watch('budget') === '1000_to_3000' ? 'R$ 1.000 a R$ 3.000' :
                           'Mais de R$ 3.000'}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <CheckboxField
                      id="acceptTerms"
                      label="Concordo em receber o diagnóstico digital e informações sobre serviços da Kolibra Solutions"
                      checked={watchAcceptTerms}
                      onChange={(checked) => setValue('acceptTerms', checked)}
                      error={errors.acceptTerms?.message}
                    />
                  </div>
                  
                  <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm text-blue-700">
                          Ao enviar este formulário, você receberá um diagnóstico personalizado da presença digital do seu negócio, com recomendações específicas para melhorar sua visibilidade online.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Botões de Navegação */}
              <div className="flex justify-between pt-4">
                {currentStep > 1 ? (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={prevStep}
                  >
                    Voltar
                  </Button>
                ) : (
                  <div></div> // Espaço vazio para manter o layout
                )}
                
                {currentStep < totalSteps ? (
                  <Button
                    type="button"
                    variant="primary"
                    onClick={nextStep}
                  >
                    Próximo
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    variant="secondary"
                    disabled={isSubmitting || !watchAcceptTerms}
                  >
                    {isSubmitting ? 'Enviando...' : 'Solicitar Diagnóstico'}
                  </Button>
                )}
              </div>
            </form>
          </div>
        )}
      </Section>
    </Layout>
  );
}
