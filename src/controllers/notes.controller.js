const notesCtrl={};
const Note = require('../models/Note');

notesCtrl.renderNoteForm=(req,res)=>{
    res.render('notes/new-note');
}
notesCtrl.createNewNote=async (req,res)=>{
    const {title,description} =req.body;
    const newNote = new Note({title,description});
    newNote.user=req.user.id;
    await newNote.save();

    req.flash('success_msg','Se añadio tu nota!');
    res.redirect('/notes');
}
notesCtrl.renderNotes= async (req,res)=>{
  //REALIZAMOS LA PETICION
   const notes =await Note.find({user:req.user.id}).sort({ createdAt: 'desc' })
   /*.then(notesItem => {
    //CREAMOS UN NUEVO OBJETO DONDE ALMACENAR EL ARRAY
     const myObject= {
        //MAPEAMOS LOS RESULTADOS
        notes: notesItem.map(item => {
            return {
                id: item._id,
                title: item.title,
                description: item.description,
                user:item.user
            }
        })
    } 
  
    const notes = myObject.notes;*/
    //res.render('notes/all-notes', { notes:myObject.notes});
   
   //})
     res.render('notes/all-notes', {notes:notes});
 

}

notesCtrl.renderEditForm=async(req,res)=>{
    const note =await Note.findById(req.params.id);

    if(note.user != req.user.id){
        req.flash('error_msg','No Autorizado!');
        return res.redirect('/notes');
    }


    res.render('notes/edit-note',{note:note,user:req.user});
    console.log(req.user);
    console.log(note);
}

notesCtrl.updateNote= async(req,res)=>{
    const {title,description}=req.body;
    await Note.findByIdAndUpdate(req.params.id,{title,description});
    req.flash('success_msg','Se actualizó tu nota!');
    res.redirect('/notes');
   
}

notesCtrl.deleteNote= async(req,res)=>{
   await Note.findByIdAndDelete(req.params.id);
   req.flash('success_msg','Se eliminó tu nota!');
   res.redirect('/notes');
}

module.exports=notesCtrl;