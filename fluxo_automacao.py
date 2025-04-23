#!/usr/bin/env python3
# -*- coding: utf-8 -*-

"""
Script de Automação de Fluxo Instagram → Blog → Oferta
Kolibra Solutions

Este script automatiza a criação de conteúdo seguindo o fluxo:
1. Post para Instagram
2. Artigo para Blog
3. Página de Kit/Oferta

Uso:
    python3 fluxo_automacao.py

Autor: Kolibra Solutions
Data: Abril 2025
"""

import os
import re
import sys
import json
import shutil
from datetime import datetime
from string import Template

# Configurações
SITE_DIR = "/caminho/para/site"  # Substitua pelo caminho real do site
TEMPLATES_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "templates")

# Cores para terminal
class Colors:
    HEADER = '\033[95m'
    BLUE = '\033[94m'
    GREEN = '\033[92m'
    WARNING = '\033[93m'
    FAIL = '\033[91m'
    ENDC = '\033[0m'
    BOLD = '\033[1m'
    UNDERLINE = '\033[4m'

def print_header(text):
    """Imprime um cabeçalho formatado no terminal."""
    print(f"\n{Colors.HEADER}{Colors.BOLD}{'=' * 80}{Colors.ENDC}")
    print(f"{Colors.HEADER}{Colors.BOLD}{text.center(80)}{Colors.ENDC}")
    print(f"{Colors.HEADER}{Colors.BOLD}{'=' * 80}{Colors.ENDC}\n")

def print_success(text):
    """Imprime uma mensagem de sucesso formatada no terminal."""
    print(f"{Colors.GREEN}✓ {text}{Colors.ENDC}")

def print_warning(text):
    """Imprime uma mensagem de aviso formatada no terminal."""
    print(f"{Colors.WARNING}⚠ {text}{Colors.ENDC}")

def print_error(text):
    """Imprime uma mensagem de erro formatada no terminal."""
    print(f"{Colors.FAIL}✗ {text}{Colors.ENDC}")

def slugify(text):
    """Converte um texto para formato de slug (URL amigável)."""
    text = text.lower()
    text = re.sub(r'[^\w\s-]', '', text)
    text = re.sub(r'[\s_-]+', '-', text)
    text = re.sub(r'^-+|-+$', '', text)
    return text

def criar_diretorios():
    """Cria os diretórios necessários para os templates se não existirem."""
    os.makedirs(TEMPLATES_DIR, exist_ok=True)
    os.makedirs(os.path.join(TEMPLATES_DIR, "instagram"), exist_ok=True)
    os.makedirs(os.path.join(TEMPLATES_DIR, "blog"), exist_ok=True)
    os.makedirs(os.path.join(TEMPLATES_DIR, "kit"), exist_ok=True)

