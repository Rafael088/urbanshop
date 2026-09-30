# Flujo Git

```bash
# Cada estudiante trabaja en su propia rama
git checkout -b nombre-estudiante

# Trabajar en su tarea, commits pequeños
git add .
git commit -m "descripcion corta"

# Antes de hacer push, traer cambios de main
git checkout main
git pull origin main
git checkout nombre-estudiante
git merge main

# Resolver conflictos si los hay

# Subir cambios
git push origin nombre-estudiante

# Crear Pull Request en GitHub
```

## Reglas
- Nunca hacer push directo a `main` (está protegida)
- Cada PR debe pasar `npm run lint` y `npm test`
- Review de al menos 1 compañero antes de merge
- Commits en español, descriptivos, máximo 1 tarea por commit

## Buenos mensajes de commit
- ✅ `agrega componente ProductGrid`
- ✅ `valida email en CheckoutForm`
- ❌ `cambios`
- ❌ `arreglos varios`
