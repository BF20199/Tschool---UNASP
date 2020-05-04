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

export default function Student(){
    const schoolId = localStorage.getItem('schoolId');
    const schoolName = localStorage.getItem('schoolName');

    //Função cadastrar
    const [ name_student, setName ] = useState('');
    const [ idade, setIdade ] = useState('');
    //const [ rg, setRg ] = useState('');
    //const [ cpf, setCpf ] = useState('');
    const [ id_class, setClasse ] = useState('');
    const [ id_res, setResponsible ] = useState('');

    //Variáveis padrões
    const [students, setStudents] = useState([]);
    const [classList, setClassList] = useState([]);
    const [studentListId, setStudentListId] = useState(['']);
    const [open, setOpen] = useState([0]);
    const history = useHistory();

    async function handleRegister(e) {
        e.preventDefault();

        const data = ({name_student, idade});

        if(name_student === "" || idade === "" ||id_class === "" ||id_res === "") {
            alert('Todos os campos são obrigatórios.');
        } else {
            try {
                await api.post('student', data, { 
                    headers: { Authclass: id_class, cpf: id_res } 
                });
                removeModal('modal-student');
                window.location.reload();
            } catch(err) {
                alert('Erro no cadastro, tente novamente');
            }
        }
    };

    //Carregar lista do banco
    useEffect( () => {
        api.get('students', {
            headers: {
                Authorization: schoolId,
            }
        }).then(response => {
            setStudents(response.data);
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

        setStudentListId(id);

        modal.classList.add('show');
        modal.addEventListener('click', (event) => {
            if(event.target.id === 'modal-edit') {
                modal.classList.remove('show');
                setName('');
                setIdade('');
                setResponsible('');
                setClasse('');
            }
        });

        const datas = async () => { 
            const res = await api.get(`studentsbyid/${id}`);

            setName(res.data[0].name_student);
            setIdade(res.data[0].idade);
            setResponsible(res.data[0].cpf);
            setClasse(res.data[0].id_class);
        };

        datas();
    }

    async function handleUpdate() {
        const data = ({ name_student, idade });
        alert(studentListId);
        try {
            removeModal('modal-edit');

            await api.put(`student/${studentListId}`, data, { 
                headers: { Authclass: id_class, Cpf: id_res } 
            });
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
                await api.delete(`student/${id}`);
                setStudents(students.filter(student => student.id !== id));
                trash.removeEventListener('click', addDelete);
            } catch (err) {
                alert('Erro ao deletar aluno, tente novamente.');
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
        <div className="student-container">
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

                        <button className="bt-register" onClick={ () => startModal('modal-student') }>Cadastrar Novo</button>
                        <button onClick={handleLogout} type="button">
                            <img src={btLogout} alt=""/>
                        </button>
                    </header>
                </div>

                <h1>Alunos</h1>

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
                    {students.map( (student) => (
                    <li key={student.id}>
                        <strong>Nome</strong>
                        <p>{student.name_student}</p>

                        <div className="group">
                            <div>
                                <strong>Idade</strong>
                                <p>{student.idade}</p>
                            </div>
                            <div>
                                <strong>RG</strong>
                                <p>xx.xxx.xxx-x</p>
                            </div>
                            <div>
                                <strong>CPF</strong>
                                <p>xxx.xxx.xxx-xx</p>
                            </div>
                        </div>

                        <div className="group">
                            <div>
                                <strong>Classe</strong>
                                <p>{student.nameclass}</p>
                            </div>
                            <div>
                                <strong>Responsável</strong>
                                <p>{student.name_res}</p>
                            </div>
                        </div>

                        <button className="bt-edit">
                            <FiEdit2 size={16} color="#fff" onClick={ () => startModalEdit(student.id) }/>
                        </button>
                        
                        <button className="bt-lixeira" onClick={ () => startModalDelete(student.id) }>
                            <FiTrash2 size={16} color="#fff" />
                        </button>
                    </li>
                    ))}
                </ul>

                <div id="modal-student" className="modal-register-container">
                    <div className="content">
                        <section>
                            <img src={logoImg} alt="Tschool"/>
                            <h1>Cadastro Aluno</h1>
                            <p>Descreva todas as informações necessárias para o cadastro do Aluno.</p>
                        </section>
                        <form onSubmit={handleRegister}>
                            <input placeholder="Nome do Aluno" value={name_student} onChange={ e => setName(e.target.value) }/>
                            <input placeholder="idade" value={idade} onChange={ e => setIdade(e.target.value) } type="number"/>
                            {/* <div className="input-group-student">
                                <input placeholder="rg" value={cpf} onChange={ e => setRg(e.target.value) } type="text"/>
                                <input placeholder="cpf" value={rg} onChange={ e => setCpf(e.target.value) } type="text"/>
                            </div> */}

                            <select id="drop-classes" onChange={ e => setClasse(e.target.value) }>
                                <option value="" >Selecione uma Classe</option>
                                {classList.map( (classe) => (
                                    <option key={classe.id_class} value={classe.id_class} onChange={ e => setClasse(classe.id_class) }>
                                        {classe.nameclass}
                                    </option>
                                ))}
                            </select>

                            <input placeholder="CPF do responsável" value={id_res} onChange={ e => setResponsible(e.target.value) }/>

                            <button className="button">Cadastrar</button>
                            <span className="close-register" id="modal-student">
                                <img id="modal-student" src={icClose} alt="" height="18px"/>
                            </span>
                        </form>
                    </div>
                </div>

                <div id="modal-edit" className="modal-register-container">
                    <div className="content">
                        <section>
                            <img src={logoImg} alt="Tschool"/>
                            <h1>Atualizar Aluno</h1>
                            <p>Descreva todas as informações necessárias para o atualizar o Aluno.</p>
                        </section>
                        <form onSubmit={handleUpdate}>
                            <input placeholder="Nome do Aluno" value={name_student} onChange={ e => setName(e.target.value) }/>
                            <input placeholder="idade" value={idade} onChange={ e => setIdade(e.target.value) } type="number"/>
                            {/* <div className="input-group-student">
                                <input placeholder="rg" value={cpf} onChange={ e => setRg(e.target.value) } type="text"/>
                                <input placeholder="cpf" value={rg} onChange={ e => setCpf(e.target.value) } type="text"/>
                            </div> */}

                            <select id="drop-classes">
                                <option value="" >Selecione uma Classe</option>
                                {classList.map( (classe) => (
                                    <option key={classe.id_class} value={classe.id_class} onChange={ e => setClasse(classe.id_class) }>
                                        {classe.nameclass}
                                    </option>
                                ))}
                            </select>

                            <input placeholder="CPF do responsável" value={id_res} onChange={ e => setResponsible(e.target.value) }/>

                            <button className="button">Atualizar Aluno</button>
                            <span className="close-register" id="modal-edit">
                                <img id="modal-edit" src={icClose} alt="" height="18px"/>
                            </span>
                        </form>
                    </div>
                </div>

                <div id="modal-delete" className="modal-container-delete">
                    <div className="delete-container">
                        <section className="form">
                            <h1>Deletar Aluno</h1>
                            <p>Tem certeza que deseja deletar este aluno?</p>
                            <div className="btn-confirm">
                                <button id="close-modal-delete" className="button">Cancelar</button>
                                <button className="bt-lixeira">Deletar Aluno</button>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
}