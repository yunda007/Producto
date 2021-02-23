const express= require('express');
const router= express.Router();
const pool= require('../database');

router.get('/mostrar',async(req,res) =>{
    const product = await pool.query('SELECT id, nombre, SUM(cantidad) AS masvendidos FROM productos GROUP BY nombre ORDER BY SUM(cantidad) DESC');
    res.render('tienda/masvendidos',{product});
});

router.get('/agregar',async(req,res) =>{
    const product = await pool.query('select * from productos');
    res.render('tienda/agregar',{product});
});

router.get('/agregar/:id',async(req,res) =>{
    const { id } = req.params
    const product = await pool.query('select * from productos where id='+id);
    res.render('tienda/editar',product);
});


router.post('/edit',async(req,res) =>{
    const { id,nombre, precio, cantidad} = req.body
    const usua = await pool.query(`update productos set nombre='${nombre}', precio='${precio}', cantidad='${cantidad}' where id=${id}`);
    res.redirect('/tienda/agregar');
});

router.post('/agregar',async(req,res) =>{

        const {nombre,precio, cantidad} = req.body;
        const newProducto = {nombre,precio, cantidad};

        await pool.query('insert into productos set ?', [newProducto]);
        
        res.redirect('/tienda/agregar');
});

router.get('/delete/:id',async(req,res)=>{
    const {id}= req.params;
    const tienda = await pool.query('delete from productos where id=?',[id]);
    res.redirect('/tienda/agregar');
});


module.exports= router;