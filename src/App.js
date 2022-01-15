import React, {Component} from 'react';
import { unstable_renderSubtreeIntoContainer } from 'react-dom';
import Buscador from './componentes/Buscador';
import Resultado from './componentes/Resultado';

class App extends Component{

  state = {
    termino : '',
    imagenes : [],
    pagina: ''
  }

  scroll = () => {
    const elemento = document.querySelector('.jumbotron');
    elemento.scrollIntoView('smooth', 'start');
  }

  paginaAnterior = () => {
       // leer state de la pagina actual
       let pagina = this.state.pagina;
       // Si la pagina es 1 ya no ir hacia atras
       if (pagina === 1) return null;
       // Sumor uno a la pagina actual
       pagina-= 1;
       // agregar el cambio al state
       this.setState({
         pagina      
       }, () =>{
         this.consultarApi();
         this.scroll();
       }); 
      //  console.log(pagina);
  }

  paginaSiguiente = () => {
    // leer state de la pagina actual
    let pagina = this.state.pagina;
    // Sumor uno a la pagina actual
    pagina+= 1;
    // agregar el cambio al state
    this.setState({
      pagina      
    }, () => {
      this.consultarApi();
      this.scroll();
    }); 
    // console.log(pagina);
  }


  consultarApi = () => {
    const termino = this.state.termino;
    const pagina = this.state.pagina;
    const url = `https://pixabay.com/api/?key=25125260-9fd0fd1abf317af4af11ce65b&q=${termino}&page=${pagina}`;

    console.log(url);
 
    fetch(url)
     .then(response => response.json())
     .then(response => this.setState({ imagenes: response.hits}))
  }

  datosBusqueda = (termino) => {
    this.setState({
      termino : termino,
      pagina: 1
      }, () => {
        this.consultarApi();
      })
  }

  render() {
    return (
      <div className='app container'>
        <div className='jumbotron'>
          <h1 className='text-center'>Buscador de imagenes</h1>
          <br></br>

          <Buscador
            datosBusqueda={this.datosBusqueda}
          />
          
        </div>  
      
        <div className="row justify-content-center">
          <Resultado
            imagenes={this.state.imagenes} 
            paginaAnterior={this.paginaAnterior}
            paginaSiguiente={this.paginaSiguiente}       
          />
        </div>
      </div>      
    );
  }
}

export default App;
