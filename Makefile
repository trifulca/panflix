NOMBRE=panflix

N=[0m
R=[00;31m
G=[01;32m
Y=[01;33m
B=[01;34m
L=[01;30m


comandos:
	@echo ""
	@echo "${B}Comandos disponibles para ${G}${NOMBRE}${N}"
	@echo ""
	@echo "  ${Y}Para desarrolladores${N}"
	@echo ""
	@echo "    ${G}iniciar${N}                            Instala todas las dependencias."
	@echo "    ${G}test${N}                               Ejecuta los tests."
	@echo "    ${G}test_open${N}                          Abre el test runner de cypress."
	@echo "    ${G}ejecutar${N}                           Ejecuta el servidor en modo desarrollo."
	@echo ""
	@echo ""


iniciar:
	npm install

test:
	npm run cypress:run

test_open:
	npm run cypress:open

ejecutar:
	npm run start-dev
