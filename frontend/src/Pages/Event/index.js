import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';

import logoImg from '../../assets/logoTschool.svg';
import menuImg from '../../assets/menu.png';
import btLogout from '../../assets/btLogout.png';
import icClose from '../../assets/close.png';

import api from '../../services/api';

import './style.css';
import '../standard.css';
import '../modal-delete.css';

export default function Event(){
    const schoolId = localStorage.getItem('schoolId');
    const schoolName = localStorage.getItem('schoolName');

    //const id = localStorage.getItem('ongId');

    //Função cadastrar
    const [ title, setTitle ] = useState('');
    const [ endereco, setEndereco ] = useState('');
    const [ date, setDate ] = useState('');
    const [ hr_ini, setHr_ini ] = useState('');
    const [ hr_fin, setHr_fin ] = useState('');
    const [ description, setDescription ] = useState('');
    const [ observation, setObservation ] = useState('');
    const [ value, setValue ] = useState('');

    const [events, setEvents] = useState([]);
    const [eventListId, setEventListId] = useState(['']);

    const [open, setOpen] = useState([0]);
    const history = useHistory();

    //Drop Dows
    const [classList, setClassList] = useState([]);

    //Create New Event
    async function handleNewEvent(e) {
        e.preventDefault();

        const data = ({title, endereco, date, hr_ini, hr_fin, description, observation, value});

        if(title === "" || endereco === "" ||date === "" ||hr_ini === "" ||hr_fin === "" ||description === "" ||value === "") {
            alert('Somente o campo de observações pode ser nulo.');
        } else {
            try {
                await api.post('event', data, { headers: { Authorization: schoolId } });
                removeModal('modal-event');
                window.location.reload();
            } catch(err) {
                alert('Erro no cadastro, tente novamente');
            }
        }
    };

    //Carregar lista do banco
    useEffect( () => {
        api.get('event', {
            headers: {
                Authorization: schoolId,
            }
        }).then(response => {
            setEvents(response.data);
        });
        api.get('class', {
            headers: {
                Authorization: schoolId,
            }
        }).then(response => {
            setClassList(response.data);
        });
    }, [schoolId]); //2 parametros - 1)Qual função a ser executada. 2)Quando que a função será executada.

    //Remover modal
    function removeModal(modalId){
        const modal = document.getElementById(modalId);
        modal.classList.remove('show');
    }

    //Iniciar modal comum
    function startModal(modalId) {
        const modal = document.getElementById(modalId);
        
        modal.classList.add('show');
        modal.addEventListener('click', (event) => {
            
            if(event.target.id === modalId || event.target.className === 'close-login') {
                modal.classList.remove('show');
            }
        });
    }

    //Iniciar modal edit
    function startModalEdit(id) {
        const modal = document.getElementById('modal-edit');

        setEventListId(id);

        modal.classList.add('show');
        modal.addEventListener('click', (event) => {
            if(event.target.id === 'modal-edit') {
                modal.classList.remove('show');
            }
        });

        const datas = async () => { 
            const res = await api.get(`event/${id}`);

            setTitle(res.data[0].title);
            setDescription(res.data[0].description);
            setDate(res.data[0].date);
            setValue(res.data[0].value);
            setObservation(res.data[0].observation);
            setHr_fin(res.data[0].hr_fin);
            setHr_ini(res.data[0].hr_ini);
            setEndereco(res.data[0].endereco);
        };

        datas();
    }

    async function handleUpdate() {
        const data = ({title, endereco, date, hr_ini, hr_fin, description, observation, value});
            try {
                console.log(data);
                removeModal('modal-edit');
                await api.put(`event/${eventListId}`, data);
            } catch(err) {
                alert('Erro na atualização, tente novamente');
            }
    }

    //Iniciar modal de delete passando ID para borão de confirmar
    function startModalDelete(id) {
        const modal = document.getElementById('modal-delete');
        const event = document.querySelector('div.btn-confirm button.bt-lixeira');
        const cancel = document.querySelector('div.btn-confirm button#modal-delete');

        modal.classList.add('show');
        modal.addEventListener('click', (event) => {
            if(event.target.id === 'modal-delete' || event.target.id === 'bt-lixeira-event') {
                modal.classList.remove('show');
            }
        });

        const addDelete = async () => {
            try {
                await api.delete(`event/${id}`, {
                    headers: {
                        Authorization: schoolId,
                    }
                });
                setEvents(events.filter(event => event.id_event !== id))
            } catch (err) {
                alert('Erro ao deletar evento, tente novamente.');
            }
        }

        //Evento para remover evento do botão e não deletar todos os eventos que foram clicados ao mesmo tempo
        cancel.addEventListener('click', () => { event.removeEventListener('click', addDelete) });
        
        event.addEventListener('click', addDelete);
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
        <div className="event-container">
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

                        <button className="bt-register" onClick={ () => startModal('modal-event') }>Cadastrar Novo</button>
                        <button onClick={handleLogout} type="button">
                            <img src={btLogout} alt=""/>
                        </button>
                    </header>
                </div>

                <h1>Eventos</h1>

                <div className="dropdown-container">
                    <select id="drop-classes">
                            <option value="default">Todas os Eventos</option>
                        {events.map( (event) => (
                            <option key={event.id} value={event.id}>
                                {event.title}
                            </option>
                        ))}
                    </select>
                    <select id="drop-classes">
                            <option value="default">Todas as Classes</option>
                        {classList.map( (classe) => (
                            <option key={classe.id} value={classe.id}>
                                {classe.nameclass}
                            </option>
                        ))}
                    </select>
                </div>

                <ul className="container-list">
                    {events.map( (event) => (
                        <li key={event.id_event}>
                            <strong>Nome</strong>
                            <p>{event.title}</p>

                            <strong>Endereço</strong>
                            <p>{event.endereco}</p>

                            <div className="group">
                                <div>
                                    <strong>Data</strong>
                                    <p>{event.date}</p>
                                </div>
                                <div>
                                    <strong>Horario Inicial</strong>
                                    <p>{event.hr_ini}</p>
                                </div>
                                <div>
                                    <strong>Horario Final</strong>
                                    <p>{event.hr_fin}</p>
                                </div>
                            </div>

                            <strong>Descrição</strong>
                            <p>{event.description}</p>

                            <div className="group">
                                <div>
                                    <strong>Observações</strong>
                                    <p>{event.observation}</p>
                                </div>
                                <div>
                                    <strong>Valor</strong>
                                    <p>R$ {event.value}</p>
                                </div>
                            </div>

                            <button className="bt-edit" onClick={ () => startModalEdit(event.id_event) }>
                                <FiEdit2 size={16} color="#fff" />
                            </button>
                            
                            <button className="bt-lixeira" onClick={ () => startModalDelete(event.id_event) }>
                                <FiTrash2 size={16} color="#fff" />
                            </button>
                        </li>
                    ))}
                </ul>

                <div id="modal-event" className="modal-register-container">
                    <div className="content">
                        <section>
                            <img src={logoImg} alt="Tschool"/>
                            <h1>Cadastro</h1>
                            <p>Descreva todas as informações necessárias para o evento, data, local e observações, valor.</p>
                        </section>
                        <form onSubmit={handleNewEvent}>
                            <input placeholder="Nome do Evento" value={title} onChange={ e => setTitle(e.target.value) }/>
                            <input placeholder="Endereço" value={endereco} onChange={ e => setEndereco(e.target.value) }/>
                            <div className="input-group">
                                <input placeholder="" value={date} onChange={ e => setDate(e.target.value) } type="date"/>
                                <p>das</p>
                                <input placeholder="" value={hr_ini} onChange={ e => setHr_ini(e.target.value) } type="time"/>
                                <p>às</p>
                                <input placeholder="" value={hr_fin} onChange={ e => setHr_fin(e.target.value) } type="time"/>
                            </div>
                            <textarea placeholder="Descrições" value={description} onChange={ e => setDescription(e.target.value) }/>
                            <textarea placeholder="Observações" value={observation} onChange={ e => setObservation(e.target.value) }/>
                            <input placeholder="Valor" type="number" value={value} onChange={ e => setValue(e.target.value) } />

                            <button className="button">Cadastrar</button>
                            <span className="close-register" id="modal-event">
                                <img id="modal-event" src={icClose} alt="" height="18px"/>
                            </span>
                        </form>
                    </div>
                </div>

                <div id="modal-edit" className="modal-register-container">
                    <div className="content">
                        <section>
                            <img src={logoImg} alt="Tschool"/>
                            <h1>Atualizar Dados</h1>
                            <p>Atualize as informações necessárias.</p>
                        </section>
                        <form onSubmit={handleUpdate}>
                            <input placeholder="Nome do Evento" value={title} onChange={ e => setTitle(e.target.value) }/>
                            <input placeholder="Endereço" value={endereco} onChange={ e => setEndereco(e.target.value) }/>
                            <div className="input-group">
                                <input placeholder="" value={date} onChange={ e => setDate(e.target.value) } type="date"/>
                                <p>das</p>
                                <input placeholder="" value={hr_ini} onChange={ e => setHr_ini(e.target.value) } type="time"/>
                                <p>às</p>
                                <input placeholder="" value={hr_fin} onChange={ e => setHr_fin(e.target.value) } type="time"/>
                            </div>
                            <textarea placeholder="Descrições" value={description} onChange={ e => setDescription(e.target.value) }/>
                            <textarea placeholder="Observações" value={observation} onChange={ e => setObservation(e.target.value) }/>
                            <input placeholder="Valor" type="number" value={value} onChange={ e => setValue(e.target.value) } />

                            <button id="update" className="button">Atualizar Evento</button>
                            <span className="close-register" id="modal-edit">
                                <img id="modal-edit" src={icClose} alt="" height="18px"/>
                            </span>
                        </form>
                    </div>
                </div>

                <div id="modal-delete" className="modal-container-delete">
                    <div className="delete-container">
                        <section className="form">
                            <h1>Deletar Evento</h1>
                            <p>Tem certeza que deseja deletar este evento?</p>
                            <div className="btn-confirm">
                                <button id="modal-delete" className="button">Cancelar</button>
                                <button id="bt-lixeira-event" className="bt-lixeira">Deletar Evento</button>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
}