import React from 'react'
import ReactStars from 'react-rating-stars-component'
import profile from '../../Images/profile.png'
export default function ReviewCard({review}) {
    const options={
        edit:false,
        color:"grey",
        activeColor:"tomato",
        value:review.rating,
        isHalf:true,
        size:window.innerWidth<600?20:25
      };
    return (
    <>
    <div className="reviewCard">
    <img src={profile} alt='User'/>
    <p>{review.name}</p>
    <ReactStars {...options}/>
    <span>{review.comment}</span>
    </div>
    </>
  )
}
