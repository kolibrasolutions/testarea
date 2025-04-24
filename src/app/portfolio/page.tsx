import { portfolioMetadata } from '@/lib/metadata';
import Layout from '@/components/layout/Layout';
import Section from '@/components/sections/Section';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Image from 'next/image';

export const metadata = portfolioMetadata;

export default function Portfolio() {
  return (
    <Layout>
      {/* Header da Página */}
      <div className="bg-primary text-white pt-32 pb-16 relative">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">Nosso Portfólio</h1>
            <p className="text-xl opacity-90 mb-8">
              Conheça alguns dos projetos que desenvolvemos para nossos clientes
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

      {/* Projetos em Destaque */}
      <Section
        title="Projetos em Destaque"
        subtitle="Alguns dos nossos melhores trabalhos"
        bgColor="white"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Projeto 1 */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg">
            <div className="relative h-64 w-full">
              <Image
                src="/images/portfolio/projeto1.jpg"
                alt="Projeto de Barbearia"
                fill
                className="object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-primary mb-2">Barbearia Vintage</h3>
              <p className="text-gray-600 mb-4">
                Identidade visual completa e site responsivo para uma barbearia tradicional com toque moderno.
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded">Branding</span>
                <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded">Web Design</span>
                <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded">Redes Sociais</span>
              </div>
              <Button variant="outline" size="sm" href="/portfolio/barbearia-vintage">
                Ver Detalhes
              </Button>
            </div>
          </div>

          {/* Projeto 2 */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg">
            <div className="relative h-64 w-full">
              <Image
                src="/images/portfolio/projeto2.jpg"
                alt="Projeto de Cafeteria"
                fill
                className="object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-primary mb-2">Café Aroma</h3>
              <p className="text-gray-600 mb-4">
                Redesign completo da marca e site com sistema de pedidos online para cafeteria artesanal.
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded">Redesign</span>
                <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded">E-commerce</span>
                <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded">Marketing Digital</span>
              </div>
              <Button variant="outline" size="sm" href="/portfolio/cafe-aroma">
                Ver Detalhes
              </Button>
            </div>
          </div>

          {/* Projeto 3 */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg">
            <div className="relative h-64 w-full">
              <Image
                src="/images/portfolio/projeto3.jpg"
                alt="Projeto de Salão de Beleza"
                fill
                className="object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-primary mb-2">Beleza Natural</h3>
              <p className="text-gray-600 mb-4">
                Identidade visual e estratégia de marketing digital para salão de beleza especializado em produtos naturais.
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded">Branding</span>
                <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded">Marketing Digital</span>
                <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded">Redes Sociais</span>
              </div>
              <Button variant="outline" size="sm" href="/portfolio/beleza-natural">
                Ver Detalhes
              </Button>
            </div>
          </div>

          {/* Projeto 4 */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg">
            <div className="relative h-64 w-full">
              <Image
                src="/images/portfolio/projeto4.jpg"
                alt="Projeto de Restaurante"
                fill
                className="object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-primary mb-2">Sabor Caseiro</h3>
              <p className="text-gray-600 mb-4">
                Site responsivo com cardápio digital e sistema de reservas para restaurante de comida caseira.
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded">Web Design</span>
                <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded">UX/UI</span>
                <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded">Sistema de Reservas</span>
              </div>
              <Button variant="outline" size="sm" href="/portfolio/sabor-caseiro">
                Ver Detalhes
              </Button>
            </div>
          </div>

          {/* Projeto 5 */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg">
            <div className="relative h-64 w-full">
              <Image
                src="/images/portfolio/projeto5.jpg"
                alt="Projeto de Loja de Roupas"
                fill
                className="object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-primary mb-2">Moda Consciente</h3>
              <p className="text-gray-600 mb-4">
                E-commerce completo e identidade visual para marca de roupas sustentáveis.
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded">E-commerce</span>
                <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded">Branding</span>
                <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded">SEO</span>
              </div>
              <Button variant="outline" size="sm" href="/portfolio/moda-consciente">
                Ver Detalhes
              </Button>
            </div>
          </div>

          {/* Projeto 6 */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg">
            <div className="relative h-64 w-full">
              <Image
                src="/images/portfolio/projeto6.jpg"
                alt="Projeto de Consultório"
                fill
                className="object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-primary mb-2">Vida Plena</h3>
              <p className="text-gray-600 mb-4">
                Site institucional e sistema de agendamento online para consultório de terapias holísticas.
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded">Web Design</span>
                <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded">Sistema de Agendamento</span>
                <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded">SEO Local</span>
              </div>
              <Button variant="outline" size="sm" href="/portfolio/vida-plena">
                Ver Detalhes
              </Button>
            </div>
          </div>
        </div>
      </Section>

      {/* Categorias de Projetos */}
      <Section
        title="Categorias"
        subtitle="Explore nossos projetos por área de atuação"
        bgColor="gray"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card
            title="Branding e Identidade Visual"
            description="Logos, paletas de cores, tipografia e aplicações para diversos segmentos."
            imageSrc="/images/categories/branding.jpg"
            imageAlt="Branding e Identidade Visual"
          >
            <Button href="/portfolio/categoria/branding" variant="primary" className="w-full">
              Ver Projetos
            </Button>
          </Card>

          <Card
            title="Websites e Landing Pages"
            description="Sites institucionais, landing pages e blogs otimizados para conversão."
            imageSrc="/images/categories/websites.jpg"
            imageAlt="Websites e Landing Pages"
          >
            <Button href="/portfolio/categoria/websites" variant="primary" className="w-full">
              Ver Projetos
            </Button>
          </Card>

          <Card
            title="E-commerce"
            description="Lojas virtuais completas com foco em experiência do usuário e conversão."
            imageSrc="/images/categories/ecommerce.jpg"
            imageAlt="E-commerce"
          >
            <Button href="/portfolio/categoria/ecommerce" variant="primary" className="w-full">
              Ver Projetos
            </Button>
          </Card>

          <Card
            title="Marketing Digital"
            description="Estratégias de marketing digital, gestão de redes sociais e campanhas."
            imageSrc="/images/categories/marketing.jpg"
            imageAlt="Marketing Digital"
          >
            <Button href="/portfolio/categoria/marketing" variant="primary" className="w-full">
              Ver Projetos
            </Button>
          </Card>

          <Card
            title="Kits Segmentados"
            description="Soluções completas para segmentos específicos como barbearias, cafeterias e mais."
            imageSrc="/images/categories/kits.jpg"
            imageAlt="Kits Segmentados"
          >
            <Button href="/portfolio/categoria/kits" variant="primary" className="w-full">
              Ver Projetos
            </Button>
          </Card>

          <Card
            title="Consultoria em Processos"
            description="Projetos de otimização de fluxos e transformação digital para pequenos negócios."
            imageSrc="/images/categories/consultoria.jpg"
            imageAlt="Consultoria em Processos"
          >
            <Button href="/portfolio/categoria/consultoria" variant="primary" className="w-full">
              Ver Projetos
            </Button>
          </Card>
        </div>
      </Section>

      {/* CTA Section */}
      <Section
        title="Quer ser nosso próximo case de sucesso?"
        subtitle="Entre em contato ou use nosso construtor de pacotes para começar seu projeto"
        bgColor="primary"
        className="text-white"
      >
        <div className="text-center max-w-3xl mx-auto">
          <p className="text-lg mb-8 text-white opacity-90">
            Não importa o tamanho do seu negócio, a KOLIBRA SOLUTIONS tem a solução certa para você crescer. Entre em contato conosco ou use nosso construtor de pacotes para começar.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button
              href="/construtor"
              variant="secondary"
              size="lg"
            >
              Construir Meu Pacote
            </Button>
            <Button
              href="/contato"
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-primary"
            >
              Falar com um Consultor
            </Button>
          </div>
        </div>
      </Section>
    </Layout>
  );
}