def criar_templates_iniciais():
    """Cria os templates iniciais se não existirem."""
    # Template para Instagram
    instagram_template = """# Post Instagram: $titulo
## Slide 1
$titulo

$subtitulo

## Slide 2
### Por que investir em $segmento?

$razao_1
$razao_2
$razao_3

## Slide 3
### Investimento Inicial

$item_1: R$$valor_1
$item_2: R$$valor_2
$item_3: R$$valor_3

Total aproximado: R$$total_investimento

## Slide 4
### Potencial de Retorno

$servico_1: R$$preco_1
$servico_2: R$$preco_2
$servico_3: R$$preco_3

Retorno potencial mensal: R$$retorno_mensal

## Slide 5
### Quer saber mais?

Acesse nosso blog para um guia completo sobre como iniciar seu negócio de $segmento com menos de R$$total_investimento!

Link na bio 👆
"""

    # Template para Blog
    blog_template = """<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>$titulo - Kolibra Solutions</title>
    <meta name="description" content="$descricao">

    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="article">
    <meta property="og:url" content="https://www.kolibrasolutions.com.br/blog/$slug.html">
    <meta property="og:title" content="$titulo">
    <meta property="og:description" content="$descricao">
    <meta property="og:image" content="https://www.kolibrasolutions.com.br/share-image.jpg">
    
    <!-- Twitter -->
    <meta property="twitter:card" content="summary_large_image">
    <meta property="twitter:url" content="https://www.kolibrasolutions.com.br/blog/$slug.html">
    <meta property="twitter:title" content="$titulo">
    <meta property="twitter:description" content="$descricao">
    <meta property="twitter:image" content="https://www.kolibrasolutions.com.br/share-image.jpg">

    <!-- Favicon -->
    <link rel="icon" type="image/ico" href="../favicon.ico">
    <link rel="icon" type="image/png" sizes="16x16" href="../img/favicon-16x16.png">
    <link rel="icon" type="image/png" sizes="32x32" href="../img/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="48x48" href="../img/favicon-48x48.png">
    <link rel="icon" type="image/png" sizes="64x64" href="../img/favicon-64x64.png">
    <link rel="apple-touch-icon" sizes="128x128" href="../img/favicon-128x128.png">
    <link rel="apple-touch-icon" sizes="152x152" href="../img/favicon-152x152.png">
    <link rel="apple-touch-icon" sizes="192x192" href="../img/favicon-192x192.png">
    
    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    
    <!-- Font Awesome -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    
    <style>
        :root {
            --primary-color: #004494;
            --secondary-color: #FF7F00;
            --light-color: #ffffff;
            --dark-color: #333333;
            --gray-color: #f5f5f5;
            --gray-dark: #666666;
            --shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
            --transition: all 0.3s ease;
        }
        
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Poppins', sans-serif;
            line-height: 1.6;
            color: var(--dark-color);
            background-color: var(--light-color);
        }
        
        .container {
            width: 90%;
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 15px;
        }
        
        h1, h2, h3, h4, h5, h6 {
            font-weight: 700;
            line-height: 1.3;
            color: var(--primary-color);
            margin-bottom: 20px;
        }
        
        p {
            margin-bottom: 20px;
            color: var(--gray-dark);
        }
        
        a {
            text-decoration: none;
            color: var(--primary-color);
            transition: var(--transition);
        }
        
        a:hover {
            color: var(--secondary-color);
        }
        
        img {
            max-width: 100%;
            height: auto;
        }
        
        ul, ol {
            margin-bottom: 20px;
            padding-left: 20px;
        }
        
        li {
            margin-bottom: 10px;
        }
        
        blockquote {
            border-left: 4px solid var(--secondary-color);
            padding: 15px 20px;
            margin: 20px 0;
            background-color: var(--gray-color);
            font-style: italic;
        }
        
        blockquote p {
            margin-bottom: 0;
        }
        
        .text-center {
            text-align: center;
        }
        
        .mt-5 {
            margin-top: 50px;
        }
        
        .img-fluid {
            max-width: 100%;
            height: auto;
        }
        
        /* Botões */
        .btn {
            display: inline-block;
            padding: 12px 30px;
            border-radius: 5px;
            font-weight: 600;
            text-align: center;
            cursor: pointer;
            transition: var(--transition);
            border: none;
            font-size: 1rem;
        }
        
        .btn-primary {
            background-color: var(--primary-color);
            color: var(--light-color);
        }
        
        .btn-primary:hover {
            background-color: #003370;
            transform: translateY(-3px);
            box-shadow: var(--shadow);
        }
        
        .btn-secondary {
            background-color: var(--secondary-color);
            color: var(--light-color);
        }
        
        .btn-secondary:hover {
            background-color: #e67300;
            transform: translateY(-3px);
            box-shadow: 0 5px 15px rgba(255, 127, 0, 0.3);
        }
        
        /* Navegação */
        .navbar {
            background-color: var(--primary-color);
            padding: 15px 0;
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            z-index: 1000;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
        }
        
        .navbar .container {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .logo {
            display: block;
        }
        
        .logo img {
            height: 50px;
            width: auto;
        }
        
        .nav-menu {
            display: flex;
            align-items: center;
        }
        
        .nav-menu li {
            margin-left: 30px;
            list-style: none;
        }
        
        .nav-menu a {
            color: var(--light-color);
            font-weight: 500;
        }
        
        .nav-menu a:hover, .nav-menu a.active {
            color: var(--secondary-color);
        }
        
        .btn-nav {
            background-color: var(--secondary-color);
            color: var(--light-color) !important;
            padding: 10px 20px;
            border-radius: 5px;
        }
        
        .btn-nav:hover {
            background-color: #e67300;
            color: var(--light-color) !important;
        }
        
        .nav-toggle {
            display: none;
            cursor: pointer;
        }
        
        .nav-toggle span {
            display: block;
            width: 25px;
            height: 3px;
            background-color: var(--light-color);
            margin: 5px 0;
            transition: var(--transition);
        }
        
        /* Blog Header */
        .blog-header {
            padding: 150px 0 80px;
            background: linear-gradient(135deg, var(--primary-color) 0%, #0066cc 100%);
            color: var(--light-color);
            text-align: center;
        }
        
        .blog-header h1 {
            font-size: 2.5rem;
            margin-bottom: 20px;
            color: var(--light-color);
        }
        
        .blog-header p {
            font-size: 1.2rem;
            max-width: 700px;
            margin: 0 auto 30px;
            color: rgba(255, 255, 255, 0.9);
        }
        
        /* Blog Content */
        .blog-content {
            padding: 80px 0;
        }
        
        .blog-container {
            display: grid;
            grid-template-columns: 1fr 300px;
            gap: 50px;
        }
        
        @media (max-width: 992px) {
            .blog-container {
                grid-template-columns: 1fr;
            }
        }
        
        .blog-main {
            background-color: var(--light-color);
            border-radius: 10px;
            overflow: hidden;
            box-shadow: var(--shadow);
            padding: 40px;
        }
        
        .blog-main h2 {
            font-size: 1.8rem;
            margin-top: 40px;
            margin-bottom: 20px;
            color: var(--primary-color);
        }
        
        .blog-main h3 {
            font-size: 1.4rem;
            margin-top: 30px;
            margin-bottom: 15px;
            color: var(--primary-color);
        }
        
        .blog-main img {
            border-radius: 10px;
            margin: 20px 0;
            box-shadow: var(--shadow);
        }
        
        .blog-main ul, .blog-main ol {
            margin-bottom: 20px;
            padding-left: 20px;
        }
        
        .blog-main li {
            margin-bottom: 10px;
        }
        
        .blog-sidebar {
            position: sticky;
            top: 100px;
        }
        
        .sidebar-widget {
            background-color: var(--light-color);
            border-radius: 10px;
            overflow: hidden;
            box-shadow: var(--shadow);
            padding: 30px;
            margin-bottom: 30px;
        }
        
        .sidebar-widget h3 {
            font-size: 1.3rem;
            margin-bottom: 20px;
            color: var(--primary-color);
        }
        
        .sidebar-widget ul {
            list-style: none;
            padding: 0;
        }
        
        .sidebar-widget li {
            margin-bottom: 15px;
            padding-bottom: 15px;
            border-bottom: 1px solid #eee;
        }
        
        .sidebar-widget li:last-child {
            margin-bottom: 0;
            padding-bottom: 0;
            border-bottom: none;
        }
        
        .cta-box {
            background-color: var(--primary-color);
            color: var(--light-color);
            padding: 30px;
            border-radius: 10px;
            text-align: center;
            margin: 40px 0;
        }
        
        .cta-box h3 {
            color: var(--light-color);
            margin-bottom: 15px;
        }
        
        .cta-box p {
            color: rgba(255, 255, 255, 0.9);
            margin-bottom: 20px;
        }
        
        /* Footer */
        .footer {
            background-color: #222;
            color: var(--light-color);
            padding: 30px 0;
            text-align: center;
        }
        
        .footer p {
            color: #bbb;
            margin-bottom: 0;
        }
        
        .footer a {
            color: var(--secondary-color);
        }
        
        .footer a:hover {
            text-decoration: underline;
        }
        
        /* Responsividade */
        @media (max-width: 992px) {
            .blog-header h1 {
                font-size: 2.2rem;
            }
            
            .blog-header p {
                font-size: 1.1rem;
            }
            
            .blog-main {
                padding: 30px;
            }
        }
        
        @media (max-width: 768px) {
            .navbar {
                padding: 15px 0;
            }
            
            .nav-menu {
                position: fixed;
                top: 80px;
                left: -100%;
                width: 100%;
                height: calc(100vh - 80px);
                background-color: var(--primary-color);
                flex-direction: column;
                align-items: center;
                justify-content: flex-start;
                padding-top: 50px;
                transition: var(--transition);
                box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
            }
            
            .nav-menu.active {
                left: 0;
            }
            
            .nav-menu li {
                margin: 15px 0;
            }
            
            .nav-toggle {
                display: block;
            }
            
            .nav-toggle.active span:nth-child(1) {
                transform: rotate(45deg) translate(5px, 5px);
            }
            
            .nav-toggle.active span:nth-child(2) {
                opacity: 0;
            }
            
            .nav-toggle.active span:nth-child(3) {
                transform: rotate(-45deg) translate(7px, -7px);
            }
            
            .blog-header {
                padding: 120px 0 60px;
            }
            
            .blog-main h2 {
                font-size: 1.6rem;
            }
            
            .blog-main h3 {
                font-size: 1.3rem;
            }
        }
        
        @media (max-width: 576px) {
            .blog-header h1 {
                font-size: 1.8rem;
            }
            
            .blog-main {
                padding: 20px;
            }
        }
    </style>
</head>
<body>
    <!-- Navegação -->
    <nav class="navbar">
        <div class="container">
            <a href="../index.html" class="logo">
                <img src="../img/logo-new.png" alt="KOLIBRA SOLUTIONS">
            </a>
            
            <ul class="nav-menu">
                <li><a href="../index.html">Home</a></li>
                <li><a href="../blog/index.html">Blog</a></li>
                <li><a href="../portfolio.html">Portfólio</a></li>
                <li><a href="../construtor.html" class="btn-nav">Construir Plano</a></li>
            </ul>
            
            <div class="nav-toggle" id="navToggle">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    </nav>
    
    <!-- Blog Header -->
    <header class="blog-header">
        <div class="container">
            <h1>$titulo</h1>
            <p>$subtitulo</p>
        </div>
    </header>
    
    <!-- Blog Content -->
    <section class="blog-content">
        <div class="container blog-container">
            <div class="blog-main">
                <img src="$imagem_principal" alt="$segmento">
                
                $conteudo_blog
                
                <div class="cta-box">
                    <h3>Pronto para iniciar seu negócio de $segmento?</h3>
                    <p>Desenvolvemos um Kit Básico para $segmento que inclui tudo o que você precisa para a parte visual e de marketing do seu novo empreendimento, incluindo um e-book exclusivo de controle financeiro como brinde!</p>
                    <a href="../kit_$slug.html" class="btn btn-secondary">Conhecer o Kit Básico</a>
                </div>
            </div>
            
            <div class="blog-sidebar">
                <div class="sidebar-widget">
                    <h3>Sobre a Autora</h3>
                    <p>Este artigo foi escrito pela equipe da Kolibra Solutions, especializada em soluções de marketing e identidade visual para pequenos empreendedores.</p>
                </div>
                
                <div class="sidebar-widget">
                    <h3>Artigos Relacionados</h3>
                    <ul>
                        <li><a href="#">Como criar um perfil profissional no Instagram</a></li>
                        <li><a href="#">Guia de precificação para serviços de beleza</a></li>
                        <li><a href="#">5 estratégias para fidelizar clientes</a></li>
                        <li><a href="#">Como se formalizar como MEI</a></li>
                    </ul>
                </div>
                
                <div class="sidebar-widget">
                    <h3>Kit $segmento</h3>
                    <p>Por apenas R$$preco_kit, nosso kit inclui:</p>
                    <ul>
                        <li>Logo profissional</li>
                        <li>Ícones para destaques do Instagram</li>
                        <li>Templates para postagens</li>
                        <li>E-book de controle financeiro (BRINDE)</li>
                    </ul>
                    <a href="../kit_$slug.html" class="btn btn-secondary" style="width: 100%; margin-top: 15px;">Ver Kit Completo</a>
                </div>
            </div>
        </div>
    </section>
    
    <!-- Footer -->
    <footer class="footer">
        <div class="container">
            <p>&copy; $ano Kolibra Solutions. Todos os direitos reservados.</p>
        </div>
    </footer>
    
    <!-- JavaScript -->
    <script>
        // Menu Mobile
        document.addEventListener('DOMContentLoaded', function() {
            const navToggle = document.getElementById('navToggle');
            const navMenu = document.querySelector('.nav-menu');
            
            navToggle.addEventListener('click', function() {
                navToggle.classList.toggle('active');
                navMenu.classList.toggle('active');
            });
        });
    </script>
</body>
</html>
"""

    # Template para Kit
    kit_template = """<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Kit Básico para $segmento - Kolibra Solutions</title>
    <meta name="description" content="Kit completo para $segmento com logo profissional, ícones para destaques do Instagram, templates para postagens e e-book de controle financeiro como brinde.">
    
    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://www.kolibrasolutions.com.br/kit_$slug.html">
    <meta property="og:title" content="Kit Básico para $segmento - Kolibra Solutions">
    <meta property="og:description" content="Kit completo para $segmento com logo profissional, ícones para destaques do Instagram, templates para postagens e e-book de controle financeiro como brinde.">
    <meta property="og:image" content="https://www.kolibrasolutions.com.br/share-image.jpg">
    
    <!-- Twitter -->
    <meta property="twitter:card" content="summary_large_image">
    <meta property="twitter:url" content="https://www.kolibrasolutions.com.br/kit_$slug.html">
    <meta property="twitter:title" content="Kit Básico para $segmento - Kolibra Solutions">
    <meta property="twitter:description" content="Kit completo para $segmento com logo profissional, ícones para destaques do Instagram, templates para postagens e e-book de controle financeiro como brinde.">
    <meta property="twitter:image" content="https://www.kolibrasolutions.com.br/share-image.jpg">
    
    <!-- Favicon -->
    <link rel="icon" type="image/ico" href="favicon.ico">
    <link rel="icon" type="image/png" sizes="16x16" href="img/favicon-16x16.png">
    <link rel="icon" type="image/png" sizes="32x32" href="img/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="48x48" href="img/favicon-48x48.png">
    <link rel="icon" type="image/png" sizes="64x64" href="img/favicon-64x64.png">
    <link rel="apple-touch-icon" sizes="128x128" href="img/favicon-128x128.png">
    <link rel="apple-touch-icon" sizes="152x152" href="img/favicon-152x152.png">
    <link rel="apple-touch-icon" sizes="192x192" href="img/favicon-192x192.png">
    
    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    
    <!-- Font Awesome -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    
    <style>
        :root {
            --primary-color: #004494;
            --secondary-color: #FF7F00;
            --light-color: #ffffff;
            --dark-color: #333333;
            --gray-color: #f5f5f5;
            --gray-dark: #666666;
            --shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
            --transition: all 0.3s ease;
        }
        
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Poppins', sans-serif;
            line-height: 1.6;
            color: var(--dark-color);
            background-color: var(--light-color);
        }
        
        .container {
            width: 90%;
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 15px;
        }
        
        h1, h2, h3, h4, h5, h6 {
            font-weight: 700;
            line-height: 1.3;
            color: var(--primary-color);
            margin-bottom: 20px;
        }
        
        p {
            margin-bottom: 20px;
            color: var(--gray-dark);
        }
        
        a {
            text-decoration: none;
            color: var(--primary-color);
            transition: var(--transition);
        }
        
        a:hover {
            color: var(--secondary-color);
        }
        
        img {
            max-width: 100%;
            height: auto;
        }
        
        ul {
            list-style: none;
        }
        
        .text-center {
            text-align: center;
        }
        
        .mt-5 {
            margin-top: 50px;
        }
        
        .img-fluid {
            max-width: 100%;
            height: auto;
        }
        
        /* Botões */
        .btn {
            display: inline-block;
            padding: 12px 30px;
            border-radius: 5px;
            font-weight: 600;
            text-align: center;
            cursor: pointer;
            transition: var(--transition);
            border: none;
            font-size: 1rem;
        }
        
        .btn-primary {
            background-color: var(--primary-color);
            color: var(--light-color);
        }
        
        .btn-primary:hover {
            background-color: #003370;
            transform: translateY(-3px);
            box-shadow: var(--shadow);
        }
        
        .btn-secondary {
            background-color: var(--secondary-color);
            color: var(--light-color);
        }
        
        .btn-secondary:hover {
            background-color: #e67300;
            transform: translateY(-3px);
            box-shadow: 0 5px 15px rgba(255, 127, 0, 0.3);
        }
        
        /* Navegação */
        .navbar {
            background-color: var(--primary-color);
            padding: 15px 0;
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            z-index: 1000;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
        }
        
        .navbar .container {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .logo {
            display: block;
        }
        
        .logo img {
            height: 50px;
            width: auto;
        }
        
        .nav-menu {
            display: flex;
            align-items: center;
        }
        
        .nav-menu li {
            margin-left: 30px;
        }
        
        .nav-menu a {
            color: var(--light-color);
            font-weight: 500;
        }
        
        .nav-menu a:hover, .nav-menu a.active {
            color: var(--secondary-color);
        }
        
        .btn-nav {
            background-color: var(--secondary-color);
            color: var(--light-color) !important;
            padding: 10px 20px;
            border-radius: 5px;
        }
        
        .btn-nav:hover {
            background-color: #e67300;
            color: var(--light-color) !important;
        }
        
        .nav-toggle {
            display: none;
            cursor: pointer;
        }
        
        .nav-toggle span {
            display: block;
            width: 25px;
            height: 3px;
            background-color: var(--light-color);
            margin: 5px 0;
            transition: var(--transition);
        }
        
        /* Hero Section */
        .hero {
            background: linear-gradient(135deg, var(--primary-color) 0%, #0066cc 100%);
            color: var(--light-color);
            padding: 150px 0 80px;
            text-align: center;
        }
        
        .hero h1 {
            font-size: 2.8rem;
            margin-bottom: 20px;
            color: var(--light-color);
        }
        
        .hero p {
            font-size: 1.2rem;
            max-width: 800px;
            margin: 0 auto 30px;
            color: rgba(255, 255, 255, 0.9);
        }
        
        /* Kit Section */
        .kit-section {
            padding: 80px 0;
        }
        
        .kit-container {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 50px;
            align-items: center;
        }
        
        .kit-image img {
            border-radius: 10px;
            box-shadow: var(--shadow);
        }
        
        .kit-content h2 {
            font-size: 2.2rem;
            margin-bottom: 20px;
        }
        
        .kit-content p {
            margin-bottom: 25px;
        }
        
        .price {
            font-size: 3rem;
            color: var(--secondary-color);
            font-weight: 700;
            margin-bottom: 15px;
            display: block;
        }
        
        .payment-info {
            font-size: 1.1rem;
            color: var(--gray-dark);
            margin-bottom: 30px;
        }
        
        /* Components Section */
        .components-section {
            padding: 80px 0;
            background-color: var(--gray-color);
        }
        
        .components-section h2 {
            text-align: center;
            margin-bottom: 50px;
        }
        
        .components-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 30px;
        }
        
        .component-card {
            background-color: var(--light-color);
            border-radius: 10px;
            overflow: hidden;
            box-shadow: var(--shadow);
            transition: var(--transition);
        }
        
        .component-card:hover {
            transform: translateY(-10px);
            box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15);
        }
        
        .component-icon {
            height: 100px;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: rgba(0, 68, 148, 0.05);
        }
        
        .component-icon i {
            font-size: 3rem;
            color: var(--secondary-color);
        }
        
        .component-content {
            padding: 30px;
        }
        
        .component-content h3 {
            font-size: 1.5rem;
            margin-bottom: 15px;
        }
        
        /* Color Palette */
        .color-palette {
            margin: 30px 0;
        }
        
        .color-palette h3 {
            margin-bottom: 20px;
        }
        
        .color-options {
            display: flex;
            flex-wrap: wrap;
            gap: 15px;
        }
        
        .color-option {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            cursor: pointer;
            transition: var(--transition);
            border: 2px solid transparent;
        }
        
        .color-option:hover, .color-option.active {
            transform: scale(1.1);
            border: 2px solid var(--primary-color);
        }
        
        .color-option.color1 { background-color: #FF5733; }
        .color-option.color2 { background-color: #33A8FF; }
        .color-option.color3 { background-color: #33FF57; }
        .color-option.color4 { background-color: #F033FF; }
        .color-option.color5 { background-color: #FFD700; }
        .color-option.color6 { background-color: #FF33A8; }
        
        /* Addons Section */
        .addons-section {
            padding: 80px 0;
        }
        
        .addons-section h2 {
            text-align: center;
            margin-bottom: 50px;
        }
        
        .addons-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 30px;
        }
        
        .addon-card {
            background-color: var(--light-color);
            border-radius: 10px;
            overflow: hidden;
            box-shadow: var(--shadow);
            transition: var(--transition);
            border: 1px solid #eee;
        }
        
        .addon-card:hover {
            transform: translateY(-10px);
            box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15);
        }
        
        .addon-header {
            padding: 20px;
            background-color: var(--primary-color);
            color: var(--light-color);
            text-align: center;
        }
        
        .addon-header h3 {
            color: var(--light-color);
            margin-bottom: 10px;
        }
        
        .addon-price {
            font-size: 1.8rem;
            font-weight: 700;
        }
        
        .addon-content {
            padding: 30px;
        }
        
        .addon-content ul {
            margin-bottom: 25px;
        }
        
        .addon-content li {
            margin-bottom: 10px;
            padding-left: 25px;
            position: relative;
        }
        
        .addon-content li:before {
            content: "✓";
            position: absolute;
            left: 0;
            color: var(--secondary-color);
            font-weight: 700;
        }
        
        .addon-footer {
            padding: 0 30px 30px;
            text-align: center;
        }
        
        /* CTA Section */
        .cta-section {
            padding: 80px 0;
            background: linear-gradient(135deg, var(--primary-color) 0%, #0066cc 100%);
            color: var(--light-color);
            text-align: center;
        }
        
        .cta-section h2 {
            color: var(--light-color);
            margin-bottom: 20px;
        }
        
        .cta-section p {
            color: rgba(255, 255, 255, 0.9);
            max-width: 800px;
            margin: 0 auto 30px;
        }
        
        /* Footer */
        .footer {
            background-color: #222;
            color: var(--light-color);
            padding: 30px 0;
            text-align: center;
        }
        
        .footer p {
            color: #bbb;
            margin-bottom: 0;
        }
        
        .footer a {
            color: var(--secondary-color);
        }
        
        .footer a:hover {
            text-decoration: underline;
        }
        
        /* Responsividade */
        @media (max-width: 992px) {
            .kit-container {
                grid-template-columns: 1fr;
            }
            
            .kit-image {
                order: 1;
            }
            
            .kit-content {
                order: 2;
            }
        }
        
        @media (max-width: 768px) {
            .navbar {
                padding: 15px 0;
            }
            
            .nav-menu {
                position: fixed;
                top: 80px;
                left: -100%;
                width: 100%;
                height: calc(100vh - 80px);
                background-color: var(--primary-color);
                flex-direction: column;
                align-items: center;
                justify-content: flex-start;
                padding-top: 50px;
                transition: var(--transition);
                box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
            }
            
            .nav-menu.active {
                left: 0;
            }
            
            .nav-menu li {
                margin: 15px 0;
            }
            
            .nav-toggle {
                display: block;
            }
            
            .nav-toggle.active span:nth-child(1) {
                transform: rotate(45deg) translate(5px, 5px);
            }
            
            .nav-toggle.active span:nth-child(2) {
                opacity: 0;
            }
            
            .nav-toggle.active span:nth-child(3) {
                transform: rotate(-45deg) translate(7px, -7px);
            }
            
            .hero {
                padding: 120px 0 60px;
            }
            
            .hero h1 {
                font-size: 2.2rem;
            }
            
            .kit-content h2 {
                font-size: 1.8rem;
            }
            
            .price {
                font-size: 2.5rem;
            }
        }
    </style>
</head>
<body>
    <!-- Navegação -->
    <nav class="navbar">
        <div class="container">
            <a href="index.html" class="logo">
                <img src="img/logo-new.png" alt="KOLIBRA SOLUTIONS">
            </a>
            
            <ul class="nav-menu">
                <li><a href="index.html">Home</a></li>
                <li><a href="blog/index.html">Blog</a></li>
                <li><a href="portfolio.html">Portfólio</a></li>
                <li><a href="construtor.html" class="btn-nav">Construir Plano</a></li>
            </ul>
            
            <div class="nav-toggle" id="navToggle">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    </nav>
    
    <!-- Hero Section -->
    <section class="hero">
        <div class="container">
            <h1>Kit $segmento</h1>
            <p>Tudo o que você precisa para iniciar ou profissionalizar seu negócio de $segmento com uma identidade visual impactante</p>
        </div>
    </section>
    
    <!-- Kit Section -->
    <section class="kit-section">
        <div class="container kit-container">
            <div class="kit-image">
                <img src="$imagem_kit" alt="$segmento">
            </div>
            
            <div class="kit-content">
                <h2>Kit Básico para $segmento</h2>
                <p>Destaque-se no mercado com materiais visuais profissionais que transmitem confiança e qualidade para suas clientes.</p>
                
                <span class="price">R$$preco_kit</span>
                <p class="payment-info">Pagamento único, sem mensalidades</p>
                
                <div class="color-palette">
                    <h3>Escolha sua paleta de cores</h3>
                    <p>Selecione até 3 cores para sua identidade visual</p>
                    <div class="color-options">
                        <div class="color-option color1" data-color="#FF5733"></div>
                        <div class="color-option color2" data-color="#33A8FF"></div>
                        <div class="color-option color3" data-color="#33FF57"></div>
                        <div class="color-option color4" data-color="#F033FF"></div>
                        <div class="color-option color5" data-color="#FFD700"></div>
                        <div class="color-option color6" data-color="#FF33A8"></div>
                    </div>
                </div>
                
                <a href="https://api.whatsapp.com/send?phone=5511999999999&text=Olá,%20tenho%20interesse%20no%20Kit%20Básico%20para%20$segmento" class="btn btn-secondary">Solicitar Kit Agora</a>
            </div>
        </div>
    </section>
    
    <!-- Components Section -->
    <section class="components-section">
        <div class="container">
            <h2>O que está incluído no Kit Básico</h2>
            
            <div class="components-grid">
                <div class="component-card">
                    <div class="component-icon">
                        <i class="fas fa-paint-brush"></i>
                    </div>
                    <div class="component-content">
                        <h3>Logo + Identidade Visual</h3>
                        <p>Logo profissional exclusiva para seu negócio, com variações para diferentes aplicações e manual de identidade visual.</p>
                    </div>
                </div>
                
                <div class="component-card">
                    <div class="component-icon">
                        <i class="fas fa-mobile-alt"></i>
                    </div>
                    <div class="component-content">
                        <h3>Ícones para Destaques</h3>
                        <p>Conjunto de ícones personalizados para os destaques do seu Instagram, criando uma aparência profissional e coesa.</p>
                    </div>
                </div>
                
                <div class="component-card">
                    <div class="component-icon">
                        <i class="fas fa-images"></i>
                    </div>
                    <div class="component-content">
                        <h3>Templates para Postagens</h3>
                        <p>Templates padronizados para suas postagens no Instagram, facilitando a criação de conteúdo com aparência profissional.</p>
                    </div>
                </div>
                
                <div class="component-card">
                    <div class="component-icon">
                        <i class="fas fa-book"></i>
                    </div>
                    <div class="component-content">
                        <h3>E-book de Controle Financeiro</h3>
                        <p>BRINDE EXCLUSIVO: E-book completo com planilhas e orientações para gerenciar as finanças do seu negócio de $segmento.</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
    
    <!-- Addons Section -->
    <section class="addons-section">
        <div class="container">
            <h2>Adicionais Opcionais</h2>
            
            <div class="addons-grid">
                <div class="addon-card">
                    <div class="addon-header">
                        <h3>Cartões de Visita</h3>
                        <div class="addon-price">R$$preco_cartao</div>
                    </div>
                    <div class="addon-content">
                        <ul>
                            <li>Design profissional personalizado</li>
                            <li>Opção com ou sem fidelidade no verso</li>
                            <li>Arquivo digital pronto para impressão</li>
                            <li>Compatível com gráficas online e locais</li>
                            <li>Orientações para impressão econômica</li>
                        </ul>
                    </div>
                    <div class="addon-footer">
                        <a href="https://api.whatsapp.com/send?phone=5511999999999&text=Olá,%20tenho%20interesse%20no%20Kit%20Básico%20para%20$segmento%20com%20o%20adicional%20de%20Cartões%20de%20Visita" class="btn btn-primary">Adicionar ao Kit</a>
                    </div>
                </div>
                
                <div class="addon-card">
                    <div class="addon-header">
                        <h3>Landing Page de Agendamento</h3>
                        <div class="addon-price">R$$preco_landing <span style="text-decoration: line-through; font-size: 1rem; color: rgba(255,255,255,0.7);">R$$preco_landing_original</span></div>
                    </div>
                    <div class="addon-content">
                        <ul>
                            <li>Página web profissional</li>
                            <li>Integração com Google Agenda</li>
                            <li>Agendamento automático 24/7</li>
                            <li>Confirmação por e-mail e WhatsApp</li>
                            <li>Hospedagem por 12 meses incluída</li>
                        </ul>
                    </div>
                    <div class="addon-footer">
                        <a href="https://api.whatsapp.com/send?phone=5511999999999&text=Olá,%20tenho%20interesse%20no%20Kit%20Básico%20para%20$segmento%20com%20o%20adicional%20de%20Landing%20Page" class="btn btn-primary">Adicionar ao Kit</a>
                    </div>
                </div>
            </div>
        </div>
    </section>
    
    <!-- CTA Section -->
    <section class="cta-section">
        <div class="container">
            <h2>Pronto para profissionalizar seu negócio de $segmento?</h2>
            <p>Invista em uma identidade visual profissional e destaque-se da concorrência. Nosso Kit Básico para $segmento é o primeiro passo para construir uma marca forte e reconhecida.</p>
            <a href="https://api.whatsapp.com/send?phone=5511999999999&text=Olá,%20tenho%20interesse%20no%20Kit%20Básico%20para%20$segmento" class="btn btn-secondary">Solicitar Kit Agora</a>
        </div>
    </section>
    
    <!-- Footer -->
    <footer class="footer">
        <div class="container">
            <p>&copy; $ano Kolibra Solutions. Todos os direitos reservados.</p>
        </div>
    </footer>
    
    <!-- JavaScript -->
    <script>
        // Menu Mobile
        document.addEventListener('DOMContentLoaded', function() {
            const navToggle = document.getElementById('navToggle');
            const navMenu = document.querySelector('.nav-menu');
            
            navToggle.addEventListener('click', function() {
                navToggle.classList.toggle('active');
                navMenu.classList.toggle('active');
            });
            
            // Color Palette Selection
            const colorOptions = document.querySelectorAll('.color-option');
            let selectedColors = [];
            
            colorOptions.forEach(option => {
                option.addEventListener('click', function() {
                    const color = this.getAttribute('data-color');
                    
                    if (this.classList.contains('active')) {
                        // Remove da seleção
                        this.classList.remove('active');
                        selectedColors = selectedColors.filter(c => c !== color);
                    } else {
                        // Adiciona à seleção se tiver menos de 3 cores selecionadas
                        if (selectedColors.length < 3) {
                            this.classList.add('active');
                            selectedColors.push(color);
                        } else {
                            alert('Você já selecionou 3 cores. Remova uma para selecionar outra.');
                        }
                    }
                    
                    // Atualiza o texto do WhatsApp com as cores selecionadas
                    const whatsappLinks = document.querySelectorAll('a[href^="https://api.whatsapp.com"]');
                    whatsappLinks.forEach(link => {
                        let href = link.getAttribute('href').split('&colors=')[0];
                        if (selectedColors.length > 0) {
                            href += '&colors=' + selectedColors.join(',');
                        }
                        link.setAttribute('href', href);
                    });
                });
            });
        });
    </script>
</body>
</html>
"""

    # Template para destacar artigo no blog
    blog_highlight_template = """<!-- Highlighted Article - $segmento -->
<div class="highlighted-article">
    <div class="highlighted-article-image">
        <img src="$imagem_destaque" alt="$segmento">
    </div>
    <div class="highlighted-article-content">
        <span class="highlighted-article-category">$categoria</span>
        <h2 class="highlighted-article-title">$titulo_destaque</h2>
        <p class="highlighted-article-description">$descricao_destaque</p>
        <a href="$slug.html" class="highlighted-article-button">Ler artigo completo</a>
    </div>
</div>
"""

    # Salvar templates
    if not os.path.exists(os.path.join(TEMPLATES_DIR, "instagram", "template.md")):
        with open(os.path.join(TEMPLATES_DIR, "instagram", "template.md"), "w", encoding="utf-8") as f:
            f.write(instagram_template)
        print_success("Template para Instagram criado")
    
    if not os.path.exists(os.path.join(TEMPLATES_DIR, "blog", "template.html")):
        with open(os.path.join(TEMPLATES_DIR, "blog", "template.html"), "w", encoding="utf-8") as f:
            f.write(blog_template)
        print_success("Template para Blog criado")
    
    if not os.path.exists(os.path.join(TEMPLATES_DIR, "kit", "template.html")):
        with open(os.path.join(TEMPLATES_DIR, "kit", "template.html"), "w", encoding="utf-8") as f:
            f.write(kit_template)
        print_success("Template para Kit criado")
    
    if not os.path.exists(os.path.join(TEMPLATES_DIR, "blog", "highlight_template.html")):
        with open(os.path.join(TEMPLATES_DIR, "blog", "highlight_template.html"), "w", encoding="utf-8") as f:
            f.write(blog_highlight_template)
        print_success("Template para destaque no blog criado")

