const db = require("./../config/dbconfig");

var User = {
  findAll: function (callback) {
    return db.query("Select * from user", callback);
  },

  create: function (newUser, callback) {
    return db.query(
      "INSERT INTO user (name) VALUES (?)",
      newUser.name,
      callback
    );
  },

  findReward:function(id,callback){
    return db.query("SELECT * from reward_transactions where given_to_user_id = ?",id,callback)
  },

  findP5:function(id,callback){
    return db.query("SELECT * from p5_transactions where given_to_user_id = ?",id,callback)
  },

// Does not work
  createp5: async function (newp5, callback) {
    let available_balace = await db.query(
      "select p5_balance from user where user_id = ?",
      newp5.given_by_user_id
    );

    if (available_balace >= newp5.amount) {
      db.query(
        "INSERT INTO p5_transactions (amount,given_by_user_id,given_to_user_id) VALUES (?,?,?)",
        [newp5.amount, newp5.given_by_user_id, newp5.given_to_user_id],
        function (err, result) {
          db.query(
            "INSERT INTO reward_transactions (amount,given_by_user_id,given_to_user_id) VALUES (?,?,?)",
            [newp5.amount, newp5.given_to_user_id, newp5.given_by_user_id],
            function (err, result) {
              db.query(
                "UPDATE user SET p5_balance = ? where user_id = ?",
                [available_balace - newp5.amount, newp5.given_by_user_id],
                function (err, result) {
                  db.query(
                    "select reward_balance from user where user_id = ?",
                    newp5.given_to_user_id,
                    function (err, result) {
                      db.query(
                        "UPDATE user SET reward_balance = ? where user_id = ?",
                        [
                          result.reward_balance + newp5.amount,
                          newp5.given_to_user_id,
                        ]
                      );
                    }
                  );
                }
              );
            }
          );
        }
      );
    }
    else{
        return callback
    }
  },
};

module.exports = User;
