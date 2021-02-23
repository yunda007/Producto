const express= require('express');
const router= express.Router();
const pool= require('../database');

router.get('/mostrar',async(req,res) =>{
    const usuarios = await pool.query('SELECT id, nombre, SUM(cantidad) AS masvendidos FROM productos GROUP BY nombre ORDER BY SUM(cantidad) DESC');
    res.render('usuarios/masvendidos',{usuarios});
});

router.get('/agregar',async(req,res) =>{
    const usuarios = await pool.query('select * from usuarios');
    res.render('usuarios/agregar',{usuarios});
});

router.get('/agregar/:id',async(req,res) =>{
    const { id } = req.params
    const usuarios = await pool.query('select * from usuarios where id='+id);
    res.render('usuarios/editar',usuarios);
});


router.post('/edit',async(req,res) =>{
    const { id,nombre, precio, cantidad} = req.body
    const usua = await pool.query(`update usuarios set nombre='${nombre}', apellido='${apellido}', edad='${edad}' where id=${id}`);
    res.redirect('/usuarios/agregar');
});

router.post('/agregar',async(req,res) =>{

        const {nombre,apellido, edad} = req.body;
        const newUsuarios = {nombre,apellido,edad};

        await pool.query('insert into usuarios set ?', [newUsuarios]);
        
        res.redirect('/usuarios/agregar');
});

router.get('/delete/:id',async(req,res)=>{
    const {id}= req.params;
    const tienda = await pool.query('delete from usuarios where id=?',[id]);
    res.redirect('/usuarios/agregar');
});


module.exports= router;