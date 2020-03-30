# panflix

Como Netflix, pero para panas\* como vos y yo.

Landing page: http://panflix.surge.sh/

## ¿Como iniciar el proyecto?

Tienes que tener instalado en tu equipo node y npm, al menos la versión 8,
y ejecutar estos comandos:

```
npm install
npm start
```

El paso siguiente es ingresar en la aplicación con el password "123"

- "pana": En Panamá, Ecuador, Venezuela y Puerto Rico, "pana" quiere decir "amigo". Este significado tiene origen indígena. Proviene de _panaca_ que quiere decir familia y _pana_ significa miembro de la familia.

## ¿Qué incluye panflix?

Diseñamos esta aplicación para que pueda ser utilizada localmente, por
un grupo de amigos que quieren compartir y mostrar películas cuidadosamente
seleccionadas. Así que la funcionalidad más importante se detalla en esta
lista:

- Un sistema de autenticación muy básico.
- Un reproducir estándar que soporta archivos .mp4
- Mostrar los videos con una captura de pantalla de previsualización.
- Scripts para generar capturas de pantalla en los videos.

## ¿Qué no incluye panflix?

Hay varias característica que elegimos dejar afuera, no solo de esta versión,
sino de todas las que vendrán en el futuro.

Esta lista la diseñamos para que el software pueda permanecer simple, protegiendo
la funcionalidad principal del sistema y sin desatender el caso de uso
principal.

Si bien la lista puede parecer algo estricta, ¡no te preocupes!, este sistema
es software libre y dado que es muy simple podrías encarar estos cambios
por tu cuenta en un fork del proyecto (o perdirnos ayuda):

- Panflix no soporta subtítulos.
- No tiene soporte para múltiples idiomas o videos.
- No soporta muchos usuarios.
- No tiene bases de datos ni funciones de socialización, compartir etc.

## Deploy

Para hacer deploys en dokku se tienen que ejecutar estos comandos:

```
git remote add dokku dokku@trifulca.space:panflix
git push dokku master -f
```

## Agradecimientos

Mucho del código de este proyecto viene de un artículo
sobre cómo reproducir video desde node js:

https://medium.com/better-programming/video-stream-with-node-js-and-html5-320b3191a6b6