def coletar_informacoes():
    """Coleta informações do usuário para criar o conteúdo."""
    print_header("FLUXO INSTAGRAM → BLOG → OFERTA")
    print("Vamos criar um novo fluxo de conteúdo para seu negócio.\n")
    
    dados = {}
    
    # Informações básicas
    dados['segmento'] = input("Segmento de negócio (ex: Design de Sobrancelhas): ")
    dados['slug'] = slugify(dados['segmento'])
    dados['titulo'] = input("Título principal (ex: Como iniciar um negócio de X com menos de R$500): ")
    dados['subtitulo'] = input("Subtítulo/descrição curta: ")
    dados['total_investimento'] = input("Investimento total para iniciar (ex: 500): ")
    
    # Informações para Instagram
    print_header("INFORMAÇÕES PARA POST DO INSTAGRAM")
    dados['razao_1'] = input("Razão 1 para investir nesse segmento: ")
    dados['razao_2'] = input("Razão 2 para investir nesse segmento: ")
    dados['razao_3'] = input("Razão 3 para investir nesse segmento: ")
    
    dados['item_1'] = input("Item 1 do investimento inicial: ")
    dados['valor_1'] = input("Valor do item 1: ")
    dados['item_2'] = input("Item 2 do investimento inicial: ")
    dados['valor_2'] = input("Valor do item 2: ")
    dados['item_3'] = input("Item 3 do investimento inicial: ")
    dados['valor_3'] = input("Valor do item 3: ")
    
    dados['servico_1'] = input("Serviço 1 oferecido: ")
    dados['preco_1'] = input("Preço do serviço 1: ")
    dados['servico_2'] = input("Serviço 2 oferecido: ")
    dados['preco_2'] = input("Preço do serviço 2: ")
    dados['servico_3'] = input("Serviço 3 oferecido: ")
    dados['preco_3'] = input("Preço do serviço 3: ")
    dados['retorno_mensal'] = input("Retorno potencial mensal: ")
    
    # Informações para Blog
    print_header("INFORMAÇÕES PARA ARTIGO DO BLOG")
    dados['descricao'] = input("Descrição para meta tags: ")
    dados['imagem_principal'] = input("URL da imagem principal do artigo: ")
    print("\nAgora você precisará criar o conteúdo do blog em um arquivo separado.")
    print("Após executar este script, edite o arquivo gerado em 'conteudo_blog.md'")
    
    # Informações para Kit
    print_header("INFORMAÇÕES PARA PÁGINA DO KIT")
    dados['preco_kit'] = input("Preço do kit básico (ex: 150): ")
    dados['imagem_kit'] = input("URL da imagem do kit: ")
    dados['preco_cartao'] = input("Preço do adicional de cartões de visita (ex: 100): ")
    dados['preco_landing'] = input("Preço do adicional de landing page com desconto (ex: 200): ")
    dados['preco_landing_original'] = input("Preço original da landing page (ex: 300): ")
    
    # Informações para destaque no blog
    print_header("INFORMAÇÕES PARA DESTAQUE NO BLOG")
    dados['categoria'] = input("Categoria do artigo (ex: Design de Sobrancelhas): ")
    dados['titulo_destaque'] = input("Título para o destaque (pode ser o mesmo do artigo): ")
    if not dados['titulo_destaque']:
        dados['titulo_destaque'] = dados['titulo']
    dados['descricao_destaque'] = input("Descrição curta para o destaque: ")
    if not dados['descricao_destaque']:
        dados['descricao_destaque'] = dados['subtitulo']
    dados['imagem_destaque'] = input("URL da imagem para o destaque: ")
    if not dados['imagem_destaque']:
        dados['imagem_destaque'] = dados['imagem_principal']
    
    # Adicionar data atual
    dados['ano'] = str(datetime.now().year)
    
    return dados

