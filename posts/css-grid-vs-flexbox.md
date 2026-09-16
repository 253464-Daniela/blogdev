# CSS Grid vs Flexbox: cuándo usar cada uno

De las preguntas más repetidas en CSS: **¿Flexbox o Grid?** La respuesta corta
es que no compiten: se complementan. La respuesta larga está en este post.

## Flexbox: una dimensión

Flexbox organiza contenido en **una sola dirección** (fila o columna). Es ideal
para alinear elementos en una secuencia y repartir espacio entre ellos.

```css
.nav {
  display: flex;
  gap: 1rem;
  justify-content: space-between;
  align-items: center;
}
```

Piensa en flex cuando el orden del contenido importa y el layout se define por
el flujo: botones, navbars, filas de iconos.

## Grid: dos dimensiones

Grid define **filas y columnas al mismo tiempo**. El layout deja de depender
del orden del HTML y pasa a ser una estructura declarada.

```css
.hero {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 2rem;
}

.hero-title {
  grid-column: 1 / 8;
}

.hero-aside {
  grid-column: 9 / 13;
}
```

Úsalo cuando necesites posicionar elementos en la página: layouts de página,
galerías, dashboards.

## La regla que me funciona

> ¿El flujo decide o el layout decide? Si el contenido fluye en una línea,
> Flexbox. Si pones elementos en una estructura fija, Grid.

Muchos problemas se resuelven combinando ambos: unos `grid` para la estructura
exterior y tiradores `flex` dentro de cada celda.

No hay batalla. Hay herramientas.