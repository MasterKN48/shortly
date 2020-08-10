import React from 'react';
import Brand from './Brand.png';
export default function Footer() {
    return (
        <footer className="bg-dark text-white p-4 container-fluid text-center" id="#footer">
             <img src={Brand} alt="brand" style={{height:'45px',width:'45px'}}/>
             Shortly : URL Shortner <br />
             Copyright &copy; {new Date().getFullYear()}   <i className="india flag"></i>
        </footer> 
    )
}