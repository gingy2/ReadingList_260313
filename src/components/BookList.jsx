import React, { useContext, useEffect, useState } from 'react';
import { BookContext } from '../App';

const BookList = () => {

    const {book, setBook}=useContext(BookContext); // 저장된
    const [input, setInput]=useState(''); // 입력된
    const [edit, setEdit]=useState(null); // 입력된+수정할

    // const {bookList}=useContext(BookContext);

    const inputList=(e)=>{ // type in
        setInput(e.target.value);
    }

    const onAdd=()=>{
    if(edit!==null){
        setBook(book.map((b)=>b.id===edit?{...b,msg:input}:b));
        setEdit(null);
    }
    else{
        setBook([...book,{id:Date.now(),msg:input}])
    }
    setInput('');
    }

    const onKeyDown=(e)=>{
        if(e.key==='Enter'){
            onAdd();
        }
    }

    const onEdit=(b)=>{ // Edit
        setInput(b.msg);
        setEdit(b.id);
    }

    const onDel=(id)=>{ // Delete
        setBook(book.filter((b)=>b.id!==id));
        if(id===edit){
            setEdit(null);
            setInput('');
        }
    }

    useEffect(()=>{ // 책 제목 localStorage에 문자열로 저장
        localStorage.setItem('book',JSON.stringify(book));
    },[book]);

    useEffect(()=>{ // 수정 시 기존 내용 입력창에 불러오기
        const savedBook=localStorage.getItem('book');
        if(savedBook){
            setBook(JSON.parse(savedBook));
        }
    },[]);

    const style={
        backgroundColor: 'lightGreen',
        margin: '20px'
    }

    return (
        <div style={style}>
            <h2> Book List </h2>
            <input type="text" value={input} onChange={inputList} onKeyDown={onKeyDown} placeholder='which book you wanna read'/>
            <button onClick={onAdd}>{edit!==null?'Edit':'Add'}</button>
                <ol>
                    {book.map((b)=>(
                        <li key={b.id}>{b.msg}
                            <button onClick={()=>onEdit(b)}> Edit </button>
                            <button onClick={()=>onDel(b.id)}> Delete </button>
                        </li>
                    ))}                
                </ol>
            <p>You have {book.length} books to read!</p>
        </div>
    );
};

export default BookList;