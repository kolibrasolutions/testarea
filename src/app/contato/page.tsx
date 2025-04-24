'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Layout from '@/components/layout/Layout';
import Section from '@/components/sections/Section';
import InputField from '@/components/forms/InputField';
import Button from '@/components/ui/Button';

// Esquema de validação com Zod
const contactSchema = z.object({
  name: z.string().min(3, { message: 'Nome é obrigatório (mínimo 3 caracteres)' }),
  email: z.string().email({ message: 'Email inválido' }),
  phone: z.string().min(10, { message: 'Telefone inválido' }),
  subject: z.string().min(3, { message: 'Assunto é obrigatório' }),
  message: z.string().min(10, { message: 'Mensagem é obrigatória (mínimo 10 caracteres)' }),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function Contato() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema)
  });

  const onSubmit = (data: ContactFormData) => {
    setIsSubmitting(true);
    
    // Formatar mensagem para WhatsApp
    let message = `*Contato - KOLIBRA SOLUTIONS*\n\n`;
    message += `*Nome:* ${data.name}\n`;
    message += `*Email:* ${data.email}\n`;
    message += `*Telefone:* ${data.phone}\n`;
    message += `*Assunto:* ${data.subject}\n\n`;
    message += `*Mensagem:*\n${data.message}`;
    
    // Número de telefone para onde a mensagem será enviada (formato internacional)
    const phoneNumber = '5535999796570'; // Número da Kolibra
    
    // URL do WhatsApp
    const whatsappURL = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;
    
    // Abrir o WhatsApp em uma nova aba
    window.open(whatsappURL, '_blank');
    
    // Resetar formulário e mostrar mensagem de sucesso
    reset();
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    // Esconder mensagem de sucesso após 5 segundos
    setTimeout(() => {
      setIsSubmitted(false);
    }, 5000);
  };

  return (
    <Layout>
      {/* Header da Página */}
      <div className="bg-primary text-white pt-32 pb-16 relative">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">Entre em Contato</h1>
            <p className="text-xl opacity-90 mb-8">
              Estamos prontos para ajudar a transformar seu negócio
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

      {/* Formulário de Contato */}
      <Section
        title="Fale Conosco"
        subtitle="Preencha o formulário abaixo para entrar em contato com nossa equipe"
        bgColor="white"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Coluna do Formulário */}
          <div>
            {isSubmitted && (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6 animate-fadeIn">
                <p className="font-medium">Mensagem enviada com sucesso!</p>
                <p className="text-sm">Entraremos em contato o mais breve possível.</p>
              </div>
            )}
            
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
                id="subject"
                label="Assunto"
                placeholder="Assunto da mensagem"
                required
                error={errors.subject?.message}
                {...register('subject')}
              />
              
              <div className="mb-4">
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Mensagem <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="message"
                  rows={6}
                  className={`
                    block w-full px-4 py-3 rounded-md border 
                    ${errors.message 
                      ? 'border-red-500 focus:border-red-500 focus:ring-red-500' 
                      : 'border-gray-300 focus:border-primary focus:ring-primary'
                    }
                    focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-all duration-200
                  `}
                  placeholder="Digite sua mensagem aqui..."
                  {...register('message')}
                  aria-invalid={errors.message ? 'true' : 'false'}
                ></textarea>
                {errors.message && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.message.message}
                  </p>
                )}
              </div>
              
              <Button
                type="submit"
                variant="primary"
                className="w-full md:w-auto"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Enviando...' : 'Enviar Mensagem'}
              </Button>
            </form>
          </div>
          
          {/* Coluna de Informações de Contato */}
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-bold text-primary mb-4">Informações de Contato</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <svg className="w-6 h-6 mr-3 text-secondary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  </svg>
                  <div>
                    <h4 className="font-medium">Endereço</h4>
                    <p className="text-gray-600">
                      Rua Julião Calixto de Abdala, 87<br />
                      Quinta da Bela Vista<br />
                      Muzambinho, MG, 37890-000
                    </p>
                  </div>
                </li>
                
                <li className="flex items-start">
                  <svg className="w-6 h-6 mr-3 text-secondary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                  </svg>
                  <div>
                    <h4 className="font-medium">Telefone</h4>
                    <p className="text-gray-600">
                      <a href="tel:+5535999796570" className="hover:text-secondary">(35) 99979-6570</a>
                    </p>
                  </div>
                </li>
                
                <li className="flex items-start">
                  <svg className="w-6 h-6 mr-3 text-secondary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                  </svg>
                  <div>
                    <h4 className="font-medium">Email</h4>
                    <p className="text-gray-600">
                      <a href="mailto:kolibrasolutions@gmail.com" className="hover:text-secondary">kolibrasolutions@gmail.com</a>
                    </p>
                  </div>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-bold text-primary mb-4">Horário de Atendimento</h3>
              <ul className="space-y-2">
                <li className="flex justify-between">
                  <span className="font-medium">Segunda - Sexta:</span>
                  <span className="text-gray-600">08:00 - 18:00</span>
                </li>
                <li className="flex justify-between">
                  <span className="font-medium">Sábado:</span>
                  <span className="text-gray-600">09:00 - 13:00</span>
                </li>
                <li className="flex justify-between">
                  <span className="font-medium">Domingo:</span>
                  <span className="text-gray-600">Fechado</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-bold text-primary mb-4">Redes Sociais</h3>
              <div className="flex space-x-4">
                <a 
                  href="https://www.instagram.com/kolibrasolutions/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-gray-100 hover:bg-secondary hover:text-white p-3 rounded-full transition-colors"
                  aria-label="Instagram"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                  </svg>
                </a>
                
                <a 
                  href="https://www.linkedin.com/company/kolibrasolutions/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-gray-100 hover:bg-secondary hover:text-white p-3 rounded-full transition-colors"
                  aria-label="LinkedIn"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </a>
                
                <a 
                  href="https://www.tiktok.com/@kolibrasolutions" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-gray-100 hover:bg-secondary hover:text-white p-3 rounded-full transition-colors"
                  aria-label="TikTok"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                  </svg>
                </a>
                
                <a 
                  href="https://wa.me/5535999796570" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-gray-100 hover:bg-secondary hover:text-white p-3 rounded-full transition-colors"
                  aria-label="WhatsApp"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M17.498 14.382c-.301-.15-1.767-.867-2.04-.966-.273-.101-.473-.15-.673.15-.197.295-.771.964-.944 1.162-.175.195-.349.21-.646.075-.3-.15-1.263-.465-2.403-1.485-.888-.795-1.484-1.77-1.66-2.07-.174-.3-.019-.465.13-.615.136-.135.301-.345.451-.523.146-.181.194-.301.297-.496.1-.21.049-.375-.025-.524-.075-.15-.672-1.62-.922-2.206-.24-.584-.487-.51-.672-.51-.172-.015-.371-.015-.571-.015-.2 0-.523.074-.797.359-.273.3-1.045 1.02-1.045 2.475s1.07 2.865 1.219 3.075c.149.195 2.105 3.195 5.1 4.485.714.3 1.27.48 1.704.629.714.227 1.365.195 1.88.121.574-.091 1.767-.721 2.016-1.426.255-.705.255-1.29.18-1.425-.074-.135-.27-.21-.57-.345m-5.446 7.443h-.016c-1.77 0-3.524-.48-5.055-1.38l-.36-.214-3.75.975 1.005-3.645-.239-.375c-.99-1.576-1.516-3.391-1.516-5.26 0-5.445 4.455-9.885 9.942-9.885 2.654 0 5.145 1.035 7.021 2.91 1.875 1.859 2.909 4.35 2.909 6.99-.004 5.444-4.46 9.885-9.935 9.885M20.52 3.449C18.24 1.245 15.24 0 12.045 0 5.463 0 .104 5.334.101 11.893c0 2.096.549 4.14 1.595 5.945L0 24l6.335-1.652c1.746.943 3.71 1.444 5.71 1.447h.006c6.585 0 11.946-5.336 11.949-11.896 0-3.176-1.24-6.165-3.495-8.411"></path>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Mapa */}
      <div className="h-96 w-full">
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3705.5831485238365!2d-46.57248232376549!3d-21.37204398022414!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94b5f4e1b2e0c0e3%3A0x9c3e1a7e3c7c8a0e!2sR.%20Juli%C3%A3o%20Calixto%20de%20Abdala%2C%2087%20-%20Quinta%20da%20Bela%20Vista%2C%20Muzambinho%20-%20MG%2C%2037890-000!5e0!3m2!1spt-BR!2sbr!4v1713967450123!5m2!1spt-BR!2sbr" 
          width="100%" 
          height="100%" 
          style={{ border: 0 }} 
          allowFullScreen 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"
          title="Localização da Kolibra Solutions"
        ></iframe>
      </div>
    </Layout>
  );
}
