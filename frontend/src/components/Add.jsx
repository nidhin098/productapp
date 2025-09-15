import React, { useEffect, useState } from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';
import { useNavigate,useLocation } from 'react-router-dom';
import { use } from 'react';
import axiosInstance from '../axiosinterceptor';
const Add = () => {
  const [product, setProduct] = useState({
    title: "",
    description: "",
    status: "",
    imageURL: ""
  })

    const navigate = useNavigate();
    const location = useLocation(); 


  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
   if(location.state!=null){
     axiosInstance.post(`/product/update/${location.state.product._id}`, product)
      .then((res) => {
        setProduct({
          title: "",
          description: "",
          status: "",
          imageURL: ""
        })
        navigate('/')
      })
      .catch((err) => {
        console.error(err)
      })

   }else{
     axiosInstance.post('/product/add', product)
      .then((res) => {
        setProduct({
          title: "",
          description: "",
          status: "",
          imageURL: ""
        })
        navigate('/')
      })
      .catch((err) => {
        console.error(err)
      })
   }
  }
  useEffect(() => {
        if (location.state != null) {
            setProduct({
                title: location.state.product.title,
                description: location.state.product.description,
                status:location.state.product.status,
                imageURL: location.state.product.imageURL
            });
        }
    }, []);

  return (
    <div style={{ textAlign: 'center', marginTop: '200px', }}>
      <h1>{location.state?"Update Product":"Add Product"}</h1>
      <form onSubmit={handleSubmit}>
        <TextField
          id="outlined-basic" label="Product-name" variant="outlined" name='title' value={product.title} onChange={handleChange} required />
        <br /><br />
        <TextField
          id="outlined-basic" label="Product-description" variant="outlined" name='description' value={product.description} onChange={handleChange} required />
        <br /><br />
        <TextField id="outlined-basic" label="Product-status" variant="outlined" name='status' value={product.status} onChange={handleChange} required />
        <br /><br />
        <TextField id="outlined-basic" label="Product-image_URL" variant="outlined" name='imageURL' value={product.imageURL} onChange={handleChange} required /><br /><br />

        <Button variant="contained" type='submit'>Add</Button>
      </form>
    </div>
  )
}

export default Add