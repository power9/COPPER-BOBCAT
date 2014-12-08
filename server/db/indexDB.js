var Sequelize = require('Sequelize');

  //MySql Connection
  var sequelize = new Sequelize('copperdb', 'bcb996835c867c', 'ad7bf91f', {
    host: 'us-cdbr-azure-west-a.cloudapp.net'
  });

  /** @type {model} Defines the sequelize User model */
  var User = sequelize.define('user', {
    username: Sequelize.STRING, 
    displayName: Sequelize.STRING,
    gitId : Sequelize.STRING
  });

  /**
   * Defines the sequelze Category model
   * @object {model}
   */
  var Category = sequelize.define('category', {
    categoryName: Sequelize.STRING,
    categorySlug: Sequelize.STRING
  });

  /**
   * Defines the sequelize Question model
   * @type {model}
   */
  var Question = sequelize.define('question', {
    question: Sequelize.STRING,
    answer: Sequelize.STRING,
    difficulty: Sequelize.INTEGER
  });


Category.hasMany(Question);
Question.hasMany(Category);


/******************CAUTION*********************
* This will drop all tables and recreate them
***********************************************/
//sequelize.sync({force: true});


/********************************************************************
* Helper functions 
*********************************************************************/

/**
 * Queries DB for all or an optional query
 * @param {object} model - The sequelize model.
 * @param {function} callback - a callback to recieve the returned data from the database.
 */
function modelQuery(Model, callback, query){
  if(query){
    Model.find(query)
    .error(function(err) {
      console.error('There was an error retrieving users: ' + err);
    })
    .success(function(data) {
      callback(data);
    });
  }else{
    Model.all()
    .error(function(err) {
      console.error('There was an error retrieving users: ' + err);
    })
    .success(function(data) {
      callback(data);
    });
  }; 
};


/**
 * Database Querying Functions For Getting Data
 * The query must be an object in the sequelize format.  
 * Example: ' {where: {name: 'John' } }' 
 * @param {function} callback - A callback to recieve the returned data from the database.
 * @param {object} query - A query in the sequelize  
 */

var queryDb = {

  getUsers : function(callback, query){
    modelQuery(User, callback, query);
  }, 
  getQuestions : function(callback, query){
    modelQuery(Question, callback, query);
  }, 
  getCategories : function(callback, query){
    modelQuery(Category, callback, query);
  }
};


/********************************************************************
* Database Querying Functions For Creating and Modifying Data
* Each function takes arguments to add or modify on the database
* Errors or Success will be logged in the node console
*********************************************************************/

var updateDb = {
  addUser : function(username, displayName, gitId){

    var newUser = User.build({
      username: username,
      displayName: displayName,
      gitId : gitId
    });

    newUser.save().success(function() {
      console.log('User Added');
    }).error(function(err){
      console.log('There was an error creating: ' + err);
    });

  },

  addQuestion : function(question, answer, difficulty){
    var newQuestion = Question.build({
      question: question,
      answer: answer,
      difficulty : difficulty
    });

    newQuestion.save().success(function() {
      console.log('Question Added');
    }).error(function(err){
      console.log('There was an error creating: ' + err);
    });

  },

  addCategory : function(categoryName){
    var newCategory = Category.build({
      categoryName : categoryName,
      categorySlug : categoryName.toLowerCase().replace(' ', '-')
    });

    newCategory.save().success(function() {
      console.log('Category Added');
    }).error(function(err){
      console.log('There was an error creating: ' + err);
    });
  }, 

  modifyUser : function(){

  },

  modifyQuestion : function(){

  },

  modifyCategory : function(){

  }
};


/********************************************************************
* Export items for use in app
*********************************************************************/
exports.queryDb = queryDb;
exports.updateDb = updateDb;


