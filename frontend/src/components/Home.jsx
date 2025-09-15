import React from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useEffect } from 'react';
import { useState } from 'react';
import axios, { Axios } from 'axios'
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../axiosinterceptor';

const Home = () =>{
    
    const [products,setProducts]=useState([]);
    useEffect(()=>{
        axios.get('/api/product/',products)
        .then((res)=>{
            setProducts(res.data)

        })
        .catch((err)=>{
            console.error(err);
            alert("Invalid credentials or server error");
        })
    },[])
// function for delete
  const deleteProduct = (id) => {
    axiosInstance.delete('/api/product/delete/' + id)
      .then((res) => {
        window.location.reload()
      })
      .catch((err) => {
        console.log(err)
      }) 
    }
     //function for update

      let navigate=useNavigate();
      let updateProduct= (product) => {
      navigate('/add',{state:{product}})   
  }
const token=localStorage.getItem('token')
  return (
    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
      {products.map((product, index) => (
        <Card key={index} sx={{ maxWidth: 345,marginTop:5 }}>
          <CardMedia
            component="img"
            height="140"
            image={product.imageURL}
            title={product.title}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {product.title}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {product.description}
            </Typography>
            <Typography variant="subtitle2" sx={{ mt: 1 }}>
              Status: {product.status}
            </Typography>
          </CardContent>
          <CardActions>
          {token && (
            <><Button size="small" onClick={()=>{updateProduct(product)}}>Update</Button>
            <Button size="small" onClick={()=>{deleteProduct(product._id)}}>Delete</Button></>
          )}
          </CardActions>
        </Card>
      ))}
    </div>
  )
}


export default Home