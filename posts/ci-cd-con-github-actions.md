# CI/CD con GitHub Actions para proyectos estáticos

Un sitio estático parece que no necesita pipeline: subes los ficheros y listo.
Pero `git push` a producción sin comprobaciones es un accidente esperando a
pasar. Veamos cómo automatizarlo con GitHub Actions.

## Qué construimos

Un pipeline de dos fases:

1. **CI**: instala dependencias, ejecuta lint y corre los tests.
2. **CD**: si la rama es `main`, construye y despliega.

```yaml
name: CI/CD

on:
  push:
    branches: [main]
  pull_request:

jobs:
  quality:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: "20"
      - run: npm ci
      - run: npm run lint
      - run: npm test

  deploy:
    if: github.ref == 'refs/heads/main'
    needs: quality
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm ci
      - run: npm run build
      - uses: peaceiris/actions-gh-pages@v4
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

## Por qué funciona

- **Cada PR se valida**: el fallo ocurre antes de tocar producción.
- **Cero secretos**: `GITHUB_TOKEN` lo inyecta GitHub, no hay claves en el repo.
- **Despliegue reproducible**: el build corre siempre en el mismo entorno.

El mismo patrón vale para cualquier stack. Lo importante no es la herramienta,
sino la regla: **nada llega a producción sin pasar por el pipeline.**