def criar_conteudo_instagram(dados):
    """Cria o conteúdo para o post do Instagram."""
    print_header("CRIANDO CONTEÚDO PARA INSTAGRAM")
    
    # Carregar template
    with open(os.path.join(TEMPLATES_DIR, "instagram", "template.md"), "r", encoding="utf-8") as f:
        template = Template(f.read())
    
    # Substituir variáveis
    conteudo = template.safe_substitute(dados)
    
    # Salvar arquivo
    output_file = f"instagram_{dados['slug']}.md"
    with open(output_file, "w", encoding="utf-8") as f:
        f.write(conteudo)
    
    print_success(f"Conteúdo para Instagram criado em '{output_file}'")
    return output_file

def criar_arquivo_conteudo_blog(dados):
    """Cria um arquivo para o usuário preencher com o conteúdo do blog."""
    print_header("CRIANDO ARQUIVO PARA CONTEÚDO DO BLOG")
    
    conteudo = f"""# Conteúdo para o artigo: {dados['titulo']}

Preencha este arquivo com o conteúdo completo do seu artigo para o blog.
Este conteúdo será inserido na página HTML do blog.

## Estrutura sugerida:

### Introdução
Escreva aqui uma introdução atraente sobre o tema.

### Por que investir em {dados['segmento']}?
Detalhe as razões para investir neste segmento.

### Investimento Inicial: O que você realmente precisa
Liste e explique os materiais e recursos necessários.

### Capacitação: Conhecimento é investimento
Explique as opções de aprendizado disponíveis.

### Precificação: Quanto cobrar pelo serviço
Dê orientações sobre como precificar os serviços.

### Captação das primeiras clientes
Estratégias para conseguir os primeiros clientes.

### Fidelização: Transformando clientes ocasionais em recorrentes
Dicas para fidelizar clientes.

### A importância da gestão financeira para o sucesso do seu negócio
Mencione a importância do controle financeiro, mas não entre em detalhes específicos
(estes estarão no e-book oferecido como brinde no kit).

### Expansão: Próximos passos após a consolidação
Orientações para crescimento do negócio.

### Aspectos legais: Formalizando seu negócio
Informações sobre questões legais e burocráticas.

### Conclusão: Seu caminho para o sucesso
Encerre com uma conclusão motivadora.

IMPORTANTE: Não inclua informações detalhadas sobre como implementar um sistema de controle financeiro,
pois este conteúdo estará exclusivamente no e-book oferecido como brinde no kit.
"""
    
    output_file = "conteudo_blog.md"
    with open(output_file, "w", encoding="utf-8") as f:
        f.write(conteudo)
    
    print_success(f"Arquivo para conteúdo do blog criado em '{output_file}'")
    print_warning("Preencha este arquivo com o conteúdo completo do artigo antes de prosseguir")
    return output_file

