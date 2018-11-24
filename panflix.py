import os
from time import sleep

from http.server import BaseHTTPRequestHandler, HTTPServer


class Handler(BaseHTTPRequestHandler):
    server_version = 'panflix/1.0'
    sys_version = ''

    def do_GET(self):
        # TODO: reemplazar ifs por un diccionario apuntando a funciones.
        if self.path.startswith("/static/"):
            self.send_response(200)
            # TODO: enviar content-type
            self.end_headers()
            # TODO: prevenir directory traversal
            este_directorio = os.path.dirname(os.path.realpath(__file__))
            ruta = os.path.join(este_directorio, self.path.replace("/static/", "static/"))
            self.wfile.write(bytes(obtener_archivo(ruta)))
        else:
            self.index()

    def index(self):
        self.send_response(200)
        self.send_header('Content-type','text/html')
        self.end_headers()
        self.wfile.write(bytes(template("templates/index.html"), "utf8"))


def obtener_archivo(ruta_al_archivo):
    with open(ruta_al_archivo, 'rb') as archivo:
        return archivo.read()

def template(ruta_al_archivo, reemplazos={}):
    """Retorna un string con el contenido del template aplicando reemplazos."""

    with open(ruta_al_archivo, 'r', encoding='utf-8') as archivo:
        contenido = archivo.read()

        # TODO: buscar forma de reemplazar todos los placeholders juntos.
        for key in reemplazos:
            contenido = contenido.replace(key, reemplazos[key])

        return contenido


def run():
    host = "0.0.0.0"
    puerto = 8080
    server_address = (host, puerto)

    try:
        httpd = HTTPServer(server_address, Handler)
        print(f"Iniciando el servidor en http://{host}:{puerto}")
        httpd.serve_forever()
    except KeyboardInterrupt:
        httpd.shutdown()
        print("Cerrando ...")

if __name__ == '__main__':
    run()
