### **Dependencias Nuevas (¡Acción Requerida!)**

Recientemente se han añadido nuevas librerías al proyecto. Si es la primera vez que clonas el proyecto o si no lo has actualizado, **es crucial que ejecutes `npm install`** para que todo funcione correctamente.

**Dependencias Instaladas Recientemente:**
- `react-bootstrap`: Para componentes avanzados de UI como Modales y Pestañas (Tabs).
- `bootstrap` y `bootstrap-icons`: Para estilos base e íconos.
- `recharts`: Para las gráficas de estadísticas.

**Comando para instalar/actualizar todo:**
```bash
npm install
````

-----

### **Resumen de Cambios Recientes (05 de Octubre, 2025)**

Se ha realizado una actualización mayor para hacer la aplicación más robusta y funcional.

1.  **Persistencia de Datos (`localStorage`):**

      - **¡Solucionado\!** La sesión del usuario y la lista de eventos ahora se guardan en el navegador. Ya no se perderá la información al recargar la página.

2.  **Sistema de Notificaciones Personalizado:**

      - Se eliminaron todos los `alert()` del código.
      - Se implementó un sistema de notificaciones "Toast" que muestra mensajes de éxito o error de forma elegante en la esquina de la pantalla.

3.  **Nuevas Vistas y Funcionalidades:**

      - **(Organizador) Panel de Monitoreo:** Se añadió la nueva página `/organizer/monitoring` que muestra un mapa, estadísticas en tiempo real y alertas de un evento seleccionado.
      - **(Organizador) Estadísticas Avanzadas:** La página de estadísticas ahora tiene pestañas para alternar entre la tabla de tiempos y un nuevo **gráfico de dispersión** por sectores.
      - **(Usuario) Detalles de Ruta:** Se creó la página `/user/route-details` para que el competidor pueda ver su progreso en el mapa.

4.  **Mejoras de Experiencia de Usuario (UX):**

      - **Botón de Cerrar Sesión:** Ahora hay un botón funcional para cerrar sesión en ambos perfiles (organizador y usuario).
      - **Modal de Confirmación:** El botón de "Alerta de Auxilio" del usuario ahora muestra una ventana de confirmación profesional antes de enviar la alerta.
      - **Perfil Editable y Gamificación:** El perfil de usuario es editable y se ha añadido una sección de "Logros" para incentivar la participación.

-----

### **Guía Rápida de Git**

**A. Si es tu PRIMERA VEZ descargando el proyecto:**

1.  **Clonar:** `git clone <URL_DEL_REPO>`
2.  **Entrar a la Carpeta:** `cd proyecto-ciclismo`
3.  **Instalar Dependencias:** `npm install`
4.  **Ejecutar:** `npm run dev`

**B. Si YA TIENES el proyecto y solo quieres actualizar:**

1.  **Bajar Cambios:** `git pull origin main`
2.  **Actualizar Dependencias:** `npm install` (¡No olvides este paso\!)
3.  **Ejecutar:** `npm run dev`

**Para subir tus cambios:**

1.  **Preparar Archivos:** `git add .`
2.  **Empaquetar Cambios:** `git commit -m "Un mensaje claro de lo que hiciste"`
3.  **Subir a GitHub:** `git push origin main`

-----

## Equipo

  - Mario
  - Jesús
  - Daniel
  - Edgar

<!-- end list -->

```
```