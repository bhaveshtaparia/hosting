import React from 'react'

import './About.css'
export default function About() {
  return (
    <>
    <div className='bg'>
<h1 style={{color:"red"}}>About Us</h1>
    <div className="box">
        <div className="box1"><h2>Intro</h2>

            <p >Name: Bhavesh Taparia</p>
            <p > Email: bhaveshtaparia9694@gmail.com</p>

        </div>

        <div className="box1"><h2>Skills</h2>
            <p >Data Structure</p>
            (<a target="_blank" href='https://auth.geeksforgeeks.org/user/bhaveshtaparia7821/practice'>gfg ,</a>
            <a target="_blank" href='https://leetcode.com/Bhavesh_Taparia/'>Leetcode ,</a>
            <a target="_blank" href='https://www.codechef.com/users/cu_21bcs11461'>CodeChef</a>)
            <p >competitive programmer (c,c++,java)</p>
            <p >Full stack developer(html,css,js,node js,react js)</p>
            <p> App developer(begineer level)</p>

        </div>
        <div className="box1"><h2>Achivement</h2>
            <p > currently :3 star coder in codechef</p>
            <a target="_blank"
                href="https://github.com/bhaveshtaparia/VGB">Github Ripo</a>
            <p> link for website (some basic app (you can download )) </p>
            <a target="_blank"  href="https://vgb.netlify.app">click
                here</a>


        </div>
        <div className="box1"><h2>Qualification</h2>
            <h3>BE-CSE</h3>
            <p>Cgpa-8.18( Till 3 sem )</p>
            <p >12 -Board: 86%</p>
            <p >10 -Board: 89.33%</p>
        </div>
        </div>
                </div>
    </>
    
  )
}
