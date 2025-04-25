'use client';

import Layout from '@/components/layout/Layout';
import Section from '@/components/sections/Section';
import Hero from '@/components/sections/Hero';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import ServiceCard from '@/components/ui/ServiceCard';

export default function HomeContent() {
  return (
    <Layout>
      {/* Hero Section */}
      <Hero
        title="Soluções Digitais para Pequenos Negócios"
        subtitle="Transforme sua presença online com websites, identidade visual e estratégias digitais acessíveis"
        ctaText="Construir Meu Pacote"
        ctaLink="/construtor"
        secondaryCtaText="Fazer Diagnóstico"
        secondaryCtaLink="/diagnostico"
      />

      {/* Serviços Section */}
      <Section
        title="Nossos Serviços"
        subtitle="Soluções completas para impulsionar seu negócio no ambiente digital"
        bgColor="white"
        id="servicos"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <ServiceCard
            icon="globe"
            title="Websites e Landing Pages"
            description="Sites responsivos, otimizados para SEO e com design moderno para destacar seu negócio na internet."
            link="/construtor"
          />
          <ServiceCard
            icon="window"
            title="Identidade Visual"
            description="Logos, paletas de cores e materiais gráficos que comunicam a essência da sua marca."
            link="/construtor"
          />
          <ServiceCard
            icon="file"
            title="Suporte Mensal"
            description="Atualizações, manutenção e melhorias contínuas para manter seu site sempre funcionando perfeitamente."
            link="/construtor"
          />
        </div>
      </Section>

      {/* Diferenciais Section */}
      <Section
        title="Por que escolher a Kolibra?"
        subtitle="Nossos diferenciais para entregar o melhor para seu negócio"
        bgColor="gray"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card>
            <h3 className="text-xl font-bold mb-3">Preços Acessíveis</h3>
            <p className="text-gray-600">
              Pacotes personalizados que cabem no seu orçamento, sem comprometer a qualidade.
            </p>
          </Card>
          <Card>
            <h3 className="text-xl font-bold mb-3">Atendimento Personalizado</h3>
            <p className="text-gray-600">
              Entendemos as necessidades específicas do seu negócio para criar soluções sob medida.
            </p>
          </Card>
          <Card>
            <h3 className="text-xl font-bold mb-3">Entrega Rápida</h3>
            <p className="text-gray-600">
              Processos otimizados para entregar seu projeto no menor tempo possível.
            </p>
          </Card>
          <Card>
            <h3 className="text-xl font-bold mb-3">Suporte Contínuo</h3>
            <p className="text-gray-600">
              Estamos sempre disponíveis para ajudar com dúvidas e atualizações após a entrega.
            </p>
          </Card>
        </div>
      </Section>

      {/* CTA Section */}
      <Section
        title="Pronto para transformar sua presença digital?"
        subtitle="Comece agora mesmo com nosso construtor de pacotes ou faça um diagnóstico gratuito"
        bgColor="primary"
        className="text-white"
      >
        <div className="flex flex-col md:flex-row justify-center items-center gap-4 mt-8">
          <Button href="/construtor" variant="secondary" size="lg">
            Construir Meu Pacote
          </Button>
          <Button href="/diagnostico" variant="outline" size="lg" className="text-white border-white hover:bg-white hover:text-primary">
            Fazer Diagnóstico Gratuito
          </Button>
        </div>
      </Section>
    </Layout>
  );
}
