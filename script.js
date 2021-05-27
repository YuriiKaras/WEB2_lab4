var User=require('./user');
var user=new User('Yurii','Karas');
console.log('firstname: '+user.first);
console.log('lastname: '+user.last);
user.fullName();