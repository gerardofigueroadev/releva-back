# releva-back

Backend de Releva — API REST construida con NestJS y PostgreSQL.

## Stack

- **Framework:** NestJS (TypeScript)
- **Base de datos:** PostgreSQL
- **ORM:** TypeORM
- **Autenticación:** JWT con roles (levantador / supervisor / admin)

## Módulos principales

- `auth` — autenticación y gestión de roles
- `empresas` — gestión de empresas clientes
- `proyectos` — proyectos por empresa
- `viviendas` — viviendas por proyecto
- `ambientes` — ambientes por vivienda
- `items` — items por ambiente con medidas y fotos
- `folios` — motor de exportación del Excel/folio regulatorio

## Requisitos

- Node.js >= 20
- PostgreSQL >= 15

## Inicio rápido

```bash
npm install
cp .env.example .env
npm run start:dev
```