def criar_pagina_blog(dados):
    """Cria a página HTML do blog."""
    print_header("CRIANDO PÁGINA DO BLOG")
    
    # Verificar se o conteúdo do blog foi preenchido
    try:
        with open("conteudo_blog.md", "r", encoding="utf-8") as f:
            conteudo_blog = f.read()
            if "Preencha este arquivo com o conteúdo completo" in conteudo_blog:
                print_warning("O arquivo de conteúdo do blog parece não ter sido editado.")
                continuar = input("Deseja continuar mesmo assim? (s/n): ")
                if continuar.lower() != 's':
                    print("Operação cancelada. Edite o arquivo 'conteudo_blog.md' e execute o script novamente.")
                    return None
    except FileNotFoundError:
        print_error("Arquivo 'conteudo_blog.md' não encontrado.")
        print("Execute o script novamente para criar o arquivo.")
        return None
    
    # Carregar template
    with open(os.path.join(TEMPLATES_DIR, "blog", "template.html"), "r", encoding="utf-8") as f:
        template = Template(f.read())
    
    # Adicionar conteúdo do blog aos dados
    dados['conteudo_blog'] = conteudo_blog
    
    # Substituir variáveis
    conteudo = template.safe_substitute(dados)
    
    # Salvar arquivo
    output_file = f"blog_{dados['slug']}.html"
    with open(output_file, "w", encoding="utf-8") as f:
        f.write(conteudo)
    
    print_success(f"Página do blog criada em '{output_file}'")
    return output_file

