# GDZ Website

## How to

Use the terminal to change into this directory and use the following commands:

```docker-compose up -d```

```cd app```

```docker exec gdz_app_1 /docker/app/composer.phar install```

```docker exec gdz_app_1 chown -R application:application /docker/app/```

Next: Open your browser and point it to http://localhost:8009 and install TYPO3.

# Credits

This project is based on the wonderful PHP/TYPO3 Docker Boilerplate by Markus Blaschke and the Webdevops Team at
https://github.com/webdevops/TYPO3-docker-boilerplate
