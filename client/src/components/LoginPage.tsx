import React from 'react'
import "../styles/loginpage.css"
const imageLink = "https://media.istockphoto.com/id/1461182793/vector/cute-teddy-bear-winking-eye-with-red-heart-cartoon-vector-illustration.jpg?s=612x612&w=0&k=20&c=HyZ1KmOp8h155HqNmYVlWQ4fEL7AzDs5KuWU-i6HM6c=";

const LoginPage = () => {
  return (
    <div className="login-page">
      <p>
        Login with your brown.edu email to access the Critical Schedule Maker!
      </p>
      <img
        className='bear-image'
        src={imageLink}
        alt="Valentines Day Bear"
      />
    </div>
  );
}

export default LoginPage