def criar_pagina_kit(dados):
    """Cria a página HTML do kit."""
    print_header("CRIANDO PÁGINA DO KIT")
    
    # Carregar template
    with open(os.path.join(TEMPLATES_DIR, "kit", "template.html"), "r", encoding="utf-8") as f:
        template = Template(f.read())
    
    # Substituir variáveis
    conteudo = template.safe_substitute(dados)
    
    # Salvar arquivo
    output_file = f"kit_{dados['slug']}.html"
    with open(output_file, "w", encoding="utf-8") as f:
        f.write(conteudo)
    
    print_success(f"Página do kit criada em '{output_file}'")
    return output_file

def criar_destaque_blog(dados):
    """Cria o código HTML para destacar o artigo na página principal do blog."""
    print_header("CRIANDO DESTAQUE PARA O BLOG")
    
    # Carregar template
    with open(os.path.join(TEMPLATES_DIR, "blog", "highlight_template.html"), "r", encoding="utf-8") as f:
        template = Template(f.read())
    
    # Substituir variáveis
    conteudo = template.safe_substitute(dados)
    
    # Salvar arquivo
    output_file = f"destaque_{dados['slug']}.html"
    with open(output_file, "w", encoding="utf-8") as f:
        f.write(conteudo)
    
    print_success(f"Código de destaque para o blog criado em '{output_file}'")
    print_warning("Para adicionar este destaque à página principal do blog, copie o conteúdo deste arquivo e substitua o elemento 'highlighted-article' existente.")
    return output_file

