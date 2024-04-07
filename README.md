# Podcast App

Este es un proyecto de una aplicación web para mostrar detalles y episodios de podcasts a través de la API de iTunes.

## Description

La Podcast App es una aplicación web que permite a los usuarios buscar y ver detalles de podcasts específicos, incluyendo su título, autor, descripción y una lista de episodios. Los detalles del podcast y los episodios se obtienen utilizando la API de iTunes.

## Getting started

1. Clona este repositorio en tu máquina local:

   - git clone https://github.com/MarianoJimenezPerez/podcaster-app

2. Navega hasta la carpeta del proyecto:

   - cd podcaster-app

3. Instala las dependencias utilizando npm:

   - npm install

4. Crea un archivo .env en la raíz del proyecto y agrega la siguiente línea:

   - VITE_BASE_URL=https://itunes.apple.com

5. Inicia la aplicación en el modo desarrollador o haz una build minificada

   - npm run dev
   - npm run build

## Utils scripts

| Script | Descripcion                                           |
| ------ | ----------------------------------------------------- |
| dev    | Initiate developer server on port 5173 (vite default) |
| test   | Execute all the tests suite                           |
| build  | Create a build dist for deployment                    |

## Usage

Una vez que la aplicación esté en funcionamiento, podrás buscar podcasts utilizando la barra de búsqueda en la página de inicio. Los resultados de la búsqueda mostrarán una lista de podcasts coincidentes. Puedes hacer clic en un podcast para ver más detalles, incluyendo una descripción y una lista de episodios.

En la página de detalles del podcast, también podrás ingresar a cada episodio disponible y reproducir su audio correspondiente.

## Author

Mariano Jiménez Pérez
marianojimenezperez1@gmail.com
