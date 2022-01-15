import React from 'react';

const Paginacion = props =>{
    return(
        <div className='py-2'>
            <button onClick={props.paginaAnterior}type='button' className='btn btn-outline-danger'>Anterior &larr;</button>
            <button onClick={props.paginaSiguiente} type='button' className='btn btn-outline-danger'>Siguiente &rarr;</button>
        </div>
    )
}

export default Paginacion

