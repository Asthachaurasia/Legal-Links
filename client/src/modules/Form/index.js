import React, { useState, useEffect } from "react";
import Input from "../../components/input";
import Button from "../../components/Button";
import { useNavigate } from 'react-router-dom';

const Form = ({ isSignInPage }) => {
    const [data, setData] = useState({
        name: '',
        email: '',
        password: '',
        ...(isSignInPage ? {} : { gender: '', age: '' })
    });

    useEffect(() => {
        setData({
            name: '',
            email: '',
            password: '',
            ...(isSignInPage ? {} : { gender: '', age: '' })
        });
    }, [isSignInPage]);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = { ...data };

        // Remove name if it's sign-in page
        if (isSignInPage) {
            delete payload.name;
            delete payload.gender;
            delete payload.age;
        }

        console.log('Payload: >>', payload);

        const res = await fetch(`http://localhost:4000/auth/${isSignInPage ? 'login' : 'signup/user'}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });


         if(res.status===401){
            alert(res.message)



         }
         else if(res.status===400){
            alert(res.message)
         }

         else{
            const resData = await res.json();
            if(resData.token){
                localStorage.setItem('user:token',resData.token)
                localStorage.setItem('user:detail',JSON.stringify(resData.user))

                navigate('/')
            }
            
         }
       
         
        


    };
     

    
    return (
        <div className="bg-light h-screen flex items-center justify-center">
            <div className="bg-white w-[450px] min-h-[600px] shadow-lg rounded-lg flex flex-col justify-center items-center">
                <div className="text-4xl font-extrabold mb-14">
                    Welcome {isSignInPage && 'Back'}
                </div>
                
                <form 
                    className="flex flex-col items-center w-full" 
                    onSubmit={(e) => handleSubmit(e)}
                >
                    {!isSignInPage && (
                        <Input 
                            label="Full Name" 
                            name="name" 
                            placeholder="Enter your full name" 
                            className="mb-6 w-[50%]" 
                            value={data.name} 
                            onChange={(e) => setData({ ...data, name: e.target.value })}
                        />
                    )}
                    <Input 
                        label="Email" 
                        type="email"
                        name="email" 
                        placeholder="Enter your email" 
                        className="mb-6 w-[50%]" 
                        value={data.email} 
                        onChange={(e) => setData({ ...data, email: e.target.value })}
                    />
                    <Input 
                        label="Password" 
                        type="password" 
                        name="password" 
                        placeholder="Enter your Password" 
                        className="mb-6 w-[50%]" 
                        value={data.password} 
                        onChange={(e) => setData({ ...data, password: e.target.value })}
                    />

                    {!isSignInPage && (
                        <>
                            <Input 
                                label="Gender" 
                                name="gender" 
                                placeholder="Enter your gender" 
                                className="mb-6 w-[50%]" 
                                value={data.gender} 
                                onChange={(e) => setData({ ...data, gender: e.target.value })}
                            />
                            <Input 
                                label="Age" 
                                name="age" 
                                type="numeric"
                                placeholder="Enter your age" 
                                className="mb-14 w-[50%]" 
                                value={data.age} 
                                onChange={(e) => setData({ ...data, age: e.target.value })}
                            />
                        </>
                    )}

                    <Button 
                        label={isSignInPage ? 'Sign in' : 'Sign up'} 
                        type='submit'
                        className="w-[50%] mb-2"
                    />
                </form>
                
                <div className="m-4">
                    {isSignInPage ? "Don't have an account?" : "Already have an account?"} 
                    <span 
                        className="text-primary cursor-pointer underline"
                        onClick={() => navigate(isSignInPage ? '/users/sign_up' : '/users/sign_in')}
                    >
                        {isSignInPage ? 'Sign up' : 'Sign in'}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default Form;
