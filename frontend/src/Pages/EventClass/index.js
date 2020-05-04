import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';

import logoImg from '../../assets/logoTschool.svg';
import menuImg from '../../assets/menu.png';
import btLogout from '../../assets/btLogout.png';
import icClose from '../../assets/close.png';

//import api from '../../services/api';

import './style.css';
import '../standard.css';
import '../modal-delete.css';

export default function EventClass(){
    const schoolId = localStorage.getItem('schoolId');
    const schoolName = localStorage.getItem('schoolName');

    //const id = localStorage.getItem('ongId');

    //Função cadastrar
    const [ nameEvent, setNameEvent ] = useState('');
    const [ nameClass, setNameClass ] = useState('');

    const [open, setOpen] = useState([0]);
    const history = useHistory();

    async function handleRegister(e) {
        e.preventDefault();

        const data = ({nameEvent, nameClass});

        try {
            //await api.post('schools', data);
            history.push('/home');
        } catch(err) {
            alert('Erro no cadastro, tente novamente');
        }
    };

    /*async function testSession() {
        try {
            await api.post('sessions', { id } );
        } catch {
            history.push('/');
        }
    }*/

    /*useEffect( () => {
        //testSession();
        api.get('profile', {
            headers: {
                Authorization: ongId,
            }
        }).then(response => {
            setIncidents(response.data);
        });
    }, [ongId]);*/ //2 parametros - 1)Qual função a ser executada. 2)Quando que a função será executada.

    /*async function handleDeleteIncident(id) {
        try {
            await api.delete(`incidents/${id}`, {
                headers: {
                    Authorization: ongId,
                }
            });

            setIncidents(incidents.filter(incident => incident.id !== id))
        } catch (err) {
            alert('Erro ao deletar caso, tente novamente.');
        }
    };*/

    function handleDelete(){

    }

    function startModal(modalId) {
        const modal = document.getElementById(modalId);
        
        modal.classList.add('show');
        modal.addEventListener('click', (event) => {
            
            if(event.target.id == modalId || event.target.className == 'close-login') {
                modal.classList.remove('show');
            }
        });
    }

    function handleLogout() {
        localStorage.clear();
        history.push('/home');
    }

    function startSideBar(menuId) {
        const menu = document.getElementById(menuId);
        const text = document.querySelector('.menu-btn');
        if (open == 0) {
            menu.classList.add('show');
            text.classList.add('show');
            document.querySelector('.menu-btn h3').classList.add('show');
            setOpen(1);
        } else {
            menu.classList.remove('show');
            text.classList.remove('show');
            document.querySelector('.menu-btn h3').classList.remove('show');
            setOpen(0);
        }
    }

    return(
        <div className="event-class-container">
            <div className="side-bar-container">
                <div className="menu-btn">
                    <img id="imgFix" onClick={ () => startSideBar("sidebar")} src={menuImg} alt="" height="22px"/>       
                    <h3>Menu</h3>
                </div>
                <div id="sidebar" className="menu">
                    <ul>
                        <Link to="/events"><li>Eventos</li></Link>
                        <Link to="/classes"><li>Classes</li></Link>
                        <Link to="/students"><li>Alunos</li></Link>
                        <Link to="/responsibles"><li>Responsáveis</li></Link>
                        <Link to="/eventsbyclass"><li>Eventos por Classe</li></Link>
                        <Link to="/participants"><li>Alunos Autorizados</li></Link>
                    </ul>
                </div>
            </div>
            
            <div className="body-container">
                <div className="nav-bar-container">
                    <header>
                        <img className="logo" src={logoImg} alt="Tschool"/>
                        <span>{schoolName}</span>

                        <button className="bt-register" onClick={ () => startModal('modal-event-class') }>Add Evento para Classe</button>
                        <button onClick={handleLogout} type="button">
                            <img src={btLogout} alt=""/>
                        </button>
                    </header>
                </div>

                <h1>Eventos por Classe</h1>

                <ul className="container-list">
                    <li>
                        <div className="group">
                            <div>
                                <strong>Nome</strong>
                                <p>Nome da Classe</p>
                            </div>
                            <div>
                                <strong>Período</strong>
                                <p>Matutino/tarde</p>
                            </div>
                            <div>
                                <strong>Qtd Alunos</strong>
                                <p>XX</p>
                            </div>
                        </div>

                        <button className="bt-edit">
                            <FiEdit2 size={16} color="#fff" />
                        </button>
                        
                        <button className="bt-lixeira" onClick={ () => startModal('modal-delete')}>
                            <FiTrash2 size={16} color="#fff" />
                        </button>
                    </li>
                    <li>
                        <div className="group">
                            <div>
                                <strong>Nome</strong>
                                <p>Nome da Classe</p>
                            </div>
                            <div>
                                <strong>Período</strong>
                                <p>Matutino/tarde</p>
                            </div>
                            <div>
                                <strong>Qtd Alunos</strong>
                                <p>XX</p>
                            </div>
                        </div>
                        
                        <button className="bt-edit">
                            <FiEdit2 size={16} color="#fff" />
                        </button>
                        
                        <button className="bt-lixeira" onClick={ () => startModal('modal-delete')}>
                            <FiTrash2 size={16} color="#fff" />
                        </button>
                    </li>
                    <li>
                        <div className="group">
                            <div>
                                <strong>Nome</strong>
                                <p>Nome da Classe</p>
                            </div>
                            <div>
                                <strong>Período</strong>
                                <p>Matutino/tarde</p>
                            </div>
                            <div>
                                <strong>Qtd Alunos</strong>
                                <p>XX</p>
                            </div>
                        </div>
                        
                        <button className="bt-edit">
                            <FiEdit2 size={16} color="#fff" />
                        </button>
                        
                        <button className="bt-lixeira" onClick={ () => startModal('modal-delete')}>
                            <FiTrash2 size={16} color="#fff" />
                        </button>
                    </li>
                    <li>
                        <div className="group">
                            <div>
                                <strong>Nome</strong>
                                <p>Nome da Classe</p>
                            </div>
                            <div>
                                <strong>Período</strong>
                                <p>Matutino/tarde</p>
                            </div>
                            <div>
                                <strong>Qtd Alunos</strong>
                                <p>XX</p>
                            </div>
                        </div>
                        
                        <button className="bt-edit">
                            <FiEdit2 size={16} color="#fff" />
                        </button>
                        
                        <button className="bt-lixeira" onClick={ () => startModal('modal-delete')}>
                            <FiTrash2 size={16} color="#fff" />
                        </button>
                    </li>
                </ul>

                <div id="modal-event-class" className="modal-register-container">
                    <div className="content">
                        <section>
                            <img src={logoImg} alt="Tschool"/>
                            <h1>Add Evento para Classe</h1>
                            <p>Informe o nome do evento e o nome da classe conforme cadastrados no banco.</p>
                            <Link id="modal-event-class" className="button">Voltar eventos por classe</Link>
                        </section>
                        <form onSubmit={handleRegister}>
                            <input placeholder="Nome do Evento" value={nameEvent} onChange={ e => setNameEvent(e.target.value) }/>
                            <input placeholder="Nome da Classe" value={nameClass} onChange={ e => setNameClass(e.target.value) } type="text"/>
                            
                            <button className="button">Adicionar evento para classe</button>
                            <span className="close-register" id="modal-event-class">
                                <img id="modal-event-class" src={icClose} alt="" height="18px"/>
                            </span>
                        </form>
                    </div>
                </div>

                <div id="modal-delete" className="modal-container-delete">
                    <div className="delete-container">
                        <section className="form">
                            <h1>Deletar Relação</h1>
                            <p>Tem certeza que deseja deletar esta relação?</p>
                            <div className="btn-confirm">
                                <button id="modal-delete" className="button">Cancelar</button>
                                <button className="bt-lixeira">Deletar Relação</button>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
}