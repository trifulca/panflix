import panflix

print("Ejecutando tests:")

assert '<head>' in panflix.template("templates/index.html")
assert 'hay un error' in panflix.template("templates/index.html", {"ERROR": "hay un error"})
print("Pudo obtener templates e interpolar: 👍 ")
