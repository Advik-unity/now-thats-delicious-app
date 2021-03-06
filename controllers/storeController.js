const mongoose = require('mongoose');
const Store = mongoose.model('Store');

exports.homePage = (req, res) => {
  res.render('index', {title: 'Home'});
};

exports.addStore = (req, res) => {
  res.render('editStore', {title: 'Add Store'});
};

exports.createStore = async (req, res) => {
  const store = await (new Store(req.body)).save();
  req.flash('success', `${store.name} has been successfully created. Care to leave a review?`);
  res.redirect(`/store/${store.slug}`);
};

exports.getStores = async (req, res) => {
	const stores = await Store.find();
	res.render('stores', {title: 'Stores', stores});
}

exports.editStore = async (req, res) => {
	const store = await Store.findOne({_id: req.params.id});
	res.render('editStore', {title: `Edit ${store.name}`, store});
}