def criar_instrucoes_implementacao(arquivos_gerados, dados):
    """Cria um arquivo com instruções para implementação."""
    print_header("CRIANDO INSTRUÇÕES DE IMPLEMENTAÇÃO")
    
    instrucoes = f"""# Instruções de Implementação: Fluxo {dados['segmento']}

Este documento contém instruções para implementar o fluxo Instagram → Blog → Oferta para {dados['segmento']}.

## Arquivos Gerados

{os.linesep.join(['- ' + arquivo for arquivo in arquivos_gerados if arquivo])}

## Passos para Implementação

### 1. Post do Instagram
- Utilize o conteúdo do arquivo `{arquivos_gerados[0]}` para criar um carrossel de 5 slides no Instagram
- Adicione imagens relevantes a cada slide
- Inclua um link para o blog na bio do Instagram

### 2. Artigo do Blog
- Faça upload do arquivo `{arquivos_gerados[2]}` para o diretório `/blog/` do seu site
- Renomeie para `{dados['slug']}.html` se necessário
- Verifique se as imagens estão funcionando corretamente

### 3. Destaque na Página Principal do Blog
- Abra o arquivo `{arquivos_gerados[4]}` e copie seu conteúdo
- Edite o arquivo `blog/index.html` do seu site
- Substitua o elemento `highlighted-article` existente pelo novo código

### 4. Página do Kit
- Faça upload do arquivo `{arquivos_gerados[3]}` para o diretório raiz do seu site
- Renomeie para `kit_{dados['slug']}.html` se necessário
- Verifique se as imagens estão funcionando corretamente

### 5. Atualização da Página de Seleção de Kits
- Adicione um novo card para o Kit de {dados['segmento']} na página de seleção de kits
- Use o seguinte código como base:

```html
<div class="kit-card">
    <div class="kit-icon">
        <!-- Adicione um ícone relevante -->
        <i class="fas fa-paint-brush"></i>
    </div>
    <div class="kit-title">
        {dados['segmento']}
    </div>
    <div class="kit-description">
        Kit completo para {dados['segmento']} e salões especializados
    </div>
    <ul class="kit-features">
        <li>Logo + Identidade Visual</li>
        <li>Ícones para Destaques do Instagram</li>
        <li>Templates para Postagens</li>
        <li>E-book de Controle Financeiro (BRINDE)</li>
    </ul>
    <a href="kit_{dados['slug']}.html" class="kit-button">VER KIT COMPLETO</a>
</div>
```

## Verificação Final

Após implementar todos os elementos, verifique se o fluxo está funcionando corretamente:

1. O post do Instagram direciona para o blog
2. O artigo do blog está destacado na página principal
3. O artigo do blog contém links para a página do kit
4. A página do kit está funcionando corretamente
5. A página de seleção de kits inclui o novo kit

## Suporte

Se precisar de ajuda com a implementação, entre em contato com a equipe da Kolibra Solutions.
"""
    
    output_file = f"instrucoes_{dados['slug']}.md"
    with open(output_file, "w", encoding="utf-8") as f:
        f.write(instrucoes)
    
    print_success(f"Instruções de implementação criadas em '{output_file}'")
    return output_file

