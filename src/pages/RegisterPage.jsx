import React, { useState } from 'react'; // Paso 1: Importar useState

function RegisterPage() {
  // Paso 2: Crear un estado para guardar la lista de usuarios.
  // Inicia como un arreglo vacío.
  const [users, setUsers] = useState([]);

  // Paso 2: Crear un estado para manejar todos los campos del formulario.
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    birthDateDD: '',
    birthDateMM: '',
    birthDateYYYY: '',
    gender: '',
    ine: ''
  });

  // Paso 3: Función que se ejecuta cada vez que el usuario escribe en un input.
  const handleChange = (e) => {
    // e.target.name se refiere al 'name' del input (ej. "fullName")
    // e.target.value es lo que el usuario escribe.
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Paso 4: Función que se ejecuta al enviar el formulario.
  const handleSubmit = (e) => {
    e.preventDefault(); // Evita que la página se recargue.
    
    // Aquí podrías agregar validaciones (ej. que las contraseñas coincidan).
    if (formData.password !== formData.confirmPassword) {
      alert("Las contraseñas no coinciden.");
      return;
    }

    // Creamos un nuevo objeto de usuario con los datos del formulario.
    const newUser = {
        id: Date.now(), // ID único temporal basado en la fecha.
        ...formData
    };

    // Agregamos el nuevo usuario a nuestra lista de usuarios en el estado.
    setUsers([...users, newUser]);

    // Opcional: Mostramos en la consola del navegador que el usuario fue "registrado".
    console.log("¡Usuario registrado con éxito!", newUser);
    console.log("Todos los usuarios:", [...users, newUser]);

    // Limpiamos el formulario después del registro.
    setFormData({
        fullName: '', email: '', password: '', confirmPassword: '',
        birthDateDD: '', birthDateMM: '', birthDateYYYY: '', gender: '', ine: ''
    });

    alert("¡Registro exitoso! Revisa la consola para ver los datos (Presiona F12).");
  };

  return (
    <div className="container vh-100 d-flex align-items-center justify-content-center">
      <div className="row w-100">
        <div className="col-md-6 d-flex flex-column justify-content-center align-items-center text-center p-4">
          <div className="mb-4" style={{ width: '150px', height: '150px', borderRadius: '50%', border: '2px solid black', display: 'grid', placeItems: 'center' }}>LOGO</div>
          <h2 className="mt-3">Únete a la comunidad más grande de ciclismo</h2>
        </div>
        
        {/* Paso 5: Conectar el evento onSubmit del formulario a nuestra función */}
        <div className="col-md-6 p-4">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="fullName" className="form-label">Nombre completo:</label>
              {/* Conectamos el valor y el onChange a nuestro estado */}
              <input type="text" className="form-control" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="Introduce tu nombre" required />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Correo electrónico:</label>
              <input type="email" className="form-control" name="email" value={formData.email} onChange={handleChange} placeholder="Introduce tu correo" required />
            </div>
            <div className="row mb-3">
              <div className="col">
                <label>Crear contraseña:</label>
                <input type="password" name="password" className="form-control" value={formData.password} onChange={handleChange} placeholder="Introduce tu contraseña" required />
              </div>
              <div className="col">
                <label>Confirmar contraseña:</label>
                <input type="password" name="confirmPassword" className="form-control" value={formData.confirmPassword} onChange={handleChange} required />
              </div>
            </div>
            <div className="row mb-3">
                <div className="col">
                    <label>Fecha de nacimiento:</label>
                    <div className="d-flex">
                        <input type="text" name="birthDateDD" className="form-control me-2" value={formData.birthDateDD} onChange={handleChange} placeholder="DD" style={{width: '60px'}}/>
                        <input type="text" name="birthDateMM" className="form-control me-2" value={formData.birthDateMM} onChange={handleChange} placeholder="MM" style={{width: '60px'}}/>
                        <input type="text" name="birthDateYYYY" className="form-control" value={formData.birthDateYYYY} onChange={handleChange} placeholder="YYYY" style={{width: '80px'}}/>
                    </div>
                </div>
                <div className="col">
                    <label>Género:</label>
                    <select name="gender" className="form-select" value={formData.gender} onChange={handleChange}>
                        <option value="">Elige...</option>
                        <option value="femenino">Femenino</option>
                        <option value="masculino">Masculino</option>
                        <option value="otro">Otro</option>
                    </select>
                </div>
            </div>
            <div className="mb-3">
              <label className="form-label">INE:</label>
              <input type="text" className="form-control" name="ine" value={formData.ine} onChange={handleChange} placeholder="Introduce CURP o Clave del lector" />
            </div>
            <div className="d-grid">
              <button type="submit" className="btn btn-primary">Registrarse</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;