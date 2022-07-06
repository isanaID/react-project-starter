start:
	docker-compose up --detach
dist:
	docker-compose up --detach --build
shell:
	docker-compose exec react-random-user bash
logs:
	docker-compose logs --follow react-random-user
stop:
	docker-compose stop
destroy:
	docker-compose down
list:
	docker-compose ps
