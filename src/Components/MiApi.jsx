import { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table';
import Button from "react-bootstrap/Button";
const MiApi = () => {

    //DEFINICION DE MIS ESTADOS
    const [personajes, setPersonajes] = useState([]);
    const [busqueda, setBusqueda] = useState("");
    const [lista, setLista] = useState([]);

    //FUNCION PARA CONSUMO DE LA API
    const apiPersonajes = async () => {
        const data = await fetch("https://hp-api.onrender.com/api/characters"); 
        const dataPersonajes = await data.json();
        setPersonajes(dataPersonajes);
        setLista(dataPersonajes);
    };

    //FUNCION DE BUSQUEDA
    const nuevaBusqueda = (e) => {
        setBusqueda(e.target.value);
        filtro(e.target.value);
    };

    //FUNCION FILTRO DEVUELVE LA INFO PARA LA BUSQUEDA
    const filtro = (valor) => {
        let resultadoBusqueda = lista.filter((e) => {
            if (e.name.toString().toLowerCase().includes(valor.toLowerCase())) {
                return e;
            }
        });
        setPersonajes(resultadoBusqueda);
    };

    //FUNCIONES PARA ORDENAR
    const ordenaNombre = () => {
        const ordenaPersonajes = [...personajes].sort((a, b) =>
            a.name > b.name ? 1 : -1 //OPERADOR TERNARIO PARA ORDENAR EL ARREGLO SEGUN FUNCION DE COMPARACION.
        );
        setPersonajes(ordenaPersonajes);
    };

    useEffect(() => {
        apiPersonajes(); //LLAMADO A LA FUNCION DE CONSUMO DE LA API
    }, []); // ARREGLO DE DEPENDECIAS VACIO

    //RENDER CON EVENTOS ONCHANGE Y ONCLICK
    return (
        <div className="contenedor">
            <h1>Personajes de Harry Potter</h1>
            <input className="form-control" value={busqueda} placeholder="Escriba el nombre del personaje a buscar..." onChange={nuevaBusqueda} />
            <hr />
            <h2>Listado de Personajes</h2>
            <Table striped bordered hover variant="dark">
                <thead>
                    <tr className="encabezados">
                        <th>NOMBRE <Button variant="success" size="sm" onClick={ordenaNombre}>A-Z</Button></th>
                        <th>ESPECIE</th>
                        <th>CASA</th>
                        <th>ACTOR</th>
            
                    </tr>
                </thead>
                <tbody>
                    {personajes.map((hp) => ( //RECORRIDO DEL ARREGLO PARA MOSTRAR LOS DATOS SETEADOS
                        <tr className="contenido" key={hp.uid}>
                            <td>{hp.name}</td>
                            <td>{hp.species}</td>
                            <td>{hp.house}</td>
                            <td>{hp.actor}</td>
                            
                    
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default MiApi;