# InnovaTubeWeb

## Versión: 0.0.0.1
- __Ticket/Proyecto:__ InnovaTubeWeb
- __Autor:__ Omar Manuel Manrique Galván
- __Fecha:__ 17/11/2025
- __Descripción:__
  -  new versión: Se crea inicia el proyecto.
  -  feat: Se implementa el sistema completo de autenticación con login y registro.
  -  feat: Se integra la API de YouTube para búsqueda y reproducción de videos.
  -  feat: Se desarrolla el panel principal (dashboard).
  -  feat: Se implementa el reproductor de videos.
  -  feat: Se agrega el sistema de favoritos.
  -  feat: Se desarrolla la funcionalidad de búsqueda.
  -  feat: Se configuran guards de autenticación para protección de rutas.
  -  feat: Se integra Google reCAPTCHA.
  -  feat: Se define arquitectura modular con lazy loading.
  -  feat: Se implementan servicios centrales (auth, token, YouTube).
  -  feat: Se crean componentes compartidos (header, footer, captcha).
  -  feat: Se organiza el sistema de rutas por módulos.
  -  feat: Se crean interfaces TypeScript para usuarios y datos de YouTube.
  -  style: Integración de PrimeNG como librería de componentes UI.
  -  style: Integración de TailwindCSS para diseño responsive.
  -  style: Se aplican estilos específicos a componentes.
  -  style: Se define un sistema de temas con PrimeNG.
  -  config: Entorno de enviroments.
  -  Dependencies: Angular 19.0.0, RxJS 7.8.0
  -  Dependencies: PrimeNG 19.1.4, TailwindCSS 4.1.17
  -  Dependencies: ng-recaptcha 13.2.1
  -  Dependencies: Angular CLI 19.0.2
--------

### Estructura
```
src/app/
├── core/                 # Servicios y guards centrales
│   ├── guards/          # Guards de autenticación
│   ├── interfaces/      # Interfaces TypeScript
│   └── services/        # Servicios (Auth, Token, YouTube)
├── modules/             # Módulos de la aplicación
│   ├── dashboard/      # Panel principal
|       |── componentes  # Componentes del dashboard
│   └── login/          # Autenticación
|       |── componentes # Componentes del login
└── shared/             # Componentes compartidos
    ├── captcha/        # Componente reCAPTCHA
    ├── footer/         # Footer de la aplicación
    ├── header/         # Header de la aplicación
    └── helpers/        # Servicios auxiliares
```

### 🚀 Getting Started
```bash
# Instalar dependencias
npm install

# Servidor de desarrollo
ng serve

# Build de producción
ng build
