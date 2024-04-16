# Wo stehen wir eigentlich? 🤔

---

## Webanwendung

![](img/browser-backend-db.png)

---

<!-- _class: small -->

## Wie bekommen wir denn nun diesen Server online? 🌍 🎉🙌

- Aber ich möchte kein Admin werden 🤬 <br/>Geht das nicht einfacher? 🤯

![](img/webarchitektur-komplex.png)

---

## Code entwickeln & verpacken

![](img/packaging.png)

---

## Code entwickeln & verpacken

![](img/packaging-2.png)

---

<!-- _class: small -->

# Docker

- Plattform um Apps in definierter Umgebung laufen zu lassen (Container)
- Container wird aus Vorlage erstellt (Image)
- Container wird auf Plattform ausgeführt

![bg right contain](img/docker.png)

---

## Docker-Images

- Blueprint für Container
- besteht aus mehreren Layern
- hub stellt bereits viele Images bereit

![bg right 50% contain](img/docker-layers.png)

---

## Docker-Container

- stellt definierte Laufzeitumgebung bereit
- läuft auf Docker Plattform

![bg right 50% contain](img/docker-container.png)

---

## run

```shell
docker run --name some-mongo -p 37017:27017 -d mongo:latest
```

`docker run` startet einen Container mit einem Image

| option           | description                                     |
|------------------|-------------------------------------------------|
| `--name`         | name of the container                           |
| `-d`             | detached                                        |
| `-p 37017:27017` | mapped container port 27017 auf host port 37017 |

---

## ps

```shell
docker ps
```

listet alle laufenden Container.

```shell
docker ps --all
```

listet alle Container.

---

## start / stop

Startet oder stoppt einen Container.

```shell
docker start 324
```

```shell
docker stop 324
```

---

## rm

```shell
docker rm 324
```

Entfernt den Container mit id 324

```shell
docker image rm some-image
```

Entfernt das Image mit id some-image

---

## images

```shell
docker images
```

listet alle Images

---

## inspect

```shell
docker inspect 1234abc
```

Untersucht die Eigenschaften vom Container 1234abc

```shell
docker image inspect foobar
```

Untersucht die Eigenschaften vom image foobar

---

<!-- _class: small -->

## ⌨️ Docker

1. Installiere Docker Desktop auf deinen Mac
2. Starte den super mario retro container https://hub.docker.com/r/pengbai/docker-supermario/
3. Spiele zur Belohnung das erste Level 🥳
4. Stoppe den Container um nicht zu viel Zeit zu verlieren
5. Starte den Container erneut
6. Stoppe den Container
7. Lösche den Container

---

<!-- _class: small -->

## Aufgabe2: MongoDB Docker

1. Starte eine MongoDB in Docker
2. Nutze diese Datenbank im Team-Projekt