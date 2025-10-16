import React from 'react';
import styles from './UserDashboardPage.module.css';
import ButtonSport from '../../components/ui/ButtonSport';

const UserDashboardPage = () => {
  // Datos simulados para el dashboard
  const nextEvent = {
    nombre: 'Reto de Montaña 2024',
    fecha: '18/11/2024',
    lugar: 'Monterrey, NL',
    status: {
      inscripcion: 'Completa',
      checkin: 'Pendiente',
      reserva: 'N/A',
    },
  };
  const lastResult = {
    evento: 'Maratón de Ciudad 2023',
    tiempo: '04:15:30',
    posicion: 235,
  };

  return (
    <div className={styles.dashboard}>
      <h1>👋 ¡Hola, [Nombre de Usuario]!</h1>

      {/* Mi Próximo Evento */}
      <section className={styles.nextEventSection}>
        <h2>¡Prepárate para un nuevo desafío!</h2>
        <div className={styles.eventCard}>
          <h3>{nextEvent.nombre}</h3>
          <p>
            **Fecha:** {nextEvent.fecha} | **Lugar:** {nextEvent.lugar}
          </p>
          <div className={styles.progressBar}>
            <div
              className={`${styles.step} ${styles.completed}`}
            >
              Inscripción
            </div>
            <div
              className={`${styles.step} ${
                nextEvent.status.checkin === 'Pendiente' ? '' : styles.completed
              }`}
            >
              Check-in
            </div>
            <div
              className={`${styles.step} ${
                nextEvent.status.reserva === 'N/A' || nextEvent.status.reserva === 'Pendiente' ? '' : styles.completed
              }`}
            >
              Reserva
            </div>
          </div>
          <ButtonSport variant="secondary">Ver detalles del evento</ButtonSport>
        </div>
        <ButtonSport variant="primary" className={styles.findEventButton}>
          Ver competencias
        </ButtonSport>
      </section>

      {/* Mi Último Resultado */}
      <section className={styles.lastResultSection}>
        <h2>¡Conoce los resultados de tu última competencia! 🏆</h2>
        <div className={styles.resultCard}>
          <p>**Evento:** {lastResult.evento}</p>
          <p>**Tiempo Oficial:** {lastResult.tiempo}</p>
          <p>**Posición General:** {lastResult.posicion}</p>
          <ButtonSport variant="tertiary" className={styles.resultButton}>
            Ver resultados
          </ButtonSport>
        </div>
      </section>

      {/* Panel de Acciones Personales (Widgets) */}
      <section className={styles.personalActions}>
        <h2>Acciones Rápidas</h2>
        <div className={styles.widgetGrid}>
          <div className={styles.widget}>
            <span className={styles.widgetIcon}>📈</span>
            <h3>Mi Score</h3>
            <p>Conecta tu dispositivo y sincroniza tu actividad.</p>
            <ButtonSport variant="link">Conectar</ButtonSport>
          </div>
          <div className={styles.widget}>
            <span className={styles.widgetIcon}>🏅</span>
            <h3>Mi Marca Personal</h3>
            <p>Comparte tus logros y récords.</p>
            <ButtonSport variant="link">Ver logros</ButtonSport>
          </div>
          <div className={styles.widget}>
            <span className={styles.widgetIcon}>📜</span>
            <h3>Mi Historial</h3>
            <p>Revisa todas tus competencias pasadas.</p>
            <ButtonSport variant="link">Ver historial</ButtonSport>
          </div>
          <div className={styles.widget}>
            <span className={styles.widgetIcon}>⚙️</span>
            <h3>Mi Perfil Deportivo</h3>
            <p>Actualiza tus datos y ajustes.</p>
            <ButtonSport variant="link">Editar perfil</ButtonSport>
          </div>
        </div>
      </section>
    </div>
  );
};

export default UserDashboardPage;