def main():
    """Função principal do script."""
    try:
        # Criar diretórios e templates
        criar_diretorios()
        criar_templates_iniciais()
        
        # Coletar informações
        dados = coletar_informacoes()
        
        # Criar conteúdo
        instagram_file = criar_conteudo_instagram(dados)
        blog_content_file = criar_arquivo_conteudo_blog(dados)
        
        print("\nAgora, edite o arquivo 'conteudo_blog.md' com o conteúdo completo do artigo.")
        input("Pressione Enter quando terminar de editar o arquivo para continuar...")
        
        blog_file = criar_pagina_blog(dados)
        kit_file = criar_pagina_kit(dados)
        destaque_file = criar_destaque_blog(dados)
        
        # Criar instruções
        arquivos_gerados = [instagram_file, blog_content_file, blog_file, kit_file, destaque_file]
        instrucoes_file = criar_instrucoes_implementacao(arquivos_gerados, dados)
        
        print_header("PROCESSO CONCLUÍDO COM SUCESSO!")
        print(f"Todos os arquivos necessários para o fluxo de {dados['segmento']} foram criados.")
        print(f"Consulte o arquivo '{instrucoes_file}' para instruções de implementação.")
        
    except KeyboardInterrupt:
        print("\n\nOperação cancelada pelo usuário.")
        sys.exit(0)
    except Exception as e:
        print_error(f"Ocorreu um erro: {str(e)}")
        sys.exit(1)

if __name__ == "__main__":
    main()
