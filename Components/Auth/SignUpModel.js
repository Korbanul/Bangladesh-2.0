"use client"
import { Modal } from "react-bootstrap";
import SignUpForm from "../../app/(auth)/signUp/page";


export default function SignUpModel({show,handleClose}){
    const handleSignup=async(data)=>{
            console.log(data);
            handleClose();
    }
    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton> 
                <Modal.Title className="w-100 text-center">SignUp</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <SignUpForm onSubmit={handleSignup}/>
            </Modal.Body>

        </Modal>
    );
}