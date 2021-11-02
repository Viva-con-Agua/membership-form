.PHONY: all build push

build:
	docker-compose build --force-rm --no-cache

dev_docker:
	docker-compose -f docker-compose.dev.yml up -d
