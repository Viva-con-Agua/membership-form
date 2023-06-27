.PHONY: serve build pre-commit

pre-commit:
	pre-commit run --show-diff-on-failure --color=always --all-files

build:
	docker-compose build --force-rm --no-cache

build-dev:
	docker-compose -f docker-compose.dev.yml build --force-rm --no-cache

serve-dev:
	docker-compose -f docker-compose.dev.yml up -d
