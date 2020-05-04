import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';

import logoImg from '../../assets/logoTschool.svg';
import menuImg from '../../assets/menu.png';
import icClose from '../../assets/close.png';
import btLogout from '../../assets/btLogout.png';

import api from '../../services/api';

import './style.css';
import '../standard.css';
import '../modal-delete.css';

export default function Responsible(){
    const schoolId = localStorage.getItem('schoolId');
    const schoolName = localStorage.getItem('schoolName');

    //Função cadastrar
    const [ name_res, setName_Res ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ zip_code, setZip_code ] = useState('');
    const [ cpf, setCpf ] = useState('');
    const [ password, setPassword ] = useState('');

    //Variáveis padrões
    const [responsibles, setResponsibles] = useState([]);
    const [responsibleListId, setResponsibleListId] = useState(['']);
    const [open, setOpen] = useState([0]);
    const history = useHistory();

    //Drop Downs
    const [classList, setClassList] = useState([]);

    async function handleRegister(e) {
        e.preventDefault();

        const data = ({name_res, email, zip_code, cpf, password});

        if(name_res === "" || email === "" ||zip_code === "" ||cpf === "" ||password === "") {
            alert('Todos os campos são obrigatórios.');
        } else {
            try {
                await api.post('responsible', data);
                removeModal('modal-responsible');
                window.location.reload();
            } catch(err) {
                alert('Erro no cadastro, tente novamente');
            }
        }
    };

    //Carregar lista do banco
    useEffect( () => {
        api.get('responsible', {}).then(response => {setResponsibles(response.data)});
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

        setResponsibleListId(id);

        modal.classList.add('show');
        modal.addEventListener('click', (event) => {
            if(event.target.id === 'modal-edit') {
                modal.classList.remove('show');
            }
        });

        const datas = async () => { 
            const res = await api.get(`responsible/${id}`);

            setName_Res(res.data[0].name_res);
            setZip_code(res.data[0].zip_code);
            setEmail(res.data[0].email);
            setPassword(res.data[0].password);
            setCpf(res.data[0].cpf);
        };

        datas();
    }

    async function handleUpdate() {
        const data = ({name_res, email, zip_code, cpf, password});

        try {
            removeModal('modal-edit');
            await api.put(`responsible/${responsibleListId}`, data);
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
                await api.delete(`responsible/${id}`, {});
                setResponsibles(responsibles.filter(responsible => responsible.id_res !== id));
                trash.removeEventListener('click', addDelete);
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
        <div className="responsible-container">
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
            
            <div className="body">
                <div className="nav-bar-container">
                    <header>
                        <img className="logo" src={logoImg} alt="Tschool"/>
                        <span>{schoolName}</span>

                        <button className="bt-register" onClick={ () => startModal('modal-responsible') }>Cadastrar Novo</button>
                        <button onClick={handleLogout} type="button">
                            <img src={btLogout} alt=""/>
                        </button>
                    </header>
                </div>

                <h1>Responsáveis</h1>

                <div className="dropdown-container">
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
                    {responsibles.map( (responsible) => (
                        <li key={responsible.id_res}>
                            <strong>Nome</strong>
                            <p>{responsible.name_res}</p>

                            <div className="group">
                                <div>
                                    <strong>Zip-Code</strong>
                                    <p>{responsible.zip_code}</p>
                                </div>
                                <div>
                                    <strong>CPF</strong>
                                    <p>{responsible.cpf}</p>
                                </div>
                                <div>
                                    <strong>Email</strong>
                                    <p>{responsible.email}</p>
                                </div>
                                <div>
                                    <strong>Senha</strong>
                                    <p>{responsible.password}</p>
                                </div>
                            </div>

                            <button className="bt-edit">
                                <FiEdit2 size={16} color="#fff" onClick={ () => startModalEdit(responsible.id_res) }/>
                            </button>
                            
                            <button className="bt-lixeira" onClick={ () => startModalDelete(responsible.id_res) }>
                                <FiTrash2 size={16} color="#fff" />
                            </button>
                        </li>
                    ))}
                </ul>
            </div>

            <div id="modal-responsible" className="modal-register-container">
                <div className="content">
                    <section>
                        <img src={logoImg} alt="Tschool"/>
                        <h1>Cadastrar Novo Responsável</h1>
                        <p>Descreva todas as informações necessárias para o cadastro do Responsável.</p>
                    </section>
                    <form onSubmit={handleRegister}>
                        <input placeholder="Nome do Responsável" className="inEscola" value={name_res} onChange={ e => setName_Res(e.target.value) }/>
                        <td>
                            <input placeholder="Usuário" type="text" value={email} onChange={ e => setEmail(e.target.value) }/>                        
                            <input type="text" placeholder="CPF" value={cpf} onChange={ e => setCpf(e.target.value) }/>
                        </td>
                        <td>
                            <input placeholder="Senha" type="password" className="inSenha" value={password} onChange={ e => setPassword(e.target.value) }/>
                            <input placeholder="CEP" type="text" className="inRG" value={zip_code} onChange={ e => setZip_code(e.target.value) }/>
                        </td>
                        <button id="modal-responsible" className="button" type="submit">Cadastrar Responsável</button>
                    </form>
                    <span className="close-register" id="modal-responsible">
                        <img id="modal-responsible" src={icClose} alt="" height="18px"/>
                    </span>
                </div>
            </div>

            <div id="modal-edit" className="modal-register-container">
                <div className="content">
                    <section>
                        <img src={logoImg} alt="Tschool"/>
                        <h1>Atualizar Responsável</h1>
                        <p>Atualize as informações do responsável.</p>
                    </section>
                    <form onSubmit={handleUpdate}>
                        <input placeholder="Nome do Responsável" className="inEscola" value={name_res} onChange={ e => setName_Res(e.target.value) }/>
                        <td>
                            <input placeholder="Usuário" type="text" value={email} onChange={ e => setEmail(e.target.value) }/>                        
                            <input type="text" placeholder="CPF" value={cpf} onChange={ e => setCpf(e.target.value) }/>
                        </td>
                        <td>
                            <input placeholder="Senha" type="password" className="inSenha" value={password} onChange={ e => setPassword(e.target.value) }/>
                            <input placeholder="CEP" type="text" className="inRG" value={zip_code} onChange={ e => setZip_code(e.target.value) }/>
                        </td>
                        <button className="button" type="submit">Atualizar dados</button>
                    </form>
                    <span className="close-register" id="modal-edit">
                        <img id="modal-edit" src={icClose} alt="" height="18px"/>
                    </span>
                </div>
            </div>

            <div id="modal-delete" className="modal-container-delete">
                <div className="delete-container">
                    <section className="form">
                        <h1>Deletar Responsável</h1>
                        <p>Tem certeza que deseja deletar o Responsável?</p>
                        <div className="btn-confirm">
                            <button id="close-modal-delete" className="button">Cancelar</button>
                            <button className="bt-lixeira">Deletar Responsável</button>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}