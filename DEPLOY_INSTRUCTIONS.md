# 📤 Instrucciones para Push y Deploy

## Situación Actual
Los cambios están **commiteados localmente** pero necesitan ser subidos a GitHub para que Vercel haga el deploy automático.

## 🔑 Opción 1: Push con Token de GitHub (Recomendado)

### Paso 1: Crear Personal Access Token
1. Ve a https://github.com/settings/tokens
2. Click en "Generate new token" → "Classic"
3. Marca los permisos: `repo` (todo)
4. Genera y copia el token

### Paso 2: Configurar Git con Token
```bash
# Reemplaza TU_TOKEN con el token que copiaste
git remote set-url origin https://TU_USUARIO:TU_TOKEN@github.com/katysantacruztradu-boop/kathyweb.git

# Haz push
git push origin main
```

## 🔑 Opción 2: Push con SSH

### Paso 1: Verificar si tienes SSH key
```bash
ls -la ~/.ssh/id_ed25519.pub
```

### Paso 2: Si no existe, crearla
```bash
ssh-keygen -t ed25519 -C "tu-email@ejemplo.com"
# Presiona Enter para aceptar defaults
```

### Paso 3: Agregar key a GitHub
1. Copia tu key pública:
   ```bash
   cat ~/.ssh/id_ed25519.pub
   ```
2. Ve a https://github.com/settings/keys
3. Click "New SSH key"
4. Pega el contenido y guarda

### Paso 4: Cambiar remote a SSH y hacer push
```bash
git remote set-url origin git@github.com:katysantacruztradu-boop/kathyweb.git
git push origin main
```

## ✅ Verificar Deploy en Vercel

1. Ve a https://vercel.com/dashboard
2. Selecciona el proyecto "kathyweb"
3. Verás un nuevo deploy en progreso/completado
4. El sitio estará actualizado en https://kathyweb.vercel.app

## 🚨 Solución de Problemas

### Error: Permission denied
- Verifica que el token tenga permisos `repo`
- O usa SSH en lugar de HTTPS

### Error: Authentication failed
- El token expiró o es incorrecto
- Genera uno nuevo y repite el proceso

### Vercel no detecta cambios
- Espera 1-2 minutos después del push
- Revisa los logs en Vercel Dashboard
- Verifica que el branch sea `main`

---

**Nota:** Una vez configurado correctamente, los futuros pushes serán automáticos sin necesidad de reconfigurar.
