var userModel = require('./userModel');
var key = 'somekey234567884456753456';
var encryptor = require('simple-encryptor')(key);

module.exports.createUserDBService = (userDetails) => {

   return new Promise(function myFn(resolve, reject) {
       var userModelData = new userModel();

       userModelData.firstname = userDetails.firstname;
       userModelData.lastname = userDetails.lastname;
       userModelData.email = userDetails.email;
       userModelData.password = userDetails.password;
       var encrypted = encryptor.encrypt(userDetails.password);
       userModelData.password = encrypted;

       userModelData.save(function resultHandle(error, result) {

           if (error) {
               reject(false);
           } else {
               resolve(true);
           }
       });
   });
}

module.exports.loginuserDBService = (userDetails)=>  {
   return new Promise(function myFn(resolve, reject)  {
      userModel.findOne({ email: userDetails.email},function getresult(errorvalue, result) {
         if(errorvalue) {
            reject({status: false, msg: "Datos Invalidos"});
         }
         else {
            if(result !=undefined &&  result !=null) {
               var decrypted = encryptor.decrypt(result.password);

               if(decrypted== userDetails.password) {
                  resolve({status: true,msg: "Usuario Validado"});
               }
               else {
                  reject({status: false,msg: "Falla en validacion de usuario"});
               }
            }
            else {
               reject({status: false,msg: "Detalles de usuario invalido"});
            }
         }
      });
   });
}

module.exports.searchUserDBService = (userDetails) => {
   return new Promise(function myFn(resolve, reject) {
      userModel.findOne({firstname: userDetails}, function getResult(errorvalue, result ){
         if (errorvalue) {
            reject({status: false, msg: "Lo sentimos, no hemos encontrado al usuario"});
         }
         else{
            if (result!==null && result.firstname===userDetails) {
               resolve({status: true, msg: result})
            }
            reject({status: false, msg:"Lo sentimos, no hemos encontrado al usuario"});
         }
      })
   })
}


module.exports.deleteUserDBService = (id, userDetails) =>{
   return new Promise( 
      ( resolve, reject ) => {
         userModel.findOneAndDelete( {_id:id}, userDetails , function getResult(errorvalue, result){
            console.log("errorvalue:",errorvalue);

            if(errorvalue) {
               reject({status: false, msg: "Datos no validos"});
            } else {
               console.log("result:",result);
               if(result !=undefined &&  result !=null) {
                  if(result != undefined) {
                     reject({status: true, msg: `Usuario eliminado correctamente`});
                  }
                  else {
                     reject({status: false, msg: "Lo sentimos, no hemos encontrado al usuario"});
                  }
               }
               else {
                  reject({status: false, msg: "Lo sentimos, pero el usuario que quiere eliminar no existe"});
               }
            }
         });
   })   
}

module.exports.updateUserDBService = (id, userDetails) => {

   return new Promise(function(resolve, reject) {
      userModel.findOneAndUpdate({_id:id}, userDetails,function getresult(errorvalue, result) {
         console.log("errorvalue:",errorvalue);
         if (errorvalue) {
            reject({status: false, msg: "Datos no validos"});
         } else{
            resolve({status: true, msg: "Usuario actualizado", usuarios:result})
         }
      })
   });
}