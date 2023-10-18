import React, { useState, useEffect } from 'react';
import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import logoPerfil from './assets/perfil.png'

function App() {

  const baseUrl = "https://localhost:7075/api/Meis";

  const [data, setData] = useState([]);
  const [modalIncluir, setModalIncluir] = useState(false);

  const [meiSelecionado, setMeiSelecionado] = useState(
    {
      id: '',
      nomeMei: '',
      email: '',
      telefone: '',
      rua: '',
      numero: '',
      bairro: '',
      cidade: '',
      estado: 0,
      perfil: 0,
      password: '',
      horarioFuncionamento: ''

    }

  )

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMeiSelecionado({
      ...meiSelecionado,
      [name]: value
    });
  };


  const abrirFecharModalIncluir = () => {
    setModalIncluir(!modalIncluir);
  }

  const pedidoGet = async () => {
    await axios.get(baseUrl)
      .then(response => {
        setData(response.data);
      }).catch(error => {
        console.log(error);
      })
  }

  const pedidoPost = async () => {
    delete meiSelecionado.id;
    await axios.post(baseUrl, meiSelecionado)
      .then(response => {
        setData(data.concat(response.data));
        abrirFecharModalIncluir();
      }).catch(error => {
        console.log(error);
      })
  }

  // const estadosBrasileiros = [
  //   'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG',
  //   'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
  // ];


  useEffect(() => {
    pedidoGet();
  })

  return (
    <div className="App">
      <br />
      <h3> Perfil</h3>
      <header>
        <img src={logoPerfil} alt='cadastro' />
        <button className="btn btn-success" onClick={() => abrirFecharModalIncluir()}>Incluir Mei</button>
      </header>
      <table className='table table-bordered'>
        <thead>
          <tr>
            <th>Id</th>
            <th>Nome</th>
            <th>Email</th>
            <th>Telefone</th>
            <th>Operação</th>
          </tr>
        </thead>
        <tbody>
          {data.map(Mei => (
            <tr key={Mei.id}>
              <td>{Mei.id}</td>
              <td>{Mei.nomeMei}</td>
              <td>{Mei.email}</td>
              <td>{Mei.telefone}</td>
              <td>
                <button className='btn btn-primary'>Editar</button> {"  "}
                <button className='btn btn-danger'>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal isOpen={modalIncluir}>
        <ModalHeader>Incluir MEI</ModalHeader>
        <ModalBody>
          <div className='form-group'>

            <label>Nome: </label>
            <br />
            <input type='text' className='form-control' name='nomeMei' onChange={handleChange} />

            <label>Email: </label>
            <br />
            <input type='text' className='form-control' name='email' onChange={handleChange} />

            <label>Telefone: </label>
            <br />
            <input type='text' className='form-control' name='telefone' onChange={handleChange} />

            <label>Rua: </label>
            <br />
            <input type='text' className='form-control' name='rua' onChange={handleChange} />

            <label>Numero: </label>
            <br />
            <input type='text' className='form-control' name='numero' onChange={handleChange} />

            <label>Bairro: </label>
            <br />
            <input type='text' className='form-control' name='bairro' onChange={handleChange} />

            <label>Cidade: </label>
            <br />
            <input type='text' className='form-control' name='cidade' onChange={handleChange} />

            <label>Estado: </label>
            <br />
            <select className="form-control" name="estado" onChange={handleChange}>
              <option value="">Selecione um estado</option>
              <option value="AC">Acre</option>
              <option value="AL">Alagoas</option>
              <option value="AP">Amapá</option>

            </select>


            {/*<label>Perfil: </label>
            <br />
            <input type='text' className='form-control' name='perfil' onChange={handleChange} />*/}

            <label>Senha: </label>
            <br />
            <input type='text' className='form-control' name='password' onChange={handleChange} />

            <label>Horario de Funcionamento: </label>
            <br />
            <input type='text' className='form-control' name='horarioFuncionamento' onChange={handleChange} />

            <br />
          </div>
        </ModalBody>
        <ModalFooter>
          <button className='btn btn-primary' onClick={() => pedidoPost()}>Incluir</button> {"  "}
          <button className='btn btn-danger' onClick={() => abrirFecharModalIncluir()}>Cancelar</button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default App;
