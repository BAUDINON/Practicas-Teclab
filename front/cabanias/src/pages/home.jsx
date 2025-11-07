import api from '../service/api';
import { useEffect, useState } from 'react';


function Home() {
    const [message, setMessage] = useState('');

    useEffect(() => {
        api.get('/disponibilidad/hola')
            .then(response => {
                setMessage(response.data);
            });
    }, '');
  
  
  
  
  
    return (
    <div>
      <h1>Bienvenido al sistema</h1>
      <p>{message}</p>
    </div>
  );
}

export default Home;
