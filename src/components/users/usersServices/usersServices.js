const { User } = require('../../../models/users');
const { Cart } = require('../../../models/carts');
const { createHash } = require('../../../utils/bcrypt/bcrypt');

class UsersServices {
  getUsers = async (res) => {
    try {
      const users = await User.find();
      const data = users;
      return res.status(200).json({ success: true, payload: data });
    } catch (error) {
      return res.status(500).json({ success: false, error: 'Error al obtener los usuarios' });
    }
  };
  addUser = async (payload, res) => {
    try {
      const { first_name, last_name, email, age, password } = payload;

      if (!first_name || !last_name || !email || !age || !password) {
        return res.status(500).json({ success: false, error: 'Faltan campos obligatorios' });
      }
      const existingUser = await User.findOne({ email: email });

      if (existingUser) {
        return res.status(400).json({ success: false, error: 'Ya existe un usuario con el mismo correo electrónico' });
      }

      const newUser = new User({
        first_name,
        last_name,
        email,
        age,
        password: createHash(password),
      });

      await newUser.save();

      const userCart = new Cart({
        user: newUser._id,
        products: [],
      });

      await userCart.save();

      newUser.cart = userCart._id;

      await newUser.save();

      const data = newUser;

      return res.status(201).json({ success: true, message: 'Usuario agregado correctamente', payload: data });
    } catch (error) {
      return res.status(500).json({ success: false, error: 'Error al agregar el usuario' });
    }
  };
  recoveryUser = async ({ email, password, res }) => {
    try {
      let user = await User.findOne({
        email: email,
      });

      if (!user) {
        return res.status(401).json({ success: false, error: 'No existe en la DB!' });
      }

      let updatedPassword = await User.findByIdAndUpdate(user._id, { password: createHash(password) }, { new: true });

      return res.status(200).json({ success: true, message: 'Contraseña actualizada correctamente', payload: updatedPassword });
    } catch (error) {
      return res.status(500).json({ success: false, error: 'Error al recuperar la contraseña' });
    }
  };
  getUserById = async (uid, res) => {
    try {
      const user = await User.findById(uid);

      if (!user) {
        return res.status(404).json({ success: false, error: 'Usuario no encontrado' });
      }

      const data = user;

      return res.status(200).json({ success: true, payload: data });
    } catch (error) {
      return res.status(500).json({ success: false, error: 'Error al obtener el usuario' });
    }
  };
  updateUser = async (uid, updateFields, res, req) => {
    try {
      const allowedFields = ['first_name', 'last_name', 'email', 'age', 'password'];

      const invalidFields = Object.keys(updateFields).filter((field) => !allowedFields.includes(field));

      if (invalidFields.length > 0) {
        return res.status(400).json({ success: false, error: `Los siguientes campos no se pueden modificar: ${invalidFields.join(', ')}` });
      }

      const updatedUser = await User.findByIdAndUpdate(uid, updateFields, { new: true });

      if (!updatedUser) {
        return res.status(404).json({ success: false, error: 'Usuario no encontrado' });
      }

      req.app.io.emit('updateUser', updatedUser);

      const data = updatedUser;

      return res.status(200).json({ success: true, message: 'Usuario actualizado correctamente', payload: data });
    } catch (error) {
      return res.status(500).json({ success: false, error: 'Error al actualizar el usuario' });
    }
  };

  deleteUser = async (uid, res, req) => {
    try {
      const deletedUser = await User.findByIdAndDelete(uid);

      if (!deletedUser) {
        return res.status(404).json({ success: false, error: 'Usuario no encontrado' });
      }

      req.app.io.emit('deleteUser', uid);

      const data = deletedUser;
      return res.status(200).json({ success: true, message: 'Usuario eliminado correctamente', payload: data });
    } catch (error) {
      return res.status(500).json({ success: false, error: 'Error al eliminar el usuario' });
    }
  };
}
module.exports = new UsersServices();
