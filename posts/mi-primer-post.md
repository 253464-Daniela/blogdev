# Mi primer post: por qué decidí escribir

Empezar un blog técnico da vértigo. La red está llena de artículos, tutoriales
y opiniones, así que la primera pregunta honesta es: **¿qué puedo aportar yo?**

Este post es la declaración de intenciones de este sitio. Sin humo.

## Las tres razones

### 1. Aprender escribiendo

Explicar un tema demuestra si lo entiendes de verdad. Cada vez que intento
redactar una solución que parecía clara en mi cabeza, aparecen los huecos.
Escribir es el mejor linter que conozco para el conocimiento.

### 2. Devolver a la comunidad

Llevo años resolviendo dudas con artículos de otras personas. Muchos de esos
autores escribieron sin esperar nada a cambio. Este blog es mi forma de seguir
el relevo.

### 3. Una nota mental pública

Cuando resuelvo un problema oscuro, suele volver a aparecer meses después. Con
un artículo, la solución queda documentada, buscable y con contexto.

## Un ejemplo de código

Nada de este blog tendría sentido sin algo de código. Aquí va el clásico:

```js
function learn(publish) {
  const notes = ["nunca", "deja", "de", "preguntar"];
  if (publish) {
    notes.unshift("escribe", "lo", "que", "aprendes");
  }
  return notes.join(" ");
}

console.log(learn(true)); // escribe lo que aprendes nunca deja de preguntar
```

## Cómo leer este blog

Cada artículo incluye un resumen, el tiempo estimado de lectura y las
categorías. Si una cita te hace ruido o crees que me equivoqué, escríbeme:
la discusión técnica es parte del aprendizaje.

Nos leemos en el siguiente post.