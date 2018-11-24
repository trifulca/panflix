import panflix

print("Ejecutando tests:")

assert '<head>' in panflix.template("templates/index.html")
assert 'hay un error' in panflix.template("templates/index.html", {"ERROR": "hay un error"})
print("Pudo obtener templates e interpolar: 👍 ")



assert panflix.validar_usuario("demo:123\notro:333", "demo", "123")
assert False == panflix.validar_usuario("demo:123\notro:333", "user", "99999")
print("Pudo procesar el archivo de usuarios: 👍 ")
