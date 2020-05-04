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

export default function Class(){
    const schoolId = localStorage.getItem('schoolId');
    const schoolName = localStorage.getItem('schoolName');

    //Função cadastrar
    const [ nameclass, setName ] = useState('');
    const [ period, setPeriod ] = useState('');

    const [classes, setClasses] = useState([]);
    const [classListId, setClassListId] = useState(['']);

    const [open, setOpen] = useState([0]);
    const history = useHistory();

    async function handleRegister(e) {
        e.preventDefault();

        const data = ({nameclass, period});

        if(nameclass === "" || period === "") {
            alert('Todos os campos são obrigatórios.');
        } else {    
            try {
                await api.post('class', data, { headers: { Authorization: schoolId } });
                removeModal('modal-class');
                window.location.reload();
            } catch(err) {
                alert('Erro no cadastro, tente novamente');
            }
        }
    };

    //Carregar lista do banco
    useEffect( () => {
        api.get('class', {
            headers: {
                Authorization: schoolId,
            }
        }).then(response => {
            setClasses(response.data);
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

        setClassListId(id);

        modal.classList.add('show');
        modal.addEventListener('click', (event) => {
            if(event.target.id === 'modal-edit') {
                modal.classList.remove('show');
            }
        });

        const datas = async () => { 
            const res = await api.get(`class/${id}`);

            setName(res.data[0].nameclass);
            setPeriod(res.data[0].period);
        };

        datas();
    }

    //Função Atualizar
    async function handleUpdate() {
        const data = ({nameclass, period});
            try {
                removeModal('modal-edit');
                await api.put(`class/${classListId}`, data);
            } catch(err) {
                alert('Erro na atualização, tente novamente');
            }
    }

    //Iniciar modal de delete passando ID para borão de confirmar
    function startModalDelete(id) {
        const modal = document.getElementById('modal-delete');
        const trash = document.querySelector('div.btn-confirm button.bt-lixeira');
        const cancel = document.querySelector('div.btn-confirm button#close-modal-delete');

        modal.classList.add('show');
        modal.addEventListener('click', (trash) => {
            if(trash.target.id === 'close-modal-delete' || trash.target.className === 'bt-lixeira') {
                modal.classList.remove('show');
            }
        });

        const addDelete = async () => {
            try {
                await api.delete(`class/${id}`, {
                    headers: {
                        Authorization: schoolId,
                    }
                });
                setClasses(classes.filter(classe => classe.id_class !== id))
            } catch (err) {
                alert('Erro ao deletar classe, tente novamente.');
            }
        }

        cancel.addEventListener('click', () => { trash.removeEventListener('click', addDelete) });
        
        trash.addEventListener('click', addDelete);
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
        <div className="class-container">
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

                        <button className="bt-register" onClick={ () => startModal('modal-class') }>Cadastrar Nova</button>
                        <button onClick={handleLogout} type="button">
                            <img src={btLogout} alt=""/>
                        </button>
                    </header>
                </div>

                <h1>Classes</h1>

                <ul className="container-list">
                    {classes.map( (classe) => (
                        <li key={classe.id_class}>
                            <div className="group">
                                <div>
                                    <strong>Nome</strong>
                                    <p>{classe.nameclass}</p>
                                </div>
                                <div>
                                    <strong>Período</strong>
                                    <p>{classe.period}</p>
                                </div>
                                <div>
                                    <strong>Qtd Alunos</strong>
                                    <p>{classe.num_students}</p>
                                </div>
                            </div>

                            <button className="bt-edit" onClick={ () => startModalEdit(classe.id_class) }>
                                <FiEdit2 size={16} color="#fff" />
                            </button>
                            
                            <button className="bt-lixeira" onClick={ () => startModalDelete(classe.id_class) }>
                                <FiTrash2 size={16} color="#fff" />
                            </button>
                        </li>
                    ))}
                </ul>

                <div id="modal-class" className="modal-register-container">
                    <div className="content">
                        <section>
                            <img src={logoImg} alt="Tschool"/>
                            <h1>Cadastro Classe</h1>
                            <p>Descreva todas as informações necessárias para o cadastro da Classe.</p>
                        </section>
                        <form onSubmit={handleRegister}>
                            <input placeholder="Nome da Classe" value={nameclass} onChange={ e => setName(e.target.value) }/>
                            <input placeholder="Período" value={period} onChange={ e => setPeriod(e.target.value) } type="text"/>
                            
                            <button className="button" type="submit">Cadastrar</button>
                            <span className="close-register" id="modal-class">
                                <img id="modal-class" src={icClose} alt="" height="18px"/>
                            </span>
                        </form>
                    </div>
                </div>

                <div id="modal-edit" className="modal-register-container">
                    <div className="content">
                        <section>
                            <img src={logoImg} alt="Tschool"/>
                            <h1>Atualizar Classes</h1>
                            <p>Atualize as informações da classe.</p>
                        </section>
                        <form onSubmit={handleUpdate}>
                            <input placeholder="Nome da Classe" value={nameclass} onChange={ e => setName(e.target.value) }/>
                            <input placeholder="Período" value={period} onChange={ e => setPeriod(e.target.value) } type="text"/>
                            
                            <button className="button" type="submit">Atualizar Classe</button>
                            <span className="close-register" id="modal-edit">
                                <img id="modal-edit" src={icClose} alt="" height="18px"/>
                            </span>
                        </form>
                    </div>
                </div>

                <div id="modal-delete" className="modal-container-delete">
                    <div className="delete-container">
                        <section className="form">
                            <h1>Deletar Classe</h1>
                            <p>Tem certeza que deseja deletar esta Classe?</p>
                            <div className="btn-confirm">
                                <button id="close-modal-delete" className="button">Cancelar</button>
                                <button className="bt-lixeira">Deletar Classe</button